import { useState, useRef, useEffect, forwardRef, useImperativeHandle, useMemo } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import { Canvas, Path, Skia, Circle } from '@shopify/react-native-skia';
import { addDraw, deleteAllDrawsFromNote, getDrawingsFromId } from '../utils/sqlite';
import simplify from 'simplify-js';

const SketchPad = forwardRef(({ note_id, drawing, setDrawing }, ref) => {
    const [paths, setPaths] = useState([]);
    const [newPaths, setNewPaths] = useState([]);
    const currentPoints = useRef([]);
    const pathsRef = useRef(paths);
    const drawingRef = useRef(drawing);
    const [rubberPos, setRubberPos] = useState(null);

    useEffect(() => {
        loadFromDB();
    }, [note_id]);

    useEffect(() => {
        drawingRef.current = drawing;
    }, [drawing]);

    useEffect(() => {
        pathsRef.current = paths;
    }, [paths]);

    // Función para detectar si un punto está cerca de un path
    const isPointNearPath = (point, pathPoints, tolerance = 15) => {
        if (pathPoints.length < 2) return false;

        for (let i = 0; i < pathPoints.length - 1; i++) {
            const p1 = pathPoints[i];
            const p2 = pathPoints[i + 1];

            if (isPointNearLineSegment(point, p1, p2, tolerance)) {
                return true;
            }
        }

        return false;
    };

    const isPointNearLineSegment = (p, a, b, tolerance) => {
        const dx = b.x - a.x;
        const dy = b.y - a.y;

        if (dx === 0 && dy === 0) {
            const distSq = (p.x - a.x) ** 2 + (p.y - a.y) ** 2;
            return distSq <= tolerance ** 2;
        }

        const t = Math.max(0, Math.min(1, ((p.x - a.x) * dx + (p.y - a.y) * dy) / (dx * dx + dy * dy)));
        const closestX = a.x + t * dx;
        const closestY = a.y + t * dy;
        const distSq = (p.x - closestX) ** 2 + (p.y - closestY) ** 2;

        return distSq <= tolerance ** 2;
    };
    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant: (evt, gestureState) => {
                const { locationX, locationY } = evt.nativeEvent;

                setDrawing({ ...drawingRef.current, visible: false });
                hasMoved.current = false; // ← Flag para detectar si se ha arrastrado

                // Iniciar buffer de puntos
                currentPoints.current = [{ x: locationX, y: locationY }];
            },

            onPanResponderMove: async (evt, gestureState) => {
                const { locationX, locationY } = evt.nativeEvent;

                const dx = Math.abs(gestureState.dx);
                const dy = Math.abs(gestureState.dy);
                const movementThreshold = 2;

                if (!hasMoved.current && (dx > movementThreshold || dy > movementThreshold)) {
                    hasMoved.current = true;

                    if (drawingRef.current.mode === "free") {
                        const simplified = simplify(currentPoints.current, 1, true);
                        // FREE MODE - inicia con primer punto
                        setPaths(prev => [...prev, {
                            color: drawingRef.current.color,
                            width: drawingRef.current.width,
                            points: simplified
                        }]);
                        setNewPaths(prev => [...prev, {
                            color: drawingRef.current.color,
                            width: drawingRef.current.width,
                            points: simplified
                        }]);
                    }
                }

                if (hasMoved.current) {
                    const point = { x: locationX, y: locationY };

                    if (drawingRef.current.mode === "free") {
                        currentPoints.current.push(point);

                        setPaths(prev => {
                            const updated = [...prev];
                            updated[updated.length - 1] = {
                                ...updated[updated.length - 1],
                                points: [...currentPoints.current]
                            };
                            return updated;
                        });

                        setNewPaths(prev => {
                            const updated = [...prev];
                            updated[updated.length - 1] = {
                                ...updated[updated.length - 1],
                                points: [...currentPoints.current]
                            };
                            return updated;
                        });

                    } else if (drawingRef.current.mode === "line") {
                        const start = currentPoints.current[0];
                        const end = point;
                        const linePoints = [start, end];

                        setPaths(prev => {
                            const updated = [...prev];
                            if (updated.length === 0 || updated[updated.length - 1].points.length !== 2) {
                                updated.push({
                                    color: drawingRef.current.color,
                                    width: drawingRef.current.width,
                                    points: linePoints
                                });
                            } else {
                                updated[updated.length - 1] = {
                                    ...updated[updated.length - 1],
                                    points: linePoints
                                };
                            }
                            return updated;
                        });

                        setNewPaths(prev => {
                            const updated = [...prev];
                            if (updated.length === 0 || updated[updated.length - 1].points.length !== 2) {
                                updated.push({
                                    color: drawingRef.current.color,
                                    width: drawingRef.current.width,
                                    points: linePoints
                                });
                            } else {
                                updated[updated.length - 1] = {
                                    ...updated[updated.length - 1],
                                    points: linePoints
                                };
                            }
                            return updated;
                        });

                    } else if (drawingRef.current.mode === "rubber") {
                        // Eliminar paths cercanos al dedo
                        setRubberPos({ x: locationX, y: locationY }); // Actualiza posición del círculo
                        const newList = pathsRef.current.filter(p => !isPointNearPath(point, p.points));
                        if (newList.length !== pathsRef.current.length) {
                            pathsRef.current = newList;
                            setPaths(newList);
                            setNewPaths(newList);
                        }
                    }
                }
            },

            onPanResponderRelease: () => {
                // Limpiar puntos y no guardar nada si fue solo un tap
                if (!hasMoved.current) {
                    currentPoints.current = [];
                    return;
                }
                setRubberPos(null); // Oculta el círculo cuando termina el gesto
                // Confirmar línea en modo "line"
                if (drawingRef.current.mode === "line") {
                    const start = currentPoints.current[0];
                    const end = currentPoints.current[1] || currentPoints.current[0];
                    const finalLine = [start, end];

                    setPaths(prev => [...prev, {
                        color: drawingRef.current.color,
                        width: drawingRef.current.width,
                        points: finalLine
                    }]);

                    setNewPaths(prev => [...prev, {
                        color: drawingRef.current.color,
                        width: drawingRef.current.width,
                        points: finalLine
                    }]);
                }

                currentPoints.current = [];
                setDrawing({ ...drawingRef.current, visible: true });

            }
        })
    ).current;

    // Este ref lo defines fuera del panResponder
    const hasMoved = useRef(false);

    // Renderizado de paths, coloreando el seleccionado en rojo
    const renderPaths = useMemo(() => {
        return paths.map((p) => {
            const path = Skia.Path.Make();
            if (p.points.length > 0) {
                path.moveTo(p.points[0].x, p.points[0].y);
                for (let j = 1; j < p.points.length; j++) {
                    path.lineTo(p.points[j].x, p.points[j].y);
                }
            }
            return {
                path,
                color: p.color,
                width: p.width,
            };
        });
    }, [paths]);


    useEffect(() => {
        console.log(newPaths.length);
    }, [newPaths])

    const save = async () => {
        await deleteAllDrawsFromNote(note_id);
        paths.forEach(async (path) => {
            let json = JSON.stringify(path);
            await addDraw(note_id, json);
        })
    };

    const loadFromDB = async () => {
        setPaths([]); // Limpia antes de cargar

        const drawings = await getDrawingsFromId(note_id);
        const allPaths = drawings
            .map((d) => {
                try {
                    let parsed = JSON.parse(d.data);
                    if (typeof parsed === "string") parsed = JSON.parse(parsed);
                    return parsed;
                } catch (e) {
                    console.error("Error parsing:", e);
                    return null;
                }
            })
            .filter(Boolean);

        const mergedPaths = allPaths.flat(2);
        pathsRef.current = mergedPaths;
        setPaths(mergedPaths);
    };

    useImperativeHandle(ref, () => ({ save }));

    return (
        paths &&
        <View style={[styles.container, { zIndex: 1000, pointerEvents: drawing.isDrawing ? "auto" : "none" }]} >
            <View style={styles.canvasContainer} {...panResponder.panHandlers}>
                <Canvas style={styles.canvas}>
                    {renderPaths.map((p, i) => (
                        <Path
                            key={i}
                            path={p.path}
                            color={p.color}
                            style="stroke"
                            strokeWidth={p.width}
                        />
                    ))}
                    {rubberPos && (
                        <Circle
                            cx={rubberPos.x}
                            cy={rubberPos.y}
                            r={45}
                            color="rgba(204, 82, 122,0.3)"
                        />
                    )}
                </Canvas>
            </View>
        </View>
    );

})

export default SketchPad;

const styles = StyleSheet.create({
    container: { flex: 1, position: "absolute", width: "100%", height: "100%" },
    canvasContainer: { flex: 1 },
    canvas: { flex: 1 },
});
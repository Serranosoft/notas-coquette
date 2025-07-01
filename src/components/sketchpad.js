import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from 'react';
import { View, StyleSheet, PanResponder } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { addDraw, getDrawingsFromId } from '../utils/sqlite';

const SketchPad = forwardRef(({ note_id, drawing }, ref) => {
    const [paths, setPaths] = useState([]);
    const [newPaths, setNewPaths] = useState([]);
    const currentPoints = useRef([]);
    const pathsRef = useRef(paths);
    const drawingRef = useRef(drawing);
    const [selectedPathIndex, setSelectedPathIndex] = useState(null);

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
        return pathPoints.some(p => {
            const dx = p.x - point.x;
            const dy = p.y - point.y;
            return dx * dx + dy * dy <= tolerance * tolerance;
        });
    };

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => true,

            onPanResponderGrant: (evt, gestureState) => {
                const { locationX, locationY } = evt.nativeEvent;

                hasMoved.current = false; // ← Flag para detectar si se ha arrastrado

                if (drawingRef.current.isDrawing) {
                    console.log("pathsRef en tap", pathsRef.current.length, pathsRef.current);
                    const foundIndex = pathsRef.current.findIndex(p => isPointNearPath({ x: locationX, y: locationY }, p.points));
                    setSelectedPathIndex(foundIndex !== -1 ? foundIndex : null);
                }

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
                        // FREE MODE - inicia con primer punto
                        setPaths(prev => [...prev, {
                            color: drawingRef.current.color,
                            width: drawingRef.current.width,
                            points: [...currentPoints.current]
                        }]);
                        setNewPaths(prev => [...prev, {
                            color: drawingRef.current.color,
                            width: drawingRef.current.width,
                            points: [...currentPoints.current]
                        }]);
                    }
                }

                if (hasMoved.current) {
                    if (drawingRef.current.mode === "free") {
                        // FREE MODE - añadir punto tras punto
                        currentPoints.current.push({ x: locationX, y: locationY });

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
                        // LINE MODE - solo actualizar segundo punto
                        const start = currentPoints.current[0];
                        const end = { x: locationX, y: locationY };
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
                    }
                }
            },

            onPanResponderRelease: () => {
                // Limpiar puntos y no guardar nada si fue solo un tap
                if (!hasMoved.current) {
                    currentPoints.current = [];
                    return;
                }

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
            }
        })
    ).current;

    // Este ref lo defines fuera del panResponder
    const hasMoved = useRef(false);

    // Renderizado de paths, coloreando el seleccionado en rojo
    const renderPaths = paths.map((p, i) => {
        const skPath = Skia.Path.Make();
        if (p.points.length > 0) {
            skPath.moveTo(p.points[0].x, p.points[0].y);
            for (let j = 1; j < p.points.length; j++) {
                skPath.lineTo(p.points[j].x, p.points[j].y);
            }
        }
        const color = i === selectedPathIndex ? "red" : p.color;
        return (
            <Path
                key={i}
                path={skPath}
                color={color}
                style="stroke"
                strokeWidth={p.width}
            />
        );
    });


    useEffect(() => {
        console.log(newPaths.length);
    }, [newPaths])

    const save = async () => {
        const json = JSON.stringify(newPaths);
        if (newPaths.length > 0) {
            await addDraw(note_id, json);
        }
    };

    const loadFromDB = async () => {
        setPaths([]); // Limpia antes de cargar

        const drawings = await getDrawingsFromId(note_id);
        console.log(drawings.length);
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
        <View style={[styles.container, { zIndex: drawing.isDrawing ? 1000 : 998 }]} >
            <View style={styles.canvasContainer} {...panResponder.panHandlers}>
                <Canvas style={styles.canvas}>
                    {renderPaths}
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
    buttons: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 }
});
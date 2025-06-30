import { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, Button, PanResponder } from 'react-native';
import { Canvas, Path, Skia } from '@shopify/react-native-skia';
import { addDraw, getDrawingsFromId } from '../utils/sqlite';

export default function SketchPad({ note_id, isDrawing }) {
    const [paths, setPaths] = useState([]);
    const currentPoints = useRef([]);
    const isDrawingRef = useRef(isDrawing);

    useEffect(() => {
        isDrawingRef.current = isDrawing;
    }, [isDrawing]);

    const panResponder = useRef(
        PanResponder.create({
            onStartShouldSetPanResponder: () => isDrawingRef.current,
            onPanResponderGrant: (evt, gestureState) => {
                const { locationX, locationY } = evt.nativeEvent;
                currentPoints.current = [{ x: locationX, y: locationY }];
                setPaths(prev => [...prev, {
                    color: '#000',
                    width: 3,
                    points: [...currentPoints.current]
                }]);
            },
            onPanResponderMove: (evt, gestureState) => {
                const { locationX, locationY } = evt.nativeEvent;
                currentPoints.current.push({ x: locationX, y: locationY });
                setPaths(prev => {
                    const updated = [...prev];
                    updated[updated.length - 1] = {
                        ...updated[updated.length - 1],
                        points: [...currentPoints.current]
                    };
                    return updated;
                });
            },
            onPanResponderRelease: () => {
                currentPoints.current = [];
            }
        })
    ).current;

    const renderPaths = paths.map((p, i) => {
        const skPath = Skia.Path.Make();
        if (p.points.length > 0) {
            skPath.moveTo(p.points[0].x, p.points[0].y);
            for (let j = 1; j < p.points.length; j++) {
                skPath.lineTo(p.points[j].x, p.points[j].y);
            }
        }
        return (
            <Path
                key={i}
                path={skPath}
                color={p.color}
                style="stroke"
                strokeWidth={p.width}
            />
        );
    });

    const saveToDB = async () => {
        const json = JSON.stringify(paths);
        await addDraw(note_id, json);
    };

    const loadFromDB = async () => {

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

        setPaths(mergedPaths);
    };

    return (
        <View style={[styles.container, { zIndex: isDrawing ? 1000 : 998 }]}>
            <View style={styles.canvasContainer} {...panResponder.panHandlers}>
                <Canvas style={styles.canvas}>
                    {renderPaths}
                </Canvas>
            </View>
            <View style={styles.buttons}>
                <Button title="Guardar" onPress={saveToDB} />
                <Button title="Cargar" onPress={loadFromDB} />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, position: "absolute", width: "100%", height: "100%", zIndex: 998 },
    canvasContainer: { flex: 1 },
    canvas: { flex: 1 },
    buttons: { flexDirection: 'row', justifyContent: 'space-around', padding: 10 }
});

import React from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';

export default function GridBackground() {
    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    // Definir la cantidad de líneas y el espacio entre ellas
    const numLines = 25;
    const lineSpacingX = (windowWidth + 450) / numLines;
    const lineSpacingY = (windowHeight) / numLines;

    const renderHorizontalLines = () => {
        const lines = [];
        for (let i = 0; i < numLines; i++) {
            lines.push(
                <View
                    key={`horizontal-line-${i}`}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: i * lineSpacingY,
                        height: StyleSheet.hairlineWidth,
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    }}
                />
            );
        }
        return lines;
    };

    const renderVerticalLines = () => {
        const lines = [];
        for (let i = 0; i < numLines; i++) {
            lines.push(
                <View
                    key={`vertical-line-${i}`}
                    style={{
                        position: 'absolute',
                        top: 0,
                        bottom: 0,
                        left: i * lineSpacingX,
                        width: StyleSheet.hairlineWidth,
                        backgroundColor: 'rgba(0, 0, 0, 0.2)',
                    }}
                />
            );
        }
        return lines;
    };

    return (
        <View style={[styles.container/* , { width: windowWidth, height: windowHeight } */]}>
            {renderHorizontalLines()}
            {renderVerticalLines()}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        overflow: "hidden",
    },
});

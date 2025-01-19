import React from 'react';
import { View, StyleSheet } from 'react-native';
import Svg, { Rect, Defs, Pattern } from 'react-native-svg';
export default function GridBackground() {

    return (
        <View style={styles.container}>
            <View style={styles.container}>
                <Svg height="100%" width="100%">
                    <Defs>
                        <Pattern
                            id="grid"
                            patternUnits="userSpaceOnUse"
                            width="30"
                            height="30"
                        >
                            {/* Horizontal lines */}
                            <Rect x="0" y="24" width="30" height="1" fill="#ededed" />
                            <Rect x="0" y="74" width="30" height="1" fill="#ededed" />

                            {/* Vertical lines */}
                            <Rect x="24" y="0" width="1" height="30" fill="#ededed" />
                            <Rect x="74" y="0" width="1" height="30" fill="#ededed" />
                        </Pattern>
                    </Defs>
                    <Rect width="100%" height="100%" fill="#fff" />
                    <Rect width="100%" height="100%" fill="url(#grid)" />
                </Svg>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: "100%",
        height: 10000,
    },
});

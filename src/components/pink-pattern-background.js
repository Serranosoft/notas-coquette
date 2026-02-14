import { View, StyleSheet } from "react-native";
import { Svg, Defs, Pattern, Rect, Path } from "react-native-svg";
import { colors } from "../utils/styles";

export default function PinkPatternBackground() {
    return (
        <View style={styles.background}>
            <Svg height="100%" width="100%">
                <Defs>
                    <Pattern
                        id="pinkPattern"
                        patternUnits="userSpaceOnUse"
                        width="40"
                        height="40"
                        patternTransform="rotate(45)"
                    >
                        <Rect x="0" y="0" width="40" height="40" fill={colors.light} />
                        <Path
                            d="M0 0h40v40H0z"
                            fill="none"
                            stroke={colors.lightPink}
                            strokeWidth="1"
                            strokeOpacity="0.5"
                        />
                        {/* Subtle diamond effect */}
                        <Rect x="10" y="10" width="20" height="20" fill="rgba(255,255,255,0.15)" />
                    </Pattern>
                </Defs>
                <Rect x="0" y="0" width="100%" height="100%" fill="url(#pinkPattern)" />
            </Svg>
        </View>
    );
}

const styles = StyleSheet.create({
    background: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
});

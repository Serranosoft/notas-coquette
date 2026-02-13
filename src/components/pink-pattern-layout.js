import { View, StyleSheet, Dimensions } from "react-native";
import { Svg, Defs, Pattern, Rect, Path } from "react-native-svg";
import { colors } from "../utils/styles";

const { width, height } = Dimensions.get("window");

export default function PinkPatternLayout({ children }) {
    return (
        <View style={styles.container}>
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
            <View style={styles.content}>
                {children}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light, // Fallback
    },
    background: {
        ...StyleSheet.absoluteFillObject,
        zIndex: 0,
    },
    content: {
        flex: 1,
        zIndex: 1,
    }
});

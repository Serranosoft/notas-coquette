import { Link } from "expo-router";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { colors } from "../utils/styles";
import { Svg, Path } from "react-native-svg";

export default function HomeNewNoteBtn() {

    return (
        <Link href="/note" asChild>
            <TouchableOpacity activeOpacity={0.8} style={styles.fabContainer}>
                <View style={styles.fab}>
                    <Svg width={32} height={32} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round">
                        <Path d="M12 5v14M5 12h14" />
                    </Svg>
                </View>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    fabContainer: {
        position: "absolute",
        bottom: 30, // Adjust distance from bottom
        right: 20, // Adjust distance from right
        zIndex: 999, // Ensure it's on top
    },
    fab: {
        width: 60,
        height: 60,
        borderRadius: 30,
        backgroundColor: colors.pink || colors.button, // Use the new pink if defined, or button color
        justifyContent: "center",
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 4.65,
        elevation: 8,
    },
})
import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import { colors, editor } from "../../utils/styles";

export default function Drawing({ drawing, setDrawing }) {

    return (
        <View style={[editor.footer, styles.container, { height: "auto" }]}>
            <ScrollView contentContainerStyle={{ gap: 8 }}>
                <View style={styles.items}>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, mode: prev.mode == "free" ? "line" : "free" }))}><View style={[styles.size, { backgroundColor: "red", width: 25, height: 25 }]}>{drawing.width === 1 && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <View style={styles.items}>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, width: 1 }))}><View style={[styles.size, { width: 25, height: 25 }]}>{drawing.width === 1 && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, width: 3 }))}><View style={[styles.size, { width: 35, height: 35 }]}>{drawing.width === 3 && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, width: 5 }))}><View style={[styles.size, { width: 45, height: 45 }]}>{drawing.width === 5 && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <View style={styles.items}>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, color: "#000" }))}><View style={[styles.color, { backgroundColor: "#000" }]}>{drawing.color === "#000" && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, color: "#DF216E" }))}><View style={[styles.color, { backgroundColor: "#DF216E" }]}>{drawing.color === "#DF216E" && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, color: "#C1889B" }))}><View style={[styles.color, { backgroundColor: "#C1889B" }]}>{drawing.color === "#C1889B" && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, color: "#c2a1cf" }))}><View style={[styles.color, { backgroundColor: "#c2a1cf" }]}>{drawing.color === "#c2a1cf" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, color: "#9bb6c7" }))}><View style={[styles.color, { backgroundColor: "#9bb6c7" }]}>{drawing.color === "#9bb6c7" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, color: "#99c9b9" }))}><View style={[styles.color, { backgroundColor: "#99c9b9" }]}>{drawing.color === "#99c9b9" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, color: "goldenrod" }))}><View style={[styles.color, { backgroundColor: "goldenrod" }]}>{drawing.color === "goldenrod" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({


    container: {
        position: "absolute",
        top: 55,
        right: 8,
        backgroundColor: "#fff",
        borderWidth: 4,
        borderColor: colors.light,
        zIndex: 99,
        borderRadius: 100,
        paddingVertical: 0,
        overflow: "hidden",
        width: "auto",
        paddingVertical: 8,
    },

    item: {
        textAlign: "center",
        paddingHorizontal: 6,
    },

    separator: {
        borderBottomWidth: 1,
        borderColor: "lightgray"
    },

    items: {
        justifyContent: "center",
        alignItems: "center",
        gap: 8
    },

    color: {
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 2,
    },

    size: {
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 2,
        backgroundColor: "#000",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 12,
        },
        shadowOpacity: 0.58,
        shadowRadius: 16.00,

        elevation: 24,
    },

    tick: {
        position: "absolute",
        width: 48,
        height: 48,
    },

})
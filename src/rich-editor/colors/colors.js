import { StyleSheet, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";
import { colors, editor } from "../../utils/styles";
import { storage } from "../../utils/storage";

export default function Colors({ note, setColor }) {

    async function handleColor(color) {
        setColor(color);
        note.color = color;
        await AsyncStorage.setItem(storage.COLOR, color);
    }

    return (
        <View style={[editor.footer, styles.container, { height: "auto" }]}>
            <View style={styles.sizeList}>
                <TouchableOpacity style={styles.item} onPress={() => handleColor("#000")}><View style={[styles.color, { backgroundColor: "#000" }]}>{note.color === "#000" && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => handleColor("#DF216E")}><View style={[styles.color, { backgroundColor: "#DF216E" }]}>{note.color === "#DF216E" && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => handleColor("#C1889B")}><View style={[styles.color, { backgroundColor: "#C1889B" }]}>{note.color === "#C1889B" && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => handleColor("#c2a1cf")}><View style={[styles.color, { backgroundColor: "#c2a1cf" }]}>{note.color === "#c2a1cf" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => handleColor("#9bb6c7")}><View style={[styles.color, { backgroundColor: "#9bb6c7" }]}>{note.color === "#9bb6c7" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => handleColor("#99c9b9")}><View style={[styles.color, { backgroundColor: "#99c9b9" }]}>{note.color === "#99c9b9" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
                <TouchableOpacity style={styles.item} onPress={() => handleColor("goldenrod")}><View style={[styles.color, { backgroundColor: "goldenrod" }]}>{note.color === "goldenrod" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
            </View>
        </View>
    )

}

const styles = StyleSheet.create({
    color: {
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 2,
    },

    tick: {
        position: "absolute",
        width: 48,
        height: 48,
    },

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
    },

    item: {
        textAlign: "center",
        paddingVertical: 6,
        paddingHorizontal: 6,
    },

    sizeList: {
        overflow: "hidden"
    }

})
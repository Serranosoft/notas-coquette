import { StyleSheet, TouchableOpacity, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Image } from "react-native";

export default function Colors({ note, setColor }) {

    async function handleColor(color) {
        setColor(color);
        note.color = color;
        await AsyncStorage.setItem("color", color);
    }

    return (
        <View style={styles.colors}>
            <TouchableOpacity onPress={() => handleColor("#000")}><View style={[styles.color, { backgroundColor: "#000" }]}>{note.color === "#000" && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
            <TouchableOpacity onPress={() => handleColor("#DF216E")}><View style={[styles.color, { backgroundColor: "#DF216E" }]}>{note.color === "#DF216E" && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
            <TouchableOpacity onPress={() => handleColor("#C1889B")}><View style={[styles.color, { backgroundColor: "#C1889B" }]}>{note.color === "#C1889B" && <Image source={require("../../../assets/tick-white.png")} style={styles.tick} />}</View></TouchableOpacity>
            <TouchableOpacity onPress={() => handleColor("#c2a1cf")}><View style={[styles.color, { backgroundColor: "#c2a1cf" }]}>{note.color === "#c2a1cf" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
            <TouchableOpacity onPress={() => handleColor("#9bb6c7")}><View style={[styles.color, { backgroundColor: "#9bb6c7" }]}>{note.color === "#9bb6c7" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
            <TouchableOpacity onPress={() => handleColor("#99c9b9")}><View style={[styles.color, { backgroundColor: "#99c9b9" }]}>{note.color === "#99c9b9" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
            <TouchableOpacity onPress={() => handleColor("goldenrod")}><View style={[styles.color, { backgroundColor: "goldenrod" }]}>{note.color === "goldenrod" && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
        </View>
    )

}

const styles = StyleSheet.create({
    colors: {
        flexDirection: "row",
        gap: 8,
        justifyContent: "center",
        padding: 8
    },

    color: {
        justifyContent: "center",
        alignItems: "center",
        width: 45,
        height: 45,
        borderRadius: 100,
        borderWidth: 2,
    },

    tick: {
        position: "absolute",
        width: 60,
        height: 60,
    }

})
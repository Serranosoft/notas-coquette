import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";
import { useContext } from "react";
import { LangContext } from "../utils/Context";

export default function GridDeleteWrapper({ selected, emptySelected, deleteNotes }) {

    const { language } = useContext(LangContext);

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => emptySelected()}>
                <Image style={styles.littleIcon} source={require("../../assets/cross-dark.png")} />
            </TouchableOpacity>
            <Text style={[ui.h4, { textAlign: "center" }]}>{selected.length} {language.t("_elementsSelected")}</Text>
            <TouchableOpacity onPress={() => deleteNotes()}>
                <Image style={styles.icon} source={require("../../assets/trash-dark.png")} />
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        gap: 8,
        justifyContent: "space-between",
        alignItems: "center",
        position: "absolute",
        bottom: 0,
        width: "100%",
        padding: 24,
        backgroundColor: colors.dark,
        borderTopWidth: 2,
        zIndex: 1,
    },

    littleIcon: {
        width: 15,
        height: 15,
    },
    icon: {
        width: 20,
        height: 20,
    },
})
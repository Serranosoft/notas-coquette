import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor, ui } from "../../utils/styles";
import { redoLabel, separatorsLabel, undoLabel } from "../../utils/labels";
import { Image, StyleSheet, Text, View } from "react-native";
import { SIZES } from "./font-size";

const fontSizeLabel = ({ openFontSize, fontSize }) =>
(
    <View style={[styles.fontSizeLabel, { backgroundColor: openFontSize ? "rgba(255, 255, 255, 0.75)" : "transparent" }]}>
        <Image source={require("../../../assets/font-size.png")} style={{ width: 25, height: 25 }} />
        <Text style={[ui.h4, { color: "#000" }]}>{Object.keys(SIZES).find(key => SIZES[key] === fontSize)}</Text>
    </View>
);

export default function HeaderEditor({ editorRef, setOpenFontSize, setOpenSeparators, openSeparators, openFontSize, fontSize }) {

    return (
        <RichToolbar
            style={[editor.richBar, editor.header, { alignItems: "flex-end" }]}
            flatContainerStyle={{ paddingHorizontal: 12 }}
            editor={editorRef}
            selectedIconTint={"red"}
            actions={[actions.undo, actions.redo, "separator", "fontSize"]}
            iconSize={35}
            iconMap={{ [actions.undo]: undoLabel, [actions.redo]: redoLabel, separator: () => separatorsLabel({ openSeparators }), fontSize: () => fontSizeLabel({ openFontSize, fontSize }) }}
            fontSize={() => setOpenFontSize(!openFontSize)}
            separator={() => setOpenSeparators(!openSeparators)}
        />
    )
}

const styles = StyleSheet.create({

    fontSizeLabel: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 4,
        borderRadius: 8,
        marginLeft: 16
    }
})
import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor } from "../../utils/styles";
import { fontSizeLabel, redoLabel, separatorsLabel, undoLabel } from "../../utils/labels";
import { StyleSheet } from "react-native";


export default function HeaderEditor({ editorRef, setOpenFontSize, setOpenSeparators, openSeparators, openFontSize, fontSize, hide }) {

    return (
        <RichToolbar
            style={[editor.richBar, editor.header, { alignItems: "flex-end", height: hide ? 0 : "auto" }]}
            flatContainerStyle={{ paddingHorizontal: 12 }}
            editor={editorRef}
            selectedIconTint={"red"}
            actions={[actions.undo, actions.redo, "separator", "fontSize"]}
            iconSize={35}
            iconMap={{ [actions.undo]: undoLabel, [actions.redo]: redoLabel, separator: separatorsLabel, fontSize: fontSizeLabel }}
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
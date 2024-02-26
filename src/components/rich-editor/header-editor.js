import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor, ui } from "../../utils/styles";
import { underlineLabel } from "../../utils/labels";
import { Image, Text, View } from "react-native";

export default function HeaderEditor({ editorRef, setOpenFontSize, setOpenEmojis, openEmojis, openFontSize, fontSize }) {

    return (
        <RichToolbar
            style={[editor.richBar, editor.header, { alignItems: "flex-end" }]}
            editor={editorRef}
            selectedIconTint={'#000'}
            disabledIconTint={'#000'}
            actions={[actions.undo, actions.redo, "emoji", "fontSize"]}
            iconMap={{ emoji: underlineLabel, fontSize: () => (<View style={{ flexDirection: "row", alignItems: "center" }}><Image source={require("../../../assets/font-size.png")} style={{ width: 30, height: 30 }} /><Text style={[ui.h4, { color: "#000", marginBottom: 16 }]}>{fontSize}</Text></View>) }}
            iconSize={30}
            fontSize={() => setOpenFontSize(!openFontSize)}
            emoji={() => setOpenEmojis(!openEmojis)}
        />
    )
}
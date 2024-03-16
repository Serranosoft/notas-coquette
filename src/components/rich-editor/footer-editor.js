import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor, ui } from "../../utils/styles";
import { alignCenterLabel, alignLeftLabel, alignRightLabel, boldLabel, italicLabel, listLabel, underlineLabel } from "../../utils/labels";
import { View } from "react-native";
import GridBackground from "../grid";

export default function FooterEditor({ editorRef, hide }) {

    return (
        <View style={{ paddingTop: 23, height: hide ? 0 : "auto" }}>
            {/* <GridBackground /> */}
            <RichToolbar
                style={[editor.richBar, editor.footer, { height: "auto" }]}
                editor={editorRef}
                selectedIconTint={"rgba(255, 255, 255, 0.75)"}
                iconTint={"transparent"}
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.alignLeft, actions.alignCenter, actions.alignRight, actions.insertBulletsList]}
                iconSize={30}
                iconMap={{ [actions.setBold]: boldLabel, [actions.setItalic]: italicLabel, [actions.setUnderline]: underlineLabel, [actions.insertBulletsList]: listLabel, [actions.alignLeft]: alignLeftLabel, [actions.alignCenter]: alignCenterLabel, [actions.alignRight]: alignRightLabel }}
            />
        </View>
    )
}
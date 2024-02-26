import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor, ui } from "../../utils/styles";
import { alignCenterLabel, alignLeftLabel, alignRightLabel, boldLabel, italicLabel, listLabel, underlineLabel } from "../../utils/labels";

export default function FooterEditor({ editorRef }) {

    return (
        <RichToolbar
            style={[editor.richBar, editor.footer]}
            flatContainerStyle={{ paddingHorizontal: 12}}
            editor={editorRef}
            selectedIconTint={"rgba(255, 255, 255, 0.75)"}
            iconTint={"transparent"}
            actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.alignLeft, actions.alignCenter, actions.alignRight, actions.insertBulletsList]}
            iconSize={35}
            iconMap={{ [actions.setBold]: boldLabel, [actions.setItalic]: italicLabel, [actions.setUnderline]: underlineLabel, [actions.insertBulletsList]: listLabel, [actions.alignLeft]: alignLeftLabel, [actions.alignCenter]: alignCenterLabel, [actions.alignRight]: alignRightLabel }}
            
        />
    )
}
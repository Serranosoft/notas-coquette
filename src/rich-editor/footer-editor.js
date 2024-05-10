import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor, padding } from "../utils/styles";
import { alignCenterLabel, alignLeftLabel, alignRightLabel, boldLabel, italicLabel, listLabel, underlineLabel } from "../utils/labels";
import { View } from "react-native";

export default function FooterEditor({ richText, readingMode }) {

    return (
        <View style={{ paddingTop: padding.bigTop, height: readingMode ? 0 : "auto" }}>
            <RichToolbar
                style={[editor.richBar, editor.footer, { height: "auto" }]}
                editor={richText}
                selectedIconTint={"rgba(255, 255, 255, 0.75)"}
                iconTint={"transparent"}
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.alignLeft, actions.alignCenter, actions.alignRight, actions.insertBulletsList]}
                iconSize={30}
                iconMap={{ [actions.setBold]: boldLabel, [actions.setItalic]: italicLabel, [actions.setUnderline]: underlineLabel, [actions.insertBulletsList]: listLabel, [actions.alignLeft]: alignLeftLabel, [actions.alignCenter]: alignCenterLabel, [actions.alignRight]: alignRightLabel }}
            />
        </View>
    )
}
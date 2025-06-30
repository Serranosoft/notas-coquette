import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor, padding } from "../utils/styles";
import { alignCenterLabel, alignLeftLabel, alignRightLabel, boldLabel, colorsLabel, fontSizeLabel, italicLabel, listLabel, separatorsLabel, underlineLabel } from "../utils/labels";
import { View } from "react-native";

export default function FooterEditor({ 
    richText, 
    readingMode, 
    setOpenFontSize, 
    openFontSize, 
    setOpenColors, 
    openColors,
    setOpenSeparators,
    openSeparators
}) {
    return (
        <View style={{ paddingTop: padding.bigTop, height: readingMode ? 0 : "auto" }}>
            <RichToolbar
                style={[editor.richBar, editor.footer, padding.smallHorizontal, { height: "auto" }]}
                editor={richText}
                selectedIconTint={"rgba(255, 255, 255, 0.75)"}
                iconTint={"transparent"}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.alignLeft,
                    actions.alignCenter,
                    actions.alignRight,
                    actions.insertBulletsList,
                    "fontSize",
                    "colors",
                    "separator"
                ]}
                iconSize={30}
                iconMap={{
                    [actions.setBold]: boldLabel,
                    [actions.setItalic]: italicLabel,
                    [actions.setUnderline]: underlineLabel,
                    [actions.alignLeft]: alignLeftLabel,
                    [actions.alignCenter]: alignCenterLabel,
                    [actions.alignRight]: alignRightLabel,
                    [actions.insertBulletsList]: listLabel,
                    fontSize: fontSizeLabel,
                    colors: colorsLabel,
                    separator: separatorsLabel,
                }}
                fontSize={() => setOpenFontSize(!openFontSize)}
                separator={() => setOpenSeparators(!openSeparators)}
                colors={() => setOpenColors(!openColors)}
            />
        </View>
    )
}
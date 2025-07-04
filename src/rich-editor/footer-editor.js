import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor, padding } from "../utils/styles";
import { alignCenterLabel, alignLeftLabel, alignRightLabel, boldLabel, colorsLabel, fontSizeLabel, italicLabel, listLabel, separatorsLabel, stickersLabel, underlineLabel } from "../utils/labels";
import { View } from "react-native";
import { useCallback } from "react";

export default function FooterEditor({
    richText,
    readingMode,
    drawing,
    activeOption,
    setActiveOption
}) {

    const onPressAddImage = useCallback(() => {
        setActiveOption(activeOption === "stickers" ? null : "stickers");
    }, [activeOption]);

    return (

        !drawing.isDrawing &&
        <View style={{ paddingTop: padding.bigTop, height: readingMode ? 0 : "auto" }}>
            <RichToolbar
                style={[editor.richBar, editor.footer, padding.smallHorizontal, { height: "auto" }]}
                editor={richText}
                selectedIconTint={"rgba(255, 255, 255, 0.75)"}
                iconTint={"transparent"}
                onPressAddImage={onPressAddImage}
                actions={[
                    actions.setBold,
                    actions.setItalic,
                    actions.setUnderline,
                    actions.insertImage,
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
                    [actions.insertImage]: stickersLabel,
                    [actions.alignLeft]: alignLeftLabel,
                    [actions.alignCenter]: alignCenterLabel,
                    [actions.alignRight]: alignRightLabel,
                    [actions.insertBulletsList]: listLabel,
                    fontSize: fontSizeLabel,
                    colors: colorsLabel,
                    separator: separatorsLabel,
                }}
                fontSize={() => setActiveOption(activeOption === "fontSize" ? null : "fontSize")}
                separator={() => setActiveOption(activeOption === "separators" ? null : "separators")}
                colors={() => setActiveOption(activeOption === "colors" ? null : "colors")}
            />
        </View>

    )
}
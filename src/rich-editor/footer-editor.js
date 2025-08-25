import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor, padding } from "../utils/styles";
import { alignCenterLabel, alignFullLabel, alignLeftLabel, alignRightLabel, boldLabel, checkboxLabel, codeLabel, colorsLabel, fontSizeLabel, italicLabel, listLabel, separatorsLabel, stickersLabel, strikeThroughLabel, underlineLabel } from "../utils/labels";
import { Image, StyleSheet, View } from "react-native";
import { useCallback } from "react";

export default function FooterEditor({
    richText,
    readingMode,
    drawing,
    activeOption,
    setActiveOption,
    insertCheckbox
}) {

    const onPressAddImage = useCallback(() => {
        setActiveOption(activeOption === "stickers" ? null : "stickers");
    }, [activeOption]);

    return (

        !drawing.isDrawing &&
        <View style={{ paddingTop: padding.bigTop, height: readingMode ? 0 : "auto" }}>
            <View style={{ position: "relative", width: "90%", alignSelf: "center", }}>
                <RichToolbar
                    style={[editor.richBar, editor.footer, padding.bigHorizontal, { height: "auto" }]}
                    editor={richText}
                    selectedIconTint={"rgba(255, 255, 255, 0.75)"}
                    iconTint={"transparent"}
                    onPressAddImage={onPressAddImage}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.setUnderline,
                        actions.setStrikethrough,
                        actions.code,
                        "checkbox",
                        actions.insertImage,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.alignFull,
                        actions.insertBulletsList,
                        "fontSize",
                        "colors",
                        "separator"
                    ]}
                    iconSize={30}
                    iconMap={{
                        [actions.setBold]: boldLabel,
                        [actions.setItalic]: italicLabel,
                        [actions.code]: codeLabel,
                        [actions.setUnderline]: underlineLabel,
                        [actions.setStrikethrough]: strikeThroughLabel,
                        [actions.insertImage]: stickersLabel,
                        [actions.alignLeft]: alignLeftLabel,
                        [actions.alignCenter]: alignCenterLabel,
                        [actions.alignRight]: alignRightLabel,
                        [actions.alignFull]: alignFullLabel,
                        [actions.insertBulletsList]: listLabel,
                        fontSize: fontSizeLabel,
                        colors: colorsLabel,
                        separator: separatorsLabel,
                        checkbox: checkboxLabel,
                    }}
                    fontSize={() => setActiveOption(activeOption === "fontSize" ? null : "fontSize")}
                    separator={() => setActiveOption(activeOption === "separators" ? null : "separators")}
                    colors={() => setActiveOption(activeOption === "colors" ? null : "colors")}
                    checkbox={() => insertCheckbox()}
                />
                
                <View style={[styles.arrow, { left: 0, borderTopLeftRadius: 100, borderBottomLeftRadius: 100 }]}>
                    <Image source={require("../../assets/left.png")} style={{ width: 20, height: 20 }} />
                </View>

                <View style={[styles.arrow, { right: 0, borderTopRightRadius: 100, borderBottomRightRadius: 100 }]}>
                    <Image source={require("../../assets/right.png")} style={{ width: 20, height: 20 }} />
                </View>
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    arrow: {
        position: "absolute",
        zIndex: 9,
        top: 0,
        bottom: 0,
        width: 24,
        height: 48,
        backgroundColor: "rgba(255,255,255,0.5)",
        justifyContent: "center",
        alignItems: "center",
    }
})
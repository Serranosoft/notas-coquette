import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor, padding } from "../utils/styles";
import { alignCenterLabel, alignFullLabel, alignLeftLabel, alignRightLabel, boldLabel, checkboxLabel, codeLabel, colorsLabel, fontSizeLabel, foreColorLabel, hiliteColorLabel, italicLabel, listLabel, orderedListLabel, separatorsLabel, stickersLabel, strikeThroughLabel, underlineLabel } from "../utils/labels";
import { Image, StyleSheet, View } from "react-native";
import Stickers from "./stickers/stickers";
import Colors from "./colors/colors";
import FontSizeContainer from "./font-size/font-size-container";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { useEffect } from "react";

export default function FooterEditor({
    richText,
    readingMode,
    drawing,
    activeOption,
    setActiveOption,
    insertCheckbox,
    setSticker,
    setFontSize,
    fontSize,
    changeColor,
    changeHiliteColor
}) {

    const height = useSharedValue(0);

    function handleOption(option) {
        // No hay nada abierto, abro la opción
        if (!activeOption) {
            setActiveOption(option);
            height.value = withTiming(200, { duration: 300 });
        } else {

            // Si había algo abierto, debo cerrar y luego abrir el siguiente
            if (option && activeOption && activeOption !== option) {
                height.value = withTiming(0, { duration: 500 }, (finished) => {
                    if (finished) {
                        runOnJS(setActiveOption)(option);
                        height.value = withDelay(150, withTiming(200, { duration: 500 }));
                    }
                });
            } else {
                height.value = withTiming(0, { duration: 500 }, (finished) => {
                    if (finished) {
                        runOnJS(setActiveOption)(null);
                    }
                });
    
            }
        }
    }

    const animatedStyle = useAnimatedStyle(() => {
        return {
            height: height.value,
        };
    });

    return (

        !drawing.isDrawing &&
        <View style={{ paddingTop: padding.bigTop, height: readingMode ? 0 : "auto" }}>
            <View style={{ position: "relative", width: "90%", alignSelf: "center", }}>
                <RichToolbar
                    style={[editor.richBar, editor.footer, padding.bigHorizontal, { height: "auto" }]}
                    editor={richText}
                    selectedIconTint={"rgba(255, 255, 255, 0.75)"}
                    iconTint={"transparent"}
                    onPressAddImage={() => handleOption(activeOption === "stickers" ? null : "stickers")}
                    actions={[
                        actions.setBold,
                        actions.setItalic,
                        actions.setUnderline,
                        actions.setStrikethrough,
                        actions.foreColor,
                        actions.code,
                        "checkbox",
                        actions.insertImage,
                        actions.hiliteColor,
                        actions.alignLeft,
                        actions.alignCenter,
                        actions.alignRight,
                        actions.alignFull,
                        actions.insertOrderedList,
                        actions.insertBulletsList,
                        "fontSize",
                        "separator"
                    ]}
                    
                    iconSize={30}
                    iconMap={{
                        [actions.hiliteColor]: () => hiliteColorLabel(activeOption === "hiliteColors" ? true : false),
                        [actions.foreColor]: () => foreColorLabel(activeOption === "colors" ? true : false),
                        [actions.setBold]: boldLabel,
                        [actions.setItalic]: italicLabel,
                        [actions.code]: codeLabel,
                        [actions.setUnderline]: underlineLabel,
                        [actions.setStrikethrough]: strikeThroughLabel,
                        [actions.insertImage]: () => stickersLabel(activeOption === "stickers" ? true : false),
                        [actions.alignLeft]: alignLeftLabel,
                        [actions.alignCenter]: alignCenterLabel,
                        [actions.alignRight]: alignRightLabel,
                        [actions.alignFull]: alignFullLabel,
                        [actions.insertBulletsList]: listLabel,
                        [actions.insertOrderedList]: orderedListLabel,
                        fontSize: () => fontSizeLabel(activeOption === "fontSize" ? true : false),
                        separator: () => separatorsLabel(activeOption === "separators" ? true : false),
                        checkbox: checkboxLabel,
                    }}
                    fontSize={() => handleOption(activeOption === "fontSize" ? null : "fontSize")}
                    separator={() => handleOption(activeOption === "separators" ? null : "separators")}
                    foreColor={() => handleOption(activeOption === "colors" ? null : "colors")}
                    checkbox={() => insertCheckbox()}
                    hiliteColor={() => handleOption(activeOption === "hiliteColors" ? null : "hiliteColors")}
                />

                <View style={[styles.arrow, { left: 0, borderTopLeftRadius: 100, borderBottomLeftRadius: 100, borderTopLeftRadius: 16, borderBottomLeftRadius: 16, }]}>
                    <Image source={require("../../assets/left.png")} style={{ width: 20, height: 20 }} />
                </View>

                <View style={[styles.arrow, { right: 0, borderTopRightRadius: 100, borderBottomRightRadius: 100, borderTopLeftRadius: 16, borderBottomLeftRadius: 16, }]}>
                    <Image source={require("../../assets/right.png")} style={{ width: 20, height: 20 }} />
                </View>
                {
                    !readingMode && 
                        <Animated.View style={[styles.selectedOption, animatedStyle]}>
                            {activeOption === "stickers" &&
                                <Stickers setSticker={setSticker} />
                            }
                            {(activeOption === "colors" || activeOption === "hiliteColors") &&
                                <Colors 
                                    changeColor={changeColor} 
                                    changeHiliteColor={changeHiliteColor}
                                    isHiliteColor={activeOption === "hiliteColors" ? true : false}
                                />
                            }
                            {activeOption === "fontSize" &&
                                <FontSizeContainer setFontSize={setFontSize} fontSize={fontSize} />
                            }
                        </Animated.View>
                }
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    selectedOption: {
        position: "absolute",
        bottom: (20 + 24 + 24),
        right: 32,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        zIndex: 99,
        overflow: "hidden",
    },
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
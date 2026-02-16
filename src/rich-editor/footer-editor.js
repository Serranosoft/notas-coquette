import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor, padding, colors } from "../utils/styles";
import { alignCenterLabel, alignFullLabel, alignLeftLabel, alignRightLabel, boldLabel, checkboxLabel, codeLabel, colorsLabel, fontSizeLabel, foreColorLabel, hiliteColorLabel, italicLabel, listLabel, micLabel, orderedListLabel, removeFormatLabel, separatorsLabel, stickersLabel, strikeThroughLabel, underlineLabel } from "../utils/labels";
import { Image, StyleSheet, View } from "react-native";
import Stickers from "./stickers/stickers";
import Colors from "./colors/colors";
import FontSizeContainer from "./font-size/font-size-container";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withDelay, withTiming } from "react-native-reanimated";
import { LinearGradient } from 'expo-linear-gradient';
import { Svg, Path } from "react-native-svg";
import AudioRecorder from "../components/audio-recorder";

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
    changeHiliteColor,
    onStopRecording
}) {

    const height = useSharedValue(0);

    function handleOption(option) {
        // Recording is handled separately (not in the animated container)
        if (option === "recording") {
            if (activeOption === "recording") {
                setActiveOption(null);
            } else {
                // Close any open panel first
                if (activeOption) {
                    height.value = withTiming(0, { duration: 300 });
                }
                setActiveOption("recording");
            }
            return;
        }

        // No hay nada abierto, abro la opción
        if (!activeOption || activeOption === "recording") {
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
                    style={[editor.richBar, editor.footer, padding.bigHorizontal, { height: "auto", backgroundColor: 'rgba(250, 204, 214, 0.85)', marginBottom: 0, shadowOpacity: 0, elevation: 0 }]}
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
                        "audio",
                        actions.hiliteColor,
                        actions.removeFormat,
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
                        [actions.removeFormat]: removeFormatLabel,
                        [actions.hiliteColor]: () => hiliteColorLabel(activeOption === "hiliteColors" ? true : false),
                        [actions.foreColor]: () => foreColorLabel(activeOption === "colors" ? true : false),
                        [actions.setBold]: boldLabel,
                        [actions.setItalic]: italicLabel,
                        [actions.code]: codeLabel,
                        [actions.setUnderline]: underlineLabel,
                        [actions.setStrikethrough]: strikeThroughLabel,
                        [actions.insertImage]: () => stickersLabel(activeOption === "stickers" ? true : false),
                        audio: micLabel,
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
                    audio={() => handleOption(activeOption === "recording" ? null : "recording")}
                    hiliteColor={() => handleOption(activeOption === "hiliteColors" ? null : "hiliteColors")}
                />

                <LinearGradient
                    colors={['rgba(250, 204, 214, 0.85)', 'rgba(250, 204, 214, 0)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.arrow, { left: 0, borderTopLeftRadius: 100, borderBottomLeftRadius: 100 }]}
                    pointerEvents="none"
                >
                    <Svg width={24} height={24} viewBox="0 0 24 24">
                        <Path d="M15.41 7.41L14 6l-6 6 6 6 1.41-1.41L10.83 12z" fill={colors.button} />
                    </Svg>
                </LinearGradient>

                <LinearGradient
                    colors={['rgba(250, 204, 214, 0)', 'rgba(250, 204, 214, 0.85)']}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={[styles.arrow, { right: 0, borderTopRightRadius: 100, borderBottomRightRadius: 100 }]}
                    pointerEvents="none"
                >
                    <Svg width={24} height={24} viewBox="0 0 24 24">
                        <Path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z" fill={colors.button} />
                    </Svg>
                </LinearGradient>

                {/* Animated panel for stickers, colors, fontSize */}
                <Animated.View
                    style={
                        [
                            styles.selectedOption,
                            animatedStyle,
                            readingMode && { display: "none", pointerEvents: "none" }
                        ]
                    }>
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

                {/* Recording Island - rendered OUTSIDE the animated container */}
                {activeOption === "recording" &&
                    <View style={styles.recordingIsland}>
                        <AudioRecorder
                            onStop={(uri) => {
                                onStopRecording(uri);
                                setActiveOption(null);
                            }}
                            onClose={() => setActiveOption(null)}
                        />
                    </View>
                }

            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    selectedOption: {
        position: "absolute",
        bottom: "100%",
        right: 32,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        zIndex: 9999,
        overflow: "hidden",
    },
    recordingIsland: {
        position: "absolute",
        bottom: "100%",
        left: 0,
        right: 0,
        zIndex: 9999,
    },
    arrow: {
        position: "absolute",
        zIndex: 9,
        top: 0,
        bottom: 0,
        width: 32,
        justifyContent: "center",
        alignItems: "center",
    }
})
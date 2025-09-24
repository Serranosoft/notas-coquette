import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { components, header, layout, ui } from "../utils/styles";
import HeaderNoteOptionsContainer from "./header-note-options-container";
import { useContext } from "react";
import { LangContext } from "../utils/Context";
import HeaderLeftEditor from "../rich-editor/header-left-editor";
import { pauseVoiceLabel, startVoiceLabel } from "../utils/labels";
import Tooltip from 'react-native-walkthrough-tooltip';

export default function HeaderNote({
    note,
    richText,
    readingMode,
    setReadingMode,
    drawing,
    setDrawing,
    activeOption,
    setActiveOption,
    showOnboarding,
    setShowOnboarding,
    handleNotePlaying,
    playing,
    noteSavedId,
    setIsReady,
    back
}) {

    const { language } = useContext(LangContext);

    const toggleDrawing = () => {
        setDrawing(prev => ({ ...prev, isDrawing: !prev.isDrawing }));
        setActiveOption(activeOption === "drawing" ? null : "drawing");
    };

    const Title = () => (
        <View style={layout.title}>
            <Pressable onPress={back}>
                <Image style={header.img} source={require("../../assets/back.png")} />
            </Pressable>
            <Text style={[ui.h5, { color: "#000" }]}>
                {note && note.content ? language.t("_headerNoteTitleEdit") : language.t("_headerNoteTitleNew")}
            </Text>
        </View>
    );

    const DrawingToggle = () => (
        !readingMode && (
            <TouchableOpacity
                style={{
                    backgroundColor: drawing.isDrawing ? "#fff" : "transparent",
                    borderRadius: 8,
                }}
                onPress={toggleDrawing}
            >
                <Image style={header.img} source={require("../../assets/highlighter.png")} />
            </TouchableOpacity>
        )
    );

    const VoiceIcon = () => (
        <Tooltip
            isVisible={showOnboarding}
            placement="bottom"
            onClose={() => setShowOnboarding()}
            content={
                <View style={styles.tooltip}>
                    <Text style={[ui.h5, ui.black]}>{language.t("_tooltipVoiceTitle")}</Text>
                    <Text style={[ui.text, ui.black]}>{language.t("_tooltipVoiceText1")}</Text>
                    <Text style={[ui.text, ui.black]}>{language.t("_tooltipVoiceText2")}</Text>
                </View>
            }
        >
            <TouchableOpacity onPress={handleNotePlaying}>
                {playing ? pauseVoiceLabel() : startVoiceLabel()}
            </TouchableOpacity>
        </Tooltip>
    );



    return (
        <View style={components.header}>
            <Title />

            <View style={components.row}>
                {richText.current && !drawing.isDrawing && (
                    <HeaderLeftEditor {...{ richText, readingMode }} />
                )}
                <DrawingToggle />
                <VoiceIcon />
                <HeaderNoteOptionsContainer
                    {...{ note, setReadingMode, readingMode, noteSavedId, setIsReady }}
                />
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    tooltip: {
        maxWidth: 200,
        gap: 16,
        padding: 8,
        textAlign: "center"
    }
})
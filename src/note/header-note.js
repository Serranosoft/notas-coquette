import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { components, header, layout, ui } from "../utils/styles";
import HeaderNoteOptionsContainer from "./header-note-options-container";
import { useContext } from "react";
import { LangContext } from "../utils/Context";
import HeaderLeftEditor from "../rich-editor/header-left-editor";
import { pauseVoiceLabel, startVoiceLabel } from "../utils/labels";
export default function HeaderNote({ drawing, setDrawing, note, back, setReadingMode, readingMode, noteSavedId, richText, activeOption, setActiveOption, setIsReady, handleNotePlaying, playing }) {

    const { language } = useContext(LangContext);

    return (
        <View style={components.header}>
            <View style={layout.title}>
                <Pressable onPress={back}>
                    <Image style={header.img} source={require("../../assets/back.png")} />
                </Pressable>
                <Text style={[ui.h5, { color: "#000" }]}>{note && note.content ? language.t("_headerNoteTitleEdit") : language.t("_headerNoteTitleNew")}</Text>
            </View>

            <View style={components.row}>
                { richText.current && !drawing.isDrawing && <HeaderLeftEditor {...{ richText, readingMode }} /> }
                {
                    !readingMode && 
                        <TouchableOpacity style={{ paddingRight: 4, backgroundColor: drawing.isDrawing ? "#fff" : "transparent", borderRadius: 8 }} onPress={() => {
                            setDrawing({ ...drawing, isDrawing: !drawing.isDrawing });
                            setActiveOption(activeOption === "drawing" ? null : "drawing");
                        } }>
                            <Image style={[header.img]} source={require("../../assets/highlighter.png")}></Image>
                        </TouchableOpacity>
                }
                <TouchableOpacity style={{ paddingLeft: 4 }} onPress={handleNotePlaying}>
                    { playing ? pauseVoiceLabel() : startVoiceLabel() }
                </TouchableOpacity>
                <HeaderNoteOptionsContainer {...{ note, setReadingMode, readingMode, noteSavedId, setIsReady }} />
            </View>

        </View>
    )
}
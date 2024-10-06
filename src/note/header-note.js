import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { components, header, layout, ui } from "../utils/styles";
import HeaderNoteOptionsContainer from "./header-note-options-container";
import { useContext } from "react";
import { LangContext } from "../utils/Context";

export default function HeaderNote({ note, saveNote, back, setReadingMode, readingMode, noteSavedId }) {

    const { language } = useContext(LangContext);
    
    return (
        <View style={components.header}>
            <View style={layout.title}>
                <Pressable onPress={back}>
                    <Image style={header.img} source={require("../../assets/back.png")} />
                </Pressable>
                <Text style={[ui.h4, { color: "#000" }]}>{note.content ? language.t("_headerNoteTitleEdit") : language.t("_headerNoteTitleNew")}</Text>
            </View>

            <View style={components.row}>
                <TouchableOpacity onPress={saveNote}>
                    <Image style={header.img} source={require("../../assets/save.png")}></Image>
                </TouchableOpacity>
                <HeaderNoteOptionsContainer {...{ note, setReadingMode, readingMode, noteSavedId }} />
            </View>

        </View>
    )
}
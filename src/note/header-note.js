import { Image, Pressable, Text, TouchableOpacity, View } from "react-native";
import { components, header, layout, ui } from "../utils/styles";
import HeaderNoteOptionsContainer from "./header-note-options-container";

export default function HeaderNote({ note, saveNote, back, setReadingMode, readingMode, noteSavedId }) {

    return (
        <View style={components.header}>
            <View style={layout.title}>
                <Pressable onPress={back}>
                    <Image style={header.img} source={require("../../assets/back.png")} />
                </Pressable>
                <Text style={[ui.h4, { color: "#000" }]}>{note.content ? "Editar nota" : "Añadir nota"}</Text>
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
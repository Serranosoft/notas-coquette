import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { layout, ui } from "../../utils/styles";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import HeaderNoteOptions from "../header-note-options";

export default function HeaderNote({ note, content, richEditorRef, setReadingMode, readingMode, autoSave }) {

    const router = useRouter();
    const [hasSaved, setHasSaved] = useState(false); // Flag para saber si ya ha guardado alguna vez una nota para editarla o no

    // Al pulsar hacia atrás, debe guardarse en el asyncStorage
    async function saveNote() {

        if (content.length > 0) {

            let notes = await AsyncStorage.getItem("notes") || [];
            if (notes.length > 0) {
                notes = JSON.parse(notes);
            }

            const isEdit = note.content || hasSaved;

            if (isEdit) {
                const id = note.id ? note.id : notes.find(oldNote => oldNote.content == content).id;
                editNote(notes, id);
            } else {
                newNote(notes);
            }

            const jsonValue = JSON.stringify(notes);
            await AsyncStorage.setItem("notes", jsonValue);
        }
    }

    async function newNote(notes) {
        const newNote = {
            id: uuid.v4(),
            folder: "todos",
            content: content,
            date: new Date().toLocaleDateString(),
        }

        notes.push(newNote);
    }

    function editNote(notes, id) {
        notes.find((oldNote) => oldNote.id === id).content = content;
    }

    async function back() {
        if (autoSave) {
            await saveNote();
        }
        router.back();
    }

    async function save() {
        richEditorRef.current.dismissKeyboard();
        setHasSaved(true);
        await saveNote();
        ToastAndroid.showWithGravityAndOffset("Nota guardada", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }

    return (
        <View style={layout.header}>
            <View style={layout.title}>
                <Pressable onPress={back}>
                    <Image style={styles.img} source={require("../../../assets/back.png")} />
                </Pressable>
                <Text style={[ui.h4, { color: "#000" }]}>{note.content ? "Editar nota" : "Añadir nota"}</Text>
            </View>

            <View style={styles.row}>
                <TouchableOpacity onPress={save}>
                    <Image style={styles.img} source={require("../../../assets/save.png")}></Image>
                </TouchableOpacity>
                <HeaderNoteOptions setReadingMode={setReadingMode} readingMode={readingMode} />
            </View>

        </View>
    )
}

const styles = StyleSheet.create({

    img: {
        width: 30,
        height: 30,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    }
})
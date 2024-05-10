import { useRouter } from "expo-router";
import { ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import HeaderNote from "./header-note";
import useBackHandler from "../components/use-back-handler";

export default function HeaderNoteContainer({ note, content, richText, setReadingMode, readingMode, autoSave }) {

    const router = useRouter();
    const [noteSavedId, setNoteSavedId] = useState(null);

    useEffect(() => {
        setNoteSavedId(note.id)
    }, [note])

    // Al pulsar hacia atrás, debe guardarse en el asyncStorage
    async function saveNote() {

        if (content.length > 0) {

            let notes = await AsyncStorage.getItem("notes") || [];
            if (notes.length > 0) {
                notes = JSON.parse(notes);
            }

            const isEdit = noteSavedId;

            if (isEdit) {
                editNote(notes, noteSavedId);
            } else {
                newNote(notes);
            }

            const jsonValue = JSON.stringify(notes);
            await AsyncStorage.setItem("notes", jsonValue);
        }
    }

    async function newNote(notes) {
        const id = uuid.v4();
        setNoteSavedId(id);

        const newNote = {
            id: id,
            content: content,
            date: new Date().getTime(),
        }

        notes.push(newNote);
    }

    function editNote(notes, id) {
        const noteEdited = notes.find((oldNote) => oldNote.id === id)
        noteEdited.content = content;
        noteEdited.date = new Date();
    }

    async function back() {
        if (autoSave) {
            await saveNote();
        }
        router.back();
    }

    async function save() {
        richText.current.dismissKeyboard();
        await saveNote();
        ToastAndroid.showWithGravityAndOffset("Nota guardada", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }

    useBackHandler(() => back());

    return (
        <HeaderNote {...{ note, save, back, setReadingMode, readingMode, noteSavedId}} />
    )
}
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import HeaderNoteOptions from "./header-note-options";

export default function HeaderNoteOptionsContainer({ setReadingMode, readingMode, noteSavedId, lock }) {

    const [visible, setVisible] = useState(false);

    const showMenu = () => setVisible(true);
    const hideMenu = () => setVisible(false);

    function updateReadingMode() {
        setReadingMode(!readingMode);
        hideMenu();
    }

    async function remove() {
        let notes = await AsyncStorage.getItem("notes") || [];
        if (notes.length > 0) {
            notes = JSON.parse(notes);
        }

        const newNotes = notes.filter((note) => note.id !== noteSavedId);
        await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
        router.push("/");
    }

    return (
        <HeaderNoteOptions {...{ showMenu, updateReadingMode, readingMode, visible, hideMenu, remove, lock }}/>
    )
}


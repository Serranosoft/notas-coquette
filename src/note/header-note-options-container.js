import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import HeaderNoteOptions from "./header-note-options";
import LockScreenModal from "../modals/lock-screen-modal";

export default function HeaderNoteOptionsContainer({ note, setReadingMode, readingMode, noteSavedId }) {

    // Estados para abrir el menu
    const [menuVisible, setMenuVisible] = useState(false);
    const showMenu = () => setMenuVisible(true);
    const hideMenu = () => setMenuVisible(false);

    // Estados para abrir el modal de bloquear nota
    const [lockModal, setLockModal] = useState(false);
    const showLockModal = () => setLockModal(true);
    const [pwd, setPwd] = useState("");


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
        <>
            <HeaderNoteOptions {...{ note, showMenu, updateReadingMode, readingMode, menuVisible, hideMenu, remove, showLockModal }} />
            <LockScreenModal {...{ note, isUnlock: false, lockModal, setLockModal, pwd, setPwd }} />
        </>
    )
}


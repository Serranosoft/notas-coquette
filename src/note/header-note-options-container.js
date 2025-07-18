import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import HeaderNoteOptions from "./header-note-options";
import LockScreenModal from "../modals/lock-screen-modal";
import { storage } from "../utils/storage";
import { deleteNoteFromId } from "../utils/sqlite";

export default function HeaderNoteOptionsContainer({ note, setReadingMode, readingMode, noteSavedId }) {

    // Estados para abrir el menu
    const [menuVisible, setMenuVisible] = useState(false);
    const showMenu = () => setMenuVisible(true);
    const hideMenu = () => setMenuVisible(false);

    // Estados para abrir el modal de bloquear nota
    const [lockModal, setLockModal] = useState(false);
    const [pwd, setPwd] = useState("");

    const [noteLocked, setNoteLocked] = useState(false);

    function showLockModal() {
        setLockModal(true);
        hideMenu();
    }
    function updateReadingMode() {
        setReadingMode(!readingMode);
        hideMenu();
    }

    function unlock() {
        note.pwd = "";
        setPwd("");
        setMenuVisible(false);
        setNoteLocked(false);
        hideMenu();
    }
    
    async function remove() {
        await deleteNoteFromId(note.id);
        router.push("/");
        hideMenu();
    }


    useEffect(() => {
        if (note && note.hasOwnProperty("pwd") && note.pwd && note.pwd.length > 0) {
            setNoteLocked(true);
            setPwd(note.pwd);
        } else {
            setNoteLocked(false);
        }
        setMenuVisible(false);
    }, [note])

    useEffect(() => {
        if (pwd.length === 4) {
            setNoteLocked(true);
            setMenuVisible(false);
        }
    }, [pwd])

    return (
        <>
            <HeaderNoteOptions {...{ note, showMenu, updateReadingMode, readingMode, menuVisible, hideMenu, remove, showLockModal, unlock, noteLocked }} />
            <LockScreenModal {...{ note, isUnlock: false, lockModal, setLockModal, pwd, setPwd }} />
        </>
    )
}


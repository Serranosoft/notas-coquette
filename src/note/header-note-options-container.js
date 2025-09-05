import { router } from "expo-router";
import { useEffect, useState } from "react";
import HeaderNoteOptions from "./header-note-options";
import LockScreenModal from "../modals/lock-screen-modal";
import { deleteNoteFromId } from "../utils/sqlite";

export default function HeaderNoteOptionsContainer({ note, setReadingMode, readingMode, noteSavedId, setIsReady }) {

    // Estados para abrir el menu
    const [menuVisible, setMenuVisible] = useState(false);
    const showMenu = () => setMenuVisible(true);
    const hideMenu = () => setMenuVisible(false);

    // Estados para abrir el modal de bloquear nota
    const [lockModal, setLockModal] = useState(false);
    const [pwd, setPwd] = useState("");
    const [noteLocked, setNoteLocked] = useState(false);

    // Estado para conocer si una nota se encuentra en favoritos
    const [isFavorite, setIsFavorite] = useState(null);

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

    async function handleFavorite() {
        hideMenu();
        setIsFavorite(!isFavorite);
    }

    useEffect(() => {
        if (isFavorite !== null) {
            note.favorite = isFavorite;
        }

    }, [isFavorite])


    useEffect(() => {
        if (note) {
            if (note.hasOwnProperty("pwd") && note.pwd && note.pwd.length > 0) {
                setNoteLocked(true);
                setPwd(note.pwd);
            }

            if (note.favorite) {
                setIsFavorite(true);
            }
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
            <HeaderNoteOptions {...{ isFavorite, showMenu, updateReadingMode, readingMode, menuVisible, hideMenu, remove, showLockModal, unlock, noteLocked, handleFavorite, setIsReady }} />
            <LockScreenModal {...{ note, isUnlock: false, lockModal, setLockModal, pwd, setPwd }} />
        </>
    )
}


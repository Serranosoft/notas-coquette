import { useRouter } from "expo-router";
import { ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import HeaderNote from "./header-note";
import useBackHandler from "../components/use-back-handler";
import { save } from "../utils/storage";
import LockScreenModal from "../modals/lock-screen-modal";

export default function HeaderNoteContainer({ note, content, richText, setReadingMode, readingMode, autoSave }) {

    const router = useRouter();
    const [noteSavedId, setNoteSavedId] = useState(null);
    const [lockModal, setLockModal] = useState(false);
    const [pwd, setPwd] = useState("");

    useEffect(() => {
        setNoteSavedId(note.id)
    }, [note])

    async function back() {
        if (autoSave) {
            saveNote();
        }
        router.back();
    }

    async function saveNote() {
        richText.current.dismissKeyboard();
        await save({ ...{ content, pwd, setNoteSavedId, noteSavedId } });
        onSave();
    }

    async function onSave() {
        ToastAndroid.showWithGravityAndOffset("Nota guardada", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }

    function lock() {
        setLockModal(true);
    }

    useBackHandler(() => back());

    return (
        <>
            <HeaderNote {...{ note, saveNote, back, setReadingMode, readingMode, noteSavedId, lock }} />
            <LockScreenModal {...{ note, isUnlock: false, saveNote, lockModal, setLockModal, pwd, setPwd }} />

        </>
    )
}
import { useRouter } from "expo-router";
import { ToastAndroid } from "react-native";
import { useEffect, useState } from "react";
import HeaderNote from "./header-note";
import useBackHandler from "../components/use-back-handler";
import { save } from "../utils/storage";

export default function HeaderNoteContainer({ note, richText, setReadingMode, readingMode, autoSave, updatePwd }) {

    const router = useRouter();
    const [noteSavedId, setNoteSavedId] = useState(null);

    useEffect(() => {
        setNoteSavedId(note.id)
    }, [note])
    
    useBackHandler(() => back());
    
    async function back() {
        if (autoSave) {
            await saveNote();
        }
        router.back();
    }

    async function saveNote() {
        richText.current.dismissKeyboard();
        await save({ ...{ note, noteSavedId, setNoteSavedId } });
        onSave();
    }

    async function onSave() {
        ToastAndroid.showWithGravityAndOffset("Nota guardada", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }

    return (
        <HeaderNote {...{ note, saveNote, back, setReadingMode, readingMode, noteSavedId, updatePwd }} />
    )
}
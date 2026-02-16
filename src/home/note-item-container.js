import NoteItem from "./note-item";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { router } from "expo-router";
import LockScreenModal from "../modals/lock-screen-modal";
import { AdsContext } from "../utils/Context";

function NoteItemContainer({ note, selected, setSelected }) {

    const [unlocked, setUnlocked] = useState(null);
    const [lockModal, setLockModal] = useState(false);
    const [pwd, setPwd] = useState("");
    const { setAdTrigger } = useContext(AdsContext);

    const isSelected = selected.includes(note.id);

    const highlight = useCallback(() => {
        setSelected((currentSelected) => {
            if (currentSelected.includes(note.id)) {
                return currentSelected.filter(item => item !== note.id);
            } else {
                return [...currentSelected, note.id];
            }
        });
    }, [note.id, setSelected]);

    const onPress = useCallback(() => {
        if (selected.length > 0) {
            // Hace highlight o unhighlight, depende.
            highlight();
        } else {
            // Accede a la nota.
            if (note.hasOwnProperty("pwd") && note.pwd && note.pwd.length > 0) {
                setLockModal(true);
            } else {
                router.push({ pathname: "/note", params: { id: note.id } });
            }
        }

        setAdTrigger((adTrigger) => adTrigger + 1);
    }, [selected.length, note, highlight, setAdTrigger]);

    useEffect(() => {
        if (unlocked === true) {
            router.push({ pathname: "/note", params: { id: note.id } });
            onPush();
        }
        setPwd("");
    }, [unlocked, note.id])

    function onPush() {
        setLockModal(false);
        setUnlocked(null);
    }

    return (
        <>
            <LockScreenModal {...{ isUnlock: true, note, lockModal, setLockModal, setUnlocked, unlocked, pwd, setPwd }} />
            <NoteItem {...{ note, isSelected, onPress, onLongPress: highlight, isTemplate: false }} />
        </>
    )
}

export default memo(NoteItemContainer);
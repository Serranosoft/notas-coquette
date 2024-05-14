import NoteItem from "./note-item";
import React, { useEffect, useState } from "react";
import { router } from "expo-router";
import LockScreenModal from "../modals/lock-screen-modal";

export default function NoteItemContainer({ note, selected, setSelected }) {

    const [unlocked, setUnlocked] = useState(null);
    const [lockModal, setLockModal] = useState(false);
    const [pwd, setPwd] = useState("");

    function highlight() {
        if (selected.includes(note.id)) {
            const updatedSelected = selected.filter(item => item !== note.id);
            setSelected(updatedSelected);
        } else {
            setSelected((selected) => [...selected, note.id]);
        }
    }
    function onPress() {
        if (selected.length > 0) {
            // Hace highlight o unhighlight, depende.
            highlight();
        } else {
            // Accede a la nota.
            if (note.hasOwnProperty("pwd") && note.pwd.length > 0) {
                setLockModal(true);
            } else {
                router.push({ pathname: "/note", params: note });
            }
        }
    }

    useEffect(() => {
        if (unlocked === true) {
            router.push({ pathname: "/note", params: note });
            onPush();
        }
        setPwd("");
    }, [unlocked])

    function onPush() {
        setLockModal(false);
        setUnlocked(null);
    }

    return (
        <>
            <LockScreenModal {...{ isUnlock: true, note, lockModal, setLockModal, setUnlocked, unlocked, pwd, setPwd }}/>
            <NoteItem {...{ note, selected, onPress, highlight }} />
        </>
    )
}
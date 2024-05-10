import NoteItem from "./note-item";
import React from "react";
import { router } from "expo-router";

export default function NoteItemContainer({ note, selected, setSelected }) {

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
            router.push({ pathname: "/note", params: note });
        }
    }

    return <NoteItem {...{note, selected, onPress, highlight}} />
}
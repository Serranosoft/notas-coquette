import { useEffect, useState } from "react";
import HeaderNote from "./header-note";

export default function HeaderNoteContainer({ note, setReadingMode, readingMode, updatePwd, saveNote, back, noteSavedId }) {

    return (
        <HeaderNote {...{ note, saveNote, back, setReadingMode, readingMode, noteSavedId, updatePwd }} />
    )
}
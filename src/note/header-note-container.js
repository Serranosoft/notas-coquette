import HeaderNote from "./header-note";

export default function HeaderNoteContainer({ drawing, setDrawing, note, setReadingMode, readingMode, updatePwd, saveNote, back, noteSavedId, richText, activeOption, setActiveOption, setIsReady }) {

    return (
        <HeaderNote {...{ drawing, setDrawing, note, saveNote, back, setReadingMode, readingMode, noteSavedId, updatePwd, richText, activeOption, setActiveOption, setIsReady }} />
    )
}
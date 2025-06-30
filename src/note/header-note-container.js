import HeaderNote from "./header-note";

export default function HeaderNoteContainer({ isDrawing, setIsDrawing, note, setReadingMode, readingMode, updatePwd, saveNote, back, noteSavedId, richText }) {

    return (
        <HeaderNote {...{ isDrawing, setIsDrawing, note, saveNote, back, setReadingMode, readingMode, noteSavedId, updatePwd, richText }} />
    )
}
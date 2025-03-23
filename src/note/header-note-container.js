import HeaderNote from "./header-note";

export default function HeaderNoteContainer({ note, setReadingMode, readingMode, updatePwd, saveNote, back, noteSavedId, richText }) {

    return (
        <HeaderNote {...{ note, saveNote, back, setReadingMode, readingMode, noteSavedId, updatePwd, richText }} />
    )
}
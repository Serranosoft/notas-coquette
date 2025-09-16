import { addNote, editNote, getNoteFromId } from "./sqlite";

export const storage = {
    NOTES: "notes",
    LANGUAGE: "language",
    GRID: "grid",
    FONT: "font",
    AUTOSAVE: "autosave",
    FIRST_LAUNCH_APP: "FIRST_LAUNCH_APP",
    MIGRATED: "migration",
    LINE_SPACING: "line_spacing",
    LETTER_SPACING: "letter_spacing",
    WORD_SPACING: "word_spacing",
    VOICE: "voice",
}

export async function save({ note, noteSavedId, hasDraws }) {
    if (note.content.length > 0 || hasDraws) {
        const oldNote = await getNoteFromId(noteSavedId);
        // Si existe una oldNote, debo saber si debo actualizarla o no.
        if (oldNote) {
            let differences = 0;

            if (oldNote.content !== note.content) {
                differences++;
            }
            if (note.hasOwnProperty("pwd") && oldNote.pwd !== note.pwd) {
                differences++;
            }
            
            if (note.hasOwnProperty("favorite") && oldNote.favorite !== note.favorite) {
                differences++;
            }
            if (differences > 0) {
                editNote(note.id, note.content, note.pwd, note.favorite, note.date)
            } else {
                return false;
            }
        } else {
            addNote(note.id, note.content, note.pwd, note.date);
        }

        return true;
    }
    return false;
}
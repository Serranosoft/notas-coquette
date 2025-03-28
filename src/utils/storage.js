import AsyncStorage from "@react-native-async-storage/async-storage";


export const storage = {
    NOTES: "notes",
    LANGUAGE: "language",
    GRID: "grid",
    FONT: "font",
    AUTOSAVE: "autosave",
    FIRST_LAUNCH_APP: "FIRST_LAUNCH_APP",
    COLOR: "color",
}



export async function save({ note, noteSavedId }) {
    if (note.content.length > 0) {
        let notes = await AsyncStorage.getItem(storage.NOTES) || [];
        if (notes.length > 0) {
            notes = JSON.parse(notes);
        }
    
        const oldNote = notes.find((oldNote) => oldNote.id === noteSavedId);

        // Si existe una oldNote, debo saber si debo actualizarla o no.
        if (oldNote) {
            let differences = 0;

            if (oldNote.content !== note.content) {
                differences++;
            }
            if (oldNote.hasOwnProperty("pwd") && note.hasOwnProperty("pwd") && oldNote.pwd !== note.pwd) {
                differences++;
            }
            if (oldNote.hasOwnProperty("color") && note.hasOwnProperty("color") && oldNote.color !== note.color) {
                differences++;
            }

            if (differences > 0) {
                oldNote.content = note.content;
                oldNote.date = new Date().getTime();
                oldNote.pwd = note.pwd;
                oldNote.color = note.color;
            } else {
                return false;
            }
        } else {
            notes.push(note);
        }

        const jsonValue = JSON.stringify(notes);
        await AsyncStorage.setItem(storage.NOTES, jsonValue);

        return true;
    }
    return false;
}
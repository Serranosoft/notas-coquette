import AsyncStorage from "@react-native-async-storage/async-storage";

export async function save({ note, noteSavedId }) {
    if (note.content.length > 0) {
        let notes = await AsyncStorage.getItem("notes") || [];
        if (notes.length > 0) {
            notes = JSON.parse(notes);
        }
    
        const oldNote = notes.find((oldNote) => oldNote.id === noteSavedId);
        if (oldNote) {
            oldNote.content = note.content;
            oldNote.date = new Date().getTime();
            if (note.pwd) {
                oldNote.pwd = note.pwd;
            }
        } else {
            notes.push(note);
        }
    
        const jsonValue = JSON.stringify(notes);
        await AsyncStorage.setItem("notes", jsonValue);
    }
}
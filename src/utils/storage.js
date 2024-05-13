import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

export async function save({ content, pwd, setNoteSavedId, noteSavedId }) {

    if (content.length > 0) {

        let notes = await AsyncStorage.getItem("notes") || [];
        if (notes.length > 0) {
            notes = JSON.parse(notes);
        }

        const isEdit = noteSavedId;

        if (isEdit) {
            const note = notes.find((oldNote) => oldNote.id === noteSavedId)
            edit({note, content, date: new Date().getTime(), pwd});
        } else {
            create({notes, content, date: new Date().getTime(), pwd, setNoteSavedId});
        }

        const jsonValue = JSON.stringify(notes);
        await AsyncStorage.setItem("notes", jsonValue);
    }
}

function edit({ note, content, date, pwd }) {
    note.content = content;
    note.date = date;
    console.log("edit");
    console.log("old pwd: "+note.pwd);
    console.log("new pwd", +pwd);
    if (pwd) {
        note.pwd = pwd;
    }
}

async function create({ notes, content, date, pwd, setNoteSavedId }) {
    const id = uuid.v4();
    setNoteSavedId(id);

    const newNote = {
        id: id,
        content: content,
        date: date,
    }

    if (pwd) {
        newNote.pwd = pwd;
    }

    notes.push(newNote);
}
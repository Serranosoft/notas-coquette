import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';

const db = SQLite.openDatabaseSync("notas-coquette");
export async function initDb() {
    await db.execAsync('PRAGMA foreign_keys = ON');
    await db.execAsync(`
        DROP TABLE IF NOT EXISTS drawings;
        CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY NOT NULL, content TEXT, pwd TEXT, color TEXT, date TEXT);
        CREATE TABLE IF NOT EXISTS drawings (id TEXT PRIMARY KEY NOT NULL, note_id TEXT, data TEXT);
    `);
}

export async function getAllNotes() {
    const allRows = await db.getAllAsync('SELECT * FROM notes');
    return allRows;
}

export async function addNote(id, content, pwd, color, date) {
    db.runAsync("INSERT INTO notes (id, content, pwd, color, date) VALUES (?, ?, ?, ?, ?)", id, content, pwd, color, date);
    return id;
}
export async function editNote(id, content, pwd, color, date) {
    db.runAsync("UPDATE notes SET content = ? WHERE id = ?", content, id);
    db.runAsync("UPDATE notes SET pwd = ? WHERE id = ?", pwd, id);
    db.runAsync("UPDATE notes SET color = ? WHERE id = ?", color, id);
    db.runAsync("UPDATE notes SET date = ? WHERE id = ?", date, id);
}

export async function deleteNoteFromId(id) {
    db.runAsync("DELETE FROM notes WHERE id = ?", id);
}

export async function deleteAllNotes() {
    const notes = await getAllNotes();
    notes.forEach(async (note) => await deleteNoteFromId(note.id));
}

export async function getNoteFromId(id) {
    const x = await db.getFirstAsync('SELECT * FROM notes WHERE id = ?', id);
    return x;
}

export async function addDraw(note_id, data) {
    const id = uuid.v4();
    db.runAsync("INSERT INTO drawings (id, note_id, data) VALUES (?, ?, ?)", id, note_id, data);
    return id;
}

export async function getDrawingsFromId(note_id) {
    const x = await db.getAllAsync('SELECT data FROM drawings WHERE note_id = ?', note_id);
    return x;
}
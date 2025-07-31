import * as SQLite from 'expo-sqlite';
import uuid from 'react-native-uuid';

const db = SQLite.openDatabaseSync("notas-coquette");
export async function initDb() {
    await db.execAsync('PRAGMA foreign_keys = ON');
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS notes (id TEXT PRIMARY KEY NOT NULL, content TEXT, pwd TEXT, color TEXT, date TEXT);
        CREATE TABLE IF NOT EXISTS drawings (id TEXT PRIMARY KEY NOT NULL, note_id TEXT, data TEXT);
    `);

    // Update 31/07/2025 - Add new column to notes
    await addFavNoteColumn();
}

export async function addFavNoteColumn() {
    const result = await db.getAllAsync(`PRAGMA table_info(notes);`);
    const hasFavorite = result.some(col => col.name === 'favorite');

    if (!hasFavorite) {
        await db.execAsync(`ALTER TABLE notes ADD COLUMN favorite BOOLEAN DEFAULT 0`);
    }
}

export async function getAllNotes() {
    const allRows = await db.getAllAsync('SELECT * FROM notes');
    return allRows;
}

export async function addNote(id, content, pwd, color, date) {
    db.runAsync("INSERT INTO notes (id, content, pwd, color, date) VALUES (?, ?, ?, ?, ?)", id, content, pwd, color, date);
    return id;
}

export async function editNote(id, content, pwd, color, favorite, date) {
    db.runAsync("UPDATE notes SET content = ? WHERE id = ?", content, id);
    db.runAsync("UPDATE notes SET pwd = ? WHERE id = ?", pwd, id);
    db.runAsync("UPDATE notes SET color = ? WHERE id = ?", color, id);
    db.runAsync("UPDATE notes SET favorite = ? WHERE id = ?", favorite ? "1" : "0", id);
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
    const existing = await db.getFirstAsync(
        "SELECT id FROM drawings WHERE note_id = ? AND data = ?",
        note_id,
        data
    );

    if (!existing) {
        const id = uuid.v4();
        db.runAsync("INSERT INTO drawings (id, note_id, data) VALUES (?, ?, ?)", id, note_id, data);
        return id;
    }
}

export async function getDrawingsFromId(note_id) {
    const x = await db.getAllAsync('SELECT data FROM drawings WHERE note_id = ?', note_id);
    return x;
}

export async function deleteAllDrawsFromNote(note_id) {
    const drawings = await db.getAllAsync('SELECT id FROM drawings WHERE note_id = ?', note_id);
    drawings.map((path) => {
        db.runAsync("DELETE FROM drawings WHERE id = ?", path.id);
    })
}
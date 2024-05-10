import AsyncStorage from "@react-native-async-storage/async-storage";
import Actions from "./actions";


export default function ActionsContainer({ selected, setSelected, setNotes }) {
    // Se obtiene todas las notas
    async function get() {
        let notes = await AsyncStorage.getItem("notes") || [];
        if (notes.length > 0) {
            notes = JSON.parse(notes);
        }
        return notes;
    }

    // Se obtiene las notas y se eliminan aquellas seleccionadas por el usuario
    async function remove() {
        let notes = await get();

        const newNotes = notes.filter(note => !selected.includes(note.id));

        await add(newNotes);
    }

    // Se añade el nuevo array de notas actualizado y se actualiza el front con la nueva información
    async function add(newNotes) {
        await AsyncStorage.setItem("notes", JSON.stringify(newNotes));

        setSelected([])
        setNotes(newNotes);
    }

    return <Actions {...{remove}} />
}
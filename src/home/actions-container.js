import AsyncStorage from "@react-native-async-storage/async-storage";
import Actions from "./actions";
import { deleteNoteFromId, getAllNotes } from "../utils/sqlite";


export default function ActionsContainer({ selected, setSelected, setNotes }) {
    // Se obtiene las notas y se eliminan aquellas seleccionadas por el usuario
    async function remove() {
        selected.forEach(async (item) => {
            await deleteNoteFromId(item);
        })
        const notes = await getAllNotes();
        setNotes(notes);
        setSelected([])
    }

    return <Actions {...{ remove }} />
}
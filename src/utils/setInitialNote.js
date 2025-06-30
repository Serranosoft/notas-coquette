import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import { storage } from "./storage";
import { addNote } from "./sqlite";

export async function setInitialNote() {
    const value = await AsyncStorage.getItem(storage.FIRST_LAUNCH_APP);
    if (!value) {
        const id = uuid.v4();

        const newNote = {
            id: id,
            content: `<div><font size="5">Bienvenidx a <b>Notas Coquette </b>🥰<br></font></div><div><br></div><div><font size="5">Haz tus notas mas bonitas y editalas como quieras: </font></div><div><ul><li><b>Negritas</b></li><li><i>Cursivas</i></li><li><u>Subrayado</u></li><li style="text-align: center;">Alinear textos</li><li>Listados</li><li>Cambiar <font size="6">tamaño</font> <font size="3">de</font><font size="2"> los</font><font size="6"> textos</font></li><li><font size="5">Añadir separadores *:..｡o○</font></li><li><font size="5">Deshacer o rehacer cambios</font></li><li><font size="5">Cambia de color tus notas</font></li><li><font size="5">Protege tus notas con contraseña</font></li></ul></div>`,
            date: new Date().getTime(),
            color: "#000",
            pwd: null
        }

        await addNote(newNote.content, newNote.pwd, newNote.color, newNote.date)
        await AsyncStorage.setItem(storage.FIRST_LAUNCH_APP, "true");
    }
}
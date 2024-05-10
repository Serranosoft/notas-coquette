import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

export async function setInitialNote() {
    const value = await AsyncStorage.getItem("FIRST_LAUNCH_APP");
    if (!value) {
        const id = uuid.v4();

        const notes = [];
        const newNote = {
            id: id,
            content: `<div><font size="5">Bienvenidx a <b>Notas Coquette </b>🥰<br></font></div><div><br></div><div><font size="5">Haz tus notas mas bonitas y editalas como quieras: </font></div><div><ul><li><b>Negritas</b></li><li><i>Cursivas</i></li><li><u>Subrayado</u></li><li style="text-align: center;">Alinear textos</li><li>Listados</li><li>Cambiar <font size="6">tamaño</font> <font size="3">de</font><font size="2"> los</font><font size="6"> textos</font></li><li><font size="5">Añadir separadores *:..｡o○</font></li><li><font size="5">Deshacer o rehacer cambios</font></li></ul></div>`,
            date: new Date(),
        }

        notes.push(newNote);
        await AsyncStorage.setItem("notes", JSON.stringify(notes));
        await AsyncStorage.setItem("FIRST_LAUNCH_APP", "true");
    }
}
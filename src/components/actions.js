import { StyleSheet, TouchableOpacity, View } from "react-native"
import { Path, Svg } from "react-native-svg"
import { colors } from "../utils/styles"
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Actions({ itemsSelected, setItemsSelected, setNotes }) {

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

        const newNotes = notes.filter(note => !itemsSelected.includes(note.id));

        await add(newNotes);
    }

    // Se añade el nuevo array de notas actualizado y se actualiza el front con la nueva información
    async function add(newNotes) {
        await AsyncStorage.setItem("notes", JSON.stringify(newNotes));

        setItemsSelected([])
        setNotes(newNotes);
    }

    return (
        <View style={[styles.layout, styles.position]}>
            <TouchableOpacity onPress={remove} style={styles.action}>
                <Svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <Path d="M10 18a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1zM20 6h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v1H4a1 1 0 000 2h1v11a3 3 0 003 3h8a3 3 0 003-3V8h1a1 1 0 000-2zM10 5a1 1 0 011-1h2a1 1 0 011 1v1h-4zm7 14a1 1 0 01-1 1H8a1 1 0 01-1-1V8h10zm-3-1a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1z" />
                </Svg>
            </TouchableOpacity>
        </View>
    )
}



const styles = StyleSheet.create({
    layout: {
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: colors.selected,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
    },

    position: {
        position: "absolute",
        bottom: 0,
        left: "50%",
        marginLeft: -100,
        width: 200,
        height: 75,
    },

    action: {
        width: 45,
        height: 45,
    }
})
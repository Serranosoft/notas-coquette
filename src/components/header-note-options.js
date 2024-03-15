import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";
import { Path, Svg } from "react-native-svg";

export default function HeaderNoteOptions({ setReadingMode, readingMode, noteSavedId }) {

    const [visible, setVisible] = useState(false);

    const showMenu = () => setVisible(true);
    const hideMenu = () => setVisible(false);

    function updateReadingMode() {
        setReadingMode(!readingMode);
        hideMenu();
    }

    async function remove() {
        let notes = await AsyncStorage.getItem("notes") || [];
        if (notes.length > 0) {
            notes = JSON.parse(notes);
        }

        const newNotes = notes.filter((note) => note.id !== noteSavedId);
        await AsyncStorage.setItem("notes", JSON.stringify(newNotes));
        router.push("/");
    }

    return (
        <Menu
            visible={visible}
            onRequestClose={hideMenu}
            anchor={(
                <TouchableWithoutFeedback onPress={showMenu}>
                    <Image source={require("../../assets/more.png")} style={styles.img} />
                </TouchableWithoutFeedback>
            )}>
            <MenuItem onPress={updateReadingMode}>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require("../../assets/read.png")} />
                    <Text>{readingMode ? "Modo edición" : "Modo lectura"}</Text>
                </View>
            </MenuItem>
            <MenuItem onPress={remove}>
                <View style={styles.row}>
                    <Svg style={styles.icon} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <Path d="M10 18a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1zM20 6h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v1H4a1 1 0 000 2h1v11a3 3 0 003 3h8a3 3 0 003-3V8h1a1 1 0 000-2zM10 5a1 1 0 011-1h2a1 1 0 011 1v1h-4zm7 14a1 1 0 01-1 1H8a1 1 0 01-1-1V8h10zm-3-1a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1z" />
                    </Svg>
                    <Text>Eliminar nota</Text>
                </View>
            </MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => router.push({ pathname: "settings", params: true })}>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require("../../assets/settings.png")} />
                    <Text>Configuración</Text>
                </View>
            </MenuItem>
        </Menu>
    )
}

const styles = StyleSheet.create({

    img: {
        width: 25,
        height: 25,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        gap: 12
    },

    icon: {
        width: 20,
        height: 20
    }
})
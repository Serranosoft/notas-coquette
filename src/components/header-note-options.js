import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";

export default function HeaderNoteOptions({ setReadingMode, readingMode }) {

    const [visible, setVisible] = useState(false);

    const showMenu = () => setVisible(true);
    const hideMenu = () => setVisible(false);

    function updateReadingMode() {
        setReadingMode(!readingMode);
        hideMenu();
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
        width: 30,
        height: 30,
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
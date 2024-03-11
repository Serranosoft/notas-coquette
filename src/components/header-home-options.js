import AsyncStorage from "@react-native-async-storage/async-storage";
import { router } from "expo-router";
import { useState } from "react";
import { Image, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";

export default function HeaderHomeOptions({ columnNumber, setColumnNumber }) {

    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    async function changeLayout() {
        let grid = columnNumber;
        if (columnNumber > 2) {
            grid = 1;
        } else {
            grid = columnNumber + 1;
        }

        setColumnNumber(grid);
        hideMenu();

        await AsyncStorage.setItem("grid", grid.toString());
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
            <MenuItem onPress={changeLayout}>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require("../../assets/grid.png")} />
                    <Text>Cambiar cuadricula</Text>
                </View>
            </MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => router.push("settings")}>
                <View style={styles.row}>
                    <Image style={styles.icon} source={require("../../assets/settings.png")} />
                    <Text>Configuración</Text>
                </View>
            </MenuItem>
        </Menu>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        gap: 6
    },

    img: {
        width: 25,
        height: 25 
    },

    icon: {
        width: 20,
        height: 20
    }

})
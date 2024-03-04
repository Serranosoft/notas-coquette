import { Image, Keyboard, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { layout, ui } from "../../utils/styles";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useState } from "react";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";



export default function HeaderHome({ setColumnNumber, columnNumber }) {

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
        <View style={layout.header}>
            <View style={layout.title}>
                <Image style={styles.img} source={require("../../../assets/logo.png")} />
                <Text style={[ui.h4, { color: "#000" }]}>Notas Coquette</Text>
            </View>

            <View>

                <Menu
                    visible={visible}
                    onRequestClose={hideMenu}
                    anchor={(
                        <TouchableWithoutFeedback onPress={showMenu}>
                            <Image source={require("../../../assets/more.png")} style={styles.img} />
                        </TouchableWithoutFeedback>
                    )}>
                    <MenuItem onPress={changeLayout}>
                        <View style={styles.row}>
                            <Image style={styles.icon} source={require("../../../assets/grid.png")} />
                            <Text>Cambiar cuadricula</Text>
                        </View>
                    </MenuItem>
                    <MenuItem onPress={() => router.push("settings")}>
                        <View style={styles.row}>
                            <Image style={styles.icon} source={require("../../../assets/settings.png")} />
                            <Text>Configuración</Text>
                        </View>
                    </MenuItem>
                </Menu>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    img: {
        width: 30,
        height: 30,
    },

    row: {
        flexDirection: "row",
        gap: 6
    },

    icon: {
        width: 20,
        height: 20
    }
})
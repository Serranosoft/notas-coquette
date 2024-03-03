import { Image, Keyboard, Pressable, StyleSheet, Text, TouchableWithoutFeedback, View } from "react-native";
import { layout, ui } from "../../utils/styles";
import { Menu, MenuItem, MenuDivider } from 'react-native-material-menu';
import { useState } from "react";
import { router } from "expo-router";



export default function HeaderHome({ setColumnNumber, columnNumber }) {

    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    function changeLayout() {
        if (columnNumber > 2) {
            setColumnNumber(1);
        } else {
            setColumnNumber((columnNumber) => columnNumber + 1)
        }
        hideMenu();
    }
    return (
        <Pressable style={layout.header}>
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
        </Pressable>
    )
}

const styles = StyleSheet.create({

    info: {
        position: "absolute",
        top: 32,
        right: 10,
        backgroundColor: "#fff",
        padding: 4,
        width: 160,
        borderWidth: 1,
        borderColor: "#e1e1e1"
    },

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
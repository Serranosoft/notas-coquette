import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, TouchableWithoutFeedback, View } from "react-native";
import { layout, ui } from "../../utils/styles";
import { useState } from "react";
import { Menu, MenuDivider, MenuItem } from 'react-native-material-menu';

export default function HeaderNote({ saveNote, isEdit, setHasSaved, richEditorRef, setReadingMode, readingMode, autoSave }) {

    const router = useRouter();
    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    async function back() {
        if (autoSave) {
            await saveNote();
        }
        router.back();
    }

    async function save() {
        richEditorRef.current.dismissKeyboard();
        setHasSaved(true);
        await saveNote();
        ToastAndroid.showWithGravityAndOffset("Nota guardada", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }

    function updateReadingMode() {
        setReadingMode(!readingMode);
        hideMenu();
    }


    return (
        <View style={layout.header}>
            <View style={layout.title}>
                <Pressable onPress={back}>
                    <Image style={styles.img} source={require("../../../assets/back.png")} />
                </Pressable>
                <Text style={[ui.h4, { color: "#000" }]}>{isEdit ? "Editar nota" : "Añadir nota"}</Text>
            </View>


            <View style={styles.row}>
                <TouchableOpacity onPress={save}>
                    <Image style={styles.img} source={require("../../../assets/save.png")}></Image>
                </TouchableOpacity>
                <View>

                    <Menu
                        visible={visible}
                        onRequestClose={hideMenu}
                        anchor={(
                            <TouchableWithoutFeedback onPress={showMenu}>
                                <Image source={require("../../../assets/more.png")} style={styles.img} />
                            </TouchableWithoutFeedback>
                        )}>
                        <MenuItem onPress={updateReadingMode}>
                            <View style={styles.row}>
                                <Image style={styles.icon} source={require("../../../assets/read.png")} />
                                <Text>{readingMode ? "Modo edición" : "Modo lectura"}</Text>
                            </View>
                        </MenuItem>
                        <MenuDivider />
                        <MenuItem onPress={() => router.push({ pathname: "settings", params: true })}>
                            <View style={styles.row}>
                                <Image style={styles.icon} source={require("../../../assets/settings.png")} />
                                <Text>Configuración</Text>
                            </View>
                        </MenuItem>
                    </Menu>
                </View>
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
        alignItems: "center",
        gap: 12
    },

    icon: {
        width: 20,
        height: 20
    }
})
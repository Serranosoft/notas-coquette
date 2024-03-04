import { useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { layout, ui } from "../../utils/styles";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HeaderNote({ saveNote, isEdit, setHasSaved, richEditorRef }) {

    const router = useRouter();

    async function back() {
        await saveNote();
        router.back();
    }

    async function save() {
        richEditorRef.current.dismissKeyboard();
        setHasSaved(true);
        await saveNote();
        ToastAndroid.showWithGravityAndOffset("Nota guardada", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
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
                <Ionicons name="ellipsis-vertical" size={28} color="#000" />
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
})
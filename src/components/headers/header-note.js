import { Link, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { layout, ui } from "../../utils/styles";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HeaderNote({ saveNote }) {

    const router = useRouter();

    async function back() {
        await saveNote();
        router.back();
    }
    
    return (
        <Pressable style={layout.header}>
            <View style={layout.title}>
                <Pressable onPress={back}>
                    <Image style={styles.img} source={require("../../../assets/back.png")} />
                </Pressable>
                <Text style={[ui.h4, { color: "#000" }]}>Añadir nota</Text>
            </View>

            <View>
                <Ionicons name="ellipsis-vertical" size={28} color="#000" />
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
    }
})
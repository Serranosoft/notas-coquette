import { Link, useRouter } from "expo-router";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { layout, ui } from "../../utils/styles";
import Ionicons from '@expo/vector-icons/Ionicons';

export default function HeaderHome() {

    return (
        <Pressable style={layout.header}>
            <View style={layout.title}>
                <Image style={{ width: 50, height: 50 }} source={require("../../../assets/logo.png")} />
                <Text style={[ui.h4, { color: "#000" }]}>Notas Coquette</Text>
            </View>

            <View>
                <Ionicons name="ellipsis-vertical" size={28} color="#000" /* onPress={() => setOpen(!open)} *//>
                {/* <View style={[styles.info, { display: open ? "flex" : "none"}]}>
                    <Link href="/" asChild style={{ paddingVertical: 8 }}>
                        <TouchableOpacity>
                            <Text style={[ui.text, { textAlign: "center", fontFamily: "Bold" }]}>Mis Favoritos 🏹</Text>
                        </TouchableOpacity>
                    </Link>
                </View> */}
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
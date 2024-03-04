import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";

export default function HomeButton() {

    return (
        <Link href="/note" asChild>
            <TouchableOpacity activeOpacity={0.7}>
                <View style={styles.btn}>
                    <Text style={ui.h3}>Añadir nota</Text>
                    <Image style={styles.img} source={require("../../assets/decoration-1.png")} />
                </View>
            </TouchableOpacity>
        </Link>
    )
}

const styles = StyleSheet.create({
    btn: {
        position: "relative",
        backgroundColor: colors.button,
        padding: 8,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60,
        marginBottom: 40,
        borderRadius: 6,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    img: {
        position: "absolute",
        top: -75,
        left: -10,
        width: 140,
        height: 140,
        transform: [{ rotate: "-15deg" }],
        zIndex: 1
    },
})
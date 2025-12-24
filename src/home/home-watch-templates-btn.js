import { Link } from "expo-router";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../utils/styles";

export default function HomeWatchTemplatesBtn({ language }) {

    return (
        <Link href="/templates" asChild>
            <TouchableOpacity activeOpacity={0.7}>
                <View style={styles.btn}>
                    <Text style={ui.h4}>{language.t("_homeTemplates")}</Text>
                    <Image style={styles.img} source={require("../../assets/decoration-2.png")} />
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
        marginTop: 24,
        marginBottom: 32,
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
        top: -8,
        right: 32,
        width: 60,
        height: 60,
        transform: [{ rotate: "15deg" }],
    },
})
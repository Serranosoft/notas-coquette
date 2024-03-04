import { router } from "expo-router";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { layout, ui } from "../../utils/styles";
import useBackHandler from "../useBackHandler";

export default function HeaderSettings({ forceHome }) {

    useBackHandler(() => {
        if (forceHome) {
            router.push("/");
            return true;
        } else {
            router.back();
            return true;
        }
    });

    return (
        <View style={layout.header}>
            <View style={layout.title}>
                <Pressable onPress={() => forceHome ? router.push("/") : router.back()}>
                    <Image style={styles.img} source={require("../../../assets/back.png")} />
                </Pressable>
                <Text style={[ui.h4, { color: "#000" }]}>Configuración</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    img: {
        width: 30,
        height: 30,
    },
})
import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { components, header, layout, padding, ui } from "../utils/styles";

export default function HeaderSettings({ forceHome }) {

    return (
        <View style={components.header}>
            <View style={layout.title}>
                <Pressable onPress={() => forceHome ? router.push("/") : router.back()}>
                    <Image style={header.img} source={require("../../assets/back.png")} />
                </Pressable>
                <Text style={[ui.h4, { color: "#000" }]}>Configuración</Text>
            </View>
        </View>
    )
}
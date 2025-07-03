import { router } from "expo-router";
import { Image, Pressable, Text, View } from "react-native";
import { components, header, layout, padding, ui } from "../utils/styles";
import { useContext } from "react";
import { LangContext } from "../utils/Context";

export default function HeaderSettings() {

    const { language } = useContext(LangContext);
    
    return (
        <View style={components.header}>
            <View style={layout.title}>
                <Pressable onPress={() => router.back()}>
                    <Image style={header.img} source={require("../../assets/back.png")} />
                </Pressable>
                <Text style={[ui.h4, { color: "#000" }]}>{language.t("_headerNoteTitleNew")}</Text>
            </View>
        </View>
    )
}
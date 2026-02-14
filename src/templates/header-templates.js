import { Image, Pressable, Text, View } from "react-native";
import { components, header, layout, padding, ui } from "../utils/styles";
import { useContext } from "react";
import { router } from "expo-router";
import { LangContext } from "../utils/Context";
import HeaderHomeOptionsContainer from "../home/header-home-options-container";
import PinkPatternBackground from "../components/pink-pattern-background";

export default function HeaderTemplates({ setColumnNumber, columnNumber }) {

    const { language } = useContext(LangContext);

    function back() {
        router.back();
    }

    return (
        <View style={[components.header, { paddingRight: 0, backgroundColor: 'transparent' }]}>
            <PinkPatternBackground />
            <View style={layout.title}>
                <Pressable onPress={back}>
                    <Image style={header.img} source={require("../../assets/back.png")} />
                </Pressable>
                <Text style={[ui.h4, ui.black]}>{language.t("_headerTemplates")}</Text>
            </View>
            <HeaderHomeOptionsContainer {...{ setColumnNumber, columnNumber }} />
        </View>
    );
}
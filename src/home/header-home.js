import { Text, View, TouchableOpacity } from "react-native";
import { components, colors, layout, padding, ui } from "../utils/styles";
import HeaderHomeOptionsContainer from "./header-home-options-container";
import { useContext } from "react";
import { LangContext } from "../utils/Context";
import { router } from "expo-router";
import { Svg, Path } from "react-native-svg";

export default function HeaderHome({ setColumnNumber, columnNumber }) {

    const { language } = useContext(LangContext);

    return (
        <View style={[components.header, { paddingRight: 0, backgroundColor: "transparent" }]}>
            <View style={layout.title}>
                <Text style={[ui.h4, ui.black]}>{language.t("_headerTitle")}</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                <TouchableOpacity onPress={() => router.push("/templates")} style={{ padding: 10 }} activeOpacity={0.6}>
                    <Svg width={22} height={22} viewBox="0 0 24 24" fill={colors.pink} stroke="none">
                        <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                    </Svg>
                </TouchableOpacity>
                <HeaderHomeOptionsContainer {...{ setColumnNumber, columnNumber }} />
            </View>
        </View>
    )
}
import { Text, View } from "react-native";
import { components, layout, ui } from "../utils/styles";
import HeaderHomeOptionsContainer from "./header-home-options-container";
import { useContext } from "react";
import { LangContext } from "../utils/Context";

export default function HeaderHome({ setColumnNumber, columnNumber }) {
    
    const { language } = useContext(LangContext);

    return (
        <View style={components.header}>
            <View style={layout.title}>
                <Text style={[ui.h4, ui.black]}>{language.t("_headerTitle")}</Text>
            </View>
            <HeaderHomeOptionsContainer {...{setColumnNumber, columnNumber }} />
        </View>
    )
}
import { Image, StyleSheet, Text, View } from "react-native";
import { components, header, layout, padding, ui } from "../utils/styles";
import HeaderHomeOptionsContainer from "./header-home-options-container";

export default function HeaderHome({ setColumnNumber, columnNumber }) {
    
    return (
        <View style={components.header}>
            <View style={layout.title}>
                <Text style={[ui.h4, ui.black]}>Mis notas</Text>
            </View>
            <HeaderHomeOptionsContainer setColumnNumber={setColumnNumber} columnNumber={columnNumber} />
        </View>
    )
}
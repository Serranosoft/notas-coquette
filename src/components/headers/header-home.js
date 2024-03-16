import { Image, StyleSheet, Text, View } from "react-native";
import { layout, ui } from "../../utils/styles";
import HeaderHomeOptions from "../header-home-options";

export default function HeaderHome({ setColumnNumber, columnNumber }) {
    
    return (
        <View style={layout.header}>
            <View style={layout.title}>
                <Image style={styles.img} source={require("../../../assets/icon-notes.png")} />
                <Text style={[ui.h4, { color: "#000", fontSize: 27 }]}>Notas Coquette</Text>
            </View>
            <HeaderHomeOptions setColumnNumber={setColumnNumber} columnNumber={columnNumber} />
        </View>
    )
}

const styles = StyleSheet.create({

    img: {
        width: 50,
        height: 50,
        transform: [{ rotate: "-12deg" }]
    },
})
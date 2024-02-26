import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../../utils/styles";

const test = ["qweqweqwe", "10101010", "1010101010", "10001001010", "100101010101010101", "1000101010101", "10101010", "1002020"];

export default function Emojis({ setEmoji }) {

    return (
        <View style={styles.container}>
            <ScrollView style={styles.list} horizontal>
                {
                    test.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => setEmoji(item)} key={index} style={{ flex: 1 }}>
                                <Text style={[ui.text, styles.item]}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        backgroundColor: "#fff",
    },
    item: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        textAlign: "center"
    },
})
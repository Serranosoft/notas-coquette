import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, editor, ui } from "../../utils/styles";

export const SIZES = { "10": 1, "13": 2, "16": 3, "18": 4, "24": 5, "32": 6, "48": 7 }

export default function FontSize({ selected, handleFontSize }) {

    return (
        <View style={editor.option}>
            <ScrollView>
                {
                    Object.keys(SIZES).map((size, index) => {
                        let realIndex = (index + 1);
                        return (
                            <TouchableOpacity key={realIndex} onPress={() => handleFontSize(SIZES[size], realIndex)}>
                                <Text style={[ui.text, selected === realIndex && styles.selected, styles.item]}>{size}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({

    item: {
        textAlign: "center",
        color: "#000",
        paddingVertical: 12,
        paddingHorizontal: 12,
    },

    selected: {
        backgroundColor: colors.light
    },
})
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, editor, ui } from "../../utils/styles";

export const SIZES = { "10": 1, "13": 2, "16": 3, "18": 4, "24": 5, "32": 6, "48": 7 }

export default function FontSize({ selected, openSeparators, handleFontSize }) {


    return (
        <View style={[editor.footer, styles.container, { height: "auto" }]}>
            <View style={styles.sizeList}>
                {
                    Object.keys(SIZES).map((size, index) => {
                        let realIndex = (index + 1);
                        return (
                            <TouchableOpacity key={realIndex} onPress={() => handleFontSize(SIZES[size], realIndex)} style={{ flex: 1 }}>
                                <Text style={[ui.text, selected === realIndex && styles.selected, styles.item]}>{size}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    container: {
        position: "absolute",
        top: 75,
        right: 8,
        backgroundColor: "#fff",
        borderWidth: 4,
        borderColor: colors.light,
        zIndex: 99,
        borderRadius: 100,
        paddingVertical: 0,
        overflow: "hidden",
        width: "auto",
    },
    
    item: {
        textAlign: "center",
        color: "#000",
        paddingVertical: 12,
        paddingHorizontal: 12,
    },

    selected: {
        backgroundColor: colors.light
    },

    sizeList: {
        overflow: "hidden"
    }
})
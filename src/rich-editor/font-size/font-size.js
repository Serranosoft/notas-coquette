import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../../utils/styles";
import { SIZES } from "./font-size-container";


export default function FontSize({ selected, openSeparators, handleFontSize }) {


    return (
        <View style={[styles.container, { borderBottomWidth: openSeparators ? 0 : 2}]}>
            <View style={styles.sizeList}>
                {
                    Object.keys(SIZES).map((size, index) => {
                        let realIndex = (index + 1);
                        return (
                            <TouchableOpacity key={realIndex} onPress={() => handleFontSize(SIZES[size], realIndex)} style={{ flex: 1 }}>
                                <Text style={[ui.h4, selected === realIndex && styles.selected, styles.item]}>{size}</Text>
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
        justifyContent: "space-between",
        alignItems: "center",
        gap: 8,
        backgroundColor: colors.light,
        borderTopWidth: 2,
        zIndex: 99
    },

    item: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        textAlign: "center",
        color: "#000",
        borderRightWidth: 2,
    },

    selected: {
        backgroundColor: colors.dark
    },

    sizeList: {
        flexDirection: "row",
    }
})
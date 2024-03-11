import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../../utils/styles";
import { useEffect, useState } from "react";

export const SIZES = { "10": 1, "13": 2, "16": 3, "18": 4, "24": 5, "32": 6, "48": 7 }

export default function FontSize({ setFontSize, fontSize, openSeparators }) {

    const [selected, setSelected] = useState(null);

    function handleFontSize(size, index) {
        setFontSize(size);
        setSelected(index);
    }

    useEffect(() => {
        setSelected(fontSize);
    }, [])

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
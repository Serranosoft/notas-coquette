import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../../utils/styles";
import { useEffect, useState } from "react";

export const SIZES = { "10": 1, "13": 2, "16": 3, "18": 4, "24": 5, "32": 6, "48": 7 }

export default function FontSize({ setFontSize, fontSize }) {

    const [selected, setSelected] = useState(null);

    function handleFontSize(size, index) {
        setFontSize(size);
        setSelected(index);
    }

    useEffect(() => {
        setSelected(fontSize);
    }, [])

    return (
        <View style={styles.container}>
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
        backgroundColor: "#fff",
    },

    close: {
        position: "absolute",
        top: -24,
        right: 8,
        backgroundColor: "#fff",
        borderRadius: 100,
        width: 40,
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 1,
    },

    item: {
        paddingVertical: 8,
        paddingHorizontal: 8,
        textAlign: "center",
        color: "#000"
    },

    selected: {
        backgroundColor: "pink"
    },

    sizeList: {
        flexDirection: "row",
    }
})
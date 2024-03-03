import { Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import GridBackground from "./grid";
import RenderHTML, { HTMLContentModel, HTMLElementModel } from "react-native-render-html";
import React, { useState } from "react";
import { Path, Svg } from "react-native-svg";
import { colors, ui } from "../utils/styles";
import { router } from "expo-router";

function NoteItem({ note, itemsSelected, setItemsSelected }) {

    const { width } = useWindowDimensions();
    const source = { html: note.content }

    const customHTMLElementModels = {
        'font': HTMLElementModel.fromCustomModel({ tagName: 'font', mixedUAStyles: { fontSize: 18 }, contentModel: HTMLContentModel.textual })
    };

    const [selected, setSelected] = useState(false);

    function highlight() {

        setSelected(true);
        if (!selected) {
            setItemsSelected((itemsSelected) => [...itemsSelected, note.id]);
        } else {
            unhighlight();
        }
    }

    function unhighlight() {
        if (selected) {
            setSelected(false);
            const updatedSelected = itemsSelected.filter(item => item !== note.id);
            setItemsSelected(updatedSelected);
        }
    }

    function onPress() {
        if (itemsSelected.length > 0) {
            // Hace highlight o unhighlight, depende.
            highlight();
        } else {
            // Accede a la nota.
            router.push({ pathname: "/note", params: note });
            unhighlight();
        }
    }

    return (

        <TouchableOpacity style={[styles.container, selected && styles.selected]} onLongPress={highlight} onPress={onPress}>
            <GridBackground />
            <View>
                <View style={styles.header}>
                    <Text style={ui.text}>{note.date}</Text>
                </View>
                <View style={styles.htmlPadding}>
                    <RenderHTML
                        contentWidth={width}
                        source={source}
                        customHTMLElementModels={customHTMLElementModels}
                    />
                </View>
            </View>
            {
                itemsSelected.length > 0 &&
                <View style={styles.selectedBox}>
                    {selected &&
                        <Svg width={32} height={32} viewBox="0 0 40 40">
                            <Path d="M15.48 28.62a1 1 0 01-.71-.29l-7.54-7.54a1 1 0 010-1.41 1 1 0 011.42 0l6.83 6.83L32.12 9.57a1 1 0 011.41 0 1 1 0 010 1.42L16.18 28.33a1 1 0 01-.7.29z" />
                        </Svg>
                    }
                </View>
            }
        </TouchableOpacity>
    )
}

export default NoteItem;

const styles = StyleSheet.create({
    container: {
        height: 175,
        flex: 1 / 2,
        backgroundColor: "#fff",
        position: "relative",
        elevation: 5,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: colors.button,
        paddingHorizontal: 8,
        paddingVertical: 2,
    },
    htmlPadding: {
        paddingHorizontal: 8,
        paddingVertical: 4,
    },
    selectedBox: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 100,
        position: "absolute",
        right: 10,
        bottom: 10,
    },
    selected: {
        backgroundColor: colors.selected,
        elevation: 0,
    },
})
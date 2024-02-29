import { StyleSheet, TouchableOpacity, View, useWindowDimensions } from "react-native";
import GridBackground from "./grid";
import RenderHTML, { HTMLContentModel, HTMLElementModel } from "react-native-render-html";
import React, { useState } from "react";

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

    return (
        <TouchableOpacity style={[styles.container, selected && styles.selected]} onLongPress={highlight} onPress={itemsSelected.length > 0 ? highlight : unhighlight}>
            <GridBackground />
            <View style={{ paddingHorizontal: 16 }}>
                <RenderHTML
                    contentWidth={width}
                    source={source}
                    customHTMLElementModels={customHTMLElementModels}
                />
            </View>
        </TouchableOpacity>
    )
}

export default NoteItem;

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: "100%",
        flex: 1,
        backgroundColor: "#fff",
    },
    selected: {
        backgroundColor: "rgba(235, 186, 185,0.55)",
        borderWidth: 3,
        borderColor: "#F1F5F4",
    }
})
import { Image, StyleSheet, Text, View, useWindowDimensions } from "react-native";
import GridBackground from "./grid";
import RenderHTML, { HTMLContentModel, HTMLElementModel } from "react-native-render-html";

export default function NoteItem({ text }) {
    const { width } = useWindowDimensions();
    const source = { html: text }

    const customHTMLElementModels = {
        'font': 
        HTMLElementModel.fromCustomModel({ tagName: 'font', mixedUAStyles: { fontSize: 18 }, contentModel: HTMLContentModel.textual})
    };
    return (
        <View style={styles.container}>
            <GridBackground />
            <View style={{ paddingHorizontal: 16 }}>
                <RenderHTML
                    contentWidth={width}
                    source={source}
                    customHTMLElementModels={customHTMLElementModels}
                />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 150,
        width: "100%",
        flex: 1,
        backgroundColor: "#fff",
    }
})
import { Dimensions, StyleSheet, View } from "react-native";
import { Stack } from "expo-router";
import { RichEditor } from "react-native-pell-rich-editor";
import { useEffect, useRef, useState } from "react";
import GridBackground from "../src/components/grid";
import HeaderNote from "../src/components/headers/header-note";
import FontSize from "../src/components/rich-editor/font-size";
import HeaderEditor from "../src/components/rich-editor/header-editor";
import FooterEditor from "../src/components/rich-editor/footer-editor";
import Separators from "../src/components/rich-editor/separators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

export default function Note() {

    const richText = useRef(null);

    const [content, setContent] = useState("");
    const [fontSize, setFontSize] = useState(5);
    const [separator, setSeparator] = useState(null);
    const [openFontSize, setOpenFontSize] = useState(false);
    const [openSeparators, setOpenSeparators] = useState(false);

    useEffect(() => {
        richText.current?.setFontSize(fontSize);
    }, [fontSize])

    useEffect(() => {
        richText.current?.insertText(separator);
        setSeparator(null);
    }, [separator])

    // Al pulsar hacia atrás, debe guardarse en el asyncStorage
    async function saveNote() {

        if (content.length > 0) {
            let notes = await AsyncStorage.getItem("notes") || [];
            if (notes.length > 0) {
                notes = JSON.parse(notes);
            }
    
            const note = {
                id: uuid.v4(),
                folder: "todos",
                content: content,
                date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
            }
    
            notes.push(note);
    
            const jsonValue = JSON.stringify(notes);
            await AsyncStorage.setItem("notes", jsonValue);
        } 
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ header: () => <HeaderNote saveNote={saveNote} /> }} />

            <HeaderEditor
                editorRef={richText}
                fontSize={fontSize}
                setOpenFontSize={setOpenFontSize}
                openFontSize={openFontSize}
                openSeparators={openSeparators}
                setOpenSeparators={setOpenSeparators}
            />

            {openFontSize && <FontSize setFontSize={setFontSize} fontSize={fontSize} />}
            {openSeparators && <Separators setSeparator={setSeparator} />}

            <View style={{ flex: 1 }}>
                <GridBackground />
                <RichEditor
                    useContainer={false}
                    ref={richText}
                    style={styles.rich}
                    placeholder="Escribe tu nota..."
                    onChange={(content) => setContent(content)}
                    editorStyle={{ backgroundColor: "transparent", contentCSSText: `font-size: 24px` }}
                />
            </View>

            <FooterEditor editorRef={richText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    rich: {
        flex: 1,
        height: Dimensions.get("window").height,
    },

    scroll: {
        flex: 1,
    },
})
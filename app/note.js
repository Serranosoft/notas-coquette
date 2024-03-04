import { Dimensions, StyleSheet, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { RichEditor } from "react-native-pell-rich-editor";
import { useEffect, useRef, useState } from "react";
import GridBackground from "../src/components/grid";
import HeaderNote from "../src/components/headers/header-note";
import FontSize from "../src/components/rich-editor/font-size";
import HeaderEditor from "../src/components/rich-editor/header-editor";
import FooterEditor from "../src/components/rich-editor/footer-editor";
import Separators from "../src/components/rich-editor/separators";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { aroma, madimi, roboto } from "../src/components/rich-editor/fonts";

export default function Note() {

    const note = useLocalSearchParams();

    const richText = useRef(null);

    const [content, setContent] = useState("");
    const [fontSize, setFontSize] = useState(5);
    const [separator, setSeparator] = useState(null);
    const [openFontSize, setOpenFontSize] = useState(false);
    const [openSeparators, setOpenSeparators] = useState(false);
    const [readingMode, setReadingMode] = useState(false);
    const [font, setFont] = useState(null);
    const [autoSave, setAutoSave] = useState(true);

    useEffect(() => {
        getFont(); // Obtiene la fuente en el que va a instanciar el editor
        getAutoSave(); // Obtiene info sobre si el usuario quiere guardado automatico
    }, [])

    useEffect(() => {
        richText.current?.setFontSize(fontSize);
    }, [fontSize])

    useEffect(() => {
        richText.current?.insertText(separator);
        setSeparator(null);
    }, [separator])

    async function getFont() {
        let font = {};
        font.fontFamily = await AsyncStorage.getItem("font");
        switch (font.fontFamily) {
            case "roboto": font.fontFace = roboto; break;
            case "madimi": font.fontFace = madimi; break;
            case "aroma": font.fontFace = aroma; break;
        }
        setFont(font);
    }

    async function getAutoSave() {
        const autoSave = await AsyncStorage.getItem("autosave");
        if (autoSave) {
            setAutoSave(autoSave === "true" ? true : false);
        }
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                header: () =>
                    <HeaderNote
                        note={note}
                        content={content}
                        richEditorRef={richText}
                        setReadingMode={setReadingMode}
                        readingMode={readingMode}
                        autoSave={autoSave}
                    />
            }} />

            {
                font &&
                <>
                    <HeaderEditor
                        editorRef={richText}
                        fontSize={fontSize}
                        setOpenFontSize={setOpenFontSize}
                        openFontSize={openFontSize}
                        openSeparators={openSeparators}
                        setOpenSeparators={setOpenSeparators}
                        hide={readingMode}
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
                            editorStyle={{ initialCSSText: `${font.fontFace}`, backgroundColor: "transparent", contentCSSText: `font-size: 24px; font-family: ${font.fontFamily}` }}
                            initialContentHTML={note.content && note.content}
                            disabled={readingMode}
                        />
                    </View>
                    <FooterEditor editorRef={richText} hide={readingMode} />
                </>

            }

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
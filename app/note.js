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
import uuid from 'react-native-uuid';

export default function Note() {

    const note = useLocalSearchParams();

    const richText = useRef(null);

    const [content, setContent] = useState("");
    const [fontSize, setFontSize] = useState(5);
    const [separator, setSeparator] = useState(null);
    const [openFontSize, setOpenFontSize] = useState(false);
    const [openSeparators, setOpenSeparators] = useState(false);

    const [hasSaved, setHasSaved] = useState(false); // Flag para saber si ya ha guardado alguna vez una nota para editarla o no

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

            const isEdit = note.content || hasSaved;

            // Si es una nota nueva, debe entrar en newNote, pero si es una nota nueva, y le da a guardar mas de una vez, entonces
            // debe entrar en isEdit para que no cree una nota nueva constantemente.
            // Para ello, notifico desde el guardar un hasSaved para que sepa que debe entrar en isEdit.
            // Ya que el note.content seguirá siendo vacío ya que el primer note que recibe al entrar está vacio (era una nota nueva).
            // Si no encuentra un id en el note, pero aún así entra en isEdit, comprueba si en el storage existe un content igual al
            // content que se está editando ahora mismo y obtiene su id para que actualice la nota correctamente
            if (isEdit) {
                const id = note.id ? note.id : notes.find(oldNote => oldNote.content == content).id;
                editNote(notes, id);
            } else {
                newNote(notes);
            }

            const jsonValue = JSON.stringify(notes);
            await AsyncStorage.setItem("notes", jsonValue);
        }
    }

    async function newNote(notes) {
        const newNote = {
            id: uuid.v4(),
            folder: "todos",
            content: content,
            date: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString(),
        }

        notes.push(newNote);
    }

    function editNote(notes, id) {
        notes.find((oldNote) => oldNote.id === id).content = content;
    }

    return (
        <View style={styles.container}>
            <Stack.Screen options={{
                header: () => <HeaderNote saveNote={saveNote} isEdit={note.content} setHasSaved={setHasSaved} richEditorRef={richText} />
            }} />

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
                    initialContentHTML={note.content && note.content}
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
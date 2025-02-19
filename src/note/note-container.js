import Note from "./note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { Stack, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { madimi, ojuju, oswald, roboto } from "../utils/fonts";
import HeaderNoteContainer from "./header-note-container";
import uuid from 'react-native-uuid';
import useBackHandler from "../components/use-back-handler";
import { Alert, Platform, ToastAndroid } from "react-native";
import { save } from "../utils/storage";

export default function NoteContainer() {

    const { id } = useLocalSearchParams();

    const richText = useRef(null);
    const scrollRef = useRef(null);

    const [note, setNote] = useState({});
    const [fontSize, setFontSize] = useState(null);
    const [separator, setSeparator] = useState(null);
    const [openFontSize, setOpenFontSize] = useState(false);
    const [openSeparators, setOpenSeparators] = useState(false);
    const [openColors, setOpenColors] = useState(false);
    const [readingMode, setReadingMode] = useState(false);
    const [font, setFont] = useState(null);
    const [color, setColor] = useState(null);
    const [autoSave, setAutoSave] = useState(true);
    const [noteSavedId, setNoteSavedId] = useState(null);
    const [focused, setFocused] = useState(false);
    const [editorHeight, setEditorHeight] = useState(600);

    useEffect(() => {
        async function getNote() {
            let notes = await AsyncStorage.getItem("notes") || [];
            if (notes.length > 0) {
                notes = JSON.parse(notes);
            }

            let note = notes.find((note) => note.id === id);

            if (note) {
                if (!note.hasOwnProperty("color")) note.color = "#000"; // Compatibilidad con versiones antiguas
                setNote(note);
                setColor(note.color);
                setNoteSavedId(note.id)
            } else {
                const newNote = { id: uuid.v4(), content: "", date: new Date().getTime(), pwd: "", color: "#000" }
                setNote(newNote);
                setColor(newNote.color);
                setNoteSavedId(newNote.id)
            }
        }

        getNote();
    }, [id])

    // Obtiene info sobre si el usuario quiere guardado automatico y/o ha cambiado de fuente, lo debe hacer siempre que entre o vuelva a esta screen
    // Ya que es posible que cambie estos parametros durante la edición accediendo a settings y al volver a la pantalla no
    // sepa cual es el valor actual de ambos.
    useFocusEffect(
        useCallback(() => {
            setFont(null);
            getFont(); // Obtiene la fuente en el que va a instanciar el editor
            getAutoSave();
        }, [])
    );

    // Asegurar el cierre de todos los dropdown de opciones antes de permitir salir de la nota
    useBackHandler(() => {
        if (!openColors && !openFontSize && !openSeparators) {
            back();
        }

        if (openColors) {
            setOpenColors(false);
        }

        if (openFontSize) {
            setOpenFontSize(false);
        }

        if (openSeparators) {
            setOpenSeparators(false);
        }

        return true;

    }, [openColors, openFontSize, openSeparators])

    async function back() {
        if (autoSave) {
            await saveNote();
        }
        router.back();
    }

    async function saveNote() {
        richText.current.dismissKeyboard();
        const isSaved = await save({ ...{ note, noteSavedId, setNoteSavedId } });
        isSaved && onSave();
    }

    async function onSave() {
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(
                "Nota guardada",
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {
            Alert.alert("Nota guardada");
        }
    }

    async function getFont() {
        let font = {};
        font.fontFamily = await AsyncStorage.getItem("font");
        if (!font.fontFamily) {
            font.fontFamily = "roboto";
        }
        switch (font.fontFamily) {
            case "roboto": font.fontFace = roboto; break;
            case "madimi": font.fontFace = madimi; break;
            case "oswald": font.fontFace = oswald; break;
            case "ojuju": font.fontFace = ojuju; break;
        }
        setFont(font);
    }

    async function getAutoSave() {
        const autoSave = await AsyncStorage.getItem("autosave");
        if (autoSave) {
            setAutoSave(autoSave === "true" ? true : false);
        }
    }

    useEffect(() => {
        richText.current?.setFontSize(fontSize);
    }, [fontSize])

    useEffect(() => {
        richText.current?.insertText(separator);
        setSeparator(null);
    }, [separator])

    function handleFocusContent() {
        setFontSize(null);
        if (!focused) {
            setFocused(true);
            richText.current.focusContentEditor();
        }
    }

    const handleCursorPosition = useCallback((scrollY) => scrollRef.current.scrollTo({ y: scrollY - 30, animated: true }), []);

    return (
        <>
            <Stack.Screen options={{
                header: () => <HeaderNoteContainer {...{ note, setReadingMode, readingMode, back, saveNote, noteSavedId }} />
            }} />

            <Note {...
                {
                    note,
                    readingMode,
                    setFontSize,
                    openFontSize,
                    setOpenFontSize,
                    openSeparators,
                    setOpenSeparators,
                    openColors,
                    setOpenColors,
                    fontSize,
                    richText,
                    setSeparator,
                    handleCursorPosition,
                    handleFocusContent,
                    scrollRef,
                    font,
                    color,
                    setColor,
                    editorHeight,
                    setEditorHeight,
                }
            } />
        </>
    )
}
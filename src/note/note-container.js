import Note from "./note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Stack, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ancizar, madimi, ojuju, oswald, roboto } from "../utils/fonts";
import HeaderNoteContainer from "./header-note-container";
import uuid from 'react-native-uuid';
import useBackHandler from "../components/use-back-handler";
import { Alert, Keyboard, Platform, ToastAndroid } from "react-native";
import { save, storage } from "../utils/storage";
import { LangContext } from "../utils/Context";
import { addDraw, getNoteFromId } from "../utils/sqlite";

export default function NoteContainer() {

    const { id } = useLocalSearchParams();

    const { language } = useContext(LangContext);

    const richText = useRef(null);
    const scrollRef = useRef(null);

    const [note, setNote] = useState(null);
    const [fontSize, setFontSize] = useState(null);
    const [separator, setSeparator] = useState(null);
    const [readingMode, setReadingMode] = useState(false);
    const [font, setFont] = useState(null);
    const [color, setColor] = useState(null);
    const [autoSave, setAutoSave] = useState(true);
    const [noteSavedId, setNoteSavedId] = useState(null);
    const [focused, setFocused] = useState(false);
    const [editorHeight, setEditorHeight] = useState(600);
    const [openStickers, setOpenStickers] = useState(false);
    const [sticker, setSticker] = useState(null);
    const [activeOption, setActiveOption] = useState(null);

    const sketchPadRef = useRef();
    const [drawing, setDrawing] = useState({
        isDrawing: false,
        color: "rgb(85, 172, 238)",
        width: 3,
        mode: "scroll" // "scroll" | "free" | "line" | "eraser" 
    })


    useEffect(() => {
        async function getNote() {

            const note = await getNoteFromId(id);

            if (note) {
                if (!note.color) note.color = "#000"; // Compatibilidad con versiones antiguas
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
    /* useBackHandler(() => {
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

    }, [openColors, openFontSize, openSeparators]) */

    /* useEffect(() => {
        const keyboardDidHideListener = Keyboard.addListener("keyboardDidHide", () => {
            setOpenFontSize(false);
            setOpenColors(false);
            setOpenSeparators(false);
        });

        return () => {
            keyboardDidHideListener.remove();
        };
    }, []);
 */
    useEffect(() => {
        if (drawing.isDrawing) {
            richText.current.dismissKeyboard();
        }
    }, [drawing])

    async function back() {
        if (autoSave) {
            await saveNote();
        }
        router.back();
    }

    async function saveNote() {
        richText.current.dismissKeyboard();
        setActiveOption(null);
        setDrawing(prev => ({ ...prev, isDrawing: false }));

        const isSaved = await save({ ...{ note, noteSavedId } });
        sketchPadRef.current.save(); // Guardar los paths
        
        isSaved && onSave();
    }

    async function onSave() {
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(
                language.t("_toastNoteSaved"),
                ToastAndroid.LONG,
                ToastAndroid.BOTTOM,
                25,
                50
            );
        } else {
            Alert.alert(language.t("_toastNoteSaved"));
        }
    }

    async function getFont() {
        let font = {};
        font.fontFamily = await AsyncStorage.getItem(storage.FONT);
        if (!font.fontFamily) {
            font.fontFamily = "ancizar";
        }
        switch (font.fontFamily) {
            case "ancizar": font.fontFace = ancizar; break;
            case "roboto": font.fontFace = roboto; break;
            case "madimi": font.fontFace = madimi; break;
            case "oswald": font.fontFace = oswald; break;
            case "ojuju": font.fontFace = ojuju; break;
        }
        setFont(font);
    }

    async function getAutoSave() {
        const autoSave = await AsyncStorage.getItem(storage.AUTOSAVE);
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

    useEffect(() => {
        richText.current?.insertImage(sticker);
        setSticker(null)
    }, [sticker])

    function handleFocusContent() {
        if (!drawing.isDrawing && !readingMode) {
            setFontSize(null);
            if (!focused) {
                setFocused(true);
                richText.current.focusContentEditor();
            }
        }
    }

    const handleCursorPosition = useCallback((scrollY) => scrollRef.current.scrollTo({ y: scrollY - 30, animated: true }), []);

    return (
        <>


            <Stack.Screen options={{
                header: () => <HeaderNoteContainer {...{ drawing, setDrawing, note, setReadingMode, readingMode, back, saveNote, noteSavedId, richText, setActiveOption, activeOption }} />
            }} />

            <Note {...
                {
                    note,
                    readingMode,
                    setFontSize,
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
                    drawing,
                    setDrawing,
                    sketchPadRef,
                    setOpenStickers,
                    openStickers,
                    setSticker,
                    sticker,
                    setActiveOption,
                    activeOption,
                }
            } />
        </>


    )
}
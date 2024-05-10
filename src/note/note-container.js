import Note from "./note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useEffect, useRef, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import { Stack, useLocalSearchParams } from "expo-router";
import { madimi, ojuju, oswald, roboto } from "../utils/fonts";
import HeaderNoteContainer from "./header-note-container";

export default function NoteContainer() {

    const note = useLocalSearchParams();

    const richText = useRef(null);
    const scrollRef = useRef(null);

    const [content, setContent] = useState("");
    const [fontSize, setFontSize] = useState(4);
    const [separator, setSeparator] = useState(null);
    const [openFontSize, setOpenFontSize] = useState(false);
    const [openSeparators, setOpenSeparators] = useState(false);
    const [openColors, setOpenColors] = useState(false);
    const [readingMode, setReadingMode] = useState(false);
    const [font, setFont] = useState(null);
    const [color, setColor] = useState(null);
    const [autoSave, setAutoSave] = useState(true);
    const [focused, setFocused] = useState(false);

    useEffect(() => {
        getFont(); // Obtiene la fuente en el que va a instanciar el editor
        getColor(); // Obtiene el color de la fuente en el que va a instanciar el editor
        getAutoSave(); // Obtiene info sobre si el usuario quiere guardado automatico
    }, [])


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

    async function getColor() {
        const color = await AsyncStorage.getItem("color");
        if (color) {
            setColor(color);
        } else {
            setColor("#000")
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
        if (!focused) {
            setFocused(true);
            richText.current.focusContentEditor();
        }
    }

    const handleCursorPosition = useCallback((scrollY) => scrollRef.current.scrollTo({ y: scrollY - 30, animated: true }), []);

    return (
        <>
            <Stack.Screen options={{
                header: () => <HeaderNoteContainer {...{note, content, richText, setReadingMode, readingMode, autoSave }} />
            }} />
            <Note {...
                {
                    note,
                    readingMode,
                    setContent,
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
                    autoSave,
                    setColor
                }
            } />
        </>
    )
}
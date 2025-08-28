import Note from "./note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Stack, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ancizar, madimi, ojuju, oswald, roboto } from "../utils/fonts";
import HeaderNoteContainer from "./header-note-container";
import uuid from 'react-native-uuid';
import useBackHandler from "../components/use-back-handler";
import { Alert, AppState, Platform, ToastAndroid } from "react-native";
import { save, storage } from "../utils/storage";
import { LangContext } from "../utils/Context";
import { getNoteFromId } from "../utils/sqlite";

export default function NoteContainer() {

    const { id } = useLocalSearchParams();

    const { language } = useContext(LangContext);

    const richText = useRef(null);
    const scrollRef = useRef(null);

    const [appStateChanged, setAppStateChanged] = useState(AppState.currentState);

    const [noteState, setNoteState] = useState({
        note: null,
        fontSize: null,
        separator: null,
        readingMode: false,
        font: null,
        color: null,
        autoSave: true,
        noteSavedId: null,
        focused: false,
        editorHeight: 600,
        openStickers: false,
        sticker: null,
        activeOption: null,
        drawing: { isDrawing: false, color: "rgb(85,172,238)", width: 3, mode: "scroll" },
    });

    const { note, fontSize, separator, readingMode, font, color, autoSave,
        noteSavedId, focused, editorHeight, openStickers, sticker,
        activeOption, drawing } = noteState;

    const sketchPadRef = useRef();


    useEffect(() => {
        const subscription = AppState.addEventListener("change", setAppStateChanged);
        return () => subscription.remove();
    }, []);

    useEffect(() => {
        saveNote();
    }, [appStateChanged])


    useEffect(() => {
        async function getNote() {

            const note = await getNoteFromId(id);

            let noteData;
            if (note) {
                noteData = note;
            } else {
                noteData = { id: uuid.v4(), content: "", date: Date.now(), pwd: "", color: "#000" };
            }

            setNoteState(prev => ({
                ...prev,
                note: noteData,
                color: noteData.color,
                noteSavedId: noteData.id
            }));
        }

        getNote();
    }, [id])

    // Obtiene info sobre si el usuario quiere guardado automatico y/o ha cambiado de fuente, lo debe hacer siempre que entre o vuelva a esta screen
    // Ya que es posible que cambie estos parametros durante la edición accediendo a settings y al volver a la pantalla no
    // sepa cual es el valor actual de ambos.
    useFocusEffect(
        useCallback(() => {
            setNoteState(prev => ({ ...prev, font: null }));
            getFont(); // Obtiene la fuente en el que va a instanciar el editor
            getAutoSave();
        }, [])
    );

    // Asegurar guardado antes de salir de la nota
    useBackHandler(() => {
        if (activeOption !== null) {
            setActiveOption(null);
            return true;
        } else {
            back();
            return true;
        }
    }, [])

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
        setNoteState(prev => ({
            ...prev,
            activeOption: null,
            drawing: { ...prev.drawing, isDrawing: false }
        }));

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
        setNoteState(prev => ({ ...prev, font: font }));
    }

    async function getAutoSave() {
        const autoSave = await AsyncStorage.getItem(storage.AUTOSAVE);
        if (autoSave) {
            setNoteState(prev => ({ ...prev, autoSave: autoSave === "true" }));
        }
    }

    useEffect(() => {
        richText.current?.setFontSize(fontSize);
    }, [fontSize])
    
    useEffect(() => {
        if (color) {
            setNoteState(prev => ({ ...prev, note: {...note, color: color }}));
        }
    }, [color])

    useEffect(() => {
        richText.current?.insertText(separator);
        setNoteState(prev => ({ ...prev, separator: null }));
    }, [separator])

    useEffect(() => {
        richText.current?.insertImage(sticker);
        setNoteState(prev => ({ ...prev, sticker: null }))
    }, [sticker])

    const handleFocusContent = useCallback(() => {
        if (!drawing.isDrawing && !readingMode) {
            setNoteState(prev => ({ ...prev, fontSize: null }));
            if (!focused) {
                setNoteState(prev => ({ ...prev, focused: true }));
                if (richText.current) {
                    richText.current.focusContentEditor();
                }
            }
        }
    }, [drawing.isDrawing, readingMode, focused])

    const handleCursorPosition = useCallback((scrollY) => scrollRef.current.scrollTo({ y: scrollY - 85, animated: true }), []);

    const handleHeightChange = (height) => {
        const limitedHeight = height > 3500 ? 3500 : height;
        setNoteState(prev => ({ ...prev, editorHeight: limitedHeight }));
    };

    const insertCheckbox = () => richText.current.insertHTML(`<input type="checkbox" />`)
    

    // Setters para actualizar los valores del estado de la nota
    const setDrawing = useCallback((d) => setNoteState(prev => ({ ...prev, drawing: d })), []);
    const setFontSize = useCallback((fs) => setNoteState(prev => ({ ...prev, fontSize: fs })), []);
    const setSeparator = useCallback((s) => setNoteState(prev => ({ ...prev, separator: s })), []);
    const setColor = useCallback((c) => setNoteState(prev => ({ ...prev, color: c })), []);
    const setEditorHeight = useCallback((h) => setNoteState(prev => ({ ...prev, editorHeight: h })), []);
    const setOpenStickers = useCallback((os) => setNoteState(prev => ({ ...prev, openStickers: os })), []);
    const setSticker = useCallback((s) => setNoteState(prev => ({ ...prev, sticker: s })), []);
    const setActiveOption = useCallback((ao) => setNoteState(prev => ({ ...prev, activeOption: ao })), []);

    return (
        <>
            <Stack.Screen options={{
                header: () => (
                    <HeaderNoteContainer
                        drawing={drawing}
                        setDrawing={setDrawing}
                        note={note}
                        readingMode={readingMode}
                        setReadingMode={(rm) => setNoteState(prev => ({ ...prev, readingMode: rm }))}
                        back={back}
                        saveNote={saveNote}
                        noteSavedId={noteSavedId}
                        richText={richText}
                        activeOption={activeOption}
                        setActiveOption={setActiveOption}
                    />
                )
            }} />

            <Note note={note}
                readingMode={readingMode}
                fontSize={fontSize}
                setFontSize={setFontSize}
                richText={richText}
                separator={separator}
                setSeparator={setSeparator}
                handleCursorPosition={handleCursorPosition}
                handleFocusContent={handleFocusContent}
                scrollRef={scrollRef}
                font={font}
                color={color}
                setColor={setColor}
                editorHeight={editorHeight}
                setEditorHeight={setEditorHeight}
                drawing={drawing}
                setDrawing={setDrawing}
                sketchPadRef={sketchPadRef}
                openStickers={openStickers}
                setOpenStickers={setOpenStickers}
                sticker={sticker}
                setSticker={setSticker}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
                handleHeightChange={handleHeightChange}
                insertCheckbox={insertCheckbox}
            />
        </>


    )
}
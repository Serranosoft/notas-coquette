import Note from "./note";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { Stack, router, useFocusEffect, useLocalSearchParams } from "expo-router";
import { ancizar, madimi, ojuju, oswald, roboto } from "../utils/fonts";
import HeaderNoteContainer from "./header-note-container";
import uuid from 'react-native-uuid';
import useBackHandler from "../components/use-back-handler";
import { Alert, AppState, Platform, ToastAndroid } from "react-native";
import { save } from "../utils/storage";
import { LangContext } from "../utils/Context";
import { getNoteFromId } from "../utils/sqlite";
import * as Speech from 'expo-speech';
import { userPreferences } from "../utils/user-preferences";

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
        letterSpacing: null,
        wordSpacing: null,
        lineSpacing: null,
        noteSavedId: null,
        focused: false,
        editorHeight: 600,
        openStickers: false,
        sticker: null,
        activeOption: null,
        playing: false,
        isNew: true,
        drawing: { isDrawing: false, color: "rgb(85,172,238)", width: 2, mode: "scroll", visible: true },
    });

    const [isReady, setIsReady] = useState(false);
    const [voiceState, setVoiceState] = useState(null);

    const {
        note, fontSize, separator, readingMode, font, noteSavedId,
        focused, editorHeight, openStickers, sticker, activeOption, drawing,
        letterSpacing, lineSpacing, wordSpacing, playing, isNew
    } = noteState;

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
                setNoteState(prev => ({ ...prev, isNew: false }));
            } else {
                noteData = { id: uuid.v4(), content: "", date: Date.now(), pwd: "" };
            }

            setNoteState(prev => ({
                ...prev,
                note: noteData,
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
            // getFont(); // Obtiene la fuente en el que va a instanciar el editor
            getUserPreferences();
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

    useEffect(() => {
        if (
            note &&
            lineSpacing !== null &&
            letterSpacing !== null &&
            wordSpacing !== null &&
            font
        ) {
            setIsReady(true);
        }

    }, [note, lineSpacing, letterSpacing, wordSpacing, font])

    async function back() {
        // Cerrar reproductor de voz si se está reproduciendo
        if (playing) Speech.stop();
        // Guardar nota
        await saveNote();
        // Volver a la pantalla anterior
        router.back();
    }

    async function saveNote() {
        richText.current.dismissKeyboard();
        setNoteState(prev => ({
            ...prev,
            activeOption: null,
            drawing: { ...prev.drawing, isDrawing: false }
        }));

        const isSaved = await save({ ...{ note, noteSavedId, hasDraws: sketchPadRef.current.hasDraws() } });
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

    async function getUserPreferences() {

        // Font
        let font = {};
        font.fontFamily = await AsyncStorage.getItem(userPreferences.FONT);
        if (!font.fontFamily) font.fontFamily = "ancizar";

        switch (font.fontFamily) {
            case "ancizar": font.fontFace = ancizar; break;
            case "roboto": font.fontFace = roboto; break;
            case "madimi": font.fontFace = madimi; break;
            case "oswald": font.fontFace = oswald; break;
            case "ojuju": font.fontFace = ojuju; break;
        }
        setNoteState(prev => ({ ...prev, font: font }));

        // Line spacing
        const lineSpacing = await AsyncStorage.getItem(userPreferences.LINE_SPACING);
        setNoteState(prev => ({ ...prev, lineSpacing: lineSpacing }));

        // Word spacing
        const wordSpacing = await AsyncStorage.getItem(userPreferences.WORD_SPACING);
        setNoteState(prev => ({ ...prev, wordSpacing: wordSpacing }));

        // Letter spacing
        const letterSpacing = await AsyncStorage.getItem(userPreferences.LETTER_SPACING);
        setNoteState(prev => ({ ...prev, letterSpacing: letterSpacing }));

        // Voice
        const voice = await AsyncStorage.getItem(userPreferences.VOICE);
        const pitch = await AsyncStorage.getItem(userPreferences.PITCH);
        const rate = await AsyncStorage.getItem(userPreferences.RATE);
        setVoiceState({ voice: voice, pitch: pitch, rate: rate })
    }


    useEffect(() => {
        richText.current?.setFontSize(fontSize);
    }, [fontSize])

    useEffect(() => {
        richText.current?.insertText(separator);
        setNoteState(prev => ({ ...prev, separator: null }));
    }, [separator])

    useEffect(() => {
        if (sticker) {
            richText.current?.insertImage(sticker);
            setNoteState(prev => ({ ...prev, sticker: null }))
        }
    }, [sticker])

    // No permitir dibujar en el caso de que readingMode es true
    useEffect(() => {
        if (readingMode) {
            if (drawing.isDrawing) {
                setNoteState(prev => ({ ...prev, drawing: { ...drawing, mode: "scroll" } }));
            }
        }
    }, [readingMode])

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


    // Encargado de reproducir una nota
    const handleNotePlaying = () => {
        if (playing) {
            Speech.stop();
        } else {
            if (!note.content) return "";

            const thingToSay = note.content
                // Eliminamos imágenes
                .replace(/<img[^>]*>/gi, "")
                // Reemplazamos <li> por saltos de línea con viñeta opcional
                .replace(/<li[^>]*>/gi, "\n• ")
                .replace(/<\/li>/gi, "")
                // Reemplazamos <br> y <div> por saltos de línea
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/<\/div>/gi, "\n")
                // Quitamos todas las etiquetas restantes
                .replace(/<[^>]+>/g, "")
                // Decodificamos entidades comunes
                .replace(/&nbsp;/g, " ")
                .replace(/&amp;/g, "&")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                // Limpiamos espacios extra
                .replace(/\n{2,}/g, "\n")
                .replace(/\s+/g, " ")
                .trim();

            Speech.speak(
                thingToSay,
                {
                    voice: voiceState.voice,
                    pitch: parseFloat(voiceState.pitch),
                    rate: parseFloat(voiceState.rate),
                    onPause: () => setNoteState(prev => ({ ...prev, playing: false })),
                    onStopped: () => setNoteState(prev => ({ ...prev, playing: false })),
                    onDone: () => setNoteState(prev => ({ ...prev, playing: false })),
                    onStart: () => setNoteState(prev => ({ ...prev, playing: true }))
                }
            );
        }
    }

    const handleCursorPosition = useCallback((scrollY) => scrollRef.current.scrollTo({ y: scrollY - 85, animated: true }), []);

    const handleHeightChange = (height) => {
        const limitedHeight = height > 3500 ? 3500 : height;
        setNoteState(prev => ({ ...prev, editorHeight: limitedHeight }));
    };

    const insertCheckbox = () => richText.current.insertHTML(`<input type="checkbox" />`)
    const changeColor = (color) => richText.current.setForeColor(color);
    const changeHiliteColor = (color) => richText.current.setHiliteColor(color);

    // Setters para actualizar los valores del estado de la nota
    const setDrawing = useCallback((d) => setNoteState(prev => ({ ...prev, drawing: d })), []);
    const setFontSize = useCallback((fs) => setNoteState(prev => ({ ...prev, fontSize: fs })), []);
    const setSeparator = useCallback((s) => setNoteState(prev => ({ ...prev, separator: s })), []);
    const setEditorHeight = useCallback((h) => setNoteState(prev => ({ ...prev, editorHeight: h })), []);
    const setOpenStickers = useCallback((os) => setNoteState(prev => ({ ...prev, openStickers: os })), []);
    const setSticker = useCallback((s) => setNoteState(prev => ({ ...prev, sticker: s })), []);
    const setActiveOption = useCallback((ao) => setNoteState(prev => ({ ...prev, activeOption: ao })), []);

    return (
        <>
            <Stack.Screen options={{
                header: () => (
                    <HeaderNoteContainer
                        setIsReady={setIsReady}
                        drawing={drawing}
                        setDrawing={setDrawing}
                        note={note}
                        readingMode={readingMode}
                        setReadingMode={(rm) => setNoteState(prev => ({ ...prev, readingMode: rm }))}
                        back={back}
                        richText={richText}
                        activeOption={activeOption}
                        setActiveOption={setActiveOption}
                        handleNotePlaying={handleNotePlaying}
                        playing={playing}
                        voiceState={voiceState}
                        isNew={isNew}
                    />
                )
            }} />

            <Note
                isReady={isReady}
                note={note}
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
                changeColor={changeColor}
                changeHiliteColor={changeHiliteColor}
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
                lineSpacing={lineSpacing}
                wordSpacing={wordSpacing}
                letterSpacing={letterSpacing}
            />
        </>


    )
}
import { useState, useEffect, useRef, useCallback } from 'react';
import { AppState, Alert, ToastAndroid, Platform } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';
import { router } from "expo-router";

import { save } from "../utils/storage";
import { getNoteFromId } from "../utils/sqlite";
import { userPreferences } from "../utils/user-preferences";
import { ancizar, madimi, ojuju, oswald, roboto } from "../utils/fonts";

export function useNoteLogic(id, source, language, richTextRef, sketchPadRef, setDrawing, stopSpeech) {
    const scrollRef = useRef(null);

    const [isReady, setIsReady] = useState(false);
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
        isNew: true,
    });

    // Destructure for internal use, but we also return noteState
    const {
        note, lineSpacing, letterSpacing, wordSpacing, font,
        noteSavedId, activeOption, readingMode, focused
    } = noteState;

    // --- Lifecycle & Initialization ---

    // Load Note
    useEffect(() => {
        async function getNote() {
            const fetchedNote = await getNoteFromId(id);
            let noteData;

            if (fetchedNote) {
                noteData = fetchedNote;
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
    }, [id]);

    // Load Preferences
    const getUserPreferences = useCallback(async () => {
        // Font
        let fontObj = {};
        fontObj.fontFamily = await AsyncStorage.getItem(userPreferences.FONT);
        if (!fontObj.fontFamily) fontObj.fontFamily = "ancizar";

        switch (fontObj.fontFamily) {
            case "ancizar": fontObj.fontFace = ancizar; break;
            case "roboto": fontObj.fontFace = roboto; break;
            case "madimi": fontObj.fontFace = madimi; break;
            case "oswald": fontObj.fontFace = oswald; break;
            case "ojuju": fontObj.fontFace = ojuju; break;
        }

        const lSpacing = await AsyncStorage.getItem(userPreferences.LINE_SPACING);
        const wSpacing = await AsyncStorage.getItem(userPreferences.WORD_SPACING);
        const letSpacing = await AsyncStorage.getItem(userPreferences.LETTER_SPACING);

        setNoteState(prev => ({
            ...prev,
            font: fontObj,
            lineSpacing: lSpacing,
            wordSpacing: wSpacing,
            letterSpacing: letSpacing
        }));
    }, []);

    // Helper to refresh prefs when screen is focused
    const refreshPreferences = useCallback(() => {
        setNoteState(prev => ({ ...prev, font: null }));
        getUserPreferences();
    }, [getUserPreferences]);

    // Check Readiness
    useEffect(() => {
        if (note && lineSpacing !== null && letterSpacing !== null && wordSpacing !== null && font) {
            setIsReady(true);
        }
    }, [note, lineSpacing, letterSpacing, wordSpacing, font]);

    // App State Listener (Auto-save)
    useEffect(() => {
        const subscription = AppState.addEventListener("change", setAppStateChanged);
        return () => subscription.remove();
    }, []);

    useEffect(() => {
        if (note) saveNote();
    }, [appStateChanged]);


    // --- Actions ---

    const saveNote = async () => {
        // Dismiss keyboard
        richTextRef.current?.dismissKeyboard();

        // Reset UI states, but preserve recording island (it handles its own cleanup)
        setNoteState(prev => ({ ...prev, activeOption: prev.activeOption === "recording" ? "recording" : null }));
        setDrawing(prev => ({ ...prev, isDrawing: false }));

        if (!note) return;

        const isSaved = await save({
            note,
            noteSavedId,
            hasDraws: sketchPadRef.current?.hasDraws()
        });

        sketchPadRef.current?.save(); // Save drawings

        if (isSaved) {
            onSaveToast();
        }
    };

    const onSaveToast = () => {
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(
                language.t("_toastNoteSaved"),
                ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50
            );
        } else {
            Alert.alert(language.t("_toastNoteSaved"));
        }
    };

    const back = async () => {
        stopSpeech();
        await saveNote();

        // Force-close recording island before navigating (expo-router may not unmount)
        setNoteState(prev => ({ ...prev, activeOption: null }));

        if (source === "template") {
            router.navigate("/");
        } else {
            router.back();
        }
    };

    // --- UI Handlers ---

    const handleFocusContent = useCallback((isDrawing) => {
        if (!isDrawing && !readingMode) {
            setNoteState(prev => ({ ...prev, fontSize: null }));
            if (!focused) {
                setNoteState(prev => ({ ...prev, focused: true }));
                richTextRef.current?.focusContentEditor();
            }
        }
    }, [readingMode, focused]);

    const handleHeightChange = useCallback((height) => {
        const limitedHeight = height > 3500 ? 3500 : height;
        setNoteState(prev => ({ ...prev, editorHeight: limitedHeight }));
    }, []);

    const handleCursorPosition = useCallback((scrollY) => {
        scrollRef.current?.scrollTo({ y: scrollY - 85, animated: true });
    }, []);

    // Editor Helpers
    const insertCheckbox = () => richTextRef.current?.insertHTML(`<input type="checkbox" />`);
    const changeColor = (color) => richTextRef.current?.setForeColor(color);
    const changeHiliteColor = (color) => richTextRef.current?.setHiliteColor(color);

    // Setters
    const setters = {
        setFontSize: (fs) => setNoteState(prev => ({ ...prev, fontSize: fs })),
        setSeparator: (s) => setNoteState(prev => ({ ...prev, separator: s })),
        setEditorHeight: (h) => setNoteState(prev => ({ ...prev, editorHeight: h })),
        setOpenStickers: (os) => setNoteState(prev => ({ ...prev, openStickers: os })),
        setSticker: (s) => setNoteState(prev => ({ ...prev, sticker: s })),
        setActiveOption: (ao) => setNoteState(prev => ({ ...prev, activeOption: ao })),
        setReadingMode: (rm) => setNoteState(prev => ({ ...prev, readingMode: rm })),
    };

    return {
        noteState,
        setNoteState, // Exposed if needed for effects in container
        isReady,
        setIsReady,
        scrollRef,
        saveNote,
        back,
        handleFocusContent,
        handleHeightChange,
        handleCursorPosition,
        insertCheckbox,
        changeColor,
        changeHiliteColor,
        refreshPreferences,
        ...setters
    };
}

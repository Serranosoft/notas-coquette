import Settings from "./settings";
import { Alert, Platform, ToastAndroid } from "react-native";
import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useState } from "react";
import HeaderSettingsContainer from "./header-settings-container";
import { storage } from "../utils/storage";
import { LangContext } from "../utils/Context";
import { deleteAllNotes } from "../utils/sqlite";

export default function SettingsContainer() {

    const { language } = useContext(LangContext);

    const [autoSave, setAutoSave] = useState(true);
    const [typo, setTypo] = useState(null);
    const [forceHome, setForceHome] = useState(false);
    const [lineSpacing, setLineSpacing] = useState(1.2);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [wordSpacing, setWordSpacing] = useState(0);

    useEffect(() => {
        getData();
    }, []);

    /* useEffect(() => {
        updateLineSpacing();
    }, [lineSpacing]) */

    async function updateTypo(typo) {
        setTypo(typo);
        setForceHome(true);
        await AsyncStorage.setItem(storage.FONT, typo);
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(language.t("_toastTypoSaved"), ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert(language.t("_toastTypoSaved"));
        }
    }

    async function updateAutoSave() {
        setAutoSave(autoSave => !autoSave);
        await AsyncStorage.setItem(storage.AUTOSAVE, !autoSave ? "true" : "false");
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(`${language.t("_toastAutoSave")} ${!autoSave ? language.t("_toastActivated") : language.t("_toastDeactivated")}`, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert(`${language.t("_toastAutoSave")} ${!autoSave ? language.t("_toastActivated") : language.t("_toastDeactivated")}`);
        }
    }


    async function getData() {
        const font = await AsyncStorage.getItem(storage.FONT);
        const autosave = await AsyncStorage.getItem(storage.AUTOSAVE);
        const lineSpacing = await AsyncStorage.getItem(storage.LINE_SPACING);
        const wordSpacing = await AsyncStorage.getItem(storage.WORD_SPACING);
        const letterSpacing = await AsyncStorage.getItem(storage.LETTER_SPACING);

        if (font) {
            setTypo(font);
        } else {
            setTypo("roboto")
        }

        if (autosave) setAutoSave(autosave === "true" ? true : false);
        if (lineSpacing) setLineSpacing(parseFloat(lineSpacing));
        if (wordSpacing) setWordSpacing(parseFloat(wordSpacing));
        if (letterSpacing) setLetterSpacing(parseFloat(letterSpacing));
    }

    async function removeAll() {
        await deleteAllNotes();
        router.push("/");
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(language.t("_toastAllNotesDeleted"), ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert(language.t("_toastAllNotesDeleted"));
        }
    }

    async function updateLineSpacing(lineSpacing) {
        await AsyncStorage.setItem(storage.LINE_SPACING, lineSpacing+"");
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(language.t("_toastLineSpacingUpdated"), ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert(language.t("_toastLineSpacingUpdated"));
        }
    }

    async function updateLetterSpacing(letterSpacing) {
        await AsyncStorage.setItem(storage.LETTER_SPACING, letterSpacing+"");
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(language.t("_toastLetterSpacingUpdated"), ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert(language.t("_toastLetterSpacingUpdated"));
        }
    }

    async function updateWordSpacing(wordSpacing) {
        await AsyncStorage.setItem(storage.WORD_SPACING, wordSpacing+"");
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(language.t("_toastWordSpacingUpdated"), ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert(language.t("_toastWordSpacingUpdated"));
        }
    }


    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderSettingsContainer forceHome={forceHome} /> }} />
            <Settings {...
                {
                    removeAll, 
                    updateAutoSave, 
                    updateTypo, 
                    autoSave, 
                    typo,
                    updateLineSpacing,
                    lineSpacing,
                    setLineSpacing,
                    updateLetterSpacing,
                    setLetterSpacing,
                    letterSpacing,
                    wordSpacing,
                    updateWordSpacing,
                    setWordSpacing
                }
            }
            />
        </>
    )
}
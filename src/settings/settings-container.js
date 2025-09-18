import Settings from "./settings";
import { Alert, Platform, ToastAndroid } from "react-native";
import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useContext, useEffect, useRef, useState } from "react";
import HeaderSettingsContainer from "./header-settings-container";
import { userPreferences } from "../utils/user-preferences";
import { LangContext } from "../utils/Context";
import { deleteAllNotes } from "../utils/sqlite";
import * as Speech from 'expo-speech';
import { getLocales } from "expo-localization";

export default function SettingsContainer() {

    const { language } = useContext(LangContext);

    const [typo, setTypo] = useState(null);
    const [forceHome, setForceHome] = useState(false);
    const [lineSpacing, setLineSpacing] = useState(1.2);
    const [letterSpacing, setLetterSpacing] = useState(0);
    const [wordSpacing, setWordSpacing] = useState(0);
    const [voiceState, setVoiceState] = useState({ voice: null, pitch: 1.0, rate: 1.0 });
    const [voiceHasChanged, setVoiceHasChanged] = useState(false);
    const [availableVoices, setAvailableVoices] = useState([]);

    useEffect(() => {
        getPreferences(); // Obtener todas las preferencias persistidas
        getAvailableVoices(); // Obtener todas las voces disponibles para renderizar en el selector
    }, []);

    async function getAvailableVoices() {
        const language = getLocales()[0].languageTag;
        let options = await Speech.getAvailableVoicesAsync();
        options = options.filter((el) => el.language == language);
        options.forEach((el, _index) => el.label = `Voz ${(_index + 1)}`);
        setAvailableVoices(options);
    }

    async function updateTypo(typo) {
        setTypo(typo);
        setForceHome(true);
        await AsyncStorage.setItem(userPreferences.FONT, typo);
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(language.t("_toastTypoSaved"), ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert(language.t("_toastTypoSaved"));
        }
    }

    async function getPreferences() {
        const font = await AsyncStorage.getItem(userPreferences.FONT);
        const lineSpacing = await AsyncStorage.getItem(userPreferences.LINE_SPACING);
        const wordSpacing = await AsyncStorage.getItem(userPreferences.WORD_SPACING);
        const letterSpacing = await AsyncStorage.getItem(userPreferences.LETTER_SPACING);
        const voice = await AsyncStorage.getItem(userPreferences.VOICE);
        const rate = await AsyncStorage.getItem(userPreferences.RATE);
        const pitch = await AsyncStorage.getItem(userPreferences.PITCH);
        console.log(rate);
        console.log(pitch);
        if (font) {
            setTypo(font);
        } else {
            setTypo("roboto")
        }

        if (lineSpacing) setLineSpacing(parseFloat(lineSpacing));
        if (wordSpacing) setWordSpacing(parseFloat(wordSpacing));
        if (letterSpacing) setLetterSpacing(parseFloat(letterSpacing));
        if (voice) setVoiceState(prev => ({ ...prev, voice: voice }));
        if (rate) setVoiceState(prev => ({ ...prev, rate: parseFloat(rate) }));
        if (pitch) setVoiceState(prev => ({ ...prev, pitch: parseFloat(pitch) }));
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
        await AsyncStorage.setItem(userPreferences.LINE_SPACING, lineSpacing + "");
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(language.t("_toastLineSpacingUpdated"), ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert(language.t("_toastLineSpacingUpdated"));
        }
    }

    async function updateLetterSpacing(letterSpacing) {
        await AsyncStorage.setItem(userPreferences.LETTER_SPACING, letterSpacing + "");
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(language.t("_toastLetterSpacingUpdated"), ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert(language.t("_toastLetterSpacingUpdated"));
        }
    }

    async function updateWordSpacing(wordSpacing) {
        await AsyncStorage.setItem(userPreferences.WORD_SPACING, wordSpacing + "");
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset(language.t("_toastWordSpacingUpdated"), ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert(language.t("_toastWordSpacingUpdated"));
        }
    }

    async function updateVoice({ voice, rate, pitch }) {
        
        if (voice) setVoiceState(prev => ({ ...prev, voice: voice }));
        if (rate) setVoiceState(prev => ({ ...prev, rate: rate }));
        if (pitch) setVoiceState(prev => ({ ...prev, pitch: pitch }));

        setVoiceHasChanged(true),

        await AsyncStorage.setItem(userPreferences.VOICE, voice);
        if (Platform.OS === "android") {
            ToastAndroid.showWithGravityAndOffset("Voz actualizada", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
        } else {
            Alert.alert("Voz actualizada");
        }
    }

    useEffect(() => {
        console.log(voiceHasChanged);
        if (voiceHasChanged) {
            console.log(voiceState);
            Speech.speak("Esta es mi nota", { voice: voiceState.voice, rate: voiceState.rate, pitch: voiceState.pitch });
            setVoiceHasChanged(false);
        }
    }, [voiceHasChanged])


    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderSettingsContainer forceHome={forceHome} /> }} />
            <Settings {...
                {
                    removeAll,
                    updateTypo,
                    typo,
                    updateLineSpacing,
                    lineSpacing,
                    setLineSpacing,
                    updateLetterSpacing,
                    setLetterSpacing,
                    letterSpacing,
                    wordSpacing,
                    updateWordSpacing,
                    setWordSpacing,
                    voiceState,
                    updateVoice,
                    setVoiceState,
                    availableVoices
                }
            }
            />
        </>
    )
}
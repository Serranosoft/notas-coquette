import { SplashScreen, Stack } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { createRef, useEffect, useState } from "react";
import { useFonts } from "expo-font";
import { colors } from "../src/utils/styles";
import { setInitialNote } from "../src/utils/setInitialNote";
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js'
import { translations } from "../src/utils/localizations";
import { AdsContext, LangContext } from "../src/utils/Context";
import AdsHandler from "../src/utils/AdsHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../src/utils/storage";
import { addNote, initDb } from "../src/utils/sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";

SplashScreen.preventAutoHideAsync();

export default function Layout() {

    // Carga de fuentes.
    const [fontsLoaded] = useFonts({
        "aroma": require("../assets/fonts/Aroma.ttf"),
        "roboto": require("../assets/fonts/Roboto.ttf"),
        "madimi": require("../assets/fonts/Madimi.ttf"),
        "oswald": require("../assets/fonts/Oswald.ttf"),
        "ojuju": require("../assets/fonts/Ojuju.ttf"),
    });


    // Migration progress.
    // Esta migración se debe a que anteriormente las notas y su contenido se almacenaban en el AsyncStorage del dispositivo
    // y ahora se está persistiendo a una base de datos SQLite.
    useEffect(() => {
        init();
        startNotesMigration();
    }, [])

    async function init() {
        await initDb();
    }

    async function startNotesMigration() {

        let migrated = await AsyncStorage.getItem(storage.MIGRATED);
        if (!migrated) {
            let notes = await AsyncStorage.getItem(storage.NOTES) || [];
            if (notes.length > 0) {
                // Obtener notas.
                notes = JSON.parse(notes);
                // Para cada nota, crear un nuevo registro en sqlite.
                notes.forEach(async (note) => {
                    await addNote(note.content, note.pwd, note.color, note.date);
                })
                // Notificar que ya se ha realizado la migración para no volver a repetirla.
                await AsyncStorage.setItem(storage.MIGRATED, "true");
                // No borrar el AsyncStorage por si debo recuperar los registros en el próximo despliegue. 
            }
        }
    }



    // Idioma
    const [language, setLanguage] = useState(getLocales()[0].languageCode || "es");
    const i18n = new I18n(translations);
    i18n.locale = language;
    i18n.enableFallback = true
    i18n.defaultLocale = "es";

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    useEffect(() => {
        getLanguage();
        setInitialNote();
    }, [])

    async function getLanguage() {
        const language = await AsyncStorage.getItem(storage.LANGUAGE);
        setLanguage(language || "es");
    }

    const [adTrigger, setAdTrigger] = useState(0);
    const [showOpenAd, setShowOpenAd] = useState(true);
    const adsHandlerRef = createRef();

    useEffect(() => {
        if (adTrigger > 4) {
            // adsHandlerRef.current.showIntersitialAd();
            // setAdTrigger(0);
        }
    }, [adTrigger])

    // Esperar hasta que las fuentes se carguen
    if (!fontsLoaded) {
        return null;
    }

    return (
        <GestureHandlerRootView style={styles.wrapper}>
            <AdsContext.Provider value={{ setAdTrigger: setAdTrigger, setShowOpenAd: setShowOpenAd }}>
                <AdsHandler ref={adsHandlerRef} showOpenAd={showOpenAd} setShowOpenAd={setShowOpenAd} />
                <LangContext.Provider value={{ setLanguage: setLanguage, language: i18n }}>
                    <View style={styles.container}>
                        <Stack />
                        <StatusBar style="light" />
                    </View>
                </LangContext.Provider >
            </AdsContext.Provider>
        </GestureHandlerRootView>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
        // paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.light
    },
    wrapper: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
    }
})
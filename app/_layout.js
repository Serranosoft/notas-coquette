import { Stack } from "expo-router";
import { View, StatusBar, StyleSheet, Platform } from "react-native";
import { createRef, useEffect, useState } from "react";
import { colors } from "../src/utils/styles";
import { setInitialNote } from "../src/utils/setInitialNote";
import { getLocales } from 'expo-localization';
import { I18n } from 'i18n-js'
import { translations } from "../src/utils/localizations";
import { AdsContext, LangContext } from "../src/utils/Context";
import AdsHandler from "../src/utils/AdsHandler";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { addNote, initDb } from "../src/utils/sqlite";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import UpdatesModal from "../src/modals/updates-modal";
import * as StoreReview from 'expo-store-review';
import { userPreferences } from "../src/utils/user-preferences";
import * as Notifications from 'expo-notifications';
import { scheduleWeeklyNotification } from "../src/utils/notifications";
import Constants from "expo-constants";

export default function Layout() {

    // Idioma
    const [langRdy, setLangRdy] = useState(false);
    const [language, setLanguage] = useState(getLocales()[0].languageCode);
    const i18n = new I18n(translations);
    if (language) i18n.locale = language;
    i18n.enableFallback = true
    i18n.defaultLocale = "es";

    // Gestión de anuncios
    const [adsLoaded, setAdsLoaded] = useState(false);
    const [adTrigger, setAdTrigger] = useState(0);
    const [showOpenAd, setShowOpenAd] = useState(true);
    const adsHandlerRef = createRef();

    // Arrancar base de datos, configurar notificaciones y cargar preferencias de usuario
    useEffect(() => {
        getUserPreferences();
        configureNotifications();
        init();
    }, [])

    // Al terminar de configurar el idioma se lanza notificación
    useEffect(() => {
        if (langRdy) {
            scheduleWeeklyNotification(i18n);
        }
    }, [language, langRdy])

    // Gestión de anuncios
    useEffect(() => {
        if (adTrigger > 3) {
            askForReview();
        }
        if (adsLoaded) {
            if (adTrigger > 4) {
                adsHandlerRef.current.showIntersitialAd();
                setAdTrigger(0);
            }
        }
    }, [adTrigger])

    async function init() {
        await initDb();
        await setInitialNote(language);
        // Migration progress.
        // Esta migración se debe a que anteriormente las notas y su contenido se almacenaban en el AsyncStorage del dispositivo
        // y ahora se está persistiendo a una base de datos SQLite.
        await startNotesMigration();
    }

    async function startNotesMigration() {

        let migrated = await AsyncStorage.getItem(userPreferences.MIGRATED);
        if (!migrated) {
            let notes = await AsyncStorage.getItem(userPreferences.NOTES) || [];
            if (notes.length > 0) {
                // Obtener notas.
                notes = JSON.parse(notes);
                // Para cada nota, crear un nuevo registro en sqlite.
                notes.forEach(async (note) => {
                    await addNote(note.id, note.content, note.pwd, note.date);
                })
                // Notificar que ya se ha realizado la migración para no volver a repetirla.
                await AsyncStorage.setItem(userPreferences.MIGRATED, "true");
                // No borrar el AsyncStorage por si debo recuperar los registros en el próximo despliegue. 
            }
        }
    }

    async function getUserPreferences() {
        // Language
        const language = await AsyncStorage.getItem(userPreferences.LANGUAGE);
        setLanguage(language || getLocales()[0].languageCode);
        setLangRdy(true);
    }

    async function configureNotifications() {
        Notifications.setNotificationHandler({
            handleNotification: async () => ({
                shouldShowBanner: true,
                shouldShowList: true,
                shouldPlaySound: false,
                shouldSetBadge: false,
            }),
        });
    }

    async function askForReview() {
        if (await StoreReview.hasAction()) {
            StoreReview.requestReview()
        }
    }

    return (
        <GestureHandlerRootView style={styles.wrapper}>
            <AdsContext.Provider value={{ setAdTrigger: setAdTrigger, adsLoaded: adsLoaded, setShowOpenAd: setShowOpenAd }}>
                <AdsHandler ref={adsHandlerRef} showOpenAd={showOpenAd} adsLoaded={adsLoaded} setAdsLoaded={setAdsLoaded} setShowOpenAd={setShowOpenAd} />
                <LangContext.Provider value={{ setLanguage: setLanguage, language: i18n }}>
                    <View style={[styles.container, Platform.OS === "ios" && styles.iosWrapper]}>
                        <Stack />
                        <StatusBar style="light" />
                    </View>
                    <UpdatesModal />
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
        backgroundColor: colors.light
    },
    iosWrapper: {
        paddingTop: Constants.statusBarHeight,
    },
    wrapper: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
    }
})
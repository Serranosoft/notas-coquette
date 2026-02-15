import { Stack } from "expo-router";
import { SplashScreen } from "expo-router";
import { View, StatusBar, StyleSheet, Platform } from "react-native";
import { createRef, useCallback, useEffect, useMemo, useState } from "react";
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
import { requestTrackingPermissionsAsync } from 'expo-tracking-transparency';

SplashScreen.preventAutoHideAsync();

export default function Layout() {

    // App State
    const [appIsReady, setAppIsReady] = useState(false);

    // Idioma
    const [language, setLanguage] = useState(getLocales()[0].languageCode);
    // Memoize i18n instance
    const i18n = useMemo(() => {
        const instance = new I18n(translations);
        if (language) instance.locale = language;
        instance.enableFallback = true;
        instance.defaultLocale = "es";
        return instance;
    }, [language]);

    // Gestión de anuncios
    const [adsLoaded, setAdsLoaded] = useState(false);
    const [adTrigger, setAdTrigger] = useState(0);
    const [showOpenAd, setShowOpenAd] = useState(true);
    const adsHandlerRef = createRef();

    // Arrancar base de datos, configurar notificaciones y cargar preferencias de usuario
    useEffect(() => {
        async function prepare() {
            try {
                await handleTrackingAds();
                if (Platform.OS === 'ios') {
                    await new Promise(resolve => setTimeout(resolve, 1000));
                }
                await getUserPreferences();
                await configureNotifications();
                await init();
            } catch (error) {
            } finally {
                setAppIsReady(true);
            }
        }
        prepare();
    }, [])

    // Al terminar de configurar el idioma se lanza notificación
    useEffect(() => {
        if (appIsReady) {
            scheduleWeeklyNotification(i18n);
        }
    }, [appIsReady, i18n])

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
    }, [adTrigger, adsLoaded])

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

    async function handleTrackingAds() {
        return await requestTrackingPermissionsAsync();
    }

    async function getUserPreferences() {
        // Language
        const language = await AsyncStorage.getItem(userPreferences.LANGUAGE);
        setLanguage(language || getLocales()[0].languageCode);
    }

    async function configureNotifications() {
        const { granted } = await Notifications.requestPermissionsAsync();
        if (granted) {
            await AsyncStorage.setItem(userPreferences.NOTIFICATION_PERMISSION, "true");
            Notifications.setNotificationHandler({
                handleNotification: async () => ({
                    shouldShowBanner: true,
                    shouldShowList: true,
                    shouldPlaySound: false,
                    shouldSetBadge: false,
                }),
            });
        } else {
            await AsyncStorage.setItem(userPreferences.NOTIFICATION_PERMISSION, "false");

        }
    }

    async function askForReview() {
        if (await StoreReview.hasAction()) {
            StoreReview.requestReview()
        }
    }

    const onLayoutRootView = useCallback(async () => {
        if (appIsReady) {
            await SplashScreen.hideAsync();
        }
    }, [appIsReady]);

    // Memoize context values to prevent unnecessary re-renders
    const adsContextValue = useMemo(() => ({
        setAdTrigger,
        adsLoaded,
        setShowOpenAd
    }), [adsLoaded, showOpenAd]);

    const langContextValue = useMemo(() => ({
        setLanguage,
        language: i18n
    }), [i18n]);

    if (!appIsReady) {
        return null;
    }

    return (
        <GestureHandlerRootView style={styles.wrapper}>
            <AdsContext.Provider value={adsContextValue}>
                <AdsHandler canStartAds={appIsReady} ref={adsHandlerRef} showOpenAd={showOpenAd} adsLoaded={adsLoaded} setAdsLoaded={setAdsLoaded} setShowOpenAd={setShowOpenAd} />
                <LangContext.Provider value={langContextValue}>
                    <View onLayout={onLayoutRootView} style={[styles.container, Platform.OS === "ios" && styles.iosWrapper]}>
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
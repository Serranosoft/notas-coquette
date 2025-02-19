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
import Constants from "expo-constants";

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
        setInitialNote();
    }, [])

    const [adTrigger, setAdTrigger] = useState(0);
    const [showOpenAd, setShowOpenAd] = useState(true);
    const adsHandlerRef = createRef();

    useEffect(() => {
        if (adTrigger > 4) {
            adsHandlerRef.current.showIntersitialAd();
            setAdTrigger(0);
        }
    }, [adTrigger])

    // Esperar hasta que las fuentes se carguen
    if (!fontsLoaded) {
        return null;
    }

    return (
        <AdsContext.Provider value={{ setAdTrigger: setAdTrigger, setShowOpenAd: setShowOpenAd }}>
            <AdsHandler ref={adsHandlerRef} showOpenAd={showOpenAd} setShowOpenAd={setShowOpenAd} />
            <LangContext.Provider value={{ setLanguage: setLanguage, language: i18n }}>
                <View style={styles.container}>
                    <Stack />
                    <StatusBar style="light" />
                </View>
            </LangContext.Provider >
        </AdsContext.Provider>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
        paddingTop: Constants.statusBarHeight,
        backgroundColor: colors.light
    },
    wrapper: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
    }
})
import { SplashScreen, Stack } from "expo-router";
import { View, StatusBar, StyleSheet } from "react-native";
import { useEffect } from "react";
import { useFonts } from "expo-font";
import { colors } from "../src/utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from 'react-native-uuid';

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

    useEffect(() => {
        if (fontsLoaded) {
            SplashScreen.hideAsync();
        }
    }, [fontsLoaded])

    useEffect(() => {
        async function setInitialNote() {
            const value = await AsyncStorage.getItem("FIRST_LAUNCH_APP");
            if (!value) {
                const id = uuid.v4();

                const notes = [];
                const newNote = {
                    id: id,
                    content: `<div><font size="5">Bienvenidx a <b>Notas Coquette </b>🥰<br></font></div><div><br></div><div><font size="5">Haz tus notas mas bonitas y editalas como quieras: </font></div><div><ul><li><b>Negritas</b></li><li><i>Cursivas</i></li><li><u>Subrayado</u></li><li style="text-align: center;">Alinear textos</li><li>Listados</li><li>Cambiar <font size="6">tamaño</font> <font size="3">de</font><font size="2"> los</font><font size="6"> textos</font></li><li><font size="5">Añadir separadores *:..｡o○</font></li><li><font size="5">Deshacer o rehacer cambios</font></li></ul></div>`,
                    date: new Date(),
                }
        
                notes.push(newNote);
                await AsyncStorage.setItem("notes", JSON.stringify(notes));
                await AsyncStorage.setItem("FIRST_LAUNCH_APP", "true");
            }
        }
        setInitialNote();
    }, [])

    // Esperar hasta que las fuentes se carguen
    if (!fontsLoaded) {
        return null;
    }

    return (
        <View style={styles.container}>
            <Stack />
            <StatusBar style="light" />
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "relative",
        justifyContent: "center",
        paddingTop: StatusBar.currentHeight,
        backgroundColor: colors.light
    },
    wrapper: {
        flex: 1,
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
    }
})
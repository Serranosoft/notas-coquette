import { FlatList, Image, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../src/utils/styles";
import { Stack, router, useLocalSearchParams } from "expo-router";
import HeaderSettings from "../src/components/headers/header-settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GridBackground from "../src/components/grid";
import { useEffect, useState } from "react";

const FONTS = [
    {
        key: "roboto",
        preview: require("../assets/madimi-preview.png")
    },
    {
        key: "madimi",
        preview: require("../assets/madimi-preview.png")
    },
    {
        key: "aroma",
        preview: require("../assets/madimi-preview.png")
    },
];

export default function Settings() {
    
    const [autoSave, setAutoSave] = useState(true);
    const [typo, setTypo] = useState(null);
    const [forceHome, setForceHome] = useState(false);

    useEffect(() => {
        getData();
    }, [])

    async function updateTypo(typo) {
        setTypo(typo);
        setForceHome(true);
        await AsyncStorage.setItem("font", typo);
        ToastAndroid.showWithGravityAndOffset("Tipografía guardada", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }

    async function updateAutoSave() {
        setAutoSave(autoSave => !autoSave);
        await AsyncStorage.setItem("autosave", !autoSave ? "true" : "false");
        ToastAndroid.showWithGravityAndOffset(`Guardado automatico ${!autoSave ? 'activado' : 'desactivado'}`, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }


    async function getData() {
        const font = await AsyncStorage.getItem("font");
        const autosave = await AsyncStorage.getItem("autosave");
        if (font) {
            setTypo(font);
        }
        if (autosave) {
            setAutoSave(autosave === "true" ? true : false);
        }
    }

    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderSettings forceHome={forceHome} /> }} />
            <View style={styles.container}>
                {
                    /* 
                    Ajustes .-
                        1. Editor de texto: Tipografia
                        2. Visualización: Layout del mosaico
                    */
                }
                <View style={styles.box}>
                    <Text style={[ui.h4, { color: "#000" }]}>Tipografia</Text>
                    <FlatList
                        horizontal={true}
                        data={FONTS}
                        contentContainerStyle={{ gap: 16 }}
                        renderItem={({ item: font }) => (
                            <TouchableOpacity onPress={() => updateTypo(font.key)} style={[styles.typoItem, font.key == typo && styles.typoSelected]}>
                                <GridBackground />
                                <Image source={font.preview} style={styles.typoImg} />
                            </TouchableOpacity>
                        )}
                    />
                    <Text style={ui.muted}>Al cambiar de tipografía se le enviará a la pantalla de inicio para cargar la nueva fuente</Text>

                </View>
                <View style={styles.box}>
                    <Text style={[ui.h4, { color: "#000" }]}>Ajustes del editor</Text>
                    <View style={styles.row}>
                        <Text>Guardado automático</Text>
                        <Switch 
                            style={styles.switch} 
                            trackColor={{ false: '#767577', true: colors.light }} 
                            thumbColor={autoSave ? colors.dark : '#f4f3f4'}
                            onValueChange={updateAutoSave}
                            value={autoSave}
                        />
                    </View>
                </View>
                <View style={styles.box}>

                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
        paddingHorizontal: 16,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8
    },

    switch: {
        transform: [{ scale: 1.3 }]
    },

    box: {
        gap: 16,
        backgroundColor: "#fff",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginVertical: 16
    },

    typoItem: {
        width: 120,
        position: "relative",
        height: 80,
        backgroundColor: "#fff",
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        marginRight: 8
    },

    typoImg: {
        width: "90%",
        height: "90%",
        resizeMode: "contain",
    },

    typoSelected: {
        borderWidth: 3,
        borderColor: colors.dark
    }
})
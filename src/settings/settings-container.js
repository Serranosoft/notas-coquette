import Settings from "./settings";
import { ToastAndroid } from "react-native";
import { Stack, router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import HeaderSettingsContainer from "./header-settings-container";

export const FONTS = [
    {
        key: "roboto",
        preview: require("../../assets/roboto-preview.png")
    },
    {
        key: "madimi",
        preview: require("../../assets/madimi-preview.png")
    },
    {
        key: "oswald",
        preview: require("../../assets/oswald-preview.png")
    },
    {
        key: "ojuju",
        preview: require("../../assets/ojuju-preview.png"),
    },
];

export default function SettingsContainer() {

    const [autoSave, setAutoSave] = useState(true);
    const [typo, setTypo] = useState(null);
    const [forceHome, setForceHome] = useState(false);

    useEffect(() => {
        getData();
    }, []);

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
        } else {
            setTypo("roboto")
        }

        if (autosave) setAutoSave(autosave === "true" ? true : false);
    }

    async function removeAll() {
        await AsyncStorage.setItem("notes", JSON.stringify([]));
        router.push("/");
        ToastAndroid.showWithGravityAndOffset(`Se han eliminado todas las notas`, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }


    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderSettingsContainer forceHome={forceHome} /> }} />
            <Settings {...{ removeAll, updateAutoSave, updateTypo, autoSave, typo }} />
        </>
    )
}
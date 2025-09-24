import { useEffect, useState } from "react";
import HeaderNote from "./header-note";
import { APP, userPreferences } from "../utils/user-preferences";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HeaderNoteContainer({
    drawing,
    setDrawing,
    note,
    setReadingMode,
    readingMode,
    updatePwd,
    saveNote,
    back,
    richText,
    activeOption,
    setActiveOption,
    setIsReady,
    handleNotePlaying,
    playing
}) {

    const [showOnboarding, setShowOnboarding] = useState(false);
    useEffect(() => {
        handleOnboarding();
    }, [])

    async function handleOnboarding() {
        const version = await AsyncStorage.getItem(userPreferences.TOOLTIP_VERSION);
        if (!version || version !== APP.currentVersion) {
            setShowOnboarding(true);
            await AsyncStorage.setItem(userPreferences.TOOLTIP_VERSION, APP.currentVersion);
        }
    }

    return (
        <HeaderNote
            {... {
                drawing,
                setDrawing,
                note,
                saveNote,
                back,
                setReadingMode,
                readingMode,
                updatePwd,
                richText,
                activeOption,
                setActiveOption,
                setIsReady,
                handleNotePlaying,
                playing,
                setShowOnboarding,
                showOnboarding
            }}
        />
    )
}
import { useEffect, useState } from "react";
import HeaderNote from "./header-note";
import { APP, userPreferences } from "../utils/user-preferences";
import AsyncStorage from "@react-native-async-storage/async-storage";
import useOnboarding from "../hooks/useOnboarding";

export default function HeaderNoteContainer({
    drawing,
    setDrawing,
    note,
    setReadingMode,
    readingMode,
    updatePwd,
    isNew,
    back,
    richText,
    activeOption,
    setActiveOption,
    setIsReady,
    handleNotePlaying,
    playing,
    voiceState
}) {

    const { showOnboarding, setShowOnboarding } = useOnboarding({ key: "onboarding.voice.v1", legacyKey: userPreferences.TOOLTIP_VERSION});

    return (
        <HeaderNote
            {... {
                drawing,
                setDrawing,
                note,
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
                showOnboarding,
                isNew,
                voiceState
            }}
        />
    )
}
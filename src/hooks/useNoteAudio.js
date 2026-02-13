import { useState, useEffect, useCallback } from 'react';
import * as Speech from 'expo-speech';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userPreferences } from "../utils/user-preferences";

export function useNoteAudio() {
    const [playing, setPlaying] = useState(false);
    const [voiceState, setVoiceState] = useState(null);

    useEffect(() => {
        async function getVoicePreferences() {
            const voice = await AsyncStorage.getItem(userPreferences.VOICE);
            const pitch = await AsyncStorage.getItem(userPreferences.PITCH);
            const rate = await AsyncStorage.getItem(userPreferences.RATE);
            setVoiceState({ voice: voice, pitch: pitch, rate: rate });
        }
        getVoicePreferences();
    }, []);

    const stopSpeech = useCallback(() => {
        Speech.stop();
        setPlaying(false);
    }, []);

    const handleNotePlaying = useCallback((content) => {
        if (playing) {
            stopSpeech();
        } else {
            if (!content) return "";

            const thingToSay = content
                .replace(/<img[^>]*>/gi, "")
                .replace(/<li[^>]*>/gi, "\n• ")
                .replace(/<\/li>/gi, "")
                .replace(/<br\s*\/?>/gi, "\n")
                .replace(/<\/div>/gi, "\n")
                .replace(/<[^>]+>/g, "")
                .replace(/&nbsp;/g, " ")
                .replace(/&amp;/g, "&")
                .replace(/&quot;/g, '"')
                .replace(/&#39;/g, "'")
                .replace(/\n{2,}/g, "\n")
                .replace(/\s+/g, " ")
                .trim();

            Speech.speak(
                thingToSay,
                {
                    voice: voiceState?.voice,
                    pitch: parseFloat(voiceState?.pitch || 1),
                    rate: parseFloat(voiceState?.rate || 1),
                    onPause: () => setPlaying(false),
                    onStopped: () => setPlaying(false),
                    onDone: () => setPlaying(false),
                    onStart: () => setPlaying(true)
                }
            );
        }
    }, [playing, voiceState, stopSpeech]);

    return {
        playing,
        voiceState,
        handleNotePlaying,
        stopSpeech
    };
}

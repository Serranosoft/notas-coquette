import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function useOnboarding({
    key,
    legacyKey
}) {
    const [showOnboarding, setShowOnboarding] = useState(false);

    useEffect(() => {
        handleOnboarding();
    }, []);

    async function handleOnboarding() {
        try {
            const seen = await AsyncStorage.getItem(key);
            if (seen) return;

            if (legacyKey) {
                const legacySeen = await AsyncStorage.getItem(legacyKey);
                if (legacySeen) {
                    await AsyncStorage.setItem(key, "true");
                    return;
                }
            }

            setShowOnboarding(true);
            await AsyncStorage.setItem(key, "true");

        } catch (e) {
            console.warn("Onboarding error", e);
        }
    }

    return { showOnboarding, setShowOnboarding };
}

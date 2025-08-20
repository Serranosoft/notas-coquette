import { useEffect } from "react";
import { BackHandler } from "react-native";

export default function useBackHandler(handler) {
    useEffect(() => {
        const subscription = BackHandler.addEventListener(
            "hardwareBackPress",
            handler
        );

        return () => subscription.remove();
    }, [handler]);
}
import Home from "./home";
import useBackHandler from "../components/use-back-handler";
import { Stack } from "expo-router";
import { useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderHome from "./header-home";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId, bannerIdIOS } from "../utils/constants";
import { Platform } from "react-native";

export default function HomeContainer() {
    const [notes, setNotes] = useState([]);
    const [selected, setSelected] = useState([]);
    const [columnNumber, setColumnNumber] = useState(2);

    useBackHandler(() => {
        if (selected.length > 0) {
            setSelected([]);
            return true;
        } else {
            return false;
        }
    });

    useFocusEffect(
        useCallback(() => {
            getNotes();
        }, [])
    );

    useEffect(() => {
        getGridLayout();
    }, [])

    async function getNotes() {
        let notes = await AsyncStorage.getItem("notes") || [];
        if (notes.length > 0) {
            notes = JSON.parse(notes);
        }
        setNotes([...notes].sort((a, b) => b.date - a.date));
    }

    async function getGridLayout() {
        const grid = await AsyncStorage.getItem("grid");
        if (grid !== null) {
            setColumnNumber(parseInt(grid));
        }
    }

    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderHome {...{setColumnNumber, columnNumber}} /> }} />
            <Home {...{ columnNumber, notes, setNotes, selected, setSelected}} />
            <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
        </>
    )
}
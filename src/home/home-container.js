import Home from "./home";
import useBackHandler from "../components/use-back-handler";
import { Stack } from "expo-router";
import { useFocusEffect } from "expo-router";
import { useCallback, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import HeaderHome from "./header-home";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId, bannerIdIOS } from "../utils/constants";
import { Platform } from "react-native";
import { userPreferences } from "../utils/user-preferences";
import { deleteNoteFromId, getAllNotes } from "../utils/sqlite";
import { AdsContext } from "../utils/Context";

export default function HomeContainer() {

    const [notes, setNotes] = useState([]);
    const [selected, setSelected] = useState([]);
    const [columnNumber, setColumnNumber] = useState(2);

    const { adsLoaded } = useContext(AdsContext);

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
        const notes = await getAllNotes();
        const sorted = notes.sort((a, b) =>
            (b.favorite - a.favorite) || (b.date - a.date)
        );
        setNotes(sorted);

    }

    const getGridLayout = useCallback(async () => {
        const grid = await AsyncStorage.getItem(userPreferences.GRID);
        if (grid !== null) {
            setColumnNumber(parseInt(grid));
        }
    })

    const deleteNotes = useCallback(async () => {
        selected.forEach(async (note) => await deleteNoteFromId(note));
        emptySelected();
        getNotes();
    }, [selected]);

    async function emptySelected() {
        setSelected([]);
    }

    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderHome {...{ setColumnNumber, columnNumber }} /> }} />
            <Home {...{ columnNumber, notes, deleteNotes, selected, setSelected, emptySelected }} />
            {adsLoaded && <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />}
        </>
    )
}
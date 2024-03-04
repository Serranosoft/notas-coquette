import { FlatList, StyleSheet, View } from "react-native";
import { Stack, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import HeaderHome from "../src/components/headers/header-home";
import NoteItem from "../src/components/note-item";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Actions from "../src/components/actions";
import HomeButton from "../src/components/home-button";
import Animated, { ZoomInEasyUp, ZoomOutEasyUp } from 'react-native-reanimated';
import { colors } from "../src/utils/styles";

export default function Index() {


    const [notes, setNotes] = useState([]);
    const [itemsSelected, setItemsSelected] = useState([]);
    const [columnNumber, setColumnNumber] = useState(2);

    useFocusEffect(
        useCallback(() => {
            getNotes();
        }, [])
    );

    async function getNotes() {
        let notes = await AsyncStorage.getItem("notes") || [];
        if (notes.length > 0) {
            notes = JSON.parse(notes);
        }
        setNotes([...notes]);
    }

    useEffect(() => {
        // 1. Obtener configuración del layout seleccionado
        getGridLayout();
    }, [])

    async function getGridLayout() {
        const grid = await AsyncStorage.getItem("grid");
        if (grid !== null) {
            setColumnNumber(parseInt(grid));
        }
    }

    return (
        <>
            <View style={styles.container}>
                <Stack.Screen options={{ header: () => <HeaderHome setColumnNumber={setColumnNumber} columnNumber={columnNumber} /> }} />

                <HomeButton />

                {
                    notes.length > 0 &&
                    <View style={{ flex: 1 }}>
                        <FlatList
                            key={columnNumber}
                            numColumns={columnNumber}
                            data={notes}
                            renderItem={(note) =>
                                <Animated.View style={{ flex: 1 / 2 }} entering={ZoomInEasyUp.duration(2000)} exiting={ZoomOutEasyUp.duration(2000)}>
                                    <NoteItem note={note.item} itemsSelected={itemsSelected} setItemsSelected={setItemsSelected} />
                                </Animated.View>
                            }
                            contentContainerStyle={{ gap: 12, paddingTop: 16, paddingBottom: 100 }}
                            columnWrapperStyle={columnNumber > 1 && { gap: 12 }}
                        />
                    </View>
                }

            </View>

            {itemsSelected.length > 0 && <Actions itemsSelected={itemsSelected} setNotes={setNotes} setItemsSelected={setItemsSelected} />}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
        paddingHorizontal: 16,
    },
})
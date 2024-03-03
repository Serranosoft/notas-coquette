import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, Stack, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import HeaderHome from "../src/components/headers/header-home";
import NoteItem from "../src/components/note-item";
import { colors, ui } from "../src/utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Actions from "../src/components/actions";
import HomeButton from "../src/components/home-button";
import Animated, { ZoomInEasyUp, ZoomInRotate, ZoomOutEasyUp, ZoomOutRotate } from 'react-native-reanimated';

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
        backgroundColor: "#ffc4d0",
        paddingHorizontal: 16,
    },




})
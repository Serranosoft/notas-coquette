import { Button, FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, Stack, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import HeaderHome from "../src/components/headers/header-home";
import NoteItem from "../src/components/note-item";
import { colors, ui } from "../src/utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Actions from "../src/components/actions";
import HomeButton from "../src/components/home-button";


export default function Index() {


    const [notes, setNotes] = useState([]);
    const [itemsSelected, setItemsSelected] = useState([]);

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
                <Stack.Screen options={{ header: () => <HeaderHome /> }} />

                <HomeButton />

                {
                    notes.length > 0 &&
                    <View style={{ flex: 1 }}>
                        <FlatList
                            data={notes}
                            numColumns={2}
                            renderItem={(note) => <NoteItem note={note.item} itemsSelected={itemsSelected} setItemsSelected={setItemsSelected} />}
                            contentContainerStyle={{ gap: 16, paddingTop: 16, paddingBottom: 100 }}
                            columnWrapperStyle={{ gap: 16 }}
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
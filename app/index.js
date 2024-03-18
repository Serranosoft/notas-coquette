import { FlatList, StyleSheet, Text, View } from "react-native";
import { Stack, useFocusEffect } from "expo-router";
import { useCallback, useEffect, useState } from "react";
import HeaderHome from "../src/components/headers/header-home";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Actions from "../src/components/actions";
import HomeButton from "../src/components/home-button";
import { colors, ui } from "../src/utils/styles";
import HomeFlatListItem from "../src/components/home-flatlist-item";

export default function Index() {

    const [notes, setNotes] = useState([]);
    const [selected, setSelected] = useState([]);
    const [columnNumber, setColumnNumber] = useState(2);

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
            <View style={styles.container}>
                <Stack.Screen options={{ header: () => <HeaderHome setColumnNumber={setColumnNumber} columnNumber={columnNumber} /> }} />

                <HomeButton />

                <View style={{ flex: 1 }}>
                    {
                        notes.length > 0 ?
                            <FlatList
                                key={columnNumber}
                                numColumns={columnNumber}
                                data={notes}
                                contentContainerStyle={{ gap: 32, paddingTop: 16, paddingBottom: 100 }}
                                columnWrapperStyle={columnNumber > 1 && { gap: 12 }}
                                renderItem={({ item, index }) => <HomeFlatListItem note={item} selected={selected} setSelected={setSelected} index={index} />}
                            />
                            :
                            <Text style={[ui.muted, { fontSize: 20 }]}>No tienes ninguna nota creada</Text>
                    }
                </View>

            </View>

            {selected.length > 0 && <Actions selected={selected} setNotes={setNotes} setSelected={setSelected} />}
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
import { Dimensions, FlatList, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Link, Stack } from "expo-router";
import { RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { useEffect, useRef, useState } from "react";
import GridBackground from "../src/components/grid";
import Header from "../src/components/headers/header-home";
import HeaderHome from "../src/components/headers/header-home";
import NoteItem from "../src/components/note-item";
import { ui } from "../src/utils/styles";

const DATA = [
    `<div><font size="6">a</font><font size="7">a</font><font size="1">aa</font><font size="2">a</font><font size="4">a</font><font size="5">a</font><font size="6">a</font><font size="7">a</font><font size="1">a</font><font size="2">a</font><font size="3">a</font><font size="4">a</font><font size="5">a</font><font size="6">a</font><font size="7">aa</font></div>`,
    "<div><p>BBB</p></div>",
    "<div><p>CCC</p></div>",
    "<div><p>DDD</p></div>"
]
export default function Index() {

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ header: () => <HeaderHome /> }} />

            <Link href="/note" asChild>
                <TouchableOpacity activeOpacity={0.7}>
                    <View style={styles.btn}>
                        <Text style={ui.h3}>+ Añadir nota</Text>
                        <Image style={styles.img} source={require("../assets/decoration-1.png")} />
                    </View>
                </TouchableOpacity>
            </Link>

            <View style={{ flex: 1 }}>
                <FlatList
                    data={DATA}
                    numColumns={2}
                    renderItem={({ item, index }) => <NoteItem text={item} />}
                    contentContainerStyle={{ gap: 16 }}
                    columnWrapperStyle={{ gap: 16 }}
                />
            </View>


        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#ffc4d0",
        paddingHorizontal: 16,
    },

    btn: {
        position: "relative",
        backgroundColor: "#EBBAB9",
        padding: 8,
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 60,
        marginBottom: 40,
        borderWidth: 3,
        borderColor: "#F1F5F4",
        borderRadius: 6,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },

    img: {
        position: "absolute",
        top: -75,
        left: 0,
        width: 140,
        height: 140,
        transform: [{ rotate: "-15deg" }],
        zIndex: 1
    }
})
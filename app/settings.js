import { FlatList, Image, StyleSheet, Switch, Text, ToastAndroid, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../src/utils/styles";
import { Stack } from "expo-router";
import HeaderSettings from "../src/components/headers/header-settings";
import AsyncStorage from "@react-native-async-storage/async-storage";
import GridBackground from "../src/components/grid";

const FONTS = [
    {
        key: "roboto",
        preview: require("../assets/madimi-preview.png")
    },
    {
        key: "madimi",
        preview: require("../assets/madimi-preview.png")
    },
    {
        key: "aroma",
        preview: require("../assets/madimi-preview.png")
    },
];

export default function Settings() {

    async function updateTypo(typo) {
        await AsyncStorage.setItem("font", typo);
        ToastAndroid.showWithGravityAndOffset("Tipografía guardada", ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }


    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderSettings /> }} />
            <View style={styles.container}>
                {
                    /* 
                    Ajustes .-
                        1. Editor de texto: Tipografia
                        2. Visualización: Layout del mosaico
                    */
                }
                <View style={styles.box}>
                    <Text style={[ui.h4, { color: "#000" }]}>Tipografia</Text>
                    <FlatList
                        horizontal={true}
                        data={FONTS}
                        contentContainerStyle={{ gap: 16 }}
                        renderItem={({ item: font }) => (
                            <TouchableOpacity onPress={() => updateTypo(font.key)} style={styles.typoItem}>
                                <GridBackground />
                                <Image source={font.preview} style={styles.typoImg} />
                            </TouchableOpacity>
                        )}
                    />

                </View>
                <View style={styles.box}>
                    <Text style={[ui.h4, { color: "#000" }]}>Ajustes del editor</Text>
                    <View style={styles.row}>
                        <Text>Guardado automático</Text>
                        <Switch
                            style={{ transform: [ { scale: 1.3 }]}}
                            trackColor={{ false: '#767577', true: '#81b0ff' }}
                            thumbColor={/* isEnabled ? '#f5dd4b' :  */'#f4f3f4'}
                            ios_backgroundColor="#3e3e3e"
                            // onValueChange={toggleSwitch}
                            // value={isEnabled}
                        />
                    </View>
                </View>
                <View style={styles.box}>

                </View>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
        paddingHorizontal: 16,
    },

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },

    box: {
        gap: 16,
        backgroundColor: "#fff",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginVertical: 16
    },

    typoItem: {
        width: 120,
        position: "relative",
        height: 80,
        backgroundColor: "#fff",
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        marginRight: 8
    },

    typoImg: {
        width: "90%",
        height: "90%",
        resizeMode: "contain",
    }
})
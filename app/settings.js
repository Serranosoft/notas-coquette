import { StyleSheet, View } from "react-native";
import { colors } from "../src/utils/styles";
import { Stack } from "expo-router";
import HeaderSettings from "../src/components/headers/header-settings";

export default function Settings() {


    return (
        <>
            <Stack.Screen options={{ header: () => <HeaderSettings /> }} />
            <View style={styles.container}>
                <View style={styles.box}>
                    
                </View>
                <View style={styles.box}>

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

    box: {
        backgroundColor: "#fff",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        flex: 1,
        marginVertical: 16
    }
})
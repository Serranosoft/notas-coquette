import { StyleSheet, View } from "react-native";
import { colors } from "../src/utils/styles";

export default function Settings() {


    return (
        <View style={styles.container}>
            
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.light,
        paddingHorizontal: 16,
    },
})
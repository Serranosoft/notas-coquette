import { Dimensions, StyleSheet, Text, View } from "react-native";
import { colors, ui } from "../utils/styles";
import { HomeFlatListItem } from "./home-flat-list-item";

const { width } = Dimensions.get("screen");


export default function HomeFavItems({ favNotes, columnNumber, selected, setSelected }) {

    const gapMultiplier = 16 * (columnNumber > 1 ? columnNumber - 1 : 0);

    return (
        <View style={styles.container}>
            <Text style={[ui.h4, ui.black]}>Mis favoritas</Text>
            <View style={styles.list}>
                {favNotes.map((item, index) => (
                    <View key={item.id} style={{
                        width: (width - gapMultiplier - 32) / columnNumber,
                        height: 200,
                    }}>
                        <HomeFlatListItem note={item} selected={selected} setSelected={setSelected} index={index} />
                    </View>
                ))}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 16,
        borderBottomWidth: 3,
        borderColor: colors.dark,
        gap: 16
    },
    list: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
})
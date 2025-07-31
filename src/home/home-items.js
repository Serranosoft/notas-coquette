import { Dimensions, StyleSheet, View } from "react-native"
import { gap } from "../utils/styles"
import { HomeFlatListItem } from "./home"
import { FlatList } from "react-native"

const { width } = Dimensions.get("screen");

export default function HomeItems({ notes, columnNumber, selected, setSelected }) {

    return (
        <View style={styles.container}>
            <View style={styles.list}>
                {
                    notes.map((item, index) => (
                        <View key={index} style={{
                            width: (width - 16 - 32) / columnNumber,
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
        paddingTop: 16,
    },
    list: {
        width: "100%",
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 16,
    },
})
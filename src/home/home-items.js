import { Dimensions, StyleSheet, View } from "react-native"
import { HomeFlatListItem } from "./home-flat-list-item";
import { memo } from "react";

const { width } = Dimensions.get("screen");

function HomeItems({ notes, columnNumber, selected, setSelected }) {

    const gapMultiplier = 16 * (columnNumber > 1 ? columnNumber - 1 : 0);

    return (
        <View style={styles.container}>
            <View style={styles.list}>
                {
                    notes.map((item, index) => (
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

export default memo(HomeItems); 

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
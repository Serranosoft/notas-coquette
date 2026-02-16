import { FlatList, View, Text, StyleSheet } from "react-native"
import HomeFlatListItem from "./home-flat-list-item";
import { memo, useCallback, useContext, useRef } from "react";
import { colors, layout } from "../utils/styles";
import { LangContext } from "../utils/Context";

function HomeItems({ notes, columnNumber, selected, setSelected }) {

    const { language } = useContext(LangContext);

    const selectedRef = useRef(selected);
    selectedRef.current = selected;

    const renderItem = useCallback(({ item }) => {
        const isSelected = selectedRef.current.includes(item.id);
        return <HomeFlatListItem note={item} isSelected={isSelected} setSelected={setSelected} />;
    }, [setSelected]);

    const getItemLayout = useCallback((data, index) => ({
        length: 241, // Height(225) + Gap(16)
        offset: 241 * index,
        index,
    }), []);

    return (
        <View style={[layout.flex, styles.container]}>
            <View style={layout.flex}>
                <FlatList
                    key={columnNumber}
                    numColumns={columnNumber}
                    data={notes}
                    extraData={selected}
                    contentContainerStyle={styles.contentList}
                    columnWrapperStyle={columnNumber > 1 ? { gap: 16 } : undefined}
                    ListHeaderComponent={
                        <Text style={styles.sectionTitle}>{language.t("_recent").toUpperCase()}</Text>
                    }
                    renderItem={renderItem}
                    keyExtractor={(item) => item.id}
                    showsVerticalScrollIndicator={false}
                    initialNumToRender={6}
                    windowSize={5}
                    maxToRenderPerBatch={10}
                    removeClippedSubviews={true}
                    getItemLayout={getItemLayout}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: "transparent",
    },
    contentList: {
        gap: 16,
        paddingHorizontal: 20,
        paddingBottom: 100
    },
    sectionTitle: {
        fontSize: 14,
        color: colors.button,
        letterSpacing: 2,
        marginBottom: 16,
        marginTop: 8,
        fontWeight: "bold",
        textTransform: "uppercase"
    }
});

export default memo(HomeItems);
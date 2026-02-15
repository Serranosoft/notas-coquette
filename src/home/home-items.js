import { FlatList, View, Text, StyleSheet, TouchableOpacity } from "react-native"
import HomeFlatListItem from "./home-flat-list-item";
import { memo, useCallback, useContext } from "react";
import { colors, layout } from "../utils/styles";
import { Svg, Path } from "react-native-svg";
import { router } from "expo-router";
import { LangContext } from "../utils/Context";

function HomeItems({ notes, columnNumber, selected, setSelected }) {

    const { language } = useContext(LangContext);

    const renderItem = useCallback(({ item }) => (
        <HomeFlatListItem note={item} selected={selected} setSelected={setSelected} />
    ), [selected, setSelected]);

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
                    contentContainerStyle={styles.contentList}
                    columnWrapperStyle={columnNumber > 1 ? { gap: 16 } : undefined}
                    ListHeaderComponent={
                        <View>
                            <TouchableOpacity style={styles.templatesButton} onPress={() => router.push("/templates")}>
                                <Svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth={2}>
                                    <Path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                                </Svg>
                                <Text style={styles.templatesText}>{language.t("_seeTemplates")}</Text>
                            </TouchableOpacity>
                            <Text style={styles.sectionTitle}>{language.t("_recent").toUpperCase()}</Text>
                        </View>
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
    },
    templatesButton: {
        backgroundColor: colors.button,
        paddingHorizontal: 16,
        paddingVertical: 8,
        borderRadius: 20,
        flexDirection: "row",
        alignItems: "center",
        gap: 6,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 4,
        elevation: 4,
        alignSelf: "flex-start",
        marginBottom: 8,
        marginTop: 8,
    },
    templatesText: {
        color: "#fff",
        fontWeight: "bold",
        fontSize: 14,
    }
});

export default memo(HomeItems);
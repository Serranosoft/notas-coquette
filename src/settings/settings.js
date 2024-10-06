import { FlatList, Image, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { colors, gap, layout, padding, ui } from "../utils/styles";
import GridBackground from "../components/grid";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId } from "../utils/constants";
import { FONTS } from "../utils/fonts";
import LangList from "../components/lang-list";
import { useContext } from "react";
import { LangContext } from "../utils/Context";

export default function Settings({ removeAll, updateAutoSave, updateTypo, autoSave, typo }) {

    const { language } = useContext(LangContext);

    return (
        <View style={[layout.flex, layout.backgroundLight, padding.bigHorizontal]}>
            <ScrollView style={{ flex: 1 }}>
                <View style={styles.box}>
                    <Text style={[ui.h4, ui.black]}>{language.t("_settingsApp")}</Text>
                    <Text style={[ui.text, ui.black]}>{language.t("_settingsLang")}</Text>
                    <LangList />

                </View>

                <View style={styles.box}>
                    <Text style={[ui.h4, ui.black]}>{language.t("_settingsEditor")}</Text>
                    <View style={styles.row}>
                        <Text style={[ui.text, ui.black]}>{language.t("_settingsSave")}</Text>
                        <Switch
                            style={styles.switch}
                            trackColor={{ false: '#767577', true: colors.light }}
                            thumbColor={autoSave ? colors.dark : '#f4f3f4'}
                            onValueChange={updateAutoSave}
                            value={autoSave}
                        />
                    </View>

                    <Text style={[ui.text, ui.black]}>{language.t("_settingsTypo")}</Text>
                    <FlatList
                        horizontal={true}
                        data={FONTS}
                        contentContainerStyle={gap.big}
                        renderItem={({ item: font }) => (
                            <TouchableOpacity onPress={() => updateTypo(font.key)} style={[styles.typoItem, font.key == typo && styles.typoSelected]}>
                                <GridBackground />
                                <Image source={font.preview} style={styles.typoImg} />
                            </TouchableOpacity>
                        )}
                    />
                    <Text style={ui.muted}>{language.t("_settingsTypoWarning")}</Text>

                </View>

                <View style={styles.box}>
                    <Text style={[ui.h4, ui.black]}>{language.t("_settingsResetAll")}</Text>

                    <View style={styles.row}>
                        <TouchableOpacity style={styles.btn} onPress={removeAll}>
                            <Text style={[ui.text, { color: colors.dark, textAlign: "center" }]}>{language.t("_settingsRemoveAll")}</Text>
                        </TouchableOpacity>
                    </View>
                    <Text style={ui.muted}>{language.t("_settingsRemoveAllWarning")}</Text>
                </View>


            </ScrollView>
            <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />

        </View>
    )
}

const styles = StyleSheet.create({

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8,
        paddingBottom: 16,
        borderBottomWidth: 2,
        borderBottomColor: "#f0f0f0"
    },

    column: {
        alignItems: "flex-start",
        marginVertical: 8,
    },

    switch: {
        transform: [{ scale: 1.3 }]
    },

    box: {
        gap: 12,
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
    },

    typoSelected: {
        borderWidth: 3,
        borderColor: colors.dark
    },

    btn: {
        width: "100%",
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.dark,
        padding: 8,
    }
})
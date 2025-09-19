import { FlatList, Image, Platform, ScrollView, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { colors, gap, layout, padding, ui } from "../utils/styles";
import GridBackground from "../components/grid";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId, bannerIdIOS } from "../utils/constants";
import { FONTS } from "../utils/fonts";
import LangList from "../components/lang-list";
import { useContext } from "react";
import { AdsContext, LangContext } from "../utils/Context";
import LineSpacingSlider from "./lineSpacingSlider";
import LetterSpacingSlider from "./letterSpacingSlider";
import WordSpacingSlider from "./wordSpacingSlider";
import VoiceSelector from "./voiceSelector";
import PitchVoiceSlider from "./pitchVoiceSlider";
import RateVoiceSlider from "./rateVoiceSlider";

export default function Settings({
    removeAll,
    updateTypo,
    typo,
    updateLineSpacing,
    setLineSpacing,
    lineSpacing,
    letterSpacing,
    updateLetterSpacing,
    setLetterSpacing,
    wordSpacing,
    updateWordSpacing,
    setWordSpacing,
    voiceState,
    updateVoice,
    setVoiceState,
    availableVoices
}) {

    const { language } = useContext(LangContext);
    const { adsLoaded } = useContext(AdsContext);

    return (
        <View style={[layout.flex, layout.backgroundLight]}>
            <ScrollView style={{ flex: 1 }} contentContainerStyle={padding.bigHorizontal}>
                <View style={styles.box}>
                    <Text style={[ui.h4, ui.black]}>{language.t("_settingsApp")}</Text>
                    <Text style={[ui.text, ui.black]}>{language.t("_settingsLang")}</Text>
                    <LangList />

                </View>

                <View style={styles.box}>
                    <Text style={[ui.h4, ui.black]}>{language.t("_settingsEditor")}</Text>
                    <Text style={[ui.h5, ui.black]}>Configuración de la voz</Text>
                    {
                        voiceState.voice &&
                            <View style={styles.row}>
                                <Text style={[ui.text, ui.black, { width: 110 }]}>Tipo de voz</Text>
                                <VoiceSelector {...{ availableVoices, voice: voiceState.voice, updateVoice }}/>
                            </View>
                    }
                    <View style={styles.row}>
                        <Text style={[ui.text, ui.black, { width: 110 }]}>Frecuencia de voz</Text>
                        <PitchVoiceSlider {...{ updateVoice, pitch: voiceState.pitch, setVoicePitch: (p) => setVoiceState(prev => ({ ...prev, pitch: p })) }} />
                    </View>
                    <View style={styles.row}>
                        <Text style={[ui.text, ui.black, { width: 110 }]}>Velocidad de voz</Text>
                        <RateVoiceSlider {...{ updateVoice, rate: voiceState.rate, setVoiceRate: (r) => setVoiceState(prev => ({ ...prev, rate: r })) }} />
                    </View>
                    <Text style={[ui.h5, ui.black]}>Configuración de la nota</Text>
                    <View style={styles.row}>
                        <Text style={[ui.text, ui.black, { width: 110 }]}>{language.t("_settingsLineSpacing")}</Text>
                        <LineSpacingSlider {...{ lineSpacing, updateLineSpacing, setLineSpacing }} />
                    </View>
                    <View style={styles.row}>
                        <Text style={[ui.text, ui.black, { width: 110 }]}>{language.t("_settingsLetterSpacing")}</Text>
                        <LetterSpacingSlider {...{ letterSpacing, updateLetterSpacing, setLetterSpacing }} />
                    </View>
                    <View style={styles.row}>
                        <Text style={[ui.text, ui.black, { width: 110 }]}>{language.t("_settingsWordSpacing")}</Text>
                        <WordSpacingSlider {...{ wordSpacing, updateWordSpacing, setWordSpacing }} />
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
                    {/* <Text style={ui.muted}>{language.t("_settingsTypoWarning")}</Text> */}

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
            {adsLoaded && <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />}

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
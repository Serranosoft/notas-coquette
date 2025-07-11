import { ScrollView, StyleSheet, View } from "react-native";
import LangListItem from "./lang-list-item";
import { useContext, useState } from "react";
import { LangContext } from "../utils/Context";
import { colors } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { storage } from "../utils/storage";

export default function LangList() {

    const { language, setLanguage } = useContext(LangContext);
    const [selected, setSelected] = useState(language._locale);

    const languages = [
        { title: language.t("_langListSpanish"), acronym: "es" },
        { title: language.t("_langListEnglish"), acronym: "en" },
        { title: language.t("_langListArabic"), acronym: "ar" },
        { title: language.t("_langListGerman"), acronym: "de" },
        { title: language.t("_langListFrench"), acronym: "fr" },
        { title: language.t("_langListHindi"), acronym: "hi" },
        { title: language.t("_langListIndonesian"), acronym: "id" },
        { title: language.t("_langListPortuguese"), acronym: "pt" },
        { title: language.t("_langListRussian"), acronym: "ru" },
        { title: language.t("_langListPolish"), acronym: "pl" },
        { title: language.t("_langListVietnamese"), acronym: "vi" },
        { title: language.t("_langListTurkish"), acronym: "tr" }
    ]

    async function updateLanguage(acronym) {
        setLanguage(acronym);
        await AsyncStorage.setItem(storage.LANGUAGE, acronym);
    }

    return (
        <View style={styles.container}>
            <ScrollView style={styles.scroll} nestedScrollEnabled={true}>
                {
                    languages.map((language, index) => {
                        return (
                            <LangListItem key={index} title={language.title} acronym={language.acronym} updateLanguage={updateLanguage} selected={selected} setSelected={setSelected} />
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        height: 130,
        width: "100%",
    },

    scroll: {
        flex: 1,
        width: "100%",
        backgroundColor: "#f0f0f0",
        borderColor: colors.dark,
    },


})
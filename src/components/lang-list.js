import { StyleSheet, View } from "react-native";
import { useContext } from "react";
import { LangContext } from "../utils/Context";
import { colors } from "../utils/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userPreferences } from "../utils/user-preferences";
import CustomDropdown from "./dropdown";

export default function LangList() {

    const { language, setLanguage } = useContext(LangContext);

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
        { title: language.t("_langListTurkish"), acronym: "tr" },
        { title: language.t("_langListItalian"), acronym: "it" },
        { title: language.t("_langListFarsi"), acronym: "fa" }
    ]

    async function updateLanguage(language) {
        setLanguage(language.acronym);
        await AsyncStorage.setItem(userPreferences.LANGUAGE, acronym);
    }

    return (
        <View style={styles.container}>
            <CustomDropdown
                data={languages}
                option={language._locale}
                labelIdentifier={"title"}
                valueIdentifier={"acronym"}
                onChange={updateLanguage}
                placeholder={"Elige un idioma"}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
    },

    scroll: {
        flex: 1,
        width: "100%",
        backgroundColor: "#f0f0f0",
        borderColor: colors.dark,
    },


})
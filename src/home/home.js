import Animated, { SlideInLeft } from "react-native-reanimated";
import HomeButton from "../../src/components/home-button";
import { gap, layout, sizes, ui } from "../../src/utils/styles";
import { FlatList, ScrollView, StyleSheet, Text, View } from "react-native";
import NoteItemContainer from "./note-item-container";
import { useContext } from "react";
import { LangContext } from "../utils/Context";
import GridDeleteWrapper from "./grid-delete-wrapper";
import HomeFavItems from "./home-fav-items";
import HomeItems from "./home-items";

export default function Home({ columnNumber, notes, favNotes, emptySelected, selected, setSelected, deleteNotes }) {


    const { language } = useContext(LangContext);

    return (
        <>
            <View style={[layout.flex, layout.backgroundLight, layout.paddingHorizontal]}>
                <HomeButton {...{ language }} />
                <ScrollView style={layout.flex} key={favNotes.length > 0 ? "with-fav" : "no-fav"}>
                    {favNotes.length > 0 && <HomeFavItems {...{ favNotes, columnNumber, selected, setSelected }} />}
                    {
                        notes.length > 0 ?
                            <HomeItems {...{ notes, columnNumber, selected, setSelected }} />
                            :
                            <Text style={[ui.muted, sizes.medium]}>{language.t("_homeEmptyList")}</Text>
                    }
                </ScrollView>
            </View>
            {selected.length > 0 && <GridDeleteWrapper {...{ selected, emptySelected, deleteNotes }} />}
        </>
    )
}



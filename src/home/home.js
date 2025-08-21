import HomeButton from "../../src/components/home-button";
import { layout, sizes, ui } from "../../src/utils/styles";
import { ScrollView, Text, View } from "react-native";
import { memo, useContext } from "react";
import { LangContext } from "../utils/Context";
import GridDeleteWrapper from "./grid-delete-wrapper";
import HomeFavItems from "./home-fav-items";
import HomeItems from "./home-items";

function Home({ columnNumber, notes, favNotes, emptySelected, selected, setSelected, deleteNotes }) {

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

export default memo(Home);


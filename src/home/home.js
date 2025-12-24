import { layout, sizes, ui } from "../../src/utils/styles";
import { Text, View } from "react-native";
import { memo, useContext } from "react";
import { LangContext } from "../utils/Context";
import GridDeleteWrapper from "./grid-delete-wrapper";
import HomeItems from "./home-items";
import HomeNewNoteBtn from "./home-new-note-btn";
import HomeWatchTemplatesBtn from "./home-watch-templates-btn";

function Home({ columnNumber, notes, emptySelected, selected, setSelected, deleteNotes }) {

    const { language } = useContext(LangContext);

    return (
        <>
            <View style={[layout.flex, layout.backgroundLight, layout.paddingHorizontal]}>
                <HomeNewNoteBtn {...{ language }} />
                <HomeWatchTemplatesBtn {...{ language }} />
                {
                    notes.length > 0 ?
                        <HomeItems {...{ notes, columnNumber, selected, setSelected }} />
                        :
                        <Text style={[ui.muted, sizes.medium]}>{language.t("_homeEmptyList")}</Text>
                }
            </View>
            {selected.length > 0 && <GridDeleteWrapper {...{ selected, emptySelected, deleteNotes }} />}
        </>
    )
}

export default memo(Home);


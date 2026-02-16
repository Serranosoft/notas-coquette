import { layout, sizes, ui } from "../../src/utils/styles";
import { Text, View } from "react-native";
import { memo, useContext } from "react";
import { LangContext } from "../utils/Context";
import GridDeleteWrapper from "./grid-delete-wrapper";
import HomeItems from "./home-items";
import HomeNewNoteBtn from "./home-new-note-btn";
import TemplateCategories from "./template-categories";
import PinkPatternLayout from "../components/pink-pattern-layout";
import HeaderHome from "./header-home";

function Home({ columnNumber, setColumnNumber, notes, emptySelected, selected, setSelected, deleteNotes }) {

    const { language } = useContext(LangContext);

    return (
        <PinkPatternLayout>
            <HeaderHome {...{ columnNumber, setColumnNumber }} />
            <View style={[layout.flex, { paddingHorizontal: 0 }]}>
                {selected.length === 0 && <HomeNewNoteBtn />}

                {
                    notes.length > 0 ?
                        <HomeItems {...{ notes, columnNumber, selected, setSelected }} />
                        :
                        <View style={{ padding: 20 }}>
                            <Text style={[ui.muted, sizes.medium, { textAlign: 'center', marginTop: 40 }]}>{language.t("_homeEmptyList")}</Text>
                        </View>
                }
            </View>
            {selected.length > 0 && <GridDeleteWrapper {...{ selected, emptySelected, deleteNotes }} />}
        </PinkPatternLayout>
    )
}

export default memo(Home);


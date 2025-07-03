import Animated, { SlideInLeft } from "react-native-reanimated";
import HomeButton from "../../src/components/home-button";
import { gap, layout, sizes, ui } from "../../src/utils/styles";
import { FlatList, Text, View } from "react-native";
import NoteItemContainer from "./note-item-container";
import { useContext } from "react";
import { LangContext } from "../utils/Context";
import GridDeleteWrapper from "./grid-delete-wrapper";

export default function Home({columnNumber, notes, emptySelected, selected, setSelected, deleteNotes}) {
    
    
    const { language } = useContext(LangContext);

    return (
        <>
            <View style={[layout.flex, layout.backgroundLight, layout.paddingHorizontal]}>
                <HomeButton {...{ language }} />
                <View style={layout.flex}>
                    {
                        notes.length > 0 ?
                            <FlatList
                                key={columnNumber}
                                numColumns={columnNumber}
                                data={notes}
                                contentContainerStyle={layout.contentList}
                                columnWrapperStyle={columnNumber > 1 && gap.medium}
                                renderItem={({ item, index }) => <HomeFlatListItem note={item} selected={selected} setSelected={setSelected} index={index} />}
                            />
                            :
                            <Text style={[ui.muted, sizes.medium]}>{language.t("_homeEmptyList")}</Text>
                    }
                </View>
            </View>
            {/* { selected.length > 0 && <ActionsContainer {...{selected, setNotes, setSelected}} /> } */}
            { selected.length > 0 && <GridDeleteWrapper {...{ selected, emptySelected, deleteNotes }} /> }
        </>
    )
}


export function HomeFlatListItem({note, selected, setSelected, index}) {
    return (
        <Animated.View style={{ flex: 1 / 2 }} entering={SlideInLeft.duration(500).delay(index * 250)}>
            <NoteItemContainer {...{note, selected, setSelected}} />
        </Animated.View>
    )
}
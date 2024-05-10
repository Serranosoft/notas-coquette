import Animated, { SlideInLeft } from "react-native-reanimated";
import HomeButton from "../../src/components/home-button";
import { gap, layout, sizes, ui } from "../../src/utils/styles";
import { FlatList, Text, View } from "react-native";
import NoteItemContainer from "./note-item-container";
import ActionsContainer from "./actions-container";

export default function Home({columnNumber, notes, setNotes, selected, setSelected}) {
    return (
        <>
            <View style={[layout.flex, layout.backgroundLight, layout.paddingHorizontal]}>
                <HomeButton />
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
                            <Text style={[ui.muted, sizes.medium]}>No tienes ninguna nota creada</Text>
                    }
                </View>
            </View>
            { selected.length > 0 && <ActionsContainer {...{selected, setNotes, setSelected}} /> }
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
import { FlatList, View } from "react-native"
import { HomeFlatListItem } from "./home-flat-list-item";
import { memo } from "react";
import { gap, layout } from "../utils/styles";

function HomeItems({ notes, columnNumber, selected, setSelected }) {

    return (
        <View style={[layout.flex, layout.backgroundLight]}>
            <View style={layout.flex}>
                <FlatList
                    key={columnNumber}
                    numColumns={columnNumber}
                    data={notes}
                    contentContainerStyle={layout.contentList}
                    columnWrapperStyle={columnNumber > 1 && gap.medium}
                    renderItem={({ item, index }) => <HomeFlatListItem note={item} selected={selected} setSelected={setSelected} index={index} />}
                />
            </View>
        </View>

    )
}

export default memo(HomeItems);
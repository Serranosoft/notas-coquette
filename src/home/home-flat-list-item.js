import Animated, { SlideInLeft } from "react-native-reanimated";
import NoteItemContainer from "./note-item-container";
import { memo } from "react";

function HomeFlatListItem({ note, isSelected, setSelected }) {
    return (
        <Animated.View style={{ flex: 1 }} entering={SlideInLeft.duration(500).randomDelay()}>
            <NoteItemContainer {...{ note, isSelected, setSelected }} />
        </Animated.View>
    )
}

export default memo(HomeFlatListItem);
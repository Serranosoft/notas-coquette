import Animated, { SlideInLeft } from "react-native-reanimated";
import NoteItemContainer from "./note-item-container";

export function HomeFlatListItem({ note, selected, setSelected, index }) {
    return (
        <Animated.View style={{ flex: 1 }} entering={SlideInLeft.duration(500).delay(index * 250)}>
            <NoteItemContainer {...{ note, selected, setSelected }} />
        </Animated.View>
    )
}
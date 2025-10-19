import Animated, { SlideInLeft } from "react-native-reanimated";
import NoteItemContainer from "./note-item-container";

export function HomeFlatListItem({ note, selected, setSelected }) {
    return (
        <Animated.View style={{ flex: 1 / 2 }} entering={SlideInLeft.duration(500).randomDelay()}>
            <NoteItemContainer {...{ note, selected, setSelected }} />
        </Animated.View>
    )
}
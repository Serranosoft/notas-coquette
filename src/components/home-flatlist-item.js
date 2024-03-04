import Animated, { ZoomInEasyUp, ZoomOutEasyUp } from "react-native-reanimated";
import NoteItem from "./note-item";

export default function HomeFlatListItem({note, selected, setSelected}) {

    return (
        <Animated.View style={{ flex: 1 / 2 }} entering={ZoomInEasyUp.duration(2000)} exiting={ZoomOutEasyUp.duration(2000)}>
            <NoteItem note={note} itemsSelected={selected} setItemsSelected={setSelected} />
        </Animated.View>
    )
}
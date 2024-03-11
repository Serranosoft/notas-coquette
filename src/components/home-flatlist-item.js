import Animated, { SlideInLeft} from "react-native-reanimated";
import NoteItem from "./note-item";

export default function HomeFlatListItem({note, selected, setSelected, index}) {
    return (
        <Animated.View style={{ flex: 1 / 2 }} entering={SlideInLeft.duration(2000).delay(index * 250)}>
            <NoteItem note={note} itemsSelected={selected} setItemsSelected={setSelected} />
        </Animated.View>
    )
}
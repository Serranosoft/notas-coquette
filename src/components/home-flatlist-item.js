import Animated, { FadeIn, FadeInLeft, FadeOut, FadeOutLeft} from "react-native-reanimated";
import NoteItem from "./note-item";

export default function HomeFlatListItem({note, selected, setSelected}) {

    return (
        <Animated.View style={{ flex: 1 / 2 }} entering={FadeIn.duration(2000)} exiting={FadeOut.duration(2000)}>
            <NoteItem note={note} itemsSelected={selected} setItemsSelected={setSelected} />
        </Animated.View>
    )
}
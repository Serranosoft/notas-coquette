import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor } from "../utils/styles";
import { redoLabel,  undoLabel } from "../utils/labels";


export default function HeaderLeftEditor({ richText, readingMode }) {

    return (
        <RichToolbar
            style={[editor.header, {height: readingMode ? 0 : "auto", paddingHorizontal: 0 }]}
            editor={richText}
            actions={[actions.undo, actions.redo]}
            iconMap={{ [actions.undo]: undoLabel, [actions.redo]: redoLabel }}
        />
    )
}
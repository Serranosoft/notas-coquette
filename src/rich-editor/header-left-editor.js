import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor, padding } from "../utils/styles";
import { redoLabel,  undoLabel } from "../utils/labels";


export default function HeaderLeftEditor({ richText, readingMode }) {

    return (
        <RichToolbar
            style={[editor.header, !readingMode && padding.smallVertical, !readingMode && padding.bigTop, {height: readingMode ? 0 : "auto"}]}
            editor={richText}
            actions={[actions.undo, actions.redo]}
            iconMap={{ [actions.undo]: undoLabel, [actions.redo]: redoLabel }}
        />
    )
}
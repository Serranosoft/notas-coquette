import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor } from "../../utils/styles";
import { redoLabel,  undoLabel } from "../../utils/labels";


export default function HeaderLeftEditor({ editorRef, readingMode }) {

    return (
        <RichToolbar
            style={[editor.header, {height: readingMode ? 0 : "auto" }]}
            editor={editorRef}
            actions={[actions.undo, actions.redo]}
            iconSize={30}
            iconMap={{ [actions.undo]: undoLabel, [actions.redo]: redoLabel }}
        />
    )
}
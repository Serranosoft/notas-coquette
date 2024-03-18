import { RichToolbar, actions } from "react-native-pell-rich-editor";
import { editor } from "../../utils/styles";
import { redoLabel,  undoLabel } from "../../utils/labels";


export default function HeaderLeftEditor({ editorRef }) {

    return (
        <RichToolbar
            style={[editor.header]}
            editor={editorRef}
            actions={[actions.undo, actions.redo]}
            iconSize={30}
            iconMap={{ [actions.undo]: undoLabel, [actions.redo]: redoLabel }}
        />
    )
}
import { RichToolbar} from "react-native-pell-rich-editor";
import { editor } from "../../utils/styles";
import { colorsLabel, fontSizeLabel, separatorsLabel} from "../../utils/labels";


export default function HeaderRightEditor({ editorRef, setOpenFontSize, setOpenSeparators, openSeparators, openFontSize, setOpenColors, openColors }) {

    return (
        <RichToolbar
            style={[editor.header]}
            editor={editorRef}
            actions={["separator", "fontSize", "colors"]}
            iconSize={30}
            iconMap={{ separator: separatorsLabel, fontSize: fontSizeLabel, colors: colorsLabel }}
            fontSize={() => setOpenFontSize(!openFontSize)}
            separator={() => setOpenSeparators(!openSeparators)}
            colors={() => setOpenColors(!openColors)}
        />
    )
}
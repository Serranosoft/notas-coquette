import { RichToolbar} from "react-native-pell-rich-editor";
import { editor, padding } from "../utils/styles";
import { colorsLabel, fontSizeLabel, separatorsLabel} from "../utils/labels";


export default function HeaderRightEditor({ richText, setOpenFontSize, setOpenSeparators, openSeparators, openFontSize, setOpenColors, openColors, readingMode }) {

    return (
        <RichToolbar
            style={[editor.header, !readingMode && padding.smallVertical, !readingMode && padding.bigTop, {height: readingMode ? 0 : "auto" }]}
            editor={richText}
            actions={["separator", "fontSize", "colors"]}
            iconMap={{ separator: separatorsLabel, fontSize: fontSizeLabel, colors: colorsLabel }}
            fontSize={() => setOpenFontSize(!openFontSize)}
            separator={() => setOpenSeparators(!openSeparators)}
            colors={() => setOpenColors(!openColors)}
        />
    )
}
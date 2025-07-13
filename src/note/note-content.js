import { RichEditor } from "react-native-pell-rich-editor";
import SketchPad from "../components/sketchpad";
import GridBackground from "../components/grid";
import { useIsFocused } from '@react-navigation/native';

export default function NoteContent({
    note,
    font,
    drawing,
    color,
    readingMode,
    sketchPadRef,
    richText,
    handleCursorPosition,
    handleHeightChange,
    editorHeight,
    windowHeight
}) {
    const isFocused = useIsFocused();
    return (
        <>
            {isFocused && (
                <SketchPad
                    key={note.id}
                    ref={sketchPadRef}
                    drawing={drawing}
                    note_id={note.id}
                />
            )}

            <RichEditor
                useContainer={true}
                ref={richText}
                placeholder="..."
                onChange={(content) => note.content = content}
                style={{ zIndex: 999 }}
                editorStyle={{
                    initialCSSText: `${font.fontFace}`,
                    backgroundColor: "transparent",
                    contentCSSText: `font-size: 18px; font-family: ${font.fontFamily};`,
                    color: color
                }}
                initialContentHTML={note.content ?? ""}
                disabled={readingMode || drawing.isDrawing}
                onCursorPosition={handleCursorPosition}
                initialHeight={800}
                onHeightChange={handleHeightChange}
            />

            <GridBackground contentHeight={Math.max(editorHeight, windowHeight)} />
        </>
    );
};

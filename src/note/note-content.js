import { RichEditor } from "react-native-pell-rich-editor";
import SketchPad from "../components/sketchpad";
import GridBackground from "../components/grid";
import { useIsFocused } from '@react-navigation/native';
import { useEffect } from "react";

export default function NoteContent({
    note,
    font,
    drawing,
    setDrawing,
    readingMode,
    sketchPadRef,
    richText,
    handleCursorPosition,
    handleHeightChange,
    editorHeight,
    windowHeight,
    lineSpacing,
    wordSpacing,
    letterSpacing
}) {
    const isFocused = useIsFocused();

    return (
        <>
            {isFocused && (
                <SketchPad
                    key={note.id}
                    ref={sketchPadRef}
                    drawing={drawing}
                    setDrawing={setDrawing}
                    note_id={note.id}
                />
            )}

            <RichEditor
                useContainer={true}
                ref={richText}
                placeholder="..."
                onChange={(content) => {note.content = content; console.log(content);}}
                style={{ zIndex: 999 }}
                editorStyle={{
                    initialCSSText: `
                        ${font && font.fontFace}
                        input[type="checkbox"] {
                            width: 24px;
                            height: 24px;
                            accent-color: #cc527a;
                            margin-right: 4px;
                            margin-top: 16px;
                            vertical-align: -8px;
                        }
                    `,
                    backgroundColor: "transparent",
                    contentCSSText: `font-size: 18px; font-family: ${font.fontFamily};line-height: ${lineSpacing};word-spacing: ${wordSpacing}px;letter-spacing: ${letterSpacing}px;`,
                    cssText: `
                        ${font.fontFace}
                        pre, pre code {
                            font-family: ${font.fontFamily};
                        }
                    `
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

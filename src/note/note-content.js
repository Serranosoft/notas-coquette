import { View, Text, StyleSheet } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import SketchPad from "../components/sketchpad";
import GridBackground from "../components/grid";
import { useIsFocused } from '@react-navigation/native';
import { useContext, useEffect } from "react";
import { ui } from "../utils/styles";
import { LangContext } from "../utils/Context";

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
    letterSpacing,
    onContentChange,
    counts
}) {
    const isFocused = useIsFocused();
    const { language } = useContext(LangContext);

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
                placeholder={language.t("noteInputPlaceholder") || "..."}
                onChange={(content) => {
                    note.content = content;
                    onContentChange?.(content);
                }}
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
                    contentCSSText: `font-size: 18px; font-family: ${font.fontFamily};line-height: ${lineSpacing};word-spacing: ${wordSpacing}px;letter-spacing: ${letterSpacing}px; padding-top: 24px;`,
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

            {counts && (
                <View style={styles.countOverlay}>
                    <Text style={[ui.text, styles.countText]}>
                        {counts.words} {language.t("_words")} | {counts.characters} {language.t("_characters")}
                    </Text>
                </View>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    countOverlay: {
        position: "absolute",
        top: 8,
        right: 8,
        zIndex: 1000,
    },
    countText: {
        fontSize: 12.5,
        color: "#888",
    }
});

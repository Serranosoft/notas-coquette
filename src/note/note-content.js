import { View, Text, StyleSheet, Dimensions } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import SketchPad from "../components/sketchpad";
import GridBackground from "../components/grid";
import { useIsFocused } from '@react-navigation/native';
import { memo, useContext, useMemo } from "react";
import { ui } from "../utils/styles";
import { LangContext } from "../utils/Context";
import AudioPlayer from "../components/audio-player";
import RenderHTML from "react-native-render-html";

function NoteContent({
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

    const editorStyle = useMemo(() => ({
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
            .audio-memo {
                background-color: #fbe4e9;
                border: 2px solid #fabcc2;
                border-radius: 20px;
                padding: 8px 16px;
                margin: 10px 0;
                display: flex;
                align-items: center;
                justify-content: space-between;
                cursor: pointer;
                user-select: none;
            }
            .audio-icon {
                font-size: 20px;
            }
            .audio-text {
                font-family: inherit;
                color: #cc527a;
                font-weight: bold;
                margin: 0 10px;
                flex: 1;
            }
            .audio-play {
                background-color: #cc527a;
                color: white;
                width: 30px;
                height: 30px;
                border-radius: 15px;
                display: flex;
                align-items: center;
                justify-content: center;
                font-size: 14px;
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
    }), [font, lineSpacing, wordSpacing, letterSpacing]);

    const renderers = useMemo(() => ({
        div: (props) => {
            if (props.tnode.classes.includes('audio-memo')) {
                const uri = props.tnode.attributes['data-uri'];
                return <AudioPlayer uri={uri} />;
            }
            return null; // Fallback to default
        }
    }), []);

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

            {!readingMode ? (
                <RichEditor
                    useContainer={true}
                    ref={richText}
                    placeholder={language.t("noteInputPlaceholder") || "..."}
                    onChange={(content) => {
                        note.content = content;
                        onContentChange?.(content);
                    }}
                    style={{ zIndex: 999 }}
                    editorStyle={editorStyle}
                    initialContentHTML={note.content ?? ""}
                    disabled={drawing.isDrawing}
                    onCursorPosition={handleCursorPosition}
                    initialHeight={800}
                    onHeightChange={handleHeightChange}
                    pasteWithStyle={true}
                />
            ) : (
                <View style={{ padding: 16 }}>
                    <RenderHTML
                        contentWidth={Dimensions.get('window').width - 32}
                        source={{ html: note.content }}
                        renderers={renderers}
                        tagsStyles={{
                            body: {
                                fontFamily: font.fontFamily,
                                fontSize: 18,
                                lineHeight: parseInt(lineSpacing) || 24,
                            }
                        }}
                    />
                </View>
            )}

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

export default memo(NoteContent);

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

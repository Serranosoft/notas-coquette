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
    counts,
    handleEditorMessage,
    playbackScript
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
                border-radius: 25px;
                padding: 10px;
                margin: 4px 0;
                display: flex;
                flex-direction: row;
                align-items: center;
                cursor: pointer;
                user-select: none;
                -webkit-user-select: none;
                -webkit-tap-highlight-color: transparent;
                outline: none !important;
                gap: 12px;
                box-sizing: border-box;
                font-family: sans-serif;
            }
            .audio-memo * {
                -webkit-tap-highlight-color: transparent;
                user-select: none;
                -webkit-user-select: none;
                pointer-events: none; /* Make sub-elements non-clickable so the parent gets the click */
            }
            .audio-play-circle, .audio-play {
                background-color: #cc527a;
                width: 40px;
                height: 40px;
                border-radius: 20px;
                display: flex;
                align-items: center;
                justify-content: center;
                color: white;
                font-size: 0; /* Hide text */
                flex-shrink: 0;
                box-sizing: border-box;
                position: relative;
            }
            /* Create a play triangle CSS icon */
            .audio-play-circle::after, .audio-play::after {
                content: '';
                display: block;
                width: 0;
                height: 0;
                border-top: 8px solid transparent;
                border-bottom: 8px solid transparent;
                border-left: 12px solid white;
                margin-left: 4px;
            }
            /* Pause state class */
            .audio-playing .audio-play-circle::after, .audio-playing .audio-play::after {
                border: none;
                width: 14px;
                height: 16px;
                border-left: 4px solid white;
                border-right: 4px solid white;
                margin-left: 0;
            }
            .audio-progress-container, .audio-text {
                flex: 1;
                display: flex;
                flex-direction: column;
                gap: 4px;
            }
            /* Hide description text in old structure */
            .audio-text {
                font-size: 0;
            }
            .audio-progress-bar {
                height: 4px;
                background-color: #fabcc2;
                border-radius: 2px;
                position: relative;
                width: 100%;
                overflow: hidden;
            }
            .audio-progress-fill {
                height: 100%;
                background-color: #cc527a;
                border-radius: 2px;
                width: 0%;
                transition: width 0.2s linear;
            }
            .audio-timer-container {
                display: flex;
                justify-content: space-between;
                width: 100%;
                flex-direction: row;
            }
            .audio-timer, .audio-time-text {
                color: #cc527a;
                font-weight: bold;
                font-size: 10px;
                font-family: sans-serif;
            }
            /* Legacy support icons */
            .audio-icon {
                display: none;
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
                    onMessage={handleEditorMessage}
                    style={{ zIndex: 999 }}
                    editorStyle={editorStyle}
                    initialContentHTML={note.content ?? ""}
                    disabled={drawing.isDrawing}
                    onCursorPosition={handleCursorPosition}
                    initialHeight={800}
                    onHeightChange={handleHeightChange}
                    pasteWithStyle={true}
                    // Light Bridge initialization
                    injectedJavaScript={playbackScript}
                    editorInitializedCallback={() => {
                        richText.current?.injectJavascript(playbackScript);
                    }}
                    allowFileAccess={true}
                    allowUniversalAccessFromFileURLs={true}
                    allowFileAccessFromFileURLs={true}
                    originWhitelist={['*']}
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

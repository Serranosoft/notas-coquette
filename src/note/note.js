import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, View, StyleSheet, Text } from "react-native";
import { layout, colors } from "../../src/utils/styles";
import FooterEditor from "../rich-editor/footer-editor";
import Separators from "../rich-editor/separators/separators";
import { bannerId, bannerIdIOS } from "../utils/constants";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { memo, useContext, useState, useEffect, useMemo, useCallback, useRef } from "react";
import { AdsContext } from "../utils/Context";
import Drawing from "../rich-editor/drawing/drawing";
import NoteContent from "./note-content";
import PinkPatternLayout from "../components/pink-pattern-layout";
import HeaderNoteContainer from "./header-note-container";

function Note(
    {
        note,
        readingMode,
        setReadingMode,
        setFontSize,
        fontSize,
        richText,
        setSeparator,
        handleCursorPosition,
        handleFocusContent,
        scrollRef,
        font,
        editorHeight,
        drawing,
        setDrawing,
        sketchPadRef,
        setSticker,
        sticker,
        activeOption,
        setActiveOption,
        handleHeightChange,
        insertCheckbox,
        lineSpacing,
        wordSpacing,
        letterSpacing,
        isReady,
        setIsReady,
        changeColor,
        changeHiliteColor,
        back,
        playing,
        voiceState,
        handleNotePlaying,
        isNew,
        handleEditorMessage,
        playbackScript
    }) {

    const windowHeight = Dimensions.get('window').height;
    const { adsLoaded } = useContext(AdsContext);

    const [counts, setCounts] = useState({ words: 0, characters: 0 });
    const countTimeoutRef = useRef(null);

    const calculateCounts = useMemo(() => (html) => {
        if (!html) return { words: 0, characters: 0 };

        // 1. Remove audio timers content (the "0:00" parts) and zero-width space entities/chars
        // We do this BEFORE stripping all tags to specifically target the timer text.
        const cleanContent = html
            .replace(/<span class="audio-timer">.*?<\/span>/g, '')
            .replace(/&#8203;/g, '')
            .replace(/\u200B/g, '');

        // 2. Strip remaining HTML tags and normalize whitespace
        const text = cleanContent.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
        const words = text ? text.split(' ').length : 0;
        const characters = text.length;
        return { words, characters };
    }, []);

    useEffect(() => {
        if (note?.content) {
            setCounts(calculateCounts(note.content));
        } else {
            setCounts({ words: 0, characters: 0 });
        }
        return () => {
            if (countTimeoutRef.current) clearTimeout(countTimeoutRef.current);
        };
    }, [note?.id, calculateCounts]);

    // Optimize content change with debouncing to avoid re-renders on every keystroke
    const handleContentChange = useCallback((content) => {
        if (countTimeoutRef.current) clearTimeout(countTimeoutRef.current);

        // We use a timeout to debounce the count update
        countTimeoutRef.current = setTimeout(() => {
            setCounts(calculateCounts(content));
        }, 800);
    }, [calculateCounts]);

    const onStopRecording = useCallback((uri) => {
        if (uri) {
            // Insert the custom HTML block for the audio memo
            // This structure is designed to be updated in real-time by the updateWebView logic in NoteContent.js
            const audioHtml = `&#8203;<div class="audio-memo" data-uri="${uri}" contenteditable="false" 
                onclick="event.preventDefault(); event.stopPropagation(); window.ReactNativeWebView.postMessage(JSON.stringify({type: 'PLAY_AUDIO', uri: '${uri}'})); return false;"
                style="outline: none;">
                <div class="audio-play-circle"></div>
                <div class="audio-progress-container">
                    <div class="audio-progress-bar">
                        <div class="audio-progress-fill"></div>
                    </div>
                    <div class="audio-timer-container">
                        <span class="audio-timer">0:00</span>
                        <span class="audio-timer">0:00</span>
                    </div>
                </div>
            </div>&#8203;`;
            richText.current?.insertHTML(audioHtml);
        }
    }, [richText]);

    return (
        <PinkPatternLayout>
            <HeaderNoteContainer
                setIsReady={setIsReady}
                drawing={drawing}
                setDrawing={setDrawing}
                note={note}
                readingMode={readingMode}
                setReadingMode={setReadingMode}
                back={back}
                richText={richText}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
                handleNotePlaying={handleNotePlaying}
                playing={playing}
                voiceState={voiceState}
                isNew={isNew}
            />

            {
                adsLoaded && <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
            }

            {
                isReady && font &&
                <>
                    {activeOption === 'separators' && !readingMode && (
                        <Separators setSeparator={setSeparator} />
                    )}

                    {activeOption === 'drawing' && !readingMode && (
                        <Drawing drawing={drawing} setDrawing={setDrawing} />
                    )}

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}
                        style={{ flex: 1 }}
                    >
                        <View style={[styles.card, layout.zIndex]}>
                            <ScrollView
                                style={[layout.zIndex/* , { flex: 1 } */]}
                                contentContainerStyle={{ height: "auto", paddingBottom: 80 }}
                                ref={scrollRef}
                                scrollEnabled={drawing.mode === "scroll" || !drawing.isDrawing}
                                onTouchEnd={handleFocusContent}
                            >

                                <NoteContent
                                    key={note.id}
                                    note={note}
                                    font={font}
                                    drawing={drawing}
                                    setDrawing={setDrawing}
                                    readingMode={readingMode}
                                    sketchPadRef={sketchPadRef}
                                    richText={richText}
                                    handleCursorPosition={handleCursorPosition}
                                    handleHeightChange={handleHeightChange}
                                    editorHeight={editorHeight}
                                    windowHeight={windowHeight}
                                    lineSpacing={lineSpacing}
                                    wordSpacing={wordSpacing}
                                    letterSpacing={letterSpacing}
                                    onContentChange={handleContentChange}
                                    handleEditorMessage={handleEditorMessage}
                                    playbackScript={playbackScript}
                                    counts={counts}
                                />

                            </ScrollView>
                            {
                                note &&
                                <View
                                    pointerEvents="box-none"
                                    style={{
                                        position: "absolute",
                                        top: 0,
                                        bottom: 24,
                                        left: 0,
                                        right: 0,
                                        zIndex: 9999,
                                        justifyContent: "flex-end"
                                    }}
                                >
                                    <FooterEditor {...
                                        {
                                            richText,
                                            readingMode,
                                            sticker,
                                            drawing,
                                            activeOption,
                                            setActiveOption,
                                            insertCheckbox,
                                            setSticker,
                                            setSeparator,
                                            setFontSize,
                                            fontSize,
                                            changeColor,
                                            changeHiliteColor,
                                            onStopRecording
                                        }
                                    }
                                    />
                                </View>
                            }

                        </View>
                    </KeyboardAvoidingView>
                </>

            }
        </PinkPatternLayout>
    )
}

const styles = StyleSheet.create({
    card: {
        backgroundColor: "#fff",
        flex: 1,
        marginHorizontal: 12,
        marginBottom: 12,
        marginTop: 8,
        borderRadius: 12,
        padding: 4,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.1,
        shadowRadius: 3.84,
        elevation: 5,
        overflow: "visible"
    },
    countText: {
        fontSize: 12,
        color: "#888",
    }
});

export default memo(Note);
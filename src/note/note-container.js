import Note from "./note";
import { useCallback, useContext, useEffect, useRef } from "react";
import { Stack, useFocusEffect, useLocalSearchParams } from "expo-router";
import HeaderNoteContainer from "./header-note-container";
import useBackHandler from "../components/use-back-handler";
import { LangContext } from "../utils/Context";
import { useNoteLogic } from "../hooks/useNoteLogic";
import { useNoteAudio } from "../hooks/useNoteAudio";
import { useNoteDrawing } from "../hooks/useNoteDrawing";

export default function NoteContainer() {

    const { id, source } = useLocalSearchParams();
    const { language } = useContext(LangContext);

    // Refs
    const richText = useRef(null);

    // Hooks
    const {
        sketchPadRef,
        drawing,
        setDrawing
    } = useNoteDrawing();

    const {
        playing,
        voiceState,
        handleNotePlaying,
        stopSpeech
    } = useNoteAudio();

    const {
        noteState,
        setNoteState,
        isReady,
        setIsReady,
        scrollRef,
        back,
        handleFocusContent,
        handleHeightChange,
        handleCursorPosition,
        insertCheckbox,
        changeColor,
        changeHiliteColor,
        refreshPreferences,
        setFontSize,
        setSeparator,
        setEditorHeight,
        setOpenStickers,
        setSticker,
        setActiveOption,
        setReadingMode
    } = useNoteLogic(id, source, language, richText, sketchPadRef, setDrawing, stopSpeech);

    const {
        note, fontSize, separator, readingMode, font,
        editorHeight, openStickers, sticker, activeOption,
        letterSpacing, lineSpacing, wordSpacing, isNew
    } = noteState;


    // --- Effects bridging hooks ---

    // Load preferences on focus
    useFocusEffect(
        useCallback(() => {
            refreshPreferences();
        }, [])
    );

    // Back Handler
    useBackHandler(() => {
        if (activeOption !== null) {
            setActiveOption(null);
            return true;
        } else {
            back();
            return true;
        }
    }, [activeOption, back]);

    // Dismiss keyboard when drawing
    useEffect(() => {
        if (drawing.isDrawing) {
            richText.current?.dismissKeyboard();
        }
    }, [drawing.isDrawing]);

    // Handle Rich Editor Updates from State
    useEffect(() => {
        richText.current?.setFontSize(fontSize);
    }, [fontSize]);

    useEffect(() => {
        richText.current?.insertText(separator);
        setNoteState(prev => ({ ...prev, separator: null }));
    }, [separator]);

    useEffect(() => {
        if (sticker) {
            richText.current?.insertImage(sticker);
            setNoteState(prev => ({ ...prev, sticker: null }));
        }
    }, [sticker]);

    // Drawing mode adjustment based on reading mode
    useEffect(() => {
        if (readingMode && drawing.isDrawing) {
            setDrawing(prev => ({ ...prev, mode: "scroll" }));
        }
    }, [readingMode]);


    return (
        <>
            <Stack.Screen options={{
                header: () => (
                    <HeaderNoteContainer
                        setIsReady={setIsReady} // Passed correctly now
                        drawing={drawing}
                        setDrawing={setDrawing}
                        note={note}
                        readingMode={readingMode}
                        setReadingMode={setReadingMode}
                        back={back}
                        richText={richText}
                        activeOption={activeOption}
                        setActiveOption={setActiveOption}
                        handleNotePlaying={() => handleNotePlaying(note?.content)}
                        playing={playing}
                        voiceState={voiceState}
                        isNew={isNew}
                    />
                )
            }} />

            <Note
                isReady={isReady}
                note={note}
                readingMode={readingMode}
                fontSize={fontSize}
                setFontSize={setFontSize}
                richText={richText}
                separator={separator}
                setSeparator={setSeparator}
                handleCursorPosition={handleCursorPosition}
                handleFocusContent={() => handleFocusContent(drawing.isDrawing)}
                scrollRef={scrollRef}
                font={font}
                changeColor={changeColor}
                changeHiliteColor={changeHiliteColor}
                editorHeight={editorHeight}
                setEditorHeight={setEditorHeight}
                drawing={drawing}
                setDrawing={setDrawing}
                sketchPadRef={sketchPadRef}
                openStickers={openStickers}
                setOpenStickers={setOpenStickers}
                sticker={sticker}
                setSticker={setSticker}
                activeOption={activeOption}
                setActiveOption={setActiveOption}
                handleHeightChange={handleHeightChange}
                insertCheckbox={insertCheckbox}
                lineSpacing={lineSpacing}
                wordSpacing={wordSpacing}
                letterSpacing={letterSpacing}
            />
        </>
    )
}
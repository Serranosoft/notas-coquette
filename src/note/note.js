import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { layout } from "../../src/utils/styles";
import FooterEditor from "../rich-editor/footer-editor";
import Separators from "../rich-editor/separators/separators";
import { bannerId, bannerIdIOS } from "../utils/constants";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { memo, useContext } from "react";
import { AdsContext } from "../utils/Context";
import Drawing from "../rich-editor/drawing/drawing";
import NoteContent from "./note-content";

function Note(
    {
        note,
        readingMode,
        setFontSize,
        fontSize,
        richText,
        setSeparator,
        handleCursorPosition,
        handleFocusContent,
        scrollRef,
        font,
        color,
        setColor,
        editorHeight,
        drawing,
        setDrawing,
        sketchPadRef,
        setSticker,
        sticker,
        activeOption,
        setActiveOption,
        handleHeightChange,
        insertCheckbox
    }) {

    const windowHeight = Dimensions.get('window').height;
    const { adsLoaded } = useContext(AdsContext);

    return (
        <View style={[layout.flex, layout.backgroundWhite]}>
            {
                font &&
                <>
                    {activeOption === 'separators' && !readingMode && (
                        <Separators setSeparator={setSeparator} />
                    )}

                    {activeOption === 'drawing' && !readingMode && (
                        <Drawing drawing={drawing} setDrawing={setDrawing} />
                    )}

                    {adsLoaded && <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />}

                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0} // Ajusta según el diseño
                        style={{ flex: 1 }}
                    >
                        <View style={[layout.flex, layout.zIndex]}>
                            <ScrollView style={layout.zIndex} contentContainerStyle={{ height: "auto" }} ref={scrollRef} scrollEnabled={drawing.mode === "scroll" || !drawing.isDrawing} onTouchEnd={handleFocusContent}>
                                {note &&
                                    <NoteContent
                                        key={note.id}
                                        note={note}
                                        font={font}
                                        drawing={drawing}
                                        color={color}
                                        readingMode={readingMode}
                                        sketchPadRef={sketchPadRef}
                                        richText={richText}
                                        handleCursorPosition={handleCursorPosition}
                                        handleHeightChange={handleHeightChange}
                                        editorHeight={editorHeight}
                                        windowHeight={windowHeight}
                                    />
                                }
                            </ScrollView>
                            {
                                note &&
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
                                        setColor,
                                        setFontSize,
                                        fontSize
                                    }
                                }
                                />
                            }

                        </View>
                    </KeyboardAvoidingView>
                </>

            }

        </View>
    )
}

export default memo(Note);
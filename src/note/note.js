import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { layout } from "../../src/utils/styles";
import FooterEditor from "../rich-editor/footer-editor";
import FontSizeContainer from "../rich-editor/font-size/font-size-container";
import Separators from "../rich-editor/separators/separators";
import Colors from "../rich-editor/colors/colors";
import { bannerId, bannerIdIOS } from "../utils/constants";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { memo, useContext } from "react";
import { AdsContext } from "../utils/Context";
import Drawing from "../rich-editor/drawing/drawing";
import Stickers from "../rich-editor/stickers/stickers";
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
        handleHeightChange
    }) {

    const windowHeight = Dimensions.get('window').height;
    const { adsLoaded } = useContext(AdsContext);

    return (
        <View style={[layout.flex, layout.backgroundWhite]}>
            {
                font &&
                <>
                    {activeOption === 'fontSize' && !readingMode && (
                        <FontSizeContainer setFontSize={setFontSize} fontSize={fontSize} />
                    )}

                    {activeOption === 'separators' && !readingMode && (
                        <Separators setSeparator={setSeparator} />
                    )}

                    {activeOption === 'colors' && !readingMode && (
                        <Colors note={note} setColor={setColor} />
                    )}

                    {activeOption === 'drawing' && !readingMode && (
                        <Drawing drawing={drawing} setDrawing={setDrawing} />
                    )}

                    {activeOption === 'stickers' && !readingMode && (
                        <Stickers setSticker={setSticker} />
                    )}
                    { adsLoaded && <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} /> }


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
                                note && <FooterEditor {...{ richText, readingMode, sticker, drawing, activeOption, setActiveOption }} />
                            }

                        </View>
                    </KeyboardAvoidingView>
                </>

            }

        </View>
    )
}

export default memo(Note);
import { Dimensions, KeyboardAvoidingView, Platform, ScrollView, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import GridBackground from "../../src/components/grid";
import { layout } from "../../src/utils/styles";
import FooterEditor from "../rich-editor/footer-editor";
import FontSizeContainer from "../rich-editor/font-size/font-size-container";
import Separators from "../rich-editor/separators/separators";
import Colors from "../rich-editor/colors/colors";
import { bannerId, bannerIdIOS } from "../utils/constants";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { useContext } from "react";
import { LangContext } from "../utils/Context";

export default function Note(
    {
        note,
        readingMode,
        setFontSize,
        openFontSize,
        setOpenFontSize,
        openSeparators,
        setOpenSeparators,
        openColors,
        setOpenColors,
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
        setEditorHeight,
    }) {

    const windowHeight = Dimensions.get('window').height;
    const { language } = useContext(LangContext);

    return (
        <View style={[layout.flex, layout.backgroundWhite]}>
            {
                font &&
                <>
                    {/* <View style={[layout.row, layout.justifyBetween, layout.backgroundLight]}>
                        <HeaderLeftEditor {...{ richText, readingMode }} />
                        <HeaderRightEditor
                            {...{
                                richText,
                                setOpenFontSize,
                                setOpenSeparators,
                                openSeparators,
                                openFontSize,
                                setOpenColors,
                                openColors,
                                readingMode
                            }}
                        />
                    </View> */}

                    {openFontSize && !readingMode && <FontSizeContainer {...{ setFontSize, fontSize, openSeparators }} />}
                    {openSeparators && !readingMode && <Separators {...{ setSeparator }} />}
                    {openColors && !readingMode && <Colors {...{ note, setColor }} />}
                    <BannerAd unitId={Platform.OS === "android" ? bannerId : bannerIdIOS} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />


                    <KeyboardAvoidingView
                        behavior={Platform.OS === "ios" ? "padding" : undefined}
                        keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0} // Ajusta según el diseño
                        style={{ flex: 1 }}
                    >
                        <View style={[layout.flex, layout.zIndex]}>
                            <ScrollView style={layout.zIndex} ref={scrollRef} onTouchEnd={handleFocusContent}>
                                <RichEditor
                                    useContainer={true}
                                    ref={richText}
                                    placeholder={language.t("_noteInputPlaceholder")}
                                    onChange={(content) => note.content = content}
                                    style={{ zIndex: 999 }}
                                    editorStyle={{ initialCSSText: `${font.fontFace}`, backgroundColor: "transparent", contentCSSText: `font-size: 18px; font-family: ${font.fontFamily};`, color: color }}
                                    initialContentHTML={note.content && note.content}
                                    disabled={readingMode}
                                    onCursorPosition={handleCursorPosition}
                                    onBlur={() => {
                                        setOpenFontSize(false);
                                        setOpenColors(false);
                                        setOpenSeparators(false);
                                    }}
                                    initialHeight={600}
                                    onHeightChange={(height) => setEditorHeight(height)}
                                />
                                <GridBackground contentHeight={Math.max(editorHeight, windowHeight)} />
                            </ScrollView>
                            <FooterEditor {...{ richText, readingMode, setOpenFontSize, openFontSize, setOpenColors, openColors, openSeparators, setOpenSeparators }} />
                        </View>
                    </KeyboardAvoidingView>
                </>

            }

        </View>
    )
}
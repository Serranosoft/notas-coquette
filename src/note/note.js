import { ScrollView, View } from "react-native";
import { RichEditor } from "react-native-pell-rich-editor";
import GridBackground from "../../src/components/grid";
import { layout } from "../../src/utils/styles";
import FooterEditor from "../rich-editor/footer-editor";
import HeaderLeftEditor from "../rich-editor/header-left-editor";
import HeaderRightEditor from "../rich-editor/header-right-editor";
import FontSizeContainer from "../rich-editor/font-size/font-size-container";
import Separators from "../rich-editor/separators/separators";
import Colors from "../rich-editor/colors/colors";

export default function Note(
    {
        note,
        readingMode,
        setContent,
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
        autoSave,
        setColor
    }) {

    return (
        <View style={[layout.flex, layout.backgroundWhite]}>
            {
                font && color && autoSave &&
                <>
                    <View style={[layout.row, layout.justifyBetween, layout.backgroundLight]}>
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
                    </View>


                    {openFontSize && !readingMode && <FontSizeContainer {...{ setFontSize, fontSize, openSeparators }} />}
                    {openSeparators && !readingMode && <Separators {...{ setSeparator }} />}
                    {openColors && !readingMode && <Colors {...{ setColor, color }} />}

                    <View style={[layout.flex, layout.zIndex]}>
                        <ScrollView style={layout.zIndex} ref={scrollRef} onTouchEnd={handleFocusContent}>
                            <RichEditor
                                useContainer={true}
                                ref={richText}
                                placeholder="Escribe tu nota..."
                                onChange={(content) => setContent(content)}
                                editorStyle={{ initialCSSText: `${font.fontFace}`, backgroundColor: "transparent", contentCSSText: `font-size: 18px; font-family: ${font.fontFamily};`, color: color }}
                                initialContentHTML={note.content && note.content}
                                disabled={readingMode}
                                onCursorPosition={handleCursorPosition}
                            />
                        </ScrollView>
                        <GridBackground />
                        <FooterEditor {...{ richText, readingMode }} />
                    </View>
                </>

            }

        </View>
    )
}
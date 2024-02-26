import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Stack } from "expo-router";
import { RichEditor } from "react-native-pell-rich-editor";
import { useEffect, useRef, useState } from "react";
import GridBackground from "../src/components/grid";
import HeaderNote from "../src/components/headers/header-note";
import FontSize from "../src/components/rich-editor/font-size";
import Emojis from "../src/components/rich-editor/emojis";
import HeaderEditor from "../src/components/rich-editor/header-editor";
import FooterEditor from "../src/components/rich-editor/footer-editor";

export default function Note() {

    const richText = useRef(null);

    const [content, setContent] = useState("");
    const [fontSize, setFontSize] = useState(5);
    const [emoji, setEmoji] = useState(null);
    const [openFontSize, setOpenFontSize] = useState(false);
    const [openEmojis, setOpenEmojis] = useState(false);

    useEffect(() => {
        richText.current?.setFontSize(fontSize);
    }, [fontSize])

    useEffect(() => {
        richText.current?.insertText(emoji);
        setEmoji(null);
    }, [emoji])


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ header: () => <HeaderNote /> }} />

            <HeaderEditor
                editorRef={richText}
                fontSize={fontSize}
                setOpenFontSize={setOpenFontSize}
                openFontSize={openFontSize}
                openEmojis={openEmojis}
                setOpenEmojis={setOpenEmojis}
            />

            {openFontSize && <FontSize setFontSize={setFontSize} fontSize={fontSize} />}
            {openEmojis && <Emojis setEmoji={setEmoji} />}

            <View style={{ flex: 1 }}>
                <GridBackground />
                <RichEditor
                    useContainer={false}
                    ref={richText}
                    style={styles.rich}
                    placeholder="Escribe tu nota..."
                    onChange={(content) => setContent(content)}
                    editorStyle={{ backgroundColor: "transparent", contentCSSText: `font-size: 24px` }}
                />
            </View>

            <FooterEditor editorRef={richText} />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },

    rich: {
        flex: 1,
        height: Dimensions.get("window").height,
    },

    scroll: {
        flex: 1,
    },
})
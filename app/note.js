import { Dimensions, Image, KeyboardAvoidingView, Platform, ScrollView, StyleSheet, Text, View } from "react-native";
import { Stack } from "expo-router";
import { actions, RichEditor, RichToolbar } from "react-native-pell-rich-editor";
import { useCallback, useEffect, useRef, useState } from "react";
import GridBackground from "../src/components/grid";
import HeaderNote from "../src/components/headers/header-note";
import { boldLabel, h1Label, h2Label, italicLabel, paragraphLabel, test, testLabel, underlineLabel } from "../src/utils/labels";
import FontSize from "../src/components/rich-editor/font-size";


export default function Note() {

    const richText = useRef(null);

    const [content, setContent] = useState("");
    const [fontSize, setFontSize] = useState(5);
    const [openFontSize, setOpenFontSize] = useState(false);

    useEffect(() => {
        richText.current?.setFontSize(fontSize);
    }, [fontSize])


    return (
        <View style={styles.container}>
            <Stack.Screen options={{ header: () => <HeaderNote /> }} />

            <RichToolbar
                style={[styles.richBar, styles.header]}
                flatContainerStyle={styles.flatStyle}
                editor={richText}
                selectedIconTint={'#000'}
                disabledIconTint={'#000'}
                actions={[actions.undo, actions.redo]}
                iconSize={30}
                
            />
            { openFontSize && <FontSize setFontSize={setFontSize} fontSize={fontSize} /> }

            <View style={{ flex: 1 }}>
                <GridBackground />                   
                    <RichEditor
                        useContainer={false}
                        ref={richText}
                        style={styles.rich}
                        placeholder="Escribe tu nota..."
                        onChange={(content) => setContent(content)}
                        editorStyle={{ backgroundColor: "transparent", contentCSSText: "font-size: 24px" }}
                    />
            </View>

            <RichToolbar
                style={[styles.richBar, styles.footer]}
                flatContainerStyle={styles.flatStyle}
                editor={richText}
                selectedIconTint={'#000'}
                iconTint={"#666666"}
                actions={[actions.setBold, actions.setItalic, actions.setUnderline, actions.insertBulletsList, "fontSize"]}
                iconSize={35}
                iconMap={{ [actions.setBold]: boldLabel, [actions.setItalic]: italicLabel, [actions.setUnderline]: underlineLabel }}
                fontSize={() => setOpenFontSize(!openFontSize)}
            />

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
    header: {
        height: 50,
        alignItems: "flex-start"
    },
    footer: {
        height: 75
    },
    richBar: {
        width: "100%",
        backgroundColor: "#ffc4d0",
    },
    flatStyle: {
        paddingHorizontal: 12,
    },
})
import { LinearGradient } from 'expo-linear-gradient';
import { colors, ui } from "../utils/styles";
import { Path, Svg } from "react-native-svg";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import GridBackground from '../components/grid';
import RenderHTML, { HTMLContentModel, HTMLElementModel } from 'react-native-render-html';

const { height } = Dimensions.get('window');

export default function NoteItem({ note, selected, onPress, highlight }) {

    const { width } = useWindowDimensions();
    const source = { html: getSubstringUntilNthDiv(note.content) }

    const customHTMLElementModels = {
        'font': HTMLElementModel.fromCustomModel({ tagName: 'font', mixedUAStyles: { fontSize: 18 }, contentModel: HTMLContentModel.textual }),
        'input': HTMLElementModel.fromCustomModel({ tagName: 'input', contentModel: HTMLContentModel.textual })
    };

    const isSelected = selected.includes(note.id);

    return (

        <TouchableOpacity style={[styles.container, isSelected && styles.selected]} onLongPress={highlight} onPress={onPress}>
            <GridBackground />
            <View>
                {
                    note.hasOwnProperty("pwd") && note.pwd && note.pwd.length > 0 ?
                        <View style={styles.screenBlock}>
                            <Image source={require("../../assets/lock-home.png")} />
                        </View>
                        :
                        <>
                            <View style={styles.header}>
                                <Text style={[ui.muted, { color: "#8a8a8a" }]}>{new Date(parseInt(note.date)).toLocaleDateString()}</Text>
                            </View>
                            <View style={styles.htmlPadding}>
                                <RenderHTML
                                    contentWidth={width}
                                    source={source}
                                    customHTMLElementModels={customHTMLElementModels}
                                    baseStyle={{ color: "#3a3a3a", fontSize: 18 }}
                                />
                            </View>
                        </>
                }
            </View>
            {selected.length < 1 && <LinearGradient colors={['rgba(255,255,255,0)', 'rgba(255,255,255,1)']} style={styles.gradient} />}
            {
                selected.length > 0 &&
                <View style={styles.selectedBox}>
                    {isSelected &&
                        <Svg width={32} height={32} viewBox="0 0 40 40">
                            <Path d="M15.48 28.62a1 1 0 01-.71-.29l-7.54-7.54a1 1 0 010-1.41 1 1 0 011.42 0l6.83 6.83L32.12 9.57a1 1 0 011.41 0 1 1 0 010 1.42L16.18 28.33a1 1 0 01-.7.29z" />
                        </Svg>
                    }
                </View>
            }
        </TouchableOpacity>
    )
}


// Renderizar en cada nota de la home un limite de 9 <div> **Mejora de performance**
function getSubstringUntilNthDiv(html, limit = 9) {
    const regex = /<\/div>/g;
    let match;
    let count = 0;
    let lastIndex = html.length;

    while ((match = regex.exec(html)) !== null) {
        count++;
        if (count === limit) {
            lastIndex = match.index + match[0].length;
            break;
        }
    }

    return html.substring(0, lastIndex);
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        position: "relative",
        elevation: 5,
        overflow: "hidden",
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-end",
        backgroundColor: "transparent",
        paddingHorizontal: 8,
        paddingBottom: 2,
        paddingTop: 6,
    },
    htmlPadding: {
        paddingHorizontal: 8,
        paddingVertical: 4,
        position: "relative",
    },
    gradient: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        height: height * 0.13, // Altura del 20% de la pantalla
    },
    selectedBox: {
        width: 30,
        height: 30,
        borderWidth: 1,
        borderRadius: 100,
        position: "absolute",
        right: 10,
        bottom: 10,
        zIndex: 9,
        backgroundColor: "#fff"
    },
    selected: {
        backgroundColor: colors.selected,
        elevation: 0,
        borderWidth: 2,
        borderColor: colors.dark
    },
    screenBlock: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.4,
    }
})
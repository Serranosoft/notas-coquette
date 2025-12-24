import { LinearGradient } from 'expo-linear-gradient';
import { colors, ui } from "../utils/styles";
import { Path, Svg } from "react-native-svg";
import { Dimensions, Image, StyleSheet, Text, TouchableOpacity, View, useWindowDimensions } from "react-native";
import GridBackground from '../components/grid';
import RenderHTML, { HTMLContentModel, HTMLElementModel } from 'react-native-render-html';

const { height } = Dimensions.get('window');

// Mapeo de tamaños para indicar a renderHTML el tamaño a renderizar de cada tag <font />
const FONT_SIZE_MAP = {
    "1": 10,
    "2": 10,
    "3": 13,
    "4": 18,
    "5": 20,
    "6": 24,
    "7": 40
};

// Custom renderer para detectar etiquetas <font /> en la librería renderHTML
const FontRenderer = ({ TDefaultRenderer, ...props }) => {
    const sizeAttribute = props.tnode.attributes.size;
    const fontSize = sizeAttribute ? FONT_SIZE_MAP[sizeAttribute] : undefined;

    const style = fontSize ? { fontSize } : {};

    return (
        <TDefaultRenderer
            {...props}
            style={{ ...props.style, ...style }}
        />
    );
};

const renderers = {
    font: FontRenderer
};
export default function NoteItem({ note, selected, onPress, highlight, isTemplate }) {

    const { width } = useWindowDimensions();
    const source = { html: getSubstringUntilNthDiv(note.content) }

    const customHTMLElementModels = {
        'font': HTMLElementModel.fromCustomModel({
            tagName: 'font',
            contentModel: HTMLContentModel.textual
        }),
        'input': HTMLElementModel.fromCustomModel({
            tagName: 'input',
            contentModel: HTMLContentModel.textual
        })
    };

    // Sanitizamos el html para reemplazar los inputs por un emoji representativo
    function sanitizeHTML(html) {
        return html.replace(/<input[^>]*>/g, '☐ ');
    }

    const isSelected = selected.includes(note.id);

    return (

        <TouchableOpacity style={[styles.container, isSelected && styles.selected, isTemplate && styles.template]} onLongPress={highlight} onPress={onPress}>
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
                                {note.favorite === 1 ?
                                    <Svg
                                        height={24}
                                        viewBox="0 -10 511.98685 511"
                                        width={24}
                                        xmlns="http://www.w3.org/2000/svg"
                                    >
                                        <Path
                                            d="M510.652 185.902a27.158 27.158 0 00-23.425-18.71l-147.774-13.419-58.433-136.77C276.71 6.98 266.898.494 255.996.494s-20.715 6.487-25.023 16.534l-58.434 136.746-147.797 13.418A27.208 27.208 0 001.34 185.902c-3.371 10.368-.258 21.739 7.957 28.907l111.7 97.96-32.938 145.09c-2.41 10.668 1.73 21.696 10.582 28.094 4.757 3.438 10.324 5.188 15.937 5.188 4.84 0 9.64-1.305 13.95-3.883l127.468-76.184 127.422 76.184c9.324 5.61 21.078 5.097 29.91-1.305a27.223 27.223 0 0010.582-28.094l-32.937-145.09 111.699-97.94a27.224 27.224 0 007.98-28.927zm0 0"
                                            fill={colors.dark}
                                        />
                                    </Svg>
                                    :
                                    <Text></Text>
                                }
                                {note.date && <Text style={[ui.muted, { color: "#8a8a8a" }]}>{new Date(parseInt(note.date)).toLocaleDateString()}</Text>}
                                {note.title && <Text style={[ui.muted, { color: "#8a8a8a" }]}>{note.title}</Text>}
                            </View>
                            <View style={styles.htmlPadding}>
                                <RenderHTML
                                    contentWidth={width}
                                    source={{ html: sanitizeHTML(note.content) }}
                                    customHTMLElementModels={customHTMLElementModels}
                                    baseStyle={{ color: "#3a3a3a", fontSize: 16 }}
                                    renderers={renderers}
                                    enableUserAgentStyles={true}
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

    let truncated = html.substring(0, lastIndex);

    // Si el HTML cortado tiene un div abierto pero no cerrado, lo cerramos
    const openDivs = (truncated.match(/<div/g) || []).length;
    const closeDivs = (truncated.match(/<\/div>/g) || []).length;
    
    for (let i = 0; i < (openDivs - closeDivs); i++) {
        truncated += '</div>';
    }

    return truncated;
}


const styles = StyleSheet.create({
    container: {
        height: 215,
        flex: 1 / 2,
        backgroundColor: "#fff",
        position: "relative",
        elevation: 5,
        overflow: "hidden",
    },
    template: {
        height: 350,
    },
    header: {
        flexDirection: "row",
        flexWrap: "wrap",
        gap: 8,
        alignItems: "center",
        justifyContent: "space-between",
        backgroundColor: "transparent",
        paddingHorizontal: 8,
        paddingBottom: 2,
        paddingTop: 4,
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
        height: height * 0.13,
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
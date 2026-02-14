import { colors, ui } from "../utils/styles";
import { View, Text, StyleSheet, TouchableOpacity, useWindowDimensions, Image } from "react-native";
import RenderHTML, { HTMLContentModel, HTMLElementModel } from 'react-native-render-html';
import { Svg, Path } from "react-native-svg";
import GridBackground from '../components/grid';

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

export default function NoteItem({ note, onPress, isTemplate }) {

    const { width } = useWindowDimensions();

    // Custom HTML models
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

    // Colors for the bullet point, rotating based on index or random could be nice, 
    // but let's stick to a nice pink/red for now or use the design's "Color" valid.
    const bulletColor = colors.button;

    // Function to format date nicely
    const formatDate = (dateMs) => {
        if (!dateMs) return "";
        const date = new Date(parseInt(dateMs));
        return date.toLocaleDateString('es-ES', { weekday: 'long', hour: '2-digit', minute: '2-digit' });
    };

    const isBlocked = note.hasOwnProperty("pwd") && note.pwd && note.pwd.length > 0;

    return (
        <TouchableOpacity style={styles.container} onPress={() => onPress(isTemplate ? note : note.id)} activeOpacity={0.8}>
            <GridBackground />
            {
                isBlocked ?
                    <View style={styles.screenBlock}>
                        <Image source={require("../../assets/lock-home.png")} style={{ width: 40, height: 40, opacity: 0.5 }} resizeMode="contain" />
                    </View>
                    :
                    <View style={styles.contentWrapper}>
                        {!isTemplate && (
                            <View style={styles.header}>
                                <View style={[styles.bullet, { backgroundColor: bulletColor }]} />
                                <Text style={styles.dateText}>{formatDate(note.date)}</Text>
                                {/* Decoration icon could go here if available */}
                                <View style={{ flex: 1 }} />
                                {note.favorite === 1 &&
                                    <Svg width={16} height={16} viewBox="0 0 24 24" fill={colors.pink} stroke="none">
                                        <Path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
                                    </Svg>
                                }
                            </View>
                        )}

                        <View style={styles.contentContainer}>
                            {/* <Text style={styles.title} numberOfLines={2}>
                            {note.title || "Sin título"}
                        </Text> */}
                            <View style={styles.htmlContainer}>
                                <RenderHTML
                                    contentWidth={width - 64} // Adjustable padding
                                    source={{ html: getSubstringUntilNthDiv(sanitizeHTML(note.content)) }}
                                    customHTMLElementModels={customHTMLElementModels}
                                    baseStyle={{ color: "#666", fontSize: 14, lineHeight: 20 }}
                                    renderers={renderers}
                                    defaultTextProps={{ numberOfLines: 3 }}
                                />
                            </View>
                        </View>
                    </View>
            }
        </TouchableOpacity>
    );
}

// Renderizar en cada nota de la home un limite de 9 <div> **Mejora de performance**
function getSubstringUntilNthDiv(html, limit = 9) {
    if (!html) return "";
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
        backgroundColor: "#fff",
        borderRadius: 8,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.05,
        shadowRadius: 8,
        elevation: 3,
        borderWidth: 1,
        borderColor: "rgba(0,0,0,0.02)",
        overflow: 'hidden',
        height: 225
    },
    contentWrapper: {
        padding: 16,
    },
    header: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 8,
        gap: 8,
    },
    bullet: {
        width: 8,
        height: 8,
        borderRadius: 4,
    },
    dateText: {
        fontSize: 12,
        color: colors.button,
        fontWeight: "600",
        textTransform: "capitalize",
    },
    contentContainer: {
        gap: 4,
    },
    title: {
        fontSize: 20, // Large bold text
        fontWeight: "bold", // Using serif if possible would be closer to "Coquette" design language, but sticking to system font weights for now or styles.js if it had it.
        color: "#333",
        // fontFamily: 'Serif', // Can try if `ui.h1` font is available
    },
    htmlContainer: {
        maxHeight: 200, // Limit height to show preview
        overflow: "hidden",
    },
    screenBlock: {
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
        opacity: 0.6,
    }
});
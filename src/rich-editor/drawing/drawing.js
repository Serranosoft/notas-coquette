import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import { colors, editor } from "../../utils/styles";
import ColorPicker, { HueSlider } from "reanimated-color-picker";
import { ScrollView } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";

export default function Drawing({ drawing, setDrawing }) {

    const updateDrawingColor = (hex) => {
        setDrawing(prev => ({ ...prev, color: hex }))
    };
    const onSelectColor = ({ hex }) => {
        'worklet';
        // do something with the selected color.
        runOnJS(updateDrawingColor)(hex);
    };

    return (
        <View style={[editor.footer, styles.container, { height: "auto" }]}>
            <ScrollView contentContainerStyle={{ gap: 8 }}>
                <View style={styles.items}>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, mode: "scroll" }))}><View style={[styles.iconWrapper, { backgroundColor: drawing.mode === "scroll" ? colors.light : "#fff" }]}><Image source={require("../../../assets/tap.png")} style={styles.icon} /></View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, mode: "free" }))}><View style={[styles.iconWrapper, { backgroundColor: drawing.mode === "free" ? colors.light : "#fff" }]}><Image source={require("../../../assets/free.png")} style={styles.icon} /></View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, mode: "line" }))}><View style={[styles.iconWrapper, { backgroundColor: drawing.mode === "line" ? colors.light : "#fff" }]}><Image source={require("../../../assets/line.png")} style={styles.icon} /></View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, mode: "rubber" }))}><View style={[styles.iconWrapper, { backgroundColor: drawing.mode === "rubber" ? colors.light : "#fff" }]}><Image source={require("../../../assets/eraser.png")} style={styles.icon} /></View></TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <View style={styles.items}>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, width: 2 }))}><View style={[styles.size, { backgroundColor: drawing.color, width: 27, height: 27 }]}>{drawing.width === 2 && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, width: 3 }))}><View style={[styles.size, { backgroundColor: drawing.color, width: 32, height: 32 }]}>{drawing.width === 3 && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
                    <TouchableOpacity style={styles.item} onPress={() => setDrawing(prev => ({ ...prev, width: 5 }))}><View style={[styles.size, { backgroundColor: drawing.color, width: 37, height: 37 }]}>{drawing.width === 5 && <Image source={require("../../../assets/tick-black.png")} style={styles.tick} />}</View></TouchableOpacity>
                </View>
                <View style={styles.separator} />
                <View style={styles.items}>
                    <ColorPicker
                        value={"rgb(85, 172, 238)"}
                        onComplete={onSelectColor}
                        sliderThickness={25}
                        thumbSize={24}
                        thumbShape="circle"
                    >
                        <HueSlider vertical={true} style={styles.sliderStyle} />
                    </ColorPicker>
                </View>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({


    container: {
        position: "absolute",
        top: 55,
        right: 8,
        backgroundColor: "#fff",
        borderWidth: 3,
        borderColor: colors.light,
        zIndex: 99,
        borderRadius: 100,
        paddingVertical: 0,
        width: "auto",
        paddingVertical: 8,
    },

    item: {
        textAlign: "center",
        paddingHorizontal: 6,
        paddingVertical: 4,
    },

    separator: {
        borderBottomWidth: 3,
        borderColor: colors.light
    },

    items: {
        justifyContent: "center",
        alignItems: "center",
        // gap: 8
    },

    color: {
        justifyContent: "center",
        alignItems: "center",
        width: 40,
        height: 40,
        borderRadius: 100,
        borderWidth: 2,
    },

    size: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 100,
    },

    tick: {
        position: "absolute",
        width: 48,
        height: 48,
    },

    iconWrapper: {
        padding: 4,
        backgroundColor: colors.light,
        borderRadius: 100
    },

    icon: {
        width: 32,
        height: 32,
    },

    sliderStyle: {
        height: 155,
        borderRadius: 20,
    },

})
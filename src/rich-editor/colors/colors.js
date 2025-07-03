import { StyleSheet, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { colors, editor } from "../../utils/styles";
import { storage } from "../../utils/storage";
import ColorPicker, { HueSlider, LuminanceSlider } from "reanimated-color-picker";
import { runOnJS } from "react-native-reanimated";

export default function Colors({ note, setColor }) {

    async function handleColor(color) {
        setColor(color);
        note.color = color;
        await AsyncStorage.setItem(storage.COLOR, color);
    }

    const onSelectColor = ({ hex }) => {
        'worklet';
        runOnJS(handleColor)(hex);
    };

    return (
        <View style={[editor.footer, styles.container, { height: "auto" }]}>
            <ColorPicker
                value={"rgb(85, 172, 238)"}
                onComplete={onSelectColor}
                sliderThickness={25}
                thumbSize={24}
                thumbShape="circle"
                style={styles.row}
            >
                <HueSlider vertical={true} style={styles.sliderStyle} />
                <LuminanceSlider vertical={true} style={styles.sliderStyle} />
            </ColorPicker>
        </View>
    )

}

const styles = StyleSheet.create({

    container: {
        position: "absolute",
        top: 70,
        right: 8,
        backgroundColor: "#fff",
        borderWidth: 4,
        borderColor: colors.light,
        zIndex: 99,
        paddingVertical: 0,
        overflow: "hidden",
        width: "auto",
        borderRadius: 20,
    },

    sliderStyle: {
        height: 250,
        borderRadius: 8,
    },

    row: {
        flexDirection: "row",
        gap: 4,
    }

})
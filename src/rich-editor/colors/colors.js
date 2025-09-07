import { StyleSheet, View } from "react-native";
import { editor } from "../../utils/styles";
import ColorPicker, { HueSlider, LuminanceSlider, OpacitySlider } from "reanimated-color-picker";
import { runOnJS } from "react-native-reanimated";

export default function Colors({ changeColor, changeHiliteColor, isHiliteColor }) {

    async function handleColor(color) {
        isHiliteColor ? changeHiliteColor(color) : changeColor(color);
    }

    const onSelectColor = ({ hex }) => {
        'worklet';
        runOnJS(handleColor)(hex);
    };

    return (
        <View style={editor.option}>
            <ColorPicker
                value={"rgb(85, 172, 238)"}
                onComplete={onSelectColor}
                sliderThickness={24}
                thumbSize={23}
                thumbShape="circle"
                style={styles.row}
            >
                <HueSlider vertical={true} style={styles.sliderStyle} />
                <LuminanceSlider vertical={true} style={styles.sliderStyle} />
                { isHiliteColor && <OpacitySlider vertical={true} style={styles.sliderStyle} /> }
            </ColorPicker>
        </View>
    )

}

const styles = StyleSheet.create({

    sliderStyle: {
        height: 170,
        borderRadius: 8,
        marginBottom: 3
    },

    row: {
        flexDirection: "row",
        gap: 4,
        height: 200,
        justifyContent: "center",
        alignItems: "center",
        
    }

})
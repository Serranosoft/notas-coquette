import Slider from "@react-native-community/slider";
import { colors, ui } from "../utils/styles";
import { useCallback } from "react";
import { Text } from "react-native";

export default function LineSpacingSlider({ lineSpacing, updateLineSpacing, setLineSpacing }) {

    const renderStepMarker = useCallback(({ stepMarked, currentValue, index }) => {
        return (
            <Text style={[ui.muted, ui.black, { marginTop: 18, fontSize: 11, letterSpacing: -0.25 }]}>{Number(index.toFixed(1))}</Text>
        )
    }, []);


    return (
        <Slider
            style={{ flex: 1 }}
            minimumValue={0.6}
            maximumValue={3}
            minimumTrackTintColor={colors.dark}
            maximumTrackTintColor={colors.light}
            thumbTintColor={colors.dark}
            step={0.6}
            lowerLimit={0.6}
            upperLimit={2.4}
            value={lineSpacing}
            onValueChange={(v) => updateLineSpacing(Number(v.toFixed(1)))}
            StepMarker={renderStepMarker}
            onSlidingComplete={(v) => setLineSpacing(Number(v.toFixed(1)))}

        />
    )
}
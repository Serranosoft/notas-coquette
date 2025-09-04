import Slider from "@react-native-community/slider";
import { colors, ui } from "../utils/styles";
import { useCallback } from "react";
import { Text } from "react-native";

export default function WordSpacingSlider({ wordSpacing, updateWordSpacing, setWordSpacing }) {

    const renderStepMarker = useCallback(({ stepMarked, currentValue, index }) => {
        return (
            index !== 4 && index !== -4 &&
            <Text style={[ui.muted, ui.black, { marginTop: 18, fontSize: 11, letterSpacing: -0.25 }]}>{index}</Text>
        )
    }, []);

    return (
        <Slider
            style={{ flex: 1, }}
            minimumValue={-4}
            maximumValue={4}
            minimumTrackTintColor={colors.dark}
            maximumTrackTintColor={colors.light}
            thumbTintColor={colors.dark}
            step={1}
            lowerLimit={-3}
            upperLimit={3}
            value={wordSpacing}
            onValueChange={(v) => setWordSpacing(v)}
            StepMarker={renderStepMarker}
            onSlidingComplete={(v) => updateWordSpacing(v)}

        />
    )
}
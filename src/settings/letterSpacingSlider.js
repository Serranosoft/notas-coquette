import Slider from "@react-native-community/slider";
import { colors, ui } from "../utils/styles";
import { useCallback } from "react";
import { Text } from "react-native";

export default function LetterSpacingSlider({ letterSpacing, updateLetterSpacing, setLetterSpacing }) {

    const renderStepMarker = useCallback(({ stepMarked, currentValue, index }) => {
        return (
            index !== -1.5 && index !== 3 &&
            <Text style={[ui.muted, ui.black, { marginTop: 18, fontSize: 11, letterSpacing: -0.25 }]}>{index}</Text>
        )
    }, []);

    return (
        <Slider
            style={{ flex: 1, }}
            minimumValue={-1.5}
            maximumValue={3}
            minimumTrackTintColor={colors.dark}
            maximumTrackTintColor={colors.light}
            thumbTintColor={colors.dark}
            step={0.75}
            lowerLimit={-0.75}
            upperLimit={2.25}
            value={letterSpacing}
            onValueChange={(v) => setLetterSpacing(v)}
            StepMarker={renderStepMarker}
            onSlidingComplete={(v) => updateLetterSpacing(v)}

        />
    )
}
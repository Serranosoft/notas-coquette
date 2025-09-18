import Slider from "@react-native-community/slider";
import { colors, ui } from "../utils/styles";
import { useCallback } from "react";
import { Text, View } from "react-native";

export default function RateVoiceSlider({ rate, setVoiceRate, updateVoice }) {

    const renderStepMarker = useCallback(({ index }) => {
        return ( <Text style={[ui.muted, ui.black, { marginTop: 18, fontSize: 11, letterSpacing: -0.25 }]}>{index}</Text> )
    }, []);

    return (
        <View style={{ flex: 1 }}>
            <Slider
                minimumValue={0.25}
                maximumValue={1}
                minimumTrackTintColor={colors.dark}
                maximumTrackTintColor={colors.light}
                thumbTintColor={colors.dark}
                step={0.25}
                lowerLimit={0.25}
                upperLimit={1}
                value={rate}
                onValueChange={(v) => setVoiceRate(Number(v.toFixed(2)))}
                onSlidingComplete={(v) => updateVoice({ rate: Number(v.toFixed(2)) })}
                StepMarker={renderStepMarker}
            />
        </View>
    )
}
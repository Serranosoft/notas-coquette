import AntDesign from '@expo/vector-icons/AntDesign';
import CustomDropdown from "../components/dropdown";

export default function VoiceSelector({ availableVoices, voice, updateVoice, language}) {


    return (
        <CustomDropdown
            data={availableVoices}
            option={voice}
            onChange={(item) => updateVoice({ voice: item.identifier })}
            labelIdentifier={"label"}
            valueIdentifier={"identifier"}
            placeholder={language.t("_chooseVoice")}
        />
    )
}


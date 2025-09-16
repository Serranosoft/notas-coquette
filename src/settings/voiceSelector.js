import AntDesign from '@expo/vector-icons/AntDesign';
import CustomDropdown from "../components/dropdown";

export default function VoiceSelector({ availableVoices, voice, updateVoice }) {

    return (
        <CustomDropdown
            data={availableVoices}
            option={voice}
            onChange={(item) => updateVoice(item.identifier)}
            leftIcon={() => (
                <AntDesign
                    style={styles.icon}
                    color={'black'}
                    name="Safety"
                    size={20}
                />
            )}
        />
    )
}


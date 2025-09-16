import { StyleSheet } from "react-native";
import { colors, ui } from "../utils/styles";
import { useState } from "react";
import { Dropdown } from "react-native-element-dropdown";

export default function CustomDropdown({data, option, onChange, leftIcon}) {

    const [isFocus, setIsFocus] = useState(false);
    console.log(option);
    return (
        <Dropdown
            style={[styles.dropdown, isFocus && styles.opened]}
            placeholderStyle={ui.muted}
            selectedTextStyle={[ui.text, ui.black]}
            inputSearchStyle={[ui.text, ui.black]}
            itemTextStyle={[ui.text, ui.black]}
            iconStyle={styles.iconStyle}
            containerStyle={styles.inner}
            data={data}
            placeholder="Elige una voz"
            maxHeight={150}
            labelField="label"
            valueField="identifier"
            value={option}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                onChange(item);
            }}
            // renderLeftIcon={() => leftIcon()}
        />
    )
}

const styles = StyleSheet.create({
    dropdown: {
        flex: 1,
        height: 40,
        borderColor: colors.dark,
        borderWidth: 2,
        borderRadius: 8,
        paddingHorizontal: 8,
    },
    opened: {
        borderBottomWidth: 0,
        borderBottomLeftRadius: 0,
        borderBottomRightRadius: 0,
    },
    inner: {
        marginVertical: -2,
        borderColor: colors.dark,
        borderWidth: 2,
        borderTopWidth: 0,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
    },
    selectedTextStyle: {
        fontSize: 16,
    },
    iconStyle: {
        width: 20,
        height: 20,
    },
})
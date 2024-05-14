import { StyleSheet, View } from "react-native"
import { Text } from "react-native"
import { TouchableOpacity } from "react-native"
import { Modal } from "react-native"
import { components, ui } from "../utils/styles"
import SmoothPinCodeInput from "react-native-smooth-pincode-input"
import { useEffect } from "react"

export default function LockScreenModal({ note, isUnlock = false, lockModal, setLockModal, pwd, setPwd, setUnlocked, unlocked }) {

    useEffect(() => {
        if (pwd.length === 4) {
            if (isUnlock) {
                if (note.pwd) {
                    if (note.pwd === pwd) {
                        setUnlocked(true);
                    } else {
                        setUnlocked(false);
                        setPwd("");
                    }
                } else {
                    setUnlocked(false);
                    setPwd("");
                }
            } else {
                note.pwd = pwd;
                setLockModal(false);
            }
        }
    }, [pwd])

    function close() {
        setPwd("");
        if (setUnlocked) {
            setUnlocked(null);
        }
        setLockModal(false);
    }

    return (
        <Modal
            animationType="fade"
            transparent={true}
            visible={lockModal}
            onRequestClose={close}>
            <View style={styles.center}>
                <View style={styles.wrapper}>
                    <View style={styles.border}>
                        <TouchableOpacity style={styles.close} onPress={close}>
                            <Text style={[ui.h4, ui.black]}>&#10006;</Text>
                        </TouchableOpacity>
                        <View style={styles.content}>
                            <Text style={[ui.h2, ui.black]}>Introduce el código PIN</Text>
                            { isUnlock && <Text style={[ui.muted, ui.center]}>Esta nota está bloqueada, introduce el código PIN para poder acceder a ella</Text> }
                            {unlocked === false && <Text style={[ui.text, components.error]}>PIN incorrecto</Text>}
                            <View style={styles.pinWrapper}>
                                <SmoothPinCodeInput
                                    value={pwd}
                                    onTextChange={pwd => setPwd(pwd)}
                                    cellStyle={{
                                        borderWidth: 2,
                                        borderRadius: 8,
                                    }}
                                    cellStyleFocused={{
                                        // borderColor: '#cc527a',
                                        backgroundColor: '#cc527a',
                                    }}
                                    textStyle={{
                                        fontSize: 40,
                                        color: '#000'
                                    }}
                                    cellSize={65}
                                />
                            </View>
                        </View>
                    </View>
                </View>
            </View>

        </Modal>
    )
}

const styles = StyleSheet.create({
    center: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        backgroundColor: "rgba(0,0,0,0.5)"
    },
    wrapper: {
        width: "90%",
        paddingHorizontal: 4,
        paddingVertical: 4,
        gap: 8,
        backgroundColor: '#fafafa',
        borderRadius: 20,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },

    close: {
        position: "absolute",
        top: 0,
        right: 8,
    },

    border: {
        borderWidth: 6,
        borderRadius: 20,
        borderColor: "#FACCD6",
        paddingHorizontal: 24,
        paddingVertical: 32,

    },

    content: {
        marginTop: 32,
        gap: 8,
        alignItems: "center",
    },

    pinWrapper: {
        marginTop: 24,
    }
})
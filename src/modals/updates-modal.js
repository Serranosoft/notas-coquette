import { useEffect, useState } from 'react';
import { Modal, View, Text, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ui } from '../utils/styles';
import Button from '../components/button';

const VERSION_MODAL = 'v1';

export default function UpdatesModal() {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const checkIfSeen = async () => {
            const viewed = await AsyncStorage.getItem('modalUpdatesVersion');
            if (viewed !== VERSION_MODAL) {
                setVisible(true);
            }
        };
        checkIfSeen();
    }, []);

    const closeModal = async () => {
        setVisible(false);
        await AsyncStorage.setItem('modalUpdatesVersion', VERSION_MODAL);
    };

    return (
        <Modal visible={visible} transparent animationType="slide">
            <View style={styles.overlay}>
                <View style={styles.modal}>
                    <Text style={[ui.h3, { color: "#000"}]}>🆕 Novedades</Text>
                    <Text style={[ui.text, { color: "#000" }]}>• Dibuja, subraya y pinta libremente en tus notas ⭐</Text>
                    <Text style={[ui.text, { color: "#000" }]}>• Añade un toque único con stickers decorativos 💖</Text>
                    <Text style={[ui.text, { color: "#000" }]}>• Disfruta de una nueva fuente para tus notas ✍️</Text>
                    <Text style={[ui.text, { color: "#000" }]}>• Traduce tus notas al instante 🌺</Text>
                    <Text style={[ui.text, { color: "#000" }]}>😊 Esperamos que disfrutes de todas estas novedades 😊</Text>
                    <Button text={"Cerrar"} onClick={closeModal} />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: 'rgba(0,0,0,0.5)',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modal: {
        backgroundColor: '#fff',
        padding: 24,
        borderRadius: 8,
        width: '80%',
        gap: 16
    },
});

import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Audio } from 'expo-av';
import { colors, ui } from '../utils/styles';
import { Svg, Path, Circle } from 'react-native-svg';

export default function AudioRecorder({ visible, onStop, onClose }) {
    const [recording, setRecording] = useState(null);
    const [duration, setDuration] = useState(0);
    const timerRef = useRef(null);

    useEffect(() => {
        if (visible) {
            startRecording();
        } else {
            stopRecording();
        }
        return () => {
            if (timerRef.current) clearInterval(timerRef.current);
        };
    }, [visible]);

    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });

                const { recording } = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );
                setRecording(recording);
                setDuration(0);
                timerRef.current = setInterval(() => {
                    setDuration(prev => prev + 1);
                }, 1000);
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording() {
        if (!recording) return;

        setRecording(null);
        if (timerRef.current) clearInterval(timerRef.current);

        try {
            await recording.stopAndUnloadAsync();
            const uri = recording.getURI();
            onStop(uri);
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    return (
        <Modal visible={visible} transparent animationType="fade">
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Grabando Nota de Audio...</Text>
                    <Text style={styles.timer}>{formatTime(duration)}</Text>
                    <View style={styles.waveformContainer}>
                        {/* Simple animated circle for visual feedback */}
                        <Svg width={100} height={100}>
                            <Circle cx="50" cy="50" r="40" fill={colors.pink} opacity={0.3} />
                            <Circle cx="50" cy="50" r="30" fill={colors.pink} />
                        </Svg>
                    </View>
                    <TouchableOpacity style={styles.stopButton} onPress={stopRecording}>
                        <Svg width={24} height={24} viewBox="0 0 24 24" fill="#fff">
                            <Path d="M6 6h12v12H6z" />
                        </Svg>
                        <Text style={styles.stopText}>Detener</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.cancelButton} onPress={onClose}>
                        <Text style={styles.cancelText}>Cancelar</Text>
                    </TouchableOpacity>
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
    container: {
        backgroundColor: '#fff',
        padding: 32,
        borderRadius: 20,
        alignItems: 'center',
        gap: 16,
        width: '80%',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color: colors.button,
    },
    timer: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#333',
    },
    waveformContainer: {
        height: 100,
        justifyContent: 'center',
        alignItems: 'center',
    },
    stopButton: {
        backgroundColor: colors.button,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 24,
        paddingVertical: 12,
        borderRadius: 30,
        gap: 8,
    },
    stopText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 16,
    },
    cancelButton: {
        marginTop: 8,
    },
    cancelText: {
        color: '#888',
        fontSize: 14,
    }
});

import { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { colors, editor } from '../utils/styles';
import { Svg, Path } from 'react-native-svg';
import Animated, { useAnimatedStyle, withRepeat, withTiming, useSharedValue } from 'react-native-reanimated';

export default function AudioRecorder({ onStop, onClose }) {
    const recordingRef = useRef(null);
    const mountedRef = useRef(true);
    const [duration, setDuration] = useState(0);
    const timerRef = useRef(null);
    const pulse = useSharedValue(1);

    useEffect(() => {
        mountedRef.current = true;
        startRecording();
        pulse.value = withRepeat(withTiming(0.4, { duration: 800 }), -1, true);

        return () => {
            mountedRef.current = false;
            if (timerRef.current) clearInterval(timerRef.current);
            // Direct cleanup: stop recording immediately via ref
            const rec = recordingRef.current;
            if (rec) {
                recordingRef.current = null;
                rec.stopAndUnloadAsync().catch(e => console.error('Cleanup stop failed', e));
            }
        };
    }, []);

    async function startRecording() {
        try {
            const permission = await Audio.requestPermissionsAsync();
            if (!mountedRef.current) return;

            if (permission.status === "granted") {
                await Audio.setAudioModeAsync({
                    allowsRecordingIOS: true,
                    playsInSilentModeIOS: true,
                });
                if (!mountedRef.current) return;

                const { recording: newRecording } = await Audio.Recording.createAsync(
                    Audio.RecordingOptionsPresets.HIGH_QUALITY
                );

                // If unmounted while creating, stop immediately
                if (!mountedRef.current) {
                    await newRecording.stopAndUnloadAsync();
                    return;
                }

                recordingRef.current = newRecording;
                setDuration(0);
                timerRef.current = setInterval(() => {
                    setDuration(prev => prev + 1);
                }, 1000);
            }
        } catch (err) {
            console.error('Failed to start recording', err);
        }
    }

    async function stopRecording(isCancel = false) {
        const currentRecording = recordingRef.current;
        if (!currentRecording) return;

        recordingRef.current = null;
        if (timerRef.current) clearInterval(timerRef.current);

        try {
            await currentRecording.stopAndUnloadAsync();
            if (!isCancel) {
                const uri = currentRecording.getURI();
                onStop(uri);
            }
        } catch (error) {
            console.error('Failed to stop recording', error);
        }
    }

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const pulseStyle = useAnimatedStyle(() => ({
        opacity: pulse.value
    }));

    return (
        <View style={[editor.option, styles.islandOverride]}>
            <View style={styles.recorderContent}>
                {/* Left: Indicator and Timer */}
                <View style={styles.leftSection}>
                    <Animated.View style={[styles.pulseDot, pulseStyle]} />
                    <Text style={styles.timer}>{formatTime(duration)}</Text>
                </View>

                {/* Center: Stop Button */}
                <TouchableOpacity
                    style={styles.stopButtonCircle}
                    onPress={() => stopRecording(false)}
                >
                    <View style={styles.stopSquare} />
                </TouchableOpacity>

                {/* Right: Cancel Icon */}
                <TouchableOpacity style={styles.cancelIcon} onPress={onClose}>
                    <Svg width={24} height={24} viewBox="0 0 24 24" fill={colors.button}>
                        <Path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
                    </Svg>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    islandOverride: {
        height: 60,
        paddingBottom: 0,
        paddingHorizontal: 16,
        justifyContent: 'center',
        maxWidth: 275,
        width: "100%",
        marginHorizontal: "auto",
    },
    recorderContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: 50,
    },
    leftSection: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
        minWidth: 80,
    },
    pulseDot: {
        width: 12,
        height: 12,
        borderRadius: 6,
        backgroundColor: '#ff4d4f',
    },
    timer: {
        fontSize: 20,
        fontWeight: 'bold',
        color: colors.button,
        fontVariant: ['tabular-nums'],
    },
    stopButtonCircle: {
        width: 40,
        height: 40,
        borderRadius: 24,
        backgroundColor: colors.button,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 2,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.2,
        shadowRadius: 1.41,
    },
    stopSquare: {
        width: 16,
        height: 16,
        backgroundColor: '#fff',
        borderRadius: 2,
    },
    cancelIcon: {
        padding: 4,
        minWidth: 40,
        alignItems: 'flex-end',
    }
});

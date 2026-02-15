import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Audio } from 'expo-av';
import { colors } from '../utils/styles';
import Slider from '@react-native-community/slider';
import { Svg, Path } from 'react-native-svg';

export default function AudioPlayer({ uri }) {
    const [sound, setSound] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [position, setPosition] = useState(0);
    const [duration, setDuration] = useState(0);

    useEffect(() => {
        return sound
            ? () => {
                sound.unloadAsync();
            }
            : undefined;
    }, [sound]);

    async function playPause() {
        if (sound === null) {
            const { sound: newSound } = await Audio.Sound.createAsync(
                { uri },
                { shouldPlay: true },
                onPlaybackStatusUpdate
            );
            setSound(newSound);
            setIsPlaying(true);
        } else {
            if (isPlaying) {
                await sound.pauseAsync();
                setIsPlaying(false);
            } else {
                await sound.playAsync();
                setIsPlaying(true);
            }
        }
    }

    const onPlaybackStatusUpdate = (status) => {
        if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis);
            if (status.didJustFinish) {
                setIsPlaying(false);
                setPosition(0);
            }
        }
    };

    const onSliderValueChange = (value) => {
        if (sound) {
            sound.setPositionAsync(value);
        }
    };

    const formatTime = (millis) => {
        const totalSeconds = millis / 1000;
        const minutes = Math.floor(totalSeconds / 60);
        const seconds = Math.floor(totalSeconds % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={playPause} style={styles.playButton}>
                <Svg width={24} height={24} viewBox="0 0 24 24" fill="#fff">
                    {isPlaying ? (
                        <Path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
                    ) : (
                        <Path d="M8 5v14l11-7z" />
                    )}
                </Svg>
            </TouchableOpacity>
            <View style={styles.progressContainer}>
                <Slider
                    style={styles.slider}
                    minimumValue={0}
                    maximumValue={duration || 1}
                    value={position}
                    onValueChange={onSliderValueChange}
                    minimumTrackTintColor={colors.button}
                    maximumTrackTintColor="#fabcc2"
                    thumbTintColor={colors.button}
                />
                <View style={styles.timeContainer}>
                    <Text style={styles.timeText}>{formatTime(position)}</Text>
                    <Text style={styles.timeText}>{formatTime(duration)}</Text>
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fbe4e9',
        borderWidth: 2,
        borderColor: '#fabcc2',
        borderRadius: 25,
        padding: 10,
        marginVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
    },
    playButton: {
        backgroundColor: colors.button,
        width: 40,
        height: 40,
        borderRadius: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    progressContainer: {
        flex: 1,
    },
    slider: {
        width: '100%',
        height: 20,
    },
    timeContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
    },
    timeText: {
        fontSize: 10,
        color: '#cc527a',
        fontWeight: 'bold',
    },
});

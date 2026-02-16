import { useRef, useEffect, useCallback } from 'react';
import { Keyboard } from 'react-native';
import { Audio } from 'expo-av';

/**
 * Hook that manages embedded audio playback within the RichEditor WebView.
 * Handles play/pause toggle, progress tracking, and WebView UI synchronization.
 * 
 * @param {React.RefObject} richText - Ref to the RichEditor component
 */
export function useEditorAudio(richText) {
    const editorSoundRef = useRef(null);
    const activeUriRef = useRef(null);
    const isProcessingRef = useRef(false);

    // Cleanup audio on unmount
    useEffect(() => {
        return () => {
            if (editorSoundRef.current) {
                editorSoundRef.current.unloadAsync();
            }
        };
    }, []);

    const handleEditorMessage = useCallback(async (event) => {
        try {
            // Robust parsing: check if we got a raw event or the parsed data
            let data;
            try {
                data = typeof event.nativeEvent.data === 'string' ? JSON.parse(event.nativeEvent.data) : event.nativeEvent.data;
            } catch (e) {
                data = event; // Fallback if it's already an object
            }

            if (data && data.type === 'PLAY_AUDIO' && data.uri) {
                if (isProcessingRef.current) return;
                isProcessingRef.current = true;
                Keyboard.dismiss();

                const updateWebViewUI = (status) => {
                    if (!richText.current) return;

                    const position = status.positionMillis || 0;
                    const duration = status.durationMillis || 1;
                    const isFinished = status.didJustFinish || (position >= duration && duration > 0);

                    const syncData = {
                        uri: activeUriRef.current,
                        isPlaying: status.isPlaying && !isFinished,
                        position: isFinished ? 0 : position,
                        duration: duration,
                        progress: isFinished ? 0 : (position / duration) * 100
                    };

                    richText.current.injectJavascript(`if(window.updateAudioUI) window.updateAudioUI(${JSON.stringify(syncData)});`);
                };

                // Optimized status update (200ms)
                let lastUpdate = 0;
                const statusListener = (status) => {
                    if (status.isLoaded) {
                        const now = Date.now();
                        // Much faster update frequency for better sync (200ms)
                        if (now - lastUpdate > 200 || status.didJustFinish || !status.isPlaying) {
                            updateWebViewUI(status);
                            lastUpdate = now;
                        }
                    }
                };

                // Toggle logic
                if (editorSoundRef.current && activeUriRef.current === data.uri) {
                    const status = await editorSoundRef.current.getStatusAsync();
                    if (status.isLoaded) {
                        if (status.isPlaying) {
                            await editorSoundRef.current.pauseAsync();
                            updateWebViewUI({ ...status, isPlaying: false });
                        } else {
                            if (status.didJustFinish || (status.positionMillis >= status.durationMillis - 100)) {
                                await editorSoundRef.current.setPositionAsync(0);
                            }
                            const newStatus = await editorSoundRef.current.playAsync();
                            updateWebViewUI(newStatus);
                        }
                        isProcessingRef.current = false;
                        return;
                    }
                }

                // New playback: Stop previous completely
                if (editorSoundRef.current) {
                    await editorSoundRef.current.unloadAsync();
                    if (activeUriRef.current && activeUriRef.current !== data.uri) {
                        updateWebViewUI({ isPlaying: false, positionMillis: 0, durationMillis: 1, didJustFinish: true });
                    }
                }

                activeUriRef.current = data.uri;
                const { sound } = await Audio.Sound.createAsync(
                    { uri: data.uri },
                    { shouldPlay: true, progressUpdateIntervalMillis: 200 },
                    statusListener
                );
                editorSoundRef.current = sound;
            }
        } catch (e) {
            console.log("Error in handleEditorMessage", e);
        } finally {
            isProcessingRef.current = false;
        }
    }, [richText]);

    // JavaScript injected into the WebView for audio UI synchronization
    const playbackScript = `
        (function() {
            function formatTime(ms) {
                if (isNaN(ms)) return "0:00";
                var s = Math.floor(ms / 1000);
                var m = Math.floor(s / 60);
                var rs = s % 60;
                return m + ":" + (rs < 10 ? '0' : '') + rs;
            }

            window.updateAudioUI = function(data) {
                var memos = document.querySelectorAll('.audio-memo[data-uri="' + data.uri + '"]');
                memos.forEach(function(memo) {
                    if (data.isPlaying) {
                        memo.classList.add('audio-playing');
                    } else {
                        memo.classList.remove('audio-playing');
                    }
                    var fill = memo.querySelector('.audio-progress-fill');
                    if (fill) fill.style.width = data.progress + '%';
                    var timers = memo.querySelectorAll('.audio-timer');
                    if (timers.length >= 2) {
                        timers[0].innerText = formatTime(data.position);
                        timers[1].innerText = formatTime(data.duration);
                    }
                });
            };

            function handleFocusBlocking(e) {
                var memo = e.target.closest('.audio-memo');
                if (!memo) return;

                // Stop editor from focusing/keyboard popup
                // We DON'T prevent default here because we want the 'click' or 'onclick' to fire
                // But we blur the active element immediately
                if (document.activeElement && document.activeElement.blur) {
                    document.activeElement.blur();
                }
            }

            // Capture phase blocking to prevent cursor jumping
            ['mousedown', 'touchstart'].forEach(function(evt) {
                document.addEventListener(evt, handleFocusBlocking, {capture: true, passive: true});
            });
        })();
    `;

    return {
        handleEditorMessage,
        playbackScript
    };
}

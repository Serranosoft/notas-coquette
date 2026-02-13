import { useState, useRef, useCallback } from 'react';

export function useNoteDrawing() {
    const sketchPadRef = useRef();
    const [drawing, setDrawing] = useState({
        isDrawing: false,
        color: "rgb(85,172,238)",
        width: 2,
        mode: "scroll",
        visible: true
    });

    return {
        sketchPadRef,
        drawing,
        setDrawing
    };
}

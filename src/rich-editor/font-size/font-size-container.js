import { useEffect, useState } from "react";
import FontSize from "./font-size";

export const SIZES = { "10": 1, "13": 2, "16": 3, "18": 4, "24": 5, "32": 6, "48": 7 }

export default function FontSizeContainer({ setFontSize, fontSize, openSeparators }) {

    const [selected, setSelected] = useState(null);

    function handleFontSize(size, index) {
        setFontSize(size);
        setSelected(index);
    }

    useEffect(() => {
        setSelected(fontSize);
    }, [])

    return (
        <FontSize {...{ selected, openSeparators, handleFontSize }}/>
    )
}
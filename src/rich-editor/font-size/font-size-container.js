import { useEffect, useState } from "react";
import FontSize from "./font-size";


export default function FontSizeContainer({ setFontSize, fontSize }) {

    const [selected, setSelected] = useState(null);

    function handleFontSize(size, index) {
        setFontSize(size);
        setSelected(index);
    }

    useEffect(() => {
        setSelected(fontSize);
    }, [fontSize])

    return (
        <FontSize {...{ selected, handleFontSize }}/>
    )
}
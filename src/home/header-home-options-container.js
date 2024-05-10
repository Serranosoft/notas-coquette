import { useState } from "react";
import HeaderHomeOptions from "./header-home-options";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HeaderHomeOptionsContainer({ columnNumber, setColumnNumber }) {

    const [visible, setVisible] = useState(false);
    const hideMenu = () => setVisible(false);
    const showMenu = () => setVisible(true);

    async function changeLayout() {
        let grid = columnNumber;
        if (columnNumber > 2) {
            grid = 1;
        } else {
            grid = columnNumber + 1;
        }

        setColumnNumber(grid);
        hideMenu();

        await AsyncStorage.setItem("grid", grid.toString());
    }

    return (
        <HeaderHomeOptions {...{ visible, hideMenu, showMenu, changeLayout }} />
    )
}
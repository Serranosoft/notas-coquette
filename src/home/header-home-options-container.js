import { useState } from "react";
import HeaderHomeOptions from "./header-home-options";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { userPreferences } from "../utils/user-preferences";

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

        await AsyncStorage.setItem(userPreferences.GRID, grid.toString());
    }

    return (
        <HeaderHomeOptions {...{ visible, hideMenu, showMenu, changeLayout }} />
    )
}
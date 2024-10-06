import { router } from "expo-router";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";
import { components, header } from "../utils/styles";
import { useContext } from "react";
import { LangContext } from "../utils/Context";

export default function HeaderHomeOptions({ visible, hideMenu, showMenu, changeLayout }) {

    const { language } = useContext(LangContext);

    return (
        <Menu
            visible={visible}
            onRequestClose={hideMenu}
            anchor={(
                <TouchableWithoutFeedback onPress={showMenu}>
                    <Image source={require("../../assets/more.png")} style={header.img} />
                </TouchableWithoutFeedback>
            )}>
            <MenuItem onPress={changeLayout}>
                <View style={components.row}>
                    <Image style={header.img} source={require("../../assets/grid.png")} />
                    <Text>{language.t("_headerDropdownOption1")}</Text>
                </View>
            </MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => router.push("settings")}>
                <View style={components.row}>
                    <Image style={header.img} source={require("../../assets/settings.png")} />
                    <Text>{language.t("_headerDropdownOption2")}</Text>
                </View>
            </MenuItem>
        </Menu>
    )
}
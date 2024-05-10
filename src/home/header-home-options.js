import { router } from "expo-router";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";
import { components, header } from "../utils/styles";

export default function HeaderHomeOptions({ visible, hideMenu, showMenu, changeLayout }) {

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
                    <Text>Cambiar cuadricula</Text>
                </View>
            </MenuItem>
            <MenuDivider />
            <MenuItem onPress={() => router.push("settings")}>
                <View style={components.row}>
                    <Image style={header.img} source={require("../../assets/settings.png")} />
                    <Text>Configuración</Text>
                </View>
            </MenuItem>
        </Menu>
    )
}
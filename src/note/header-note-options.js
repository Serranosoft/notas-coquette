import { router } from "expo-router";
import { Image, Text, TouchableWithoutFeedback, View } from "react-native";
import { Menu, MenuDivider, MenuItem } from "react-native-material-menu";
import { Path, Svg } from "react-native-svg";
import { components, header } from "../utils/styles";
import { useContext } from "react";
import { LangContext } from "../utils/Context";

export default function HeaderNoteOptions({ showMenu, updateReadingMode, readingMode, menuVisible, hideMenu, remove, showLockModal, unlock, noteLocked }) {

    const { language } = useContext(LangContext);
    
    return (
        <Menu
            visible={menuVisible}
            onRequestClose={hideMenu}
            anchor={(
                <TouchableWithoutFeedback onPress={showMenu}>
                    <Image source={require("../../assets/more.png")} style={header.img} />
                </TouchableWithoutFeedback>
            )}>
            <MenuItem onPress={updateReadingMode}>
                <View style={components.row}>
                    <Image style={header.img} source={require("../../assets/read.png")} />
                    <Text>{readingMode ? language.t("_headerNoteDropdownOption1") : language.t("_headerNoteDropdownOption2")}</Text>
                </View>
            </MenuItem>
            <MenuItem onPress={remove}>
                <View style={components.row}>
                    <Svg style={header.img} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <Path d="M10 18a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1zM20 6h-4V5a3 3 0 00-3-3h-2a3 3 0 00-3 3v1H4a1 1 0 000 2h1v11a3 3 0 003 3h8a3 3 0 003-3V8h1a1 1 0 000-2zM10 5a1 1 0 011-1h2a1 1 0 011 1v1h-4zm7 14a1 1 0 01-1 1H8a1 1 0 01-1-1V8h10zm-3-1a1 1 0 001-1v-6a1 1 0 00-2 0v6a1 1 0 001 1z" />
                    </Svg>
                    <Text>{language.t("_headerNoteDropdownOption3")}</Text>
                </View>
            </MenuItem>
            {
                noteLocked ?
                    <MenuItem onPress={unlock}>
                        <View style={components.row}>
                            <Image style={header.img} source={require("../../assets/unlock.png")} />
                            <Text>{language.t("_headerNoteDropdownOption4")}</Text>
                        </View>
                    </MenuItem>
                    :
                    <MenuItem onPress={showLockModal}>
                        <View style={components.row}>
                            <Image style={header.img} source={require("../../assets/lock.png")} />
                            <Text>{language.t("_headerNoteDropdownOption5")}</Text>
                        </View>
                    </MenuItem>
            }
            <MenuDivider />
            <MenuItem onPress={() => router.push({ pathname: "settings", params: true })}>
                <View style={components.row}>
                    <Image style={header.img} source={require("../../assets/settings.png")} />
                    <Text>{language.t("_headerNoteDropdownOption6")}</Text>
                </View>
            </MenuItem>
        </Menu>
    )
}
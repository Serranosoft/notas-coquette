import { Image, Text, View } from "react-native"

export const boldLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor, }]}><Image style={common} source={require("../../assets/bold.png")} /></View>
export const italicLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/italic.png")} /></View>
export const underlineLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/underline.png")} /></View>
export const alignLeftLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/align-left.png")} /></View>
export const alignCenterLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/align-center.png")} /></View>
export const alignRightLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/align-right.png")} /></View>
export const listLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/list.png")} /></View>
export const separatorsLabel = () => <View style={[wrapper, { marginLeft: "auto" }]}><Image style={common} source={require("../../assets/icons.png")} /></View>
export const fontSizeLabel = () => <View style={[wrapper]}><Image style={common} source={require("../../assets/font-size.png")} /></View>
export const colorsLabel = () => <View style={[wrapper]}><Image style={common} source={require("../../assets/colors.png")} /></View>
export const undoLabel = () => <View style={[wrapper]}><Image style={common} source={require("../../assets/undo.png")} /></View>
export const redoLabel = () => <View style={[wrapper]}><Image style={common} source={require("../../assets/redo.png")} /></View>

const wrapper = {
    padding: 4, 
    borderRadius: 8
}
const common = {
    width: 30,
    height: 30
}
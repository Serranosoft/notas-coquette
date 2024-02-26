import { Image, Text, View } from "react-native"

export const boldLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/bold.png")} /></View>
export const italicLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/italic.png")} /></View>
export const underlineLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/underline.png")} /></View>
export const alignLeftLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/align-left.png")} /></View>
export const alignCenterLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/align-center.png")} /></View>
export const alignRightLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/align-right.png")} /></View>
export const listLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/list.png")} /></View>
export const separatorsLabel = ({ openSeparators }) => <View style={[wrapper, { backgroundColor: openSeparators ? "rgba(255, 255, 255, 0.75)": "transparent" }]}><Text style={ { color: "#000", paddingVertical: 4 }}>ʕ•⩊•ʔ</Text></View>
const wrapper = {
    padding: 4, 
    borderRadius: 8
}
const common = {
    width: 30,
    height: 30
}
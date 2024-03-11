import { Image, Text, View } from "react-native"
import LottieView from 'lottie-react-native';

export const boldLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor, }]}><Image style={common} source={require("../../assets/bold.png")} /></View>
export const italicLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/italic.png")} /></View>
export const underlineLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/underline.png")} /></View>
export const alignLeftLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/align-left.png")} /></View>
export const alignCenterLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/align-center.png")} /></View>
export const alignRightLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/align-right.png")} /></View>
export const listLabel = ({tintColor}) => <View style={[wrapper, { backgroundColor: tintColor }]}><Image style={common} source={require("../../assets/list.png")} /></View>
export const separatorsLabel = () => <View style={[wrapper, { width: 40, height: 40, marginRight: -16 }]}><LottieView source={require("../../assets/lottie/separators.json")} loop={true} autoPlay={true} width={40} height={40} /></View>
export const fontSizeLabel = () => <View style={[wrapper, { width: 40, height: 40, marginRight: -16 }]}><LottieView source={require("../../assets/lottie/font-size.json")} loop={true} autoPlay={true} width={40} height={40} /></View>
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
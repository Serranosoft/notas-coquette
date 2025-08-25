import { Image, View } from "react-native"
import Svg, { Path } from "react-native-svg"

export const boldLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8 }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={24}
            height={24}
            strokeWidth={2}
        >
            <Path d="M7 5h6a3.5 3.5 0 010 7H7zM13 12h1a3.5 3.5 0 010 7H7v-7" />
        </Svg>
    </View>
export const italicLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8 }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={24}
            height={24}
            strokeWidth={2}
        >
            <Path d="M11 5h6M7 19h6M14 5l-4 14" />
        </Svg>
    </View>
export const underlineLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8 }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={24}
            height={24}
            strokeWidth={2}
        >
            <Path d="M7 5v5a5 5 0 0010 0V5M5 19h14" />
        </Svg></View>
export const alignLeftLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8 }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={24}
            height={24}
            strokeWidth={2}
        >
            <Path d="M4 6h16M4 12h10M4 18h14" />
        </Svg>
    </View>
export const alignCenterLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8 }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={24}
            height={24}
            strokeWidth={2}
        >
            <Path d="M4 6h16M8 12h8M6 18h12" />
        </Svg>
    </View>
export const alignRightLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8 }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={24}
            height={24}
            strokeWidth={2}
        >
            <Path d="M4 6h16M10 12h10M6 18h14" />
        </Svg>
    </View>
export const listLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8 }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={24}
            height={24}
            strokeWidth={2}
        >
            <Path d="M9 6h11M9 12h11M9 18h11M5 6v.01M5 12v.01M5 18v.01" />
        </Svg>
    </View>
export const separatorsLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8 }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={24}
            height={24}
            strokeWidth={2}
        >
            <Path d="M6 15h15M21 19H6M15 11h6M21 7h-6M9 9h1a1 1 0 11-1 1V7.5a2 2 0 012-2M3 9h1a1 1 0 11-1 1V7.5a2 2 0 012-2" />
        </Svg>
    </View>
export const fontSizeLabel = () =>
    <View>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#000"
            strokeLinecap="round"
            strokeLinejoin="round"
            width={24}
            height={24}
            strokeWidth={2}
        >
            <Path d="M3 7V5h13v2M10 5v14M12 19H8M15 13v-1h6v1M18 12v7M17 19h2" />
        </Svg>
    </View>
export const checkboxLabel = () =>
    <View>
        <Svg
            height={24}
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M19 2H5a3 3 0 00-3 3v14a3 3 0 003 3h14a3 3 0 003-3V5a3 3 0 00-3-3zm1 17a1 1 0 01-1 1H5a1 1 0 01-1-1V5a1 1 0 011-1h14a1 1 0 011 1zM17.67 7.28a1 1 0 010 1.41l-7.46 7.94a1 1 0 01-.73.31 1 1 0 01-.73-.31L6.31 14a1 1 0 111.45-1.37l1.76 1.87 6.73-7.16a1 1 0 011.42-.06z"
            />
        </Svg>
    </View>

export const colorsLabel = () =>
    <View>
        <Image style={{ width: 20, height: 20 }} source={require("../../assets/text-color.png")} />
    </View>
export const stickersLabel = () =>
    <View>
        <Svg
            width={24}
            height={24}
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            viewBox="0 0 24 24"
            xmlSpace="preserve"
            enableBackground="new 0 0 430.23 430.23"
        >
            <Path
                d="M15 1.25H9C3.567 1.25 1.25 3.568 1.25 9v6c0 5.432 2.317 7.75 7.75 7.75h6c5.433 0 7.75-2.318 7.75-7.75V9c0-5.432-2.317-7.75-7.75-7.75zM21.25 15c0 4.614-1.636 6.25-6.25 6.25H9c-2.757 0-4.444-.591-5.361-2.045l4.373-2.934a1.492 1.492 0 011.733.084l.333.286a2.976 2.976 0 003.8 0l4.161-3.57a1.482 1.482 0 011.846 0l1.367 1.173zm0-2.733l-.391-.335a2.976 2.976 0 00-3.8 0L12.9 15.5a1.482 1.482 0 01-1.844 0l-.333-.286a2.982 2.982 0 00-3.546-.191L3.048 17.8a11.2 11.2 0 01-.3-2.8V9C2.75 4.386 4.386 2.75 9 2.75h6c4.614 0 6.25 1.636 6.25 6.25zM9 5.25A2.75 2.75 0 1011.75 8 2.752 2.752 0 009 5.25zm0 4A1.25 1.25 0 1110.25 8 1.252 1.252 0 019 9.25z"
            />
        </Svg>
    </View>
export const undoLabel = () => <View><Image style={common} source={require("../../assets/undo.png")} /></View>
export const redoLabel = () => <View><Image style={common} source={require("../../assets/redo.png")} /></View>


const common = {
    width: 25,
    height: 25,
}
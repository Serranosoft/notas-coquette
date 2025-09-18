import { Image, View } from "react-native"
import Svg, { G, Path, Rect } from "react-native-svg"

export const boldLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
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
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
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
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
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
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
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
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
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
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
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
export const alignFullLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
        <Svg
            fill="none"
            height={24}
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
        >
            <G fill="#000">
                <Path d="M20.01 8.02h-16a1 1 0 110-2h16a1 1 0 010 2zM20.01 13.02h-16a1 1 0 110-2h16a1 1 0 010 2zM20.01 18.02h-16a1 1 0 110-2h16a1 1 0 010 2z" />
            </G>
        </Svg>
    </View>
export const listLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
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
export const orderedListLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
        <Svg width={20} height={20} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <Path d="M3.25 9h-1.5a.75.75 0 000 1.5h1.5a.25.25 0 01.25.25V11a.25.25 0 01-.25.25h-.5C1.785 11.25 1 12.035 1 13v1.25c0 .414.336.75.75.75h2.5a.75.75 0 000-1.5H2.5V13a.25.25 0 01.25-.25h.5C4.215 12.75 5 11.965 5 11v-.25C5 9.785 4.215 9 3.25 9zM3.25 17h-1.5a.75.75 0 000 1.5h1.5a.25.25 0 01.25.25V19a.25.25 0 01-.25.25h-1a.75.75 0 000 1.5h1a.25.25 0 01.25.25v.25a.25.25 0 01-.25.25h-1.5a.75.75 0 000 1.5h1.5C4.215 23 5 22.215 5 21.25V21c0-.372-.119-.716-.318-1 .199-.284.318-.628.318-1v-.25C5 17.785 4.215 17 3.25 17zM1.75 2.5h.75v3.75a.75.75 0 001.5 0v-4.5A.75.75 0 003.25 1h-1.5a.75.75 0 000 1.5zM8 5h15a1 1 0 100-2H8a1 1 0 100 2zM23 11H8a1 1 0 100 2h15a1 1 0 100-2zM23 19H8a1 1 0 100 2h15a1 1 0 100-2z" />
        </Svg>
    </View>
export const separatorsLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
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
export const fontSizeLabel = (active) =>
    <View style={{ backgroundColor: active ? "#fff" : "transparent", borderRadius: 8, padding: 2 }}>
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

export const colorsLabel = (active) =>
    <View style={{ backgroundColor: active ? "#fff" : "transparent", borderRadius: 8, padding: 2 }}>
        <Image style={{ width: 20, height: 20 }} source={require("../../assets/text-color.png")} />
    </View>
export const stickersLabel = (active) =>
    <View style={{ backgroundColor: active ? "#fff" : "transparent", borderRadius: 8, padding: 2 }}>
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
export const strikeThroughLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
        <Svg
            fill="none"
            height={24}
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                clipRule="evenodd"
                d="M9.353 3.51c.938-.382 1.977-.553 3.011-.5s2.044.325 2.924.803c.88.479 1.614 1.154 2.098 1.977a1 1 0 01-1.724 1.014c-.278-.473-.728-.907-1.33-1.233-.6-.327-1.315-.526-2.068-.564s-1.5.087-2.157.355-1.184.661-1.545 1.116c-.359.452-.541.949-.56 1.436-.006.144.003.288.025.43a1 1 0 11-1.976.312 4.205 4.205 0 01-.048-.82c.037-.945.39-1.843.992-2.6.599-.755 1.42-1.343 2.358-1.726zM3 12a1 1 0 011-1h16a1 1 0 110 2h-3.193c.144.16.278.33.4.507.545.793.828 1.712.79 2.658-.037.945-.39 1.842-.991 2.6-.6.755-1.42 1.342-2.358 1.725a7.074 7.074 0 01-3.012.501 6.862 6.862 0 01-2.923-.804c-.88-.479-1.614-1.154-2.098-1.977a1 1 0 111.724-1.014c.278.473.728.907 1.33 1.234a4.865 4.865 0 002.068.564 5.074 5.074 0 002.156-.356c.658-.268 1.185-.661 1.546-1.116.359-.452.54-.948.56-1.436a2.376 2.376 0 00-.44-1.446 3.238 3.238 0 00-.675-.71 4.048 4.048 0 00-.766-.469 4.982 4.982 0 00-2.117-.46H4a1 1 0 01-1-1z"
                fill="#000"
                fillRule="evenodd"
            />
        </Svg>
    </View>
export const codeLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
        <Svg
            width={24}
            height={24}
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path d="M19 2H5C3.34 2 2 3.68 2 5.75v12.5C2 20.32 3.34 22 5 22h10.59c.27 0 .52-.13.71-.37l5.41-6.77c.19-.23.29-.55.29-.88V5.75C22 3.68 20.66 2 19 2zM5 20.5c-.8 0-1.5-1.05-1.5-2.25V5.75c0-1.2.7-2.25 1.5-2.25h14c.8 0 1.5 1.05 1.5 2.25V13H17c-1.38 0-2.5 1.23-2.5 2.75v4.75zm11-.9v-3.85c0-.69.45-1.25 1-1.25h3.08z" />
        </Svg>
    </View>
export const foreColorLabel = (active) =>
    <View style={{ backgroundColor: active ? "#fff" : "transparent", borderRadius: 8, padding: 2 }}>
        <Svg
            fill="none"
            height={24}
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                d="M15.246 14H8.754l-1.6 4H5l6-15h2l6 15h-2.154zm-.8-2L12 5.885 9.554 12zM3 20h18v2H3z"
                fill="#000"
            />
        </Svg>
    </View>
export const hiliteColorLabel = (active) =>
    <View style={{ backgroundColor: active ? "#fff" : "transparent", borderRadius: 8, padding: 2 }}>
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            enableBackground="new 0 0 512 512"
        >
            <Rect
                width={24}
                height={24}
                rx={4.8}
                ry={4.8}
                fill="#cc527b6e"
                transform="matrix(.95 0 0 .95 .6 .6)"
            />
            <Path
                fill="#fff"
                d="M15.246 14H8.754l-1.6 4H5l6-15h2l6 15h-2.154zm-.8-2L12 5.885 9.554 12zM3 20h18v2H3z"
                data-original="#000000"
                transform="matrix(.95 0 0 .95 .6 .625)"
            />
        </Svg>
    </View>
export const removeFormatLabel = ({ tintColor }) =>
    <View style={{ backgroundColor: tintColor, borderRadius: 8, padding: 2 }}>
        <Svg
            fill="none"
            height={24}
            viewBox="0 0 24 24"
            width={24}
            xmlns="http://www.w3.org/2000/svg"
        >
            <Path
                clipRule="evenodd"
                d="M5 4a1 1 0 011-1h12a1 1 0 110 2h-5v15a1 1 0 11-2 0V5H6a1 1 0 01-1-1zm10.293 11.293a1 1 0 011.414 0L18 16.586l1.293-1.293a1 1 0 011.414 1.414L19.414 18l1.293 1.293a1 1 0 01-1.414 1.414L18 19.414l-1.293 1.293a1 1 0 01-1.414-1.414L16.586 18l-1.293-1.293a1 1 0 010-1.414z"
                fill="#000"
                fillRule="evenodd"
            />
        </Svg>
    </View>

export const undoLabel = () => <View><Image style={common} source={require("../../assets/undo.png")} /></View>
export const redoLabel = () => <View><Image style={common} source={require("../../assets/redo.png")} /></View>

export const startVoiceLabel = () =>
    <Svg
        height={24}
        viewBox="0 0 32 32"
        width={24}
        xmlns="http://www.w3.org/2000/svg"
        data-name="Layer 1"
    >
        <Path d="M16 2a1 1 0 00-1 1v26a1 1 0 002 0V3a1 1 0 00-1-1zM20 9a1 1 0 00-1 1v13a1 1 0 002 0V10a1 1 0 00-1-1zM24 6a1 1 0 00-1 1v19a1 1 0 002 0V7a1 1 0 00-1-1zM28 12a1 1 0 00-1 1v7a1 1 0 002 0v-7a1 1 0 00-1-1zM12 9a1 1 0 00-1 1v13a1 1 0 002 0V10a1 1 0 00-1-1zM8 6a1 1 0 00-1 1v19a1 1 0 002 0V7a1 1 0 00-1-1zM4 12a1 1 0 00-1 1v7a1 1 0 002 0v-7a1 1 0 00-1-1z" />
    </Svg>

export const pauseVoiceLabel = () =>
    <Svg
        fill="none"
        height={24}
        viewBox="0 0 24 24"
        width={24}
        xmlns="http://www.w3.org/2000/svg"
    >
        <Path
            clipRule="evenodd"
            d="M8 4a1 1 0 011 1v14a1 1 0 11-2 0V5a1 1 0 011-1zm8 0a1 1 0 011 1v14a1 1 0 11-2 0V5a1 1 0 011-1z"
            fill="#000"
            fillRule="evenodd"
        />
    </Svg>

const common = {
    width: 25,
    height: 25,
}
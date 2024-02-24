import { Text } from "react-native"

export const boldLabel = ({tintColor}) => <Text style={[common, { color: tintColor }] }>B</Text>
export const italicLabel = ({tintColor}) => <Text style={[common, { color: tintColor/* , fontStyle: "italic" */ }] }>I</Text>
export const underlineLabel = ({tintColor}) => <Text style={[common, { color: tintColor/* , textDecorationLine: "underline" */ }] }>U</Text>
export const h1Label = ({tintColor}) => <Text style={[common, { color: tintColor }] }>H1</Text>
export const h2Label = ({tintColor}) => <Text style={[common, { color: tintColor }] }>H2</Text>
export const paragraphLabel = ({tintColor}) => <Text style={[common, { color: tintColor }] }>P</Text>

export const testLabel = ({tintColor}) => <Text style={[common, { color: tintColor }] }>X</Text>

const common = {
    fontFamily: "Bold",
    fontSize: 27,
    marginTop: -4,
    // transform: [{ scale: 3 }]
}
import { Text } from "react-native"

export const boldLabel = ({tintColor}) => <Text style={[common, { color: tintColor }] }>B</Text>
export const italicLabel = ({tintColor}) => <Text style={[common, { color: tintColor }] }>I</Text>
export const underlineLabel = ({tintColor}) => <Text style={[common, { color: tintColor, textDecorationLine: "underline" }] }>U</Text>

const common = {
    fontFamily: "Bold",
    fontSize: 27,
    marginTop: -8,
}
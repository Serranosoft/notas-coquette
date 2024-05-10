import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, ui } from "../../utils/styles";

const separators = ["✧･ﾟ: *✧･ﾟ:* 　　 *:･ﾟ✧*:･ﾟ✧", "･ﾟﾟ･✩‧₊˚", "༶•┈┈⛧┈♛ ♛┈⛧┈┈•༶", "✩･ﾟﾟ･☁･ﾟﾟ･✩‧₊˚", "｡･ﾟﾟ･✧", "✧༺♥༻∞", "༻*ੈ✩‧₊˚ (ﾉ⛓◕ヮ◕)ﾉ⛓ *:･ﾟ✧", "*ੈ✩‧₊˚*ੈ✩‧₊˚*ੈ✩‧₊", "*＊✿❀　❀✿＊*", "(ﾉ◕ヮ◕)ﾉ✧･ﾟ: *✧･ﾟ:*🦋", "⋆ ˚｡⋆୨୧˚　˚୨୧⋆｡˚ ⋆", "*:..｡o○", "ﾟ+*:ꔫ:*﹤  ﹥*:ꔫ:*+ﾟ", "*+:｡.｡　　｡.｡:+*", "♥*♡∞:｡.｡　　｡.｡:∞♡*♥", ".⋆｡⋆˚｡⋆｡˚｡⋆. .⋆｡⋆˚｡⋆｡˚｡⋆.", "｡･:*:･ﾟ★,｡･:*:･ﾟ☆", "✧.⋆｡⋆˚｡⋆｡˚｡⋆.✧", ". • °⛓✧༺ ༻*ੈ✩‧₊˚⛓", "° 𐐪𐑂 ♡ 𐐪𐑂 ₒ 𐐪𐑂 ♡ 𐐪𐑂 °", "★・・・・・・★・・・・・・★・・・・・・★", "⋇⋆✦⋆⋇　 ⋇⋆✦⋆⋇", "‧͙⁺˚*･༓☾　　☽༓･*˚⁺‧͙", "☆.｡.:*　　.｡.:*☆", "»»——⍟——««", "【☆】★【☆】★【☆】★【☆】★【☆】", "⋆˙.⋆｡★ 彡", "∞ ₒ ˚ ° 𐐒𐐚 ° ˚ ₒ ∞", ".・。.・゜✭・.・✫・゜・。.", "❀❁❀ 彡", "☆♬○♩●♪✧♩", "⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿　　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑", "◛⁺⑅♡Lᵒᵛᵉᵧₒᵤ♡⑅⁺◛˖", "*°:⋆ₓₒ　　ₓₒ⋆:°*", "✧☁☂︎", "⸝⸝> ̫ <⸝⸝", "ʕ•⩊•ʔ", "ฅ^•ﻌ•^ฅ", "~✰♡✰♡✰", "ₓ˚. ୭ ˚○◦˚.˚◦○˚ ୧ .˚ₓ", "⭒❃.✮:▹　　◃:✮.❃⭒", "⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿", "｡☆✼★━━━━━━━━━━━━★✼☆｡"]

export default function Separators({ setSeparator }) {

    return (
        <View style={styles.container}>
            <ScrollView horizontal>
                {
                    separators.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => setSeparator(item)} key={index} style={styles.item}>
                                <Text style={[ui.text, styles.text]}>{item}</Text>
                            </TouchableOpacity>
                        )
                    })
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: colors.light,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        zIndex: 1,
    },

    item: {
        paddingHorizontal: 12,
        borderRightWidth: 2,
    },
    
    text: {
        paddingVertical: 12,
        color: "#000"
    },
})
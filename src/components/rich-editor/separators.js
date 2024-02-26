import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ui } from "../../utils/styles";

const test = ["✧･ﾟ: *✧･ﾟ:* 　　 *:･ﾟ✧*:･ﾟ✧", "･ﾟﾟ･✩‧₊˚", "༶•┈┈⛧┈♛ ♛┈⛧┈┈•༶", "✩･ﾟﾟ･☁･ﾟﾟ･✩‧₊˚", "｡･ﾟﾟ･✧", "✧༺♥༻∞", "༻*ੈ✩‧₊˚ (ﾉ⛓◕ヮ◕)ﾉ⛓ *:･ﾟ✧", "*ੈ✩‧₊˚*ੈ✩‧₊˚*ੈ✩‧₊", "*＊✿❀　❀✿＊*", "(ﾉ◕ヮ◕)ﾉ✧･ﾟ: *✧･ﾟ:*🦋", "⋆ ˚｡⋆୨୧˚　˚୨୧⋆｡˚ ⋆", "*:..｡o○", "ﾟ+*:ꔫ:*﹤  ﹥*:ꔫ:*+ﾟ", "*+:｡.｡　　｡.｡:+*", "♥*♡∞:｡.｡　　｡.｡:∞♡*♥", ".⋆｡⋆˚｡⋆｡˚｡⋆. .⋆｡⋆˚｡⋆｡˚｡⋆.", "｡･:*:･ﾟ★,｡･:*:･ﾟ☆", "✧.⋆｡⋆˚｡⋆｡˚｡⋆.✧", ". • °⛓✧༺ ༻*ੈ✩‧₊˚⛓", "° 𐐪𐑂 ♡ 𐐪𐑂 ₒ 𐐪𐑂 ♡ 𐐪𐑂 °", "★・・・・・・★・・・・・・★・・・・・・★", "⋇⋆✦⋆⋇　 ⋇⋆✦⋆⋇", "‧͙⁺˚*･༓☾　　☽༓･*˚⁺‧͙", "☆.｡.:*　　.｡.:*☆", "»»——⍟——««", "【☆】★【☆】★【☆】★【☆】★【☆】", "⋆˙.⋆｡★ 彡", "∞ ₒ ˚ ° 𐐒𐐚 ° ˚ ₒ ∞", ".・。.・゜✭・.・✫・゜・。.", "❀❁❀ 彡", "☆♬○♩●♪✧♩", "⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿　　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑", "◛⁺⑅♡Lᵒᵛᵉᵧₒᵤ♡⑅⁺◛˖", "*°:⋆ₓₒ　　ₓₒ⋆:°*", "✧☁☂︎", "⸝⸝> ̫ <⸝⸝", "ʕ•⩊•ʔ", "ฅ^•ﻌ•^ฅ", "~✰♡✰♡✰", "ₓ˚. ୭ ˚○◦˚.˚◦○˚ ୧ .˚ₓ", "⭒❃.✮:▹　　◃:✮.❃⭒", "⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿", "｡☆✼★━━━━━━━━━━━━★✼☆｡"]

export default function Separators({ setSeparator }) {

    return (
        <View style={styles.container}>
            <ScrollView horizontal style={{ paddingVertical: 8 }}>
                {
                    test.map((item, index) => {
                        return (
                            <TouchableOpacity onPress={() => setSeparator(item)} key={index} style={{ marginHorizontal: 8 }}>
                                <Text style={[ui.text, styles.item]}>{item}</Text>
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
        backgroundColor: "#fff",
    },
    
    item: {
        paddingHorizontal: 8,
        textAlign: "center",
        paddingVertical: 4,
        borderWidth: 2,
    },
})
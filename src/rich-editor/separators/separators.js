import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, editor, ui } from "../../utils/styles";

const separators = ["✧･ﾟ: *✧･ﾟ:* 　　 *:･ﾟ✧*:･ﾟ✧", "･ﾟﾟ･✩‧₊˚", "༶•┈┈⛧┈♛ ♛┈⛧┈┈•༶", "✩･ﾟﾟ･☁･ﾟﾟ･✩‧₊˚", "｡･ﾟﾟ･✧", "✧༺♥༻∞", "༻*ੈ✩‧₊˚ ﾉ⛓◕ヮ◕ﾉ⛓ *:･ﾟ✧", "*ੈ✩‧₊˚*ੈ✩‧₊˚*ੈ✩‧₊", "*＊✿❀　❀✿＊*", "ﾉ◕ヮ◕ﾉ✧･ﾟ: *✧･ﾟ:*🦋", "⋆ ˚｡⋆୨୧˚　˚୨୧⋆｡˚ ⋆", "*:..｡o○", "ﾟ+*:ꔫ:*﹤  ﹥*:ꔫ:*+ﾟ", "*+:｡.｡　　｡.｡:+*", "♥*♡∞:｡.｡　　｡.｡:∞♡*♥", ".⋆｡⋆˚｡⋆｡˚｡⋆. .⋆｡⋆˚｡⋆｡˚｡⋆.", "｡･:*:･ﾟ★,｡･:*:･ﾟ☆", "✧.⋆｡⋆˚｡⋆｡˚｡⋆.✧", ". • °⛓✧༺ ༻*ੈ✩‧₊˚⛓", "° 𐐪𐑂 ♡ 𐐪𐑂 ₒ 𐐪𐑂 ♡ 𐐪𐑂 °", "★・・・・・・★・・・・・・★・・・・・・★", "⋇⋆✦⋆⋇　 ⋇⋆✦⋆⋇", "‧͙⁺˚*･༓☾　　☽༓･*˚⁺‧͙", "☆.｡.:*　　.｡.:*☆", "»»——⍟——««", "【☆】★【☆】★【☆】★【☆】★【☆】", "⋆˙.⋆｡★ 彡", "∞ ₒ ˚ ° 𐐒𐐚 ° ˚ ₒ ∞", ".・。.・゜✭・.・✫・゜・。.", "❀❁❀ 彡", "☆♬○♩●♪✧♩", "⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿　　✿✼:*ﾟ:༅｡.｡༅:*･ﾟﾟ･⭑", "◛⁺⑅♡Lᵒᵛᵉᵧₒᵤ♡⑅⁺◛˖", "*°:⋆ₓₒ　　ₓₒ⋆:°*", "✧☁☂︎", "⸝⸝> ̫ <⸝⸝", "ʕ•⩊•ʔ", "ฅ^•ﻌ•^ฅ", "~✰♡✰♡✰", "ₓ˚. ୭ ˚○◦˚.˚◦○˚ ୧ .˚ₓ", "⭒❃.✮:▹　　◃:✮.❃⭒", "⭑･ﾟﾟ･*:༅｡.｡༅:*ﾟ:*:✼✿", "｡☆✼★━━━━━━━━━━━━★✼☆｡"]

export default function Separators({ setSeparator }) {

    return (
        <View style={[editor.footer, styles.container, { height: "auto" }]}>
            <View style={styles.sizeList}>
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
        </View>
    )
}

const styles = StyleSheet.create({
    

    item: {
        paddingHorizontal: 12,
        borderRightWidth: 2,
    },

    text: {
        paddingVertical: 8,
        color: "#000"
    },

    container: {
        position: "absolute",
        top: 16,
        right: 0,
        backgroundColor: "#fff",
        borderWidth: 4,
        borderColor: colors.light,
        zIndex: 99,
        borderRadius: 100,
        paddingVertical: 0,
        overflow: "hidden",
        width: "auto",
    },
    
    item: {
        textAlign: "center",
        color: "#000",
        paddingHorizontal: 8,
        borderRightWidth: 3,
        borderColor: colors.light
    },

    sizeList: {
        flexDirection: "row",
    }
})
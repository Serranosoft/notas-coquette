import { ScrollView, StyleSheet, TouchableOpacity, View } from "react-native";
import { Image } from "react-native";
import { colors, editor, ui } from "../../utils/styles";

export default function Stickers({ setSticker }) {

    const stickers = [
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/heart.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/banner.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/flower.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/tulips.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/hair-tie.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/heart-balloon.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/heart-shape1.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/bouquet.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/scrunchie.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/key.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/candy1.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/lock.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/candy.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/love-letter1.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/heart-1.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/rose.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/lp.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/love-letter.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/gift.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/love-message1.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/heart-shape.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/love-message.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/hair-tie1.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/scrunchie-1.png",
        "https://mollydigital.manu-scholz.com/wp-content/uploads/2025/07/hair-tie-1.png",
    ]

    return (
        <View style={[editor.footer, styles.container, { height: "auto", maxHeight: 325 }]}>
                <ScrollView>
                    {
                        stickers.map((item, index) => {
                            return (
                                <TouchableOpacity onPress={() => setSticker(item)} key={index} style={styles.item}>
                                    <Image source={{ uri: item }} style={{ width: 48, height: 48 }} />
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
        position: "absolute",
        top: 70,
        right: 8,
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
        paddingVertical: 8,
        paddingHorizontal: 8,
    },
})
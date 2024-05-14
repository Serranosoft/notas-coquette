import { FlatList, Image, StyleSheet, Switch, Text, TouchableOpacity, View } from "react-native";
import { colors, gap, layout, padding, ui } from "../utils/styles";
import GridBackground from "../components/grid";
import { FONTS } from "./settings-container";
import { BannerAd, BannerAdSize } from "react-native-google-mobile-ads";
import { bannerId } from "../utils/constants";

export default function Settings({ removeAll, updateAutoSave, updateTypo, autoSave, typo }) {

    return (
        <View style={[layout.flex, layout.backgroundLight, padding.bigHorizontal]}>
            <View style={styles.box}>
                <Text style={[ui.h4, ui.black]}>Tipografia</Text>
                <FlatList
                    horizontal={true}
                    data={FONTS}
                    contentContainerStyle={gap.big}
                    renderItem={({ item: font }) => (
                        <TouchableOpacity onPress={() => updateTypo(font.key)} style={[styles.typoItem, font.key == typo && styles.typoSelected]}>
                            <GridBackground />
                            <Image source={font.preview} style={styles.typoImg} />
                        </TouchableOpacity>
                    )}
                />
                <Text style={ui.muted}>Al cambiar de tipografía se le enviará a la pantalla de inicio para cargar la nueva fuente</Text>

            </View>
            <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />

            <View style={styles.box}>
                <Text style={[ui.h4, ui.black]}>Ajustes del editor</Text>
                <View style={styles.row}>
                    <Text style={[ui.text, ui.black]}>Guardado automático</Text>
                    <Switch
                        style={styles.switch}
                        trackColor={{ false: '#767577', true: colors.light }}
                        thumbColor={autoSave ? colors.dark : '#f4f3f4'}
                        onValueChange={updateAutoSave}
                        value={autoSave}
                    />
                </View>
            </View>
            <BannerAd unitId={bannerId} size={BannerAdSize.ANCHORED_ADAPTIVE_BANNER} requestOptions={{}} />
            <View style={styles.box}>
                <Text style={[ui.h4, ui.black]}>Ajustes de la aplicación</Text>
                <View style={styles.row}>
                    <TouchableOpacity style={styles.btn} onPress={removeAll}>
                        <Text style={[ui.text, { color: colors.dark, textAlign: "center" }]}>Eliminar todas las notas</Text>
                    </TouchableOpacity>
                </View>
                <Text style={ui.muted}>¡CUIDADO! Al pulsar en el siguiente botón se eliminarán todas las notas guardadas</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({

    row: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        marginVertical: 8
    },

    switch: {
        transform: [{ scale: 1.3 }]
    },

    box: {
        gap: 12,
        backgroundColor: "#fff",
        paddingVertical: 16,
        paddingHorizontal: 24,
        borderRadius: 8,
        marginVertical: 16
    },

    typoItem: {
        width: 120,
        position: "relative",
        height: 80,
        backgroundColor: "#fff",
        elevation: 5,
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 8,
        marginRight: 8
    },

    typoImg: {
        width: "90%",
        height: "90%",
        resizeMode: "contain",
    },

    typoSelected: {
        borderWidth: 3,
        borderColor: colors.dark
    },

    btn: {
        width: "100%",
        borderRadius: 100,
        borderWidth: 2,
        borderColor: colors.dark,
        padding: 8,
    }
})
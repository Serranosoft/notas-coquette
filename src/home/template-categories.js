import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { colors, layout, ui } from "../utils/styles";
import { router } from "expo-router";

const categories = [
    { name: "Ideas", color: "#F8B7D3" },
    { name: "Diario", color: "#A7C4A0" },
    { name: "Listas", color: "#C9A7EB" },
    { name: "Sueños", color: "#F3C5C5" }
];

export default function TemplateCategories() {

    const navigateToTemplates = () => {
        router.push("/templates");
    };

    return (
        <View style={styles.container}>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
                {categories.map((cat, index) => (
                    <TouchableOpacity key={index} style={styles.categoryItem} onPress={navigateToTemplates}>
                        <View style={[styles.circle, { backgroundColor: cat.color }]}>
                            {/* Placeholder for future icons/images */}
                        </View>
                        <Text style={[ui.muted, styles.label]}>{cat.name}</Text>
                    </TouchableOpacity>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginBottom: 20,
    },
    scrollContent: {
        paddingHorizontal: 16,
        gap: 20,
    },
    categoryItem: {
        alignItems: "center",
        gap: 8,
    },
    circle: {
        width: 60,
        height: 60,
        borderRadius: 30,
        borderWidth: 2,
        borderColor: "#fff",
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    label: {
        fontSize: 12,
        fontWeight: "bold",
        color: colors.button, // Pinkish
        textTransform: "uppercase",
        letterSpacing: 1,
    }
});

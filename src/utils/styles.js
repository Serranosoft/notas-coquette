export const colors = {
    button: "#cc527a",
    selected: "rgba(230, 34, 114, 0.25)",
    light: "#FACCD6",
    dark: "#cc527a"

}

export const ui = {
    muted: {
        fontFamily: "madimi",
        color: "#9c9c9c",
        fontSize: 14
    },
    text: {
        fontFamily: "madimi",
        color: "#fff",
        fontSize: 16.5,
    },
    h1: {
        fontSize: 60,
        fontFamily: "aroma",
        lineHeight: 65,
    },
    h2: {
        fontFamily: "aroma",
        color: "#fff",
        fontSize: 35,
        textAlign: "center"
    },
    h3: {
        fontFamily: "aroma",
        color: "#fff",
        fontSize: 31,
    },
    h4: {
        fontFamily: "aroma",
        color: "#fff",
        fontSize: 21,
    },
}

export const layout = {
    header: {
        backgroundColor: colors.light,
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 8,
        paddingHorizontal: 12,
        paddingVertical: 12
    },

    title: {
        flexDirection: "row",
        alignItems: "center",
        gap: 8
    }
}

export const editor = {
    richBar: {
        width: "100%",
        backgroundColor: colors.light
    },
    header: {
        height: 50,
        alignItems: "flex-start",
        paddingHorizontal: 12,
    },

    footer: {
        width: "90%",
        alignSelf: "center",
        justifyContent: "center",
        // position: "absolute",
        // bottom: 16,
        paddingVertical: 12,
        borderRadius: 100,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
        marginBottom: 20
    }
}


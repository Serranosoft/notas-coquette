export const colors = {
    button: "#cc527a",
    selected: "rgba(230, 34, 114, 0.25)",
    light: "#FACCD6",
    dark: "#cc527a"
}

export const ui = {
    muted: {
        fontFamily: "Regular",
        color: "#000",
        fontSize: 14
    },
    text: {
        fontFamily: "Regular",
        color: "#fff",
        fontSize: 17.25,
    },
    h1: {
        fontSize: 60,
        fontFamily: "Semibold",
        lineHeight: 65,
    },
    h2: {
        fontFamily: "Medium",
        color: "#fff",
        fontSize: 35,
        textAlign: "center"
    },
    h3: {
        fontFamily: "Medium",
        color: "#fff",
        fontSize: 31,
    },
    h4: {
        fontFamily: "Semibold",
        color: "#fff",
        fontSize: 22,
    },
    h5: {
        fontFamily: "Semibold",
        color: "#fff",
        fontSize: 19,
    },
    black: {
        color: "#000",
    },
    center: {
        textAlign: "center"
    }
}

export const layout = {
    flex: {
        flex: 1,
    },

    title: {
        flexDirection: "row",
        alignItems: "center",
        gap: 4
    },

    paddingHorizontal: {
        paddingHorizontal: 16
    },

    backgroundLight: {
        backgroundColor: colors.light,
    },

    backgroundWhite: {
        backgroundColor: "#fff",
    },

    contentList: {
        gap: 32,
        paddingTop: 16,
        paddingBottom: 100
    },
    
    zIndex: {
        zIndex: 1,
    },

    row: {
        flexDirection: "row",
    },

    justifyBetween: {
        justifyContent: "space-between",
    },

    alignCenter: {
        alignItems: "center",
    }
}

export const editor = {
    richBar: {
        width: "100%",
        backgroundColor: colors.light,
    },
    header: {
        // height: 32,
        alignItems: "flex-start",
        paddingHorizontal: 8,
        zIndex: 99,
        backgroundColor: colors.light,
    },

    footer: {
        width: "100%",
        alignSelf: "center",
        justifyContent: "center",
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
        marginBottom: 20,
        zIndex: 1,
    },
    option: {
        height: 200,
        backgroundColor: "#fff",
        borderWidth: 4,
        borderBottomWidth: 0,
        borderColor: colors.light,
        borderTopLeftRadius: 16,
        borderTopRightRadius: 16,
        paddingBottom: 8,
    }
}

export const header = {
    img: {
        width: 25,
        height: 25,
    }
}


export const sizes = {
    medium: {
        fontSize: 20
    }
}

export const gap = {
    small: {
        gap: 8
    },

    medium: {
        gap: 12
    },

    big: {
        gap: 16
    }
}

export const padding = {
    smallHorizontal: {
        paddingHorizontal: 8
    },

    mediumHorizontal: {
        paddingHorizontal: 12
    },

    bigHorizontal: {
        paddingHorizontal: 16
    },

    smallVertical: {
        paddingVertical: 8,
    },
    mediumVertical: {
        paddingVertical: 12,
    },
    bigVertical: {
        paddingVertical: 16,
    },

    smallTop: {
        paddingTop: 8,
    },
    mediumTop: {
        paddingTop: 12,
    },
    bigTop: {
        paddingTop: 16,
    },
}

export const components = {
    header: [
        layout.row,
        layout.justifyBetween,
        layout.alignCenter,
        layout.backgroundLight,
        padding.mediumHorizontal,
        padding.mediumVertical,
        gap.small
    ],

    row: [
        layout.row,
        layout.alignCenter,
        gap.small,
    ],

    error: [
        ui.text,
        { color: "red" }
    ]
}
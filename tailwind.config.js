module.exports = {
    purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
    darkMode: "class", // or 'media' or 'class'
    theme: {
        extend: {},
        minWidth: {
            0: "0",
            "1/4": "25%",
            "1/2": "50%",
            "3/4": "75%",
            full: "100%",
        },
        colors: {
            "green-light": "#b8e28a",
            green: "#5ec57e",
            "green-dark": "#347571",
            "gray-dark": "#3e3a4e",
            "red-light": "#ffc0cb",
            red: "#c55e7e",
            white: "#fff",
            black: "#000",
        },
        fontFamily: {
            sans: ["Open Sans", "system-ui", "sans-serif"],
            serif: ["EB Garamond", "serif"],
        },
    },
    variants: {
        extend: {},
    },
    plugins: [],
};

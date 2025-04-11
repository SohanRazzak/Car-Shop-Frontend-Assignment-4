/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            colors: {
                primary: "#0bba48",
                secondary: "#222222",
                overlyBg: "#f5f5f5",
            },
        },
        fontFamily: {
            orbitron: ["Orbitron, 'serif'"],
            sans: ["Open Sans, 'serif'"],
            inter: ["Inter, 'serif'"],
        },
    },
    plugins: [],
};

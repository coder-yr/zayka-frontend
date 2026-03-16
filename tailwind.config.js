// /** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: [
//     "./src/pages/**/*.{js,jsx,ts,tsx}",
//     "./src/components/**/*.{js,jsx,ts,tsx}",
//     "./src/app/**/*.{js,jsx,ts,tsx}",
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class", // Ensure dark mode is enabled
  content: [
        "./src/pages/**/*.{js,jsx,ts,tsx}",
        "./src/components/**/*.{js,jsx,ts,tsx}",
        "./src/app/**/*.{js,jsx,ts,tsx}",
      ],
  theme: {
    extend: {
      boxShadow: {
        'gradient-pink': '0px 1px 5px 1px rgba(232, 15, 136, 0.6), 0px 4px 20px 5px rgba(232, 15, 136, 0.2)',
      },
      colors: {
        primary: "#E80F88",
        primaryOnly: "#E80F88",
        primaryLight: "rgb(251, 207, 229)",
        blackColor: "#000000",
        blackLight: "#212121",
        whiteColor: "#FFFFFF",
        whiteOnly: "#FFFFFF",
        cardWhite: "#FFFFFF",
        screenBackground: "#f9fcfd",
        ash: "#c3c3c3",
        ashDark: "#6A6C6D",
        ashLight: "#F5F5F5",
        transparentColor: "transparent",
        greenDark: "#20c141",
        greenLight: "#5fe25f",
        red: "#f22845",
        redLight: "#CE596A",
        blueLight: "#5aa8ed",
        naturalBlue: "#2d00f7",
        skyblue: "#6a8ddd",
        tableGreenLight: "#cce9d5",
        tableGreenDark: "#00932c",
        tableOrangeLight: "#ffeedc",
        tableOrangeDark: "#ee8c21",
      },
    },
  },
  plugins: [],
};

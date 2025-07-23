/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Rubik", "ui-sans-serif", "system-ui"],
      },
      colors: {
        rat_darkest: "#37323c",
        rat_dark: "#5d5566",
        rat_base: "#8c8397",
        rat_light: "#BEB9C5",
        rat_lightest: "#E5E3E7",
        star: "rgb(255,100,25)",
      },
    },
  },
  plugins: [],
};

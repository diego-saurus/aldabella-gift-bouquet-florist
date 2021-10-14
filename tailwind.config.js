const theme = require("tailwindcss/defaultTheme")

module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      ...theme.fontSize,
      largest: "14rem",
    },
    spacing: {
      ...theme.spacing,
      18: "4.5rem",
      110: "30rem",
    },
    colors: {
      white: {
        DEFAULT: "#e6e6e6",
      },
      gold: {
        DEFAULT: "#906b23",
        dark: "#664A1A",
        light: "#D7A74F",
        lightest: "#F8B12E",
        medium: "#B08639",
      },
      black: {
        DEFAULT: "#090909",
        light: "#232323",
      },
      gray: {
        DEFAULT: "#3B4043",
      },
      pink: {
        DEFAULT: "#f7ede1",
      },
      brown: {
        DEFAULT: "#4f4637",
      },
      blue: {
        DEFAULT: "#2e4959",
      },
    },
    extend: {
      container: {
        center: true,
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

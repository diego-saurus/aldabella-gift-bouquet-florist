module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: {
        DEFAULT: "#e6e6e6",
      },
      gold: {
        DEFAULT: "#906b23",
        dark: "#664A1A",
        light: "#D7A74F",
        medium: "#B08639",
      },
      black: {
        DEFAULT: "#090909",
        light: "#232323",
      },
      gray: {
        DEFAULT: "#3B4043",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

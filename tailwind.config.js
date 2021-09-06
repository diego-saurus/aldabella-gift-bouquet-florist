module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
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
        padding: "1rem",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}

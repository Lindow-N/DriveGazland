/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        dark1: "#111828",
        dark2: "#161D2D",
        dark3: "#202737",
        greenPrimary: "#1C7B47",
        redPrimary: "#D62839",
      },

      fontFamily: {
        title: ["Catamaran", "sans-serif"],
        subtitle: ["Chivo", "sans-serif"],
        body: ["Martel Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};

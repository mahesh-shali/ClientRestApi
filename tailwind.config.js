/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}", "./index.html"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
      rotate: {
        100: "100deg", // Add a custom 100-degree rotation
      },
    },
  },
  plugins: [require("daisyui"), require("tailwind-scrollbar-hide")],
};

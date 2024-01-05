/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        lightTheme: {
          primary: "#8e9561",
          secondary: "#EBE2DE",
          accent: "#A2A579",
          neutral: "#272136",
          "base-100": "#ffffff",
          info: "#4d542d",
          success: "#60a755",
          warning: "#dd971d",
          error: "#f44336",
          body: {
            "background-color": "#e3e6e6",
          },
        },
      },
    ],
  },
};

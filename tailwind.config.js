/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: [
      {
        slacktheme: {
          primary: "#9F7AEA",
          secondary: "#6B46C1",
          accent: "#A3BFFA",
          neutral: "#374151", // card color
          "base-100": "#4F4F4F", // background color
          info: "#63B3ED",
          success: "#48BB78",
          warning: "#F6E05E",
          error: "#F56565",
        },
      },
    ],
  },
};

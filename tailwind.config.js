const { Info } = require("lucide-react");

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
        background: "var(--background)",
        foreground: "var(--foreground)",
        secondarySiena: "#EB7C5A",
        darkerSecondarySiena: "#C26545",
        darkerNeutral: "#3E4248",
        blueYoender: "#567B97",
        darkerBlueYoender: "#3F5E75",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#3DA6A8",
          success: "#2B7476",
          secondary: "#665A58",
          accent: "#EDF6F6",
          neutral: "#54585E",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};

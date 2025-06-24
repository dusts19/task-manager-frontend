import type { Config } from "tailwindcss";

export default {
  darkMode: 'class',
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
      },
      backgroundImage: {
        'custom-bg': "url('/notebook-316823_1280.jpg')",
      },
      screens: {
        'compact': '700px',
        'wide': '1290px',
        '2xl-wide': '1700px'
      },
    },
  },
  plugins: [],
} satisfies Config;

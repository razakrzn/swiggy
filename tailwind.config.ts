import type { Config } from "tailwindcss";

export default {
  content: [
    "./*.{html,js,jsx,ts,tsx}",
    "./components/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./app/**/*.{html,js,ts,jsx,tsx,mdx}",
    "./public/**/*.{html,js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        secondary: "var(--secondary-color)",
        accent: "var(--accent-color)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        "background-light": "var(--background-light)",
        "border-color": "var(--border-color)",
        customGray: "#3d4152",
        lightGray: "#686b78",
        backgroudGray: "#F0F0F5",
        logoColor: "#ff5200",
      },
      boxShadow: {
        sm: "var(--shadow-sm)",
        md: "var(--shadow-md)",
        lg: "var(--shadow-lg)",
        custom: "0 15px 40px -20px rgba(40, 44, 63, 0.15)",
        "custom-shadow-2": "0 3px 5px 0 rgba(40, 44, 63, 0.4)",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(rgb(255, 255, 255) -6.71%, rgb(235, 235, 242) 56.19%, rgb(223, 223, 231) 106.56%)",
        "bg-1": "url('/images/PartnerBG.jpg')",
        "bg-2":
          "url('https://vendor-media-assets.swiggy.com/static-assets/icons/paper_mobile.svg')",
        "restaurant-closed": "url('/images/Restuarant_closed.png')",
      },
      screens: {
        xs: "480px",
        sm: "640px",
        md: "768px",
        lg: "1024px",
        xl: "1280px",
        "2xl": "1536px",
      },
      spacing: {
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
    },
  },
  plugins: [],
} satisfies Config;

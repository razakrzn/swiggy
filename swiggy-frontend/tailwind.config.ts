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
      boxShadow: {
        custom: "0 15px 40px -20px rgba(40, 44, 63, 0.15)",
        "custom-shadow-2": "0 3px 5px 0 rgba(40, 44, 63, 0.4)",
      },
      colors: {
        customGray: "#3d4152",
        lightGray: "#686b78",
        backgroudGray: "#F0F0F5",
        logoColor: "#ff5200",
      },
      backgroundImage: {
        "custom-gradient":
          "linear-gradient(rgb(255, 255, 255) -6.71%, rgb(235, 235, 242) 56.19%, rgb(223, 223, 231) 106.56%)",
        "bg-1": "url('/images/PartnerBG.jpg')",
        "bg-2":
          "url('https://vendor-media-assets.swiggy.com/static-assets/icons/paper_mobile.svg')",
        "restaurant-closed": "url('/images/Restuarant_closed.png')",
      },
    },
  },
  plugins: [],
} satisfies Config;

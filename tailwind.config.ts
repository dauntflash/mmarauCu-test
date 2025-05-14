import type { Config } from "tailwindcss";

export default {
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
      backgroundImage:{
        bannerImg: "url('/bg/images/f1.jpg')",
        minbanner: "url('/bg/images/bgMin.jpg')",
        media: "url('/bg/images/media.png')",
        give: "url('/bg/images/give.jpg')",
        library: "url('/bg/images/books.jpg')",
        prayer: "url('/bg/images/prayer.jpg')",
        church: "url('/bg/images/CU.jpg')",
        church2: "url('/bg/images/CU2.jpg')",
        church3: "url('/bg/images/CU3.jpg')",
      },
    },
  },
  plugins: [],
} satisfies Config;

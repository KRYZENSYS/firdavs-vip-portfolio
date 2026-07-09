import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: "#050505",
        surface: "#0a0a0f",
        line: "rgba(255,255,255,0.08)",
        text: "#ffffff",
        muted: "#9ca3af",
        primary: { DEFAULT: "#00F5FF", 50: "#E0FEFF", 100: "#B3FBFF", 200: "#80F7FF", 300: "#4DF3FF", 400: "#26EFFF", 500: "#00F5FF", 600: "#00C4CC", 700: "#009399", 800: "#006266", 900: "#003133" },
        secondary: { DEFAULT: "#7B2EFF", 400: "#9B5CFF", 500: "#7B2EFF", 600: "#5A1FCC" },
        accent: "#4DA6FF",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-orbitron)", "Orbitron", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(circle at 50% 50%, var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "neon-gradient": "linear-gradient(135deg, #00F5FF 0%, #7B2EFF 50%, #4DA6FF 100%)",
        "grid-pattern": "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
      },
      backgroundSize: { "grid-40": "40px 40px", "grid-80": "80px 80px" },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0,245,255,0.5), 0 0 40px rgba(0,245,255,0.3)",
        "neon-purple": "0 0 20px rgba(123,46,255,0.5), 0 0 40px rgba(123,46,255,0.3)",
        "neon-soft": "0 8px 32px rgba(0, 245, 255, 0.15)",
        "glass": "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
      },
      keyframes: {
        "rgb-shift": { "0%,100%": { borderColor: "rgba(0,245,255,0.6)" }, "33%": { borderColor: "rgba(123,46,255,0.6)" }, "66%": { borderColor: "rgba(77,166,255,0.6)" } },
        "gradient-x": { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        "float": { "0%,100%": { transform: "translateY(0px)" }, "50%": { transform: "translateY(-15px)" } },
        "pulse-glow": { "0%,100%": { boxShadow: "0 0 20px rgba(0,245,255,0.4)" }, "50%": { boxShadow: "0 0 40px rgba(0,245,255,0.8), 0 0 60px rgba(123,46,255,0.4)" } },
        "scanline": { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100vh)" } },
        "flicker": { "0%,100%": { opacity: "1" }, "41.99%": { opacity: "1" }, "42%": { opacity: "0" }, "43%": { opacity: "1" }, "47.99%": { opacity: "1" }, "48%": { opacity: "0" }, "49%": { opacity: "1" } },
      },
      animation: {
        "rgb-shift": "rgb-shift 4s linear infinite",
        "gradient-x": "gradient-x 8s ease infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
        "scanline": "scanline 8s linear infinite",
        "flicker": "flicker 6s linear infinite",
      },
    },
  },
  plugins: [],
};
export default config;

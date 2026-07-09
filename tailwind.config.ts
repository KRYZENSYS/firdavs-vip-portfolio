import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bg: { DEFAULT: "#050505", deep: "#000000" },
        cyber: {
          cyan: "#00F5FF",
          purple: "#7B2EFF",
          blue: "#4DA6FF",
          pink: "#FF2E9A",
          red: "#FF003C",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "ui-monospace", "monospace"],
        display: ["var(--font-orbitron)", "ui-sans-serif", "sans-serif"],
      },
      backgroundImage: {
        "gradient-cyber": "linear-gradient(135deg,#00F5FF 0%,#7B2EFF 50%,#4DA6FF 100%)",
        "gradient-soft": "linear-gradient(180deg,rgba(5,5,5,0) 0%,rgba(5,5,5,1) 100%)",
        "grid-pattern":
          "linear-gradient(rgba(0,245,255,0.06) 1px,transparent 1px),linear-gradient(90deg,rgba(0,245,255,0.06) 1px,transparent 1px)",
      },
      backgroundSize: { "grid-32": "32px 32px", "grid-64": "64px 64px" },
      animation: {
        "fade-in": "fadeIn .6s ease-out both",
        "slide-up": "slideUp .7s ease-out both",
        "glow-pulse": "glowPulse 2.5s ease-in-out infinite",
        "rgb-border": "rgbBorder 6s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 14s linear infinite",
        "scan": "scan 4s linear infinite",
        "blink": "blink 1.2s steps(2) infinite",
        "gradient-x": "gradientX 8s ease infinite",
        "matrix-fall": "matrixFall linear infinite",
        "aurora": "aurora 18s ease infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: 0 }, "100%": { opacity: 1 } },
        slideUp: { "0%": { transform: "translateY(20px)", opacity: 0 }, "100%": { transform: "translateY(0)", opacity: 1 } },
        glowPulse: { "0%,100%": { boxShadow: "0 0 24px rgba(0,245,255,.4)" }, "50%": { boxShadow: "0 0 60px rgba(123,46,255,.6)" } },
        rgbBorder: { "0%": { backgroundPosition: "0% 50%" }, "100%": { backgroundPosition: "200% 50%" } },
        float: { "0%,100%": { transform: "translateY(0)" }, "50%": { transform: "translateY(-12px)" } },
        scan: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
        blink: { "0%,100%": { opacity: 1 }, "50%": { opacity: 0 } },
        gradientX: { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
        matrixFall: { "0%": { transform: "translateY(-100%)" }, "100%": { transform: "translateY(100%)" } },
        aurora: { "0%,100%": { backgroundPosition: "0% 50%" }, "50%": { backgroundPosition: "100% 50%" } },
      },
      boxShadow: {
        "neon-cyan": "0 0 20px rgba(0,245,255,.45), 0 0 40px rgba(0,245,255,.25)",
        "neon-purple": "0 0 22px rgba(123,46,255,.5), 0 0 44px rgba(123,46,255,.25)",
        "inner-glow": "inset 0 0 30px rgba(0,245,255,.15)",
      },
      transitionTimingFunction: { cyber: "cubic-bezier(.22,1,.36,1)" },
    },
  },
  plugins: [],
};
export default config;

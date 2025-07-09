// tailwind.config.js

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      // 🔥 Glow animations for card borders
      keyframes: {
        glow: {
          '0%, 100%': {
            boxShadow: '0 0 15px rgba(236, 72, 153, 0.6), 0 0 25px rgba(139, 92, 246, 0.6)',
          },
          '50%': {
            boxShadow: '0 0 30px rgba(236, 72, 153, 1), 0 0 45px rgba(139, 92, 246, 1)',
          },
        },
        hoverGlow: {
          '0%, 100%': {
            boxShadow: '0 0 25px rgba(236, 72, 153, 0.7), 0 0 50px rgba(139, 92, 246, 0.7)',
          },
          '50%': {
            boxShadow: '0 0 45px rgba(236, 72, 153, 1), 0 0 75px rgba(139, 92, 246, 1)',
          },
        },
      },
      animation: {
        glow: 'glow 3s ease-in-out infinite',
        hoverGlow: 'hoverGlow 1.5s ease-in-out infinite',
        'pulse-slow': 'pulse 10s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};
// This Tailwind CSS configuration file extends the default theme with custom animations for glowing effects.
// It defines keyframes for glowing animations and applies them to elements with the `glow` and `hoverGlow` classes.
// The animations create a visually appealing effect for elements like cards or buttons
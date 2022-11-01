/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        // 'custom-red': '#ff3e5f',
        // 'custom-blue': '#022242',
        "custom-red": "red",
        "custom-blue": "#181818",
      },
      width: {
        640: "640px",
        360: "360px",
      },
    },
    fontFamily: {
      sans: ["ui-sans-serif", "system-ui"],
      serif: ["ui-serif", "Georgia"],
      mono: ["ui-monospace", "SFMono-Regular"],
      display: ['"Oswald"'],
      body: ['"Open Sans"'],
      Caveat: ['"Caveat"'],
    },
    keyframes: {
      pulse: {
        "0%": { transform: "scale(.5)", opacity: 0 },
        "50%": { transform: "scale(1)", opacity: 1 },
        "100%": { transform: "scale(.5)", opacity: 0 },
      },
      bump: {
        "0%": { transform: "scaleX(1)" },
        "50%": { transform: "scale(1.25)" },
        "100%": { transform: "scale(1)" },
      },
      spin: {
        "0%": { transform: "rotate(360deg)" },
        "100%": { transform: "rotate(0deg)" },
      },
      bump2: {
        "0%": { transform: "scale(1)", opacity: 0 },
        "50%": { transform: "scale(2)", opacity: 1 },
        "100%": { transform: "scale(1)", opacity: 0 },
      },
      flame: {
        "0%": { transform: "scale(1)", opacity: 0.5 },
        "50%": { transform: "scale(1.2)", opacity: 1 },
        "90%": { transform: "scale(1.4)", opacity: 1 },
        "95%": { opacity: 0 },
        "100%": { transform: "scale(1)", opacity: 0 },
      },
      scooter: {
        "0%": { transform: "translateX(-50%)", opacity: 1 },
        "50%": { transform: "translateX(-15%)", opacity: 1 },
        "100%": { transform: "translateX(-25%)", opacity: 1 },
        "100%": { transform: "translateX(-50%)", opacity: 1 },
      },
      wind: {
        "0%": {
          transform: "translateX(20%) translateY(5%) scaleX(1)",
          opacity: 0,
        },
        "50%": {
          transform: "translateX(40%) translateY(5%) scaleX(1.5)",
          opacity: 0.5,
        },
        "100%": {
          transform: "translateX(55%) translateY(5%) scaleX(1.5)",
          opacity: 0.5,
        },
        "100%": {
          transform: "translateX(20%) translateY(5%) scaleX(1)",
          opacity: 0,
        },
      },
      deleteItemCan: {
        "0%": { transform: "rotate(0deg)" },
        "50%": { transform: "rotate(-25deg)" },
        "100%": { transform: "rotate(0deg)" },
      },
      deleteItemTop: {
        "0%": { transform: "rotate(0deg)", transformOrigin: "center" },
        "50%": { transform: "rotate(45deg)", transformOrigin: "center" },
        "100%": { transform: "rotate(0deg)", transformOrigin: "center" },
      },
    },
    animation: {
      pulse: "pulse 1s ease-in-out infinite",
      wind: "wind 3s ease-in-out infinite",
      scooter: "scooter 3s ease-in-out infinite",
      flame: "flame 5s linear infinite",
      "spin-slow": "spin 5s linear infinite",
      "adding-item": "bump 1s ease-in-out 1",
      "adding-item-bg": "bump2 1s ease-in-out 1",
      "delete-item-can": "deleteItemCan 1s ease-in-out 1",
      "delete-item-top": "deleteItemTop 1s ease-in-out 1",
      spin: "spin 1.5s linear infinite",
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};

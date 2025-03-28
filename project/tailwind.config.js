module.exports = {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "app/**/*.{ts,tsx}",
    "components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "manusimathens-gray": "var(--manusimathens-gray)",
        "manusimazure-radiance": "var(--manusimazure-radiance)",
        manusimblack: "var(--manusimblack)",
        "manusimblack-12": "var(--manusimblack-12)",
        "manusimblack-4": "var(--manusimblack-4)",
        "manusimblack-6": "var(--manusimblack-6)",
        "manusimdesert-storm": "var(--manusimdesert-storm)",
        manusimdune: "var(--manusimdune)",
        "manusimdune-4": "var(--manusimdune-4)",
        "manusimdune-6": "var(--manusimdune-6)",
        "manusimdune-8": "var(--manusimdune-8)",
        "manusimforest-green": "var(--manusimforest-green)",
        "manusimforest-green-12": "var(--manusimforest-green-12)",
        "manusimfriar-gray": "var(--manusimfriar-gray)",
        "manusimfuscous-gray": "var(--manusimfuscous-gray)",
        "manusimgray-nickel": "var(--manusimgray-nickel)",
        "manusimheavy-metal": "var(--manusimheavy-metal)",
        "manusimjordy-blue": "var(--manusimjordy-blue)",
        "manusimroyal-blue": "var(--manusimroyal-blue)",
        manusimwhite: "var(--manusimwhite)",
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      fontFamily: {
        "manus-im-inter-medium": "var(--manus-im-inter-medium-font-family)",
        "manus-im-inter-medium-underline":
          "var(--manus-im-inter-medium-underline-font-family)",
        "manus-im-inter-regular": "var(--manus-im-inter-regular-font-family)",
        "manus-im-inter-semi-bold":
          "var(--manus-im-inter-semi-bold-font-family)",
        "manus-im-libre-baskerville-regular":
          "var(--manus-im-libre-baskerville-regular-font-family)",
        sans: [
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          '"Apple Color Emoji"',
          '"Segoe UI Emoji"',
          '"Segoe UI Symbol"',
          '"Noto Color Emoji"',
        ],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
    container: { center: true, padding: "2rem", screens: { "2xl": "1400px" } },
  },
  plugins: [],
  darkMode: ["class"],
};

module.exports = {
  // mode: "jit",
  content: ["./src/**/*.{html,js,ts}"],
  variants: {
    extend: {
      'mobile-tablet': ['mobile', 'tablet'],
      'tablet-desktop': ['tablet', 'desktop']
    }
  },
  theme: {
    screens: {
      mobile: { min: "320px", max: "767px" },
      tablet: { min: "768px", max: "974px" },
      desktop: { min: "975px", max: "1919px" },
      "larger-screens": { min: "1920px" },

      // more generic screen definition would change across in due time
      'xs-sm': { 'min': '0px', 'max': '640px' },
      'xs': '0px',
      // => @media (min-width: 0px) { ... }

      'sm-md': { 'min': '640px', 'max': '768px' },
      'sm': '640px',
      // => @media (min-width: 640px) { ... }

      'md': '768px',
      // => @media (min-width: 768px) { ... }

      'lg': '1024px',
      // => @media (min-width: 1024px) { ... }

      'xl': '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
    },
    colors: {
      // Primary colors
      white: "#ffffff",
      black: "#000000",

      // Dark
      dark: {
        500: "#2C2E33",
      },

      // Gray
      gray: {
        50: "#F8F9FA",
        100: "#F1F3F5",
        200: "#E9ECEF",
        300: "#DEE2E6",
        400: "#CED4DA",
        500: "#ADB5BD",
        600: "#868E96",
        700: "#495057"
      },

      // Yellow
      yellow: {
        50: "#FFF9DB",
        500: "#FCC419",
        900: "#A86E04"
      },
      // Green
      green: {
        50: "#EBFBEE",
        500: "#51CF66",
        900: "#2B8A3E"
      },

      // Teal
      teal: {
        50: "#E6FCF5",
        500: "#20C997",
        900: "#087F5B"
      },

      // Red
      red: {
        50: "#FFF5F5",
        700: "#F03E3E",
        900: "#C92A2A"
      },


      primary50: "#EDF6FF",
      primary100: "#A3B9DD",
      primary200: "#C9E0FF",
      primary300: "#1877F2",
      primary500: "#013C9F",
      primary700: "#667085",
      primary900: "#101828",


      // Foundation
      primaryA: "#013C9F",
      primaryB: "#1877F2",
      primaryC: "#101828",

      warning: "#FCC419",
      success: "#51CF66",
      error: "#F03E3E",

      disabled: "#E9ECEF",

      // Background
      "background-white": "#ffffff",

      "background-primary": "#1877F2",
      "background-secondary": "#013C9F",
      "background-accent": "#EDF6FF",

      "background-state-warning": "#FFF9DB",
      "background-state-success": "#EBFBEE",
      "background-state-error": "#FFF5F5",

      "background-state-disabled": "#E9ECEF",

      // Text
      "text-state-default": "#013C9F",
      "text-state-active": "#1877F2",
      "text-state-hover": "#CED4DA",
      "text-state-warning": "#FCC419",
      "text-state-success": "#51CF66",
      "text-state-error": "#F03E3E",

      "heading": "#101828",
      "subtitle": "#ADB5BD",
      "body": "#2C2E33",

      // Border
      "border-default": "#CED4DA",
      "border-primary": "#1877F2",
      "border-secondary": "#013C9F",

      "border-state-active": "#1877F2",
      "border-state-hover": "#CED4DA",
      "border-state-disabled": "#E9ECEF",

      "border-state-warning": "#FCC419",
      "border-state-success": "#51CF66",
      "border-state-error": "#F03E3E",
    },
    fontFamily: {
      sans: ["Graphik", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    fontSize: {
      "3xs": [
        "8px",
        { lineHeight: "10px", letterSpacing: "0px", fontWeight: 400 },
      ],
      "2xs": [
        "10px",
        { lineHeight: "12px", letterSpacing: "0px", fontWeight: 400 },
      ],
      xs: [
        "12px",
        { lineHeight: "14px", letterSpacing: "0px", fontWeight: 400 },
      ],
      sm: [
        "14px",
        { lineHeight: "16px", letterSpacing: "0px", fontWeight: 400 },
      ],
      md: [
        "16px",
        { lineHeight: "18px", letterSpacing: "0px", fontWeight: 500 },
      ],
      lg: [
        "18px",
        { lineHeight: "20px", letterSpacing: "0px", fontWeight: 500 },
      ],
      xl: [
        "20px",
        { lineHeight: "22px", letterSpacing: "0px", fontWeight: 600 },
      ],
      "2xl": [
        "24px",
        { lineHeight: "30px", letterSpacing: "0px", fontWeight: 600 },
      ],
      "3xl": [
        "30px",
        { lineHeight: "38px", letterSpacing: "0px", fontWeight: 600 },
      ],
      "4xl": [
        "38px",
        { lineHeight: "46px", letterSpacing: "0px", fontWeight: 700 },
      ],
    },
    extend: {
      margin: {
        related: '8px',
        'related-small': '4px',
        'non-related': '12px',
        'non-related-small': '8px',
      },
      padding: {
        'input-box': {
          'padding-top': '12px',
          'padding-right': '16px',
          'padding-bottom': '12px',
          'padding-left': '16px',
        },
        modal: {
          'padding-top': '12px',
          'padding-right': '16px',
          'padding-bottom': '12px',
          'padding-left': '16px',
        },
        'drop-down': '8px',
      }
    },
  },
  plugins: [],
};

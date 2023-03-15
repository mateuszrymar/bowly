/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.js",
    "./src/**/*.ts"
  ],
  theme: {

    colors: {
      /* Color styles */
      white_000: 'rgba(255, 255, 255, 1)',
      white_050: 'rgba(251, 251, 253, 1)',
      white_100: 'rgba(245, 245, 247, 1)',
      white_150: 'rgba(235, 235, 237, 1)',
      white_200: 'rgba(225, 225, 225, 1)',
      grey_100: 'rgba(210, 210, 215, 1)',
      grey_300: 'rgba(180, 180, 185, 1)',
      grey_500: 'rgba(110, 110, 115, 1)',
      grey_700: 'rgba(40, 40, 42, 1)',
      grey_700_transparent: 'rgba(40, 40, 42, 0.5)',
      grey_800: 'rgba(29, 29, 31, 1)',
      blue_500: 'rgba(26, 188, 250, 1)',
      blue_700: 'rgba(28, 125, 243, 1)',
      blue_800: 'rgba(0, 102, 204, 1)',
      blue_950: 'rgba(7, 7, 14, 1)',
      green_400: 'rgba(164, 222, 41, 1)',
      green_500: 'rgba(142, 198, 24, 1)',
      green_600: 'rgba(130, 184, 15, 1)',
      red_600: 'rgba(212, 89, 81, 1)',


      primary: 'rgba(28, 125, 243, 1)',
      cta: 'linear-gradient(135deg, #1C7DF3 0%, #1ABCFA 100%)',
      paper: 'rgba(245, 245, 247, 1)',
      paper_light: 'rgba(251, 251, 253, 1)',
      paper_negative: 'rgba(29, 29, 31, 1)',
    },
    fontWeight: {
      thin: '100',
      extralight: '200',
      light: '300',
      normal: '400',
      medium: '500',
      semibold: '600',
      bold: '700',
      extrabold: '800',
      black: '900',
    },

    extend: {},
  },
  plugins: [],
}

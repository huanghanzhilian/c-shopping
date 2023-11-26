module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./styles/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)'],
        mono: ['var(--font-lusitana)'],
        cRegular: ['var(--font-Vazirmatn-Regular)'],
        cMedium: ['var(--font-Vazirmatn-Medium)'],
        cBold: ['var(--font-Vazirmatn-Bold)'],
        vazir: "VazirBold",
      },
      colors: {
        blue: {
          400: '#2589FE',
          500: '#0070F3',
          600: 'red',
        },
      },
    },
  },
  plugins: [],
}

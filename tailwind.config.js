/** @type {import('tailwindcss').Config} */
module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  content: [],
  theme: {
    extend: {
      colors: {
        gray2: '#F1F2F4',
        gray3: '#E9EAEC',
        gray5: '#A0AEC0',
        gray6: '#687588',
        gray9: '#111827',
        gray50: '#FAFAFA',
        success: '#0CAF60',
        primaryGreen300: '#00A19B',
        primarybase: '#27A376',
        orangePrimary: '#EB6F25',
        blue: '#2F78EE',
        red: '#E03137'
      },
      fontSize: {
        xxs: ['10px', '14px']
      }
    }
  },
  plugins: []
}

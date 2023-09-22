/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        gridTemplateRows: {
            'registration_user_rows': '1fr .4fr',
        },
        gridTemplateColumns: {
            'global_view': '.7fr 3fr'
        },
        colors: {
            main_theme: '#0492c2',
            active_svg: 'rgb(25,25,25)',
            inactive_svg: 'rgb(102, 102, 102)'

        },
        backgroundColor: {
            'hover-blue': 'hsla(180, 47%, 56%, 1)',
            'hover-white': 'rgba(255, 255, 255, .4)'
        },
        borderColor: { // <-- Use this key
            'hover-blue': 'hsla(180, 47%, 56%, 1)'
        },
    },
  },
  plugins: [],
}


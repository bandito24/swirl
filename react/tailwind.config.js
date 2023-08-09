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


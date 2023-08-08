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
        colors: {

        },
        backgroundColor: {
            'hover-blue': 'hsla(180, 47%, 56%, 1)'
        },
        borderColor: { // <-- Use this key
            'hover-blue': 'hsla(180, 47%, 56%, 1)'
        },
    },
  },
  plugins: [],
}


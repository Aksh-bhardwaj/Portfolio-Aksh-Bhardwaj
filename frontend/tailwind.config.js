module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        neon: {
          green: '#39ff14',
          cyan: '#00f3ff',
          pink: '#ff00ff',
          dark: '#0a0b0d',
        }
      },
      boxShadow: {
        'neon-green': '0 0 5px #39ff14, 0 0 20px #39ff14',
        'neon-cyan': '0 0 5px #00f3ff, 0 0 20px #00f3ff',
        'neon-pink': '0 0 5px #ff00ff, 0 0 20px #ff00ff',
      }
    },
  },
  plugins: [],
}

import type { Config } from 'tailwindcss'
import typography from '@tailwindcss/typography'

export default <Partial<Config>>{
  content: [
    './components/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './composables/**/*.{js,ts}',
    './plugins/**/*.{js,ts}',
    './utils/**/*.{js,ts}',
    './App.{js,ts,vue}',
    './app.{js,ts,vue}',
    './Error.{js,ts,vue}',
    './error.{js,ts,vue}',
    './app.config.{js,ts}',
    'content/**/*.md',
  ],
  theme: {
    extend: {
      animation: {
        wave: 'wave 3s infinite',
        slide: 'slide 3s infinite',
      },
      keyframes: {
        wave: {
          '0%, 50%, 100%': {
            transform: 'rotate(-12deg)',
          },
          '25%, 75%': {
            transform: 'rotate(12deg) scale(1.5)',
          },
        },
        slide: {
          '0%, 100%': {
            transform: 'translateX(0) translateY(0)',
          },
          '20%': {
            transform: 'translateX(10px)',
          },
          '40%': {
            transform: 'translateY(-10px) translateX(10px)',
          },
          '60%': {
            transform: 'translateY(10px) translateX(-10px)',
          },
          '80%': {
            transform: 'translateY(-10px)',
          },
        },
      },
    },
  },
  plugins: [typography],
}

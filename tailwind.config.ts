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
    'content/**/*.md'
  ],
  theme: {
    extend: {
      animation: {
        wave: 'wave 3s infinite'
      },
      keyframes: {
        wave: {
          '0%, 50%, 100%': {
            transform: 'rotate(-12deg)'
          },
          '25%, 75%': {
            transform: 'rotate(12deg) scale(1.5)'
          }
        }
      }
    }
  },
  plugins: [typography]
}

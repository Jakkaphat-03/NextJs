import type { Config } from 'tailwindcss'

const config: Config = {
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            fontFamily: {
                sans: ['var(--font-prompt)', 'sans-serif'],
            },
        },
    },
    plugins: [],
}
export default config

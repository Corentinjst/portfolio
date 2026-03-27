import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#06b6d4',
          dark: '#0891b2',
          light: '#22d3ee',
        },
        surface: {
          DEFAULT: '#0f172a',
          elevated: '#1e293b',
          border: '#334155',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-sora)', 'system-ui', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': '#cbd5e1',
            '--tw-prose-headings': '#f1f5f9',
            '--tw-prose-lead': '#94a3b8',
            '--tw-prose-links': '#06b6d4',
            '--tw-prose-bold': '#f1f5f9',
            '--tw-prose-counters': '#94a3b8',
            '--tw-prose-bullets': '#334155',
            '--tw-prose-hr': '#1e293b',
            '--tw-prose-quotes': '#e2e8f0',
            '--tw-prose-quote-borders': '#06b6d4',
            '--tw-prose-captions': '#64748b',
            '--tw-prose-code': '#22d3ee',
            '--tw-prose-pre-code': '#cbd5e1',
            '--tw-prose-pre-bg': '#1e293b',
            '--tw-prose-th-borders': '#334155',
            '--tw-prose-td-borders': '#1e293b',
            maxWidth: 'none',
            a: {
              textDecorationColor: '#06b6d4',
              '&:hover': { color: '#22d3ee' },
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              backgroundColor: '#1e293b',
              borderRadius: '0.25rem',
              paddingLeft: '0.4rem',
              paddingRight: '0.4rem',
              paddingTop: '0.1rem',
              paddingBottom: '0.1rem',
              fontWeight: '400',
            },
            pre: {
              backgroundColor: '#1e293b',
              border: '1px solid #334155',
            },
            'thead th': {
              color: '#f1f5f9',
            },
            'tbody tr': {
              borderBottomColor: '#1e293b',
            },
          },
        },
      },
    },
  },
  plugins: [
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    require('@tailwindcss/typography'),
  ],
}

export default config

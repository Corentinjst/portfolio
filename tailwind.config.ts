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
      // Couleurs pilotées par les tokens CSS (voir app/globals.css)
      colors: {
        accent: 'var(--accent)',
        fg: {
          DEFAULT: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        line: {
          DEFAULT: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
      },
      fontFamily: {
        sans: ['var(--font-geist-sans)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      borderRadius: {
        'ds-sm': 'var(--radius-sm)',
        'ds-md': 'var(--radius-md)',
        'ds-lg': 'var(--radius-lg)',
        'ds-xl': 'var(--radius-xl)',
      },
      letterSpacing: {
        display: 'var(--tracking-display)',
        heading: 'var(--tracking-heading)',
        eyebrow: 'var(--tracking-eyebrow)',
      },
      maxWidth: {
        container: '1180px',
      },
      transitionTimingFunction: {
        'ds-out': 'cubic-bezier(.22, 1, .36, 1)',
      },
      typography: {
        DEFAULT: {
          css: {
            '--tw-prose-body': 'var(--text-secondary)',
            '--tw-prose-headings': 'var(--text-primary)',
            '--tw-prose-lead': 'var(--text-muted)',
            '--tw-prose-links': 'var(--accent)',
            '--tw-prose-bold': 'var(--text-primary)',
            '--tw-prose-counters': 'var(--text-muted)',
            '--tw-prose-bullets': 'var(--border-strong)',
            '--tw-prose-hr': 'var(--border-subtle)',
            '--tw-prose-quotes': 'var(--text-primary)',
            '--tw-prose-quote-borders': 'var(--accent)',
            '--tw-prose-captions': 'var(--text-muted)',
            '--tw-prose-code': 'var(--text-primary)',
            '--tw-prose-pre-code': '#dfe5ee',
            '--tw-prose-pre-bg': 'rgba(11, 14, 19, .72)',
            '--tw-prose-th-borders': 'var(--border-strong)',
            '--tw-prose-td-borders': 'var(--border-subtle)',
            // prose-invert utilise ses propres variables : on les aligne sur le thème
            '--tw-prose-invert-body': 'var(--text-secondary)',
            '--tw-prose-invert-headings': 'var(--text-primary)',
            '--tw-prose-invert-lead': 'var(--text-muted)',
            '--tw-prose-invert-links': 'var(--accent)',
            '--tw-prose-invert-bold': 'var(--text-primary)',
            '--tw-prose-invert-counters': 'var(--text-muted)',
            '--tw-prose-invert-bullets': 'var(--border-strong)',
            '--tw-prose-invert-hr': 'var(--border-subtle)',
            '--tw-prose-invert-quotes': 'var(--text-primary)',
            '--tw-prose-invert-quote-borders': 'var(--accent)',
            '--tw-prose-invert-captions': 'var(--text-muted)',
            '--tw-prose-invert-code': 'var(--text-primary)',
            '--tw-prose-invert-pre-code': '#dfe5ee',
            '--tw-prose-invert-pre-bg': 'rgba(11, 14, 19, .72)',
            '--tw-prose-invert-th-borders': 'var(--border-strong)',
            '--tw-prose-invert-td-borders': 'var(--border-subtle)',
            maxWidth: 'none',
            'h2, h3, h4': {
              fontWeight: '500',
              letterSpacing: 'var(--tracking-heading)',
            },
            a: {
              textDecorationColor: 'var(--border-strong)',
              textUnderlineOffset: '3px',
              '&:hover': { color: 'var(--accent-hover)', textDecorationColor: 'var(--accent)' },
            },
            'code::before': { content: '""' },
            'code::after': { content: '""' },
            code: {
              fontFamily: 'var(--font-mono)',
              backgroundColor: 'var(--surface-glass-strong)',
              border: '1px solid var(--border-subtle)',
              borderRadius: '0.375rem',
              paddingLeft: '0.4rem',
              paddingRight: '0.4rem',
              paddingTop: '0.1rem',
              paddingBottom: '0.1rem',
              fontWeight: '400',
            },
            pre: {
              border: '1px solid var(--border-subtle)',
              borderRadius: 'var(--radius-md)',
            },
            'pre code': {
              backgroundColor: 'transparent',
              border: '0',
            },
            'thead th': {
              color: 'var(--text-primary)',
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

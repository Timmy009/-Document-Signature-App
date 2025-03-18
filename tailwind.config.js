/** @type {import('tailwindcss').Config} */

module.exports = {
  // darkMode: ['class'],
  mode: 'jit', //enables just-in-time mode
  darkMode: ['class', '[data-mode="light"]'],
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  safelist: ['rounded-md'],
  theme: {
  	fontFamily: {
  		sans: [
  			'Switzer',
  			'DM Sans',
  			'Inter',
  			'sans-serif'
  		]
  	},
  	extend: {
  		keyframes: {
  			'caret-blink': {
  				'0%,70%,100%': {
  					opacity: '1'
  				},
  				'20%,50%': {
  					opacity: '0'
  				}
  			},
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			current: 'currentColor',
  			transparent: 'transparent',
  			primary: {
  				'50': '#e9eaf5',
  				'100': '#dde0ef',
  				'200': '#b9bfdf',
  				'300': '#1e2f97',
  				'400': '#1b2a88',
  				'500': '#182679',
  				'600': '#172371',
  				'700': '#121c5b',
  				'800': '#0d1544',
  				'900': '#0b1035',
  				light: '#e9eaf5',
  				DEFAULT: '#1e2f97',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				'50': '#e8f6fd',
  				'100': '#ddf2fc',
  				'200': '#b8e4f9',
  				'300': '#1aa7ec',
  				'400': '#1796d4',
  				'500': '#1586bd',
  				'600': '#147db1',
  				'700': '#10648e',
  				'800': '#0c4b6a',
  				'900': '#093a53',
  				light: '#e8f6fd',
  				DEFAULT: '#1aa7ec',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			neutral: {
  				'50': '#fefefe',
  				'100': '#fdfefd',
  				'200': '#fafdfc',
  				'300': '#f0f7f4',
  				'400': '#d8dedc',
  				'500': '#c0c6c3',
  				'600': '#b4b9b7',
  				'700': '#909492',
  				'800': '#6c6f6e',
  				'900': '#545655',
  				light: '#fefefe',
  				bg: '#FAFAFA',
  				DEFAULT: '#c0c6c3'
  			},
  			grey: {
  				'50': '#efefef',
  				'100': '#e7e7e7',
  				'200': '#cecece',
  				'300': '#616161',
  				'400': '#575757',
  				'500': '#4e4e4e',
  				'600': '#494949',
  				'700': '#3a3a3a',
  				'800': '#2c2c2c',
  				'900': '#222222',
  				light: '#efefef',
  				DEFAULT: '#616161'
  			},
  			warning: {
  				'50': '#fff8e6',
  				'100': '#fff4d9',
  				'200': '#ffe9b0',
  				'300': '#ffb800',
  				'400': '#e6a600',
  				'500': '#cc9300',
  				'600': '#bf8a00',
  				'700': '#996e00',
  				'800': '#735300',
  				'900': '#594000',
  				light: '#fff8e6',
  				DEFAULT: '#ffb800'
  			},
  			success: {
  				'50': '#e6f8f0',
  				'100': '#d9f5e9',
  				'200': '#b1ead2',
  				'300': '#02ba6d',
  				'400': '#02a762',
  				'500': '#029557',
  				'600': '#028c52',
  				'700': '#017041',
  				'800': '#015431',
  				'900': '#014126',
  				light: '#efefef',
  				DEFAULT: '#02ba6d'
  			},
  			error: {
  				'50': '#ffecec',
  				'100': '#ffe2e2',
  				'200': '#ffc3c3',
  				'300': '#ff3f3f',
  				'400': '#e63939',
  				'500': '#cc3232',
  				'600': '#bf2f2f',
  				'700': '#992626',
  				'800': '#731c1c',
  				'900': '#591616',
  				light: '#ffecec',
  				DEFAULT: '#ff3f3f'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		animation: {
  			'caret-blink': 'caret-blink 1.25s ease-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
};

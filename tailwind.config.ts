import type { Config } from "tailwindcss";
import { BREAKPOINTS } from './src/constants';

const config: Config = {
	darkMode: 'selector',
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/libraries/**/*.ts",
  ],
  theme: {
		screens: {
			...BREAKPOINTS
		},
		
		extend: {
			colors: {
				primary: 'rgb(var(--base-color-primary) / <alpha-value>)',

				font: {
					DEFAULT: 'rgb(var(--base-color-font) / <alpha-value>)',
					light: 'rgb(var(--base-color-font-light) / <alpha-value>)',
					dark: 'rgb(var(--base-color-font-dark) / <alpha-value>)',
				},

				background: {
					DEFAULT: 'rgb(var(--base-color-background) / <alpha-value>)',
					light: 'rgb(var(--base-color-background-light) / <alpha-value>)',
					dark: 'rgb(var(--base-color-background-dark) / <alpha-value>)',
				},

				background_accent: {
					DEFAULT: 'rgb(var(--base-color-background-accent) / <alpha-value>)',
					light: 'rgb(var(--base-color-background-accent-light) / <alpha-value>)',
					dark: 'rgb(var(--base-color-background-accent-dark) / <alpha-value>)',
				},
			},
		},
  },
  plugins: [],
};
export default config;

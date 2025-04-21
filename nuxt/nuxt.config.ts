import { resolve } from 'path';
import { defineNuxtConfig } from 'nuxt/config';

export default defineNuxtConfig({
	// DEV-Tools
	devtools: { enabled: true },

	// Typescript
	typescript: { strict: true },

	// Styling
	css: ['./assets/scss/main.scss'],

	tailwindcss: {
        exposeConfig: true,
        editorSupport: true
    },

	colorMode: {
        classSuffix: ""
    },

	imports: {
		imports: [
			{
				from: 'tailwind-variants',
				name: 'tv'
			},
			{
				from: 'tailwind-variants',
				name: 'VariantProps',
				type: true
			},
			{
				from: 'vue-sonner',
				name: 'toast',
				as: 'useSonner'
			}
		]
	},

	// Alias
	alias: {
		'@a': resolve(__dirname, './src/assets'),
		'@p': resolve(__dirname, './src/public')
	},

	// App settings
	app: {
		pageTransition: {
			name: 'default',
			mode: 'out-in'
		},
		layoutTransition: {
			name: 'layout',
			mode: 'out-in'
		},
		head: {}
	},

	// Modules & Plugins
	modules: [
		'@nuxtjs/strapi',
		'@nuxt/test-utils/module',
		'@nuxt/eslint',
		'@nuxtjs/tailwindcss',
		'@nuxtjs/color-mode',
		'@vueuse/nuxt',
		'@nuxt/icon',
		'@nuxt/fonts',
		'@vee-validate/nuxt',
		'@morev/vue-transitions/nuxt'
	],

	plugins: [],

	// Module settings
	// -> Strapi
	strapi: {
		url:
			process.env.NODE_ENV === 'production'
				? process.env.STRAPI_URL
				: 'http://localhost:1337',
		auth: { populate: ['role'] },
		cookieName: 'jwt_auth',
		cookie: {
			path: '/',
			maxAge: 60 * 60 * 24 * 60, // 60 days (=> 2 months)
			secure: process.env.NODE_ENV === 'production',
			sameSite: true
		}
	},

	// Build settings
	build: {
		transpile: ['vue-sonner']
	},

	// Compatibility Date
	compatibilityDate: '2024-12-04'
});
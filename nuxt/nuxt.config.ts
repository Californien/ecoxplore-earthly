import { defineNuxtConfig } from 'nuxt/config';
import { resolve } from 'path';

export default defineNuxtConfig({
	// DEV-Tools
	devtools: { enabled: true },

	// Typescript
	typescript: { strict: true },

	// Directories
	srcDir: 'src/',

	dir: {
		layouts: 'vue/layouts',
		pages: 'vue/pages'
	},

	components: {
		dirs: ['vue/components']
	},

	// Styling
	css: ['/assets/scss/main.scss'],

	vite: {
		css: {
			preprocessorOptions: {
				scss: {
					additionalData: `
						@use '@a/scss/fontCfg' as *;
						@use '@a/scss/presets' as *;
					`
				}
			}
		}
	},

	// Alias
	alias: {
		'@a': resolve(__dirname, './src/assets'),
		'@p': resolve(__dirname, './src/public'),
		'@s': resolve(__dirname, './src/static')
	},

	// App settings
	app: {
		pageTransition: {},
		layoutTransition: {},
		head: {}
	},

	// Modules & Plugins
	modules: ['@nuxtjs/strapi', '@nuxt/test-utils/module', '@nuxt/eslint'],
	plugins: [],

	// Module settings
	// -> Strapi
	strapi: {
		url: process.env.STRAPI_URL || 'http://localhost:1337',
		auth: { populate: '*' },
		cookieName: 'jwt_auth',
		cookie: {
			path: '/',
			maxAge: 60 * 60 * 24 * 60, // 60 days (=> 2 months)
			secure: process.env.NODE_ENV === 'production',
			sameSite: true
		}
	},

	// Compatibility Date
	compatibilityDate: '2024-12-04'
});

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
	devtools: {
		enabled: true,

		timeline: {
			enabled: true
		}
	},
	runtimeConfig: {
		token: "",
		public: {
			apiurl: "",
			imageurl: ""
		}
	},
	postcss: {
		plugins: {
			'postcss-nested': {},
		}
	},
	app: {
		head: {
			title: 'Магазин Shoppe',
			titleTemplate: '%s | Shoppe',
			htmlAttrs: {
				lang: 'ru'
			},
			link: [
				{ rel: 'icon', type: 'image/png', href: '/favicon-32x32.png' },
				{ rel: 'manifest', crossorigin: "anonymous", href: '/manifest.webmanifest' },
				{ rel: "stylesheet", href: "/normalize.css" }
			],
		}
	},	
	icon: {
		customCollections: [
			{
				prefix: "icons",
				dir: './app/assets/icons',
			}
		]
	},

  modules: [
    '@nuxt/eslint',
    '@nuxt/fonts',
    '@nuxt/image',
    '@nuxt/scripts',
    '@nuxt/icon'
  ]
})
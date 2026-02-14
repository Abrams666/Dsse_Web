// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	css: ["~/assets/css/css.css", "@fortawesome/fontawesome-svg-core/styles.css"],
	modules: ["@nuxtjs/tailwindcss"],
	app: {
		head: {
			title: "國立中央大學太空科學與工程學系",
		},
	},
});

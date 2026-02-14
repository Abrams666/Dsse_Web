// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	css: ["~/assets/css/css.css", "@fortawesome/fontawesome-svg-core/styles.css"],
	modules: ["@nuxtjs/tailwindcss"],
	app: {
		head: {
			title: "國立中央大學太空科學與工程學系",
			htmlAttrs: {
				lang: "zh-TW",
			},
			meta: [
				{
					name: "google-site-verification",
					content: "flD5G-N7i0uH2i41RYc5xMR77g_zwaD8kPdFdjCZ_1Q",
				},
				{
					property: "og:site_name",
					content: "國立中央大學太空科學與工程學系",
				},
				{
					name: "description",
					content: "Website of Department of Space Science and Engineering(國立中央大學太空科學與工程學系) made by Abrams",
				},
				{
					name: "keywords",
					content: "Space Science Engineering 中央大學 太空 科學 工程",
				},
				{
					charset: "UTF-8",
				},
				{
					name: "author",
					content: "Abrams",
				},
			],
		},
	},
});

import tailwindcss from "@tailwindcss/vite";

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
	compatibilityDate: "2025-07-15",
	devtools: { enabled: true },
	vite: {
		plugins: [tailwindcss()],
	},
	css: ["@/assets/css/css.css"],
	app: {
		head: {
			title: "國立中央大學太空科學與工程學系",
		},
	},
	modules: ["@pinia/nuxt"],
});

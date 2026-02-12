/** @type {import('tailwindcss').Config} */
export default {
	content: ["./app/**/*.{vue,js,ts,jsx,tsx}"],
	theme: {
		extend: {
			colors: {
				color1: "#001b2c",
				color2: "#004a94",
				color3: "#43c3dd",
				color4: "#d9edf8",
			},
		},
		width: {
			"1/9": "11.111111%",
		},
	},
	plugins: [],
};

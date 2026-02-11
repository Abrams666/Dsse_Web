import { defineStore } from "pinia";

export const useDeviceStore = defineStore("device", () => {
	const device = ref("computer");

	return { device };
});

<template>
	<section v-if="showEmergencyInfo" class="font-bold pl-1 pr-1 fixed left-0 top-20 w-screen h-10 bg-red-700 text-[var(--color4)] flex flex-row items-center justify-between gap-5 z-10">
		<div class="flex flex-row ml-2"><h2>通知 Announcement：</h2>
		<h2>{{ emergencyInfo.info }}</h2></div>
		<input type="button" @click="closeEmergencyInfo" value="X" class="h-2/3 font-bold aspect-square  bg-[var(--color4)] text-red-700 cursor-pointer"></input>
	</section>
	<section id="bg" class="w-screen h-screen pt-10 mt-10 flex flex-row items-center justify-start">
		<h1 class="ml-[45vw] mb-[5rem] flex flex-row items-center justify-center gap-5 text-[80px] text-[var(--color4)] font-bold">
			We're<textTyping :text="['Students', 'Scientists', 'Engineers', 'Future']" :time="10000" />
		</h1>
	</section>
</template>

<script setup>
import textTyping from "~/components/index/textTyping.vue";

import emergencyInfo from "~/assets/json/emergencyInfo.json";

const showEmergencyInfo = ref(false);

const closeEmergencyInfo = () => {
	showEmergencyInfo.value = false;
};

if (emergencyInfo.info !== "") {
	showEmergencyInfo.value = true;
}
</script>

<style scoped>
#bg {
	background-image: url("/index/bg1.jpg");
	background-size: cover;
	background-position: top;
}
</style>

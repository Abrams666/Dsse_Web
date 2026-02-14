<template>
	<section v-if="showEmergencyInfo" class="font-bold pl-1 pr-1 fixed left-0 top-20 w-screen h-10 bg-red-700 text-[var(--color4)] flex flex-row items-center justify-between gap-5 z-10">
		<div class="flex flex-row ml-2"><h2>通知 Announcement：</h2>
		<h2>{{ emergencyInfo.info }}</h2></div>
		<input type="button" @click="closeEmergencyInfo" value="X" class="h-2/3 font-bold aspect-square  bg-[var(--color4)] text-red-700 cursor-pointer"></input>
	</section>
	<section id="bg" class="w-screen h-screen pt-10 mt-10 flex flex-row items-center lg:justify-start justify-center lg:bg-top bg-right">
		<h1 id="typing" class="lg:ml-[45vw] lg:mb-[5rem] flex flex-row items-center justify-center gap-5 text-[10vw] lg:text-[80px] text-[var(--color4)] font-bold ">
			We're<textTyping :text="['Students', 'Scientists', 'Engineers', 'Future']" :time="10000"/>
		</h1>
	</section>
	<section class="w-screen lg:h-screen h-auto flex items-center justify-center lg:p-10 p-5" id="news">
		<div class="w-full h-full backdrop-blur-md rounded-xl p-10 flex flex-col items-start lg:justify-between justify-start gap-5">
			<div class="w-full h-[10%] flex flex-row items-center justify-between">
				<h1 class="text-[var(--color4)] font-bold lg:text-3xl text-2xl">最新消息<br v-if="isMobile"/>NEWS</h1>
				<a href="#" class="lg:w-32 w-24 h-8 text-[var(--color1)] bg-[var(--color3)] rounded-full flex items-center justify-center">View More</a>
			</div>
			<div class="w-full lg:h-[85%] h-auto border-[1px] border-[var(--color4)] rounded-md pl-3 pr-3 flex flex-col items-start justify-between">
				<newsCard v-for="xnews in news" :news="xnews"/>
			</div>
		</div>
	</section>
</template>

<script setup>
import textTyping from "~/components/index/textTyping.vue";
import newsCard from "~/components/index/newsCard.vue";

import emergencyInfo from "~/assets/json/emergencyInfo.json";
import newsData from "~/assets/json/news.json";

const isMobile = ref(false);
const showEmergencyInfo = ref(false);
const news=ref([]);
const showNewsNum = ref(6)

const closeEmergencyInfo = () => {
	showEmergencyInfo.value = false;
};

if (emergencyInfo.info !== "") {
	showEmergencyInfo.value = true;
}

onMounted(() => {
	if (window.innerWidth <= 1024) {
		isMobile.value = true;
		showNewsNum.value=5;
	} else {
		isMobile.value = false;
		showNewsNum.value=6;
	}

	for (let i = newsData.length-1; i>=newsData.length-showNewsNum.value && i>=0; i--) {
		news.value.push(newsData[i]);
}
});
</script>

<style scoped>
#typing {
	font-family:  sans-serif;
}
#bg {
	background-image: url("/index/bg1.jpg");
	background-size: cover;
}
#news {
	background-image: url("/index/bg2.jpg");
	background-size: cover;
	background-position: top;
}
</style>

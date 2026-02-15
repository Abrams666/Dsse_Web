<template>
	<section class="w-screen h-[50vh] flex items-center justify-center pt-20" id="bg">
		<h1 class="text-[var(--color4)] lg:text-[5vw] text-[10vw] font-bold">媒體 Media</h1>
	</section>
	<section class="w-screen h-auto bg-[var(--color1)] lg:p-20 p-5 flex flex-col gap-[8vh]">
		<div class="w-full h-auto flex flex-row justify-around flex-wrap gap-10">
			<a href="#" v-for="med in media" class="lg:w-[300px] w-full h-auto flex flex-col gap-0 text-[var(--color4)]">
				<img class="img w-full aspect-video rounded-md" :src="med.imgSrc" alt="" />
				<br />
				<p class="w-full text-[var(--color3)]">{{ med.date }}</p>
				<p class="w-full text-[var(--color4)]">{{ med.title }}</p>
			</a>
		</div>
	</section>
</template>

<script setup>
import media from "~/assets/json/media.json";

const props = defineProps({
	isMobile: Boolean,
});
</script>

<style scoped>
#bg {
	background-image: url("/media/bg1.jpg");
	background-position: center;
	background-size: cover;
}
.img {
	object-fit: cover;
}
</style>

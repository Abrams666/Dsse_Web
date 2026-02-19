<template>
	<section class="w-screen h-[50vh] flex items-center justify-center pt-20" id="bg">
		<h1 class="text-[var(--color4)] lg:text-[5vw] text-[10vw] font-bold">規章 Regulation</h1>
	</section>
	<section class="w-screen h-auto bg-[var(--color1)] lg:p-20 p-5 flex flex-col gap-[8vh]">
		<div class="w-full h-auto flex flex-col gap-3 text-[var(--color4)]">
			<h2 class="text-3xl font-bold">系務 Department</h2>
			<div class="w-full h-auto flex flex-col gap-3">
				<div v-for="link in dept" class="w-full h-15 flex flex-row justify-between">
					<a class="w-[80%] h-full bg-[var(--color2)] p-5 flex flex-row gap-2 items-center justify-start" :href="link.doclink"
						><font-awesome-icon icon="fa-solid fa-download" />{{ link.filename }}</a
					>
					<div class="w-[19%] h-full bg-[var(--color3)] p-5 flex flex-row items-center justify-center text-[var(--color1)]">
						{{ link.date.substr(0, 10) }}
					</div>
				</div>
			</div>
		</div>
		<div class="w-full h-auto flex flex-col gap-3 text-[var(--color4)]">
			<h2 class="text-3xl font-bold">碩士班 Master</h2>
			<div class="w-full h-auto flex flex-col gap-3">
				<div v-for="link in master" class="w-full h-15 flex flex-row justify-between">
					<a class="w-[80%] h-full bg-[var(--color2)] p-5 flex flex-row gap-2 items-center justify-start" :href="link.doclink"
						><font-awesome-icon icon="fa-solid fa-download" />{{ link.filename }}</a
					>
					<div class="w-[19%] h-full bg-[var(--color3)] p-5 flex flex-row items-center justify-center text-[var(--color1)]">
						{{ link.date.substr(0, 10) }}
					</div>
				</div>
			</div>
		</div>
		<div class="w-full h-auto flex flex-col gap-3 text-[var(--color4)]">
			<h2 class="text-3xl font-bold">博士班 PhD</h2>
			<div class="w-full h-auto flex flex-col gap-3">
				<div v-for="link in phd" class="w-full h-15 flex flex-row justify-between">
					<a class="w-[80%] h-full bg-[var(--color2)] p-5 flex flex-row gap-2 items-center justify-start" :href="link.doclink"
						><font-awesome-icon icon="fa-solid fa-download" />{{ link.filename }}</a
					>
					<div class="w-[19%] h-full bg-[var(--color3)] p-5 flex flex-row items-center justify-center text-[var(--color1)]">
						{{ link.date.substr(0, 10) }}
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
const dept = ref([]);
const master = ref([]);
const phd = ref([]);
const props = defineProps({
	isMobile: Boolean,
});

onMounted(async () => {
	const res = await $fetch("/api/regulation", {
		method: "GET",
	});

	for (let i = 0; i < res.length; i++) {
		if (res[i].tag == 0) {
			dept.value.push(res[i]);
		} else if (res[i].tag == 1) {
			master.value.push(res[i]);
		} else if (res[i].tag == 2) {
			phd.value.push(res[i]);
		}
	}
});
</script>

<style scoped>
#bg {
	background-image: url("/regulation/bg1.webp");
	background-position: bottom;
	background-size: cover;
}
</style>

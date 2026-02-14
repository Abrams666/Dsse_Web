<template>
	<header class="w-screen h-20 bg-[var(--color1)] p-4 fixed top-0 left-0 z-50 flex flex-row items-center justify-between">
		<a href="/" class="h-full w-auto flex flex-row items-center gap-3"
			><img src="/pageStructure/dsseLogo.png" class="h-full aspect-[1:1]" alt="" />
			<div v-if="!isMobile" class="flex flex-col items-start justify-center">
				<h1 class="text-[var(--color4)] font-bold text-[1.2rem]">國立中央大學太空科學與工程學系</h1>
				<p class="text-[var(--color4)] text-[0.8rem]">Department of Space Science and Engineering, NCU</p>
			</div></a
		>
		<nav
			v-if="showNav"
			class="h-auto lg:w-auto w-full flex items-center justify-center absolute lg:static left-0 top-20 lg:bg-transparent bg-[var(--color1)]"
		>
			<ul class="h-auto w-auto flex lg:flex-row flex-col items-start gap-2 p-3 lg:p-0 lg:justify-center lg:items-center lg:gap-5">
				<li v-for="(link, index) in pages" :key="index" class="flex flex-row items-center gap-[2px] justify-center">
					<font-awesome-icon v-if="isMobile" :icon="link.icon" class="text-[var(--color4)]" />
					<a :href="link.url" class="text-base text-[var(--color4)]"><i :class="link.icon"></i>{{ link.name }}</a>
				</li>
			</ul>
		</nav>

		<div v-if="isMobile" class="h-[80%] aspect-square text-[var(--color4)] flex items-center justify-center" @click="toggleNav">
			<font-awesome-icon icon="fa-solid fa-bars" class="text-2xl" />
		</div>
	</header>
</template>

<script setup>
import pages from "~/assets/json/pages.json";

const isMobile = ref(false);
const showNav = ref(true);

const toggleNav = () => {
	showNav.value = !showNav.value;
};

onMounted(() => {
	if (window.innerWidth <= 1024) {
		isMobile.value = true;
		showNav.value = false;
	} else {
		isMobile.value = false;
	}
});
</script>

<style scoped></style>

<template>
	<header class="w-screen h-20 bg-[var(--color1)] p-4 fixed top-0 left-0 z-50 flex flex-row items-center justify-between">
		<a href="/" class="h-12 aspect-[1:1]"><img src="/pageStructure/dsseLogo.png" class="h-full aspect-[1:1]" alt="" /></a>
		<ul class="h-full w-auto flex flex-row justify-center items-center gap-5">
			<li v-for="(link, index) in pages" :key="index">
				<a :href="link.url" class="text-base text-[var(--color4)]"><i :class="link.icon"></i>{{ link.name }}</a>
			</li>
		</ul>
	</header>
</template>

<script setup>
import pages from "./assets/json/pages.json";
</script>

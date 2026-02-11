<template>
	<header class="w-screen h-20 bg-(--color1) p-4 fixed top-0 left-0 z-50 flex flex-row items-center justify-between">
		<a href="/" class="h-12 aspect-1:1"><img src="/pageStructure/dsseLogo.png" class="h-full aspect-1:1" alt="" /></a>
		<ul class="h-full w-auto flex flex-row justify-center items-center gap-5">
			<li v-for="(link, index) in pages" :key="index">
				<a :href="link.url" class="text-base text-(--color4)"><i :class="link.icon"></i>{{ link.name }}</a>
			</li>
		</ul>
	</header>
</template>

<script setup>
const pages = [
	{ name: "首頁 Home", url: "/", icon: "fa-solid fa-house" },
	{ name: "簡介 Introduction", url: "#", icon: "fa-solid fa-circle-info" },
	{ name: "人員 Faculty", url: "#", icon: "fa-solid fa-people-group" },
	{ name: "招生 Admission", url: "#", icon: "fa-solid fa-ticket" },
	{ name: "規章 Regulation", url: "#", icon: "fa-solid fa-gavel" },
	{ name: "成就 Achievement", url: "#", icon: "fa-solid fa-trophy" },
];
</script>

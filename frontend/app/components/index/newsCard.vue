<template>
	<div class="h-[15%] w-full p-3 border-b border-[var(--color4)] flex flex-row items-center justify-between gap-5">
		<p class="w-[5%] flex flex-row items-center justify-start gap-2 font-bold" :id="`tag-${props.news.id}`">{{ props.news.tag }}</p>
		<h3 class="w-[75%] overflow-hidden text-[var(--color4)]">{{ props.news.title }}</h3>
		<p class="w-[10%] text-[var(--color4)] flex flex-row justify-end">{{ props.news.date }}</p>
		<a class="w-[10%] hover:underline flex flex-row justify-end text-[var(--color4)]">View Detail ></a>
	</div>
</template>

<script setup>
import newsCatalog from "~/assets/json/newsCatalog.json";

const props = defineProps({
	news: Object,
});

onMounted(() => {
	const tagIndex = newsCatalog.tags.indexOf(props.news.tag);
	let tag = document.getElementById(`tag-${props.news.id}`);
	tag.style.color = newsCatalog.colors[tagIndex];
});
</script>

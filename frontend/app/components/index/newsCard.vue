<template>
	<div class="h-[15%] w-full p-3 border-b border-[var(--color4)] flex flex-row items-center justify-between gap-5 lg:text-[1rem] text-[0.8rem]">
		<p class="w-[5%] flex flex-row items-center justify-start gap-2 font-bold" :id="`tag-${props.news.id}`">{{ newsTag }}</p>
		<h3 class="w-[75%] overflow-hidden text-[var(--color4)]">{{ props.news.title }}</h3>
		<p class="w-[10%] text-[var(--color4)] flex flex-row justify-end">{{ props.news.date.substr(0, 10) }}</p>
		<a :href="`/news/${props.news.id}`" class="w-[10%] hover:underline flex flex-row justify-end text-[var(--color4)]">View Detail ></a>
	</div>
</template>

<script setup>
import newsCatalog from "~/assets/json/newsCatalog.json";

const newsTag = ref("");

const props = defineProps({
	news: Object,
});

onMounted(() => {
	newsTag.value = newsCatalog.tags[Number(props.news.tag) - 1];
	let tag = document.getElementById(`tag-${props.news.id}`);
	tag.style.color = newsCatalog.colors[Number(props.news.tag) - 1];
});
</script>

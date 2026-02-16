<template>
	<section class="w-screen h-auto min-h-screen p-20 pt-36 flex flex-col justify-start bg-[var(--color2)] gap-5">
		<h1 class="text-5xl text-[var(--color4)] font-bold mb-5">最新消息 NEWS</h1>
		<p class="w-full h-auto bg-[var(--color1)] flex flex-row justify-start items-center p-5 text-[var(--color4)] text-2xl">
			{{ news.title }}
		</p>
		<div class="w-full h-auto flex flex-row justify-between gap-5">
			<p class="w-[50%] bg-[var(--color1)] p-5 text-[var(--color4)]">Date：{{ news.date?.substr(0, 10) }}</p>
			<p class="w-[50%] bg-[var(--color1)] p-5 text-[var(--color4)]">Publish：{{ news.publishdate?.substr(0, 10) }}</p>
		</div>
		<p class="w-full h-auto flex flex-row items-start justify-start bg-[var(--color1)] p-5 text-[var(--color4)] text-wrap">
			{{ news.content }}
		</p>
		<div class="w-full h-auto flex flex-col items-start justify-start bg-[var(--color1)] p-5 text-[var(--color4)]">
			<a v-for="link in news.filelinks" :href="link"><font-awesome-icon icon="fa-solid fa-link" /> {{ link }}</a>
		</div>
	</section>
</template>

<script setup>
const route = useRoute();
const id = route.params.id;
const news = ref({});

onMounted(async () => {
	news.value = await $fetch(`/api/news/${id}/`, {
		method: "GET",
	});

	news.value = news.value[0];

	console.log(news.value.date.substr(0, 10));
});
</script>

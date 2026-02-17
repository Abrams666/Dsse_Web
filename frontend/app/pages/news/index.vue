<template>
	<section id="bg" class="w-screen h-[50vh] pt-20 bg-[var(--color2)] flex items-center justify-center text-[var(--color4)]">
		<h1 class="text-5xl font-bold">最新消息 NEWS</h1>
	</section>
	<section class="w-screen h-auto bg-[var(--color1)] flex flex-row items-center justify-center gap-4 p-5 text-[var(--color4)] flex-no-wrap">
		<input type="button" class="bg-[var(--color3)] text-[var(--color1)] px-4 py-1 rounded-full cursor-pointer" value="All" @click="selectAll" />
		<div class="flex flex-row justify-start gap-4 flex-wrap">
			<div v-for="(catalog, index) in catalogs" class="flex flex-row items-center gap-1">
				<input type="checkbox" name="" :id="`position-${index}`" v-model="selectedCatalog[index]" />
				<p @click="clickText(index)" class="cursor-pointer select-none">{{ catalog }}</p>
			</div>
		</div>
	</section>
	<section class="w-screen h-auto flex flex-row justify-evenly items-center gap-5 flex-wrap p-10 bg-[var(--color2)]">
		<div v-for="news in selectedNews" class="w-full h-auto bg-[var(--color1)] flex flex-row justify-between p-5">
			<p class="w-[5%]" :style="`color: ${news.content};`">{{ news.tag }}</p>
			<p class="w-[70%] text-wrap text-[var(--color4)]">{{ news.title }}</p>
			<p class="w-[10%] text-[var(--color4)]">{{ news.date.substr(0, 10) }}</p>
			<a class="w-[10%] text-[var(--color4)] flex flex-row justify-end hover:underline" :href="`/news/${news.id}`">View Detail></a>
		</div>
	</section>
	<section class="w-full h-auto p-10 pt-0 flex flex-row items-center justify-center text-[var(--color4)] bg-[var(--color2)] gap-5">
		<input @click="lastPage" class="text-3xl" type="button" value="<" />
		<input
			@keyup.enter="updateSelectedNews"
			class="h-10 w-20 p-5 text-[var(--color1)] flex items-center justify-center text-center"
			type="text"
			v-model="currentPage"
		/>
		<input @click="nextPage" class="text-3xl" type="button" value=">" />
	</section>
</template>

<script setup>
import newsCatalogFile from "./assets/json/newsCatalog.json";

const selectedCatalog = ref([]);
const selectedNews = ref([]);
const catalogs = newsCatalogFile.tags;
const numPerPage = 50;
const currentPage = ref(1);
const lastCurrentPage = ref(1);

const props = defineProps({
	isMobile: Boolean,
});

const updateSelectedNews = async () => {
	const resNews = ref([]);
	const selectedCatalogCode = ref("");

	selectedNews.value = [];

	if (currentPage.value <= 0) {
		currentPage.value = 1;
	}

	for (let i = 0; i < selectedCatalog.value.length; i++) {
		if (selectedCatalog.value[i]) {
			selectedCatalogCode.value += `${i + 1}`;
		}
	}

	console.log(selectedCatalogCode.value);

	resNews.value = await $fetch(`/api/news/${currentPage.value * numPerPage}/${selectedCatalogCode.value}`, {
		method: "GET",
	});

	selectedNews.value = resNews.value.slice((currentPage.value - 1) * numPerPage, resNews.value.length);

	console.log(selectedNews.value);

	for (let i = 0; i < selectedNews.value.length; i++) {
		let tempTagId = Number(selectedNews.value[i].tag) - 1;
		selectedNews.value[i].tag = newsCatalogFile.tags[tempTagId];
		selectedNews.value[i].content = newsCatalogFile.colors[tempTagId];
	}

	if (selectedNews.value.length == 0 && resNews.value.length != 0) {
		currentPage.value = lastCurrentPage.value;
		updateSelectedNews();
	}

	lastCurrentPage.value = currentPage.value;
};

const selectAll = () => {
	let tempSelectedCatalog = [];
	for (let i = 0; i < catalogs.length; i++) {
		tempSelectedCatalog.push(true);
	}
	selectedCatalog.value = tempSelectedCatalog;
};

const clickText = (i) => {
	selectedCatalog.value[i] = !selectedCatalog.value[i];
};

const lastPage = () => {
	currentPage.value -= 1;

	updateSelectedNews();
};

const nextPage = () => {
	currentPage.value += 1;

	updateSelectedNews();
};

for (let i = 0; i < catalogs.length; i++) {
	selectedCatalog.value.push(true);
}

onMounted(() => {
	updateSelectedNews();
});

watch(
	selectedCatalog,
	() => {
		updateSelectedNews();
	},
	{ deep: true },
);
</script>

<style scoped>
#bg {
	background-image: url("/news/bg1.jpg");
	background-size: cover;
	background-position: bottom;
}
</style>

<template>
	<section class="w-screen h-[50vh] flex items-center justify-center pt-20" id="bg">
		<h1 class="text-[var(--color4)] lg:text-[5vw] text-[10vw] font-bold">規章 Regulation</h1>
	</section>
	<section class="w-screen h-auto bg-[var(--color1)] lg:p-20 p-5 flex flex-col gap-[8vh]">
		<div v-for="doc in documents" class="w-full h-auto flex flex-col gap-3 text-[var(--color4)]">
			<h2 class="text-3xl font-bold">{{ doc.CatalogName }}</h2>
			<div class="w-full h-auto flex flex-col gap-3">
				<div v-for="link in doc.docs" class="w-full h-15 flex flex-row justify-between">
					<a class="w-[80%] h-full bg-[var(--color2)] p-5 flex flex-row gap-2 items-center justify-start" :href="link.docLink"
						><font-awesome-icon icon="fa-solid fa-download" />{{ link.docName }}</a
					>
					<div class="w-[19%] h-full bg-[var(--color3)] p-5 flex flex-row items-center justify-center text-[var(--color1)]">
						{{ link.docDate }}
					</div>
				</div>
			</div>
		</div>
	</section>
</template>

<script setup>
import documents from "~/assets/json/documents.json";

const props = defineProps({
	isMobile: Boolean,
});
</script>

<style scoped>
#bg {
	background-image: url("/regulation/bg1.webp");
	background-position: bottom;
	background-size: cover;
}
</style>

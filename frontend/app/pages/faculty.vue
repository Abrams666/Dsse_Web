<template>
	<section class="w-screen h-20 bg-[var(--color2)]"></section>
	<section class="w-screen h-32 bg-[var(--color2)] flex items-center justify-center text-[var(--color4)]">
		<h1 class="text-3xl font-bold">人員 Faculty</h1>
	</section>
	<section class="w-screen h-10 bg-[var(--color2)] flex flex-row items-center justify-left gap-4 p-5 text-[var(--color4)] flex-wrap">
		<input type="button" class="bg-[var(--color3)] text-[var(--color1)] px-4 py-1 rounded-full cursor-pointer" value="All" @click="selectAll" />
		<div v-for="(position, index) in faciltyPositions" class="flex flex-row items-center gap-1">
			<input type="checkbox" name="" :id="`position-${index}`" v-model="selectedPositions[index]" />
			<p>{{ position }}</p>
		</div>
	</section>
	<section class="w-screen h-auto flex flex-row justify-evenly items-center gap-10 flex-wrap p-5 bg-[var(--color2)]">
		<BusinessCard
			v-for="faculty in facilties"
			:key="faculty.id"
			:id="faculty.id"
			:name="faculty.chineseName"
			:positions="faculty.position"
			:phone="faculty.phone"
			:email="faculty.email"
			:website="faculty.website"
		/>
	</section>
</template>

<script setup>
import faciltyPositions from "./assets/json/facultyPosition.json";
import facilties from "./assets/json/faculty.json";

import BusinessCard from "~/components/faculty/businessCard.vue";

const selectedPositions = ref([]);
const selectedPositionNames = ref([]);
const selectedFaculties = ref([]);

for (let i = 0; i < faciltyPositions.length; i++) {
	selectedPositions.value.push(true);
	selectedPositionNames.value.push(faciltyPositions[i]);
}

watch(selectedPositions, () => {
	selectedPositionNames.value = [];
	selectedFaculties.value = [];
	console.log(selectedPositions.value);
	for (let i = 0; i < selectedPositions.value.length; i++) {
		if (selectedPositions.value[i]) {
			selectedPositionNames.value.push(faciltyPositions[i]);
		}
	}

	for (let i = 0; i < facilties.length; i++) {
		if (selectedPositionNames.value.includes(facilties[i].position)) {
			selectedFaculties.value.push(facilties[i]);
		}
	}
});

const selectAll = () => {
	for (let i = 0; i < selectedPositions.value.length; i++) {
		selectedPositions.value[i] = true;
	}
};
</script>

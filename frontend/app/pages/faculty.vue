<template>
	<section id="bg" class="w-screen h-96 pt-20 bg-[var(--color2)] flex items-center justify-center text-[var(--color4)]">
		<h1 class="text-5xl font-bold">人員 Faculty</h1>
	</section>
	<section class="w-screen h-auto bg-[var(--color1)] flex flex-row items-center justify-center gap-4 p-5 text-[var(--color4)] flex-no-wrap">
		<input type="button" class="bg-[var(--color3)] text-[var(--color1)] px-4 py-1 rounded-full cursor-pointer" value="All" @click="selectAll" />
		<div class="flex flex-row justify-start gap-4 flex-wrap">
			<div v-for="(position, index) in faciltyPositions" class="flex flex-row items-center gap-1">
				<input type="checkbox" name="" :id="`position-${index}`" v-model="selectedPositions[index]" />
				<p @click="clickText(index)" class="cursor-pointer select-none">{{ position }}</p>
			</div>
		</div>
	</section>
	<section class="w-screen h-auto flex flex-row justify-evenly items-center gap-10 flex-wrap p-5 bg-[var(--color2)]">
		<BusinessCard
			v-for="faculty in selectedFaculties"
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

const updateSelectedFaculties = () => {
	selectedPositionNames.value = [];
	selectedFaculties.value = [];

	for (let i = 0; i < selectedPositions.value.length; i++) {
		if (selectedPositions.value[i]) {
			selectedPositionNames.value.push(faciltyPositions[i]);
		}
	}

	for (let i = 0; i < facilties.length; i++) {
		for (let j = 0; j < facilties[i].position.length; j++) {
			if (selectedPositionNames.value.find((pos) => pos === facilties[i].position[j])) {
				selectedFaculties.value.push(facilties[i]);
				break;
			}
		}
	}

	console.log(selectedFaculties.value);
};

const selectAll = () => {
	let tempSelectedPositions = [];
	for (let i = 0; i < faciltyPositions.length; i++) {
		tempSelectedPositions.push(true);
	}
	selectedPositions.value = tempSelectedPositions;

	updateSelectedFaculties();

	watch(selectedPositions.value, () => {
		updateSelectedFaculties();
	});
};

const clickText = (i) => {
	selectedPositions.value[i] = !selectedPositions.value[i];
};

for (let i = 0; i < faciltyPositions.length; i++) {
	selectedPositions.value.push(true);
}
selectedPositionNames.value = faciltyPositions;

updateSelectedFaculties();

watch(selectedPositions.value, () => {
	updateSelectedFaculties();
});
</script>

<style scoped>
#bg {
	background-image: url("/faculty/bg1.png");
	background-size: cover;
	background-position: top;
}
</style>

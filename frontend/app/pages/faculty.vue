<template>
	<section class="w-screen h-20 bg-[var(--color2)]"></section>
	<section class="w-screen h-32 bg-[var(--color2)] flex items-center justify-center text-[var(--color4)]">
		<h1 class="text-3xl font-bold">人員 Faculty</h1>
	</section>
	<section class="w-screen h-10 bg-[var(--color2)] flex flex-row items-center justify-left gap-4 p-5 text-[var(--color4)] flex-wrap">
		<div class="flex flex-row items-center gap-1">
			<input type="checkbox" name="" id="" />
			<p>全部</p>
		</div>
		<div v-for="position in faciltyPositions" class="flex flex-row items-center gap-1">
			<input type="checkbox" name="" id="" />
			<p>{{ position }}</p>
		</div>
	</section>
	<section class="w-screen h-auto flex flex-row justify-evenly items-center gap-10 flex-wrap p-5 bg-[var(--color2)]">
		<BusinessCard />
		<BusinessCard />
		<BusinessCard />
		<BusinessCard />
	</section>
</template>

<script setup>
import faciltyPositions from "./assets/json/facultyPosition.json";
import facilties from "./assets/json/faculty.json";

import BusinessCard from "~/components/faculty/businessCard.vue";
</script>

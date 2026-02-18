<template>
	<div class="w-full h-full flex flex-col items-start justify-start">
		<h1 class="text-[var(--color1)] text-5xl font-bold">Welcome, {{ account }}!</h1>
	</div>
</template>

<script setup>
defineProps({
	account: String,
});
</script>

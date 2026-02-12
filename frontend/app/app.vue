<template>
	<div>
		<NuxtRouteAnnouncer />
		<NHeader />
		<NuxtPage />
		<NFooter />
	</div>
</template>

<script setup>
import NHeader from "./components/pageStructure/NHeader.vue";
import NFooter from "./components/pageStructure/NFooter.vue";
</script>

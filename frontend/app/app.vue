<template>
	<div>
		<NuxtRouteAnnouncer />
		<NHeader />
		<NuxtPage :isMobile="isMobile" />
		<NFooter />
	</div>
</template>

<script setup>
import NHeader from "./components/pageStructure/NHeader.vue";
import NFooter from "./components/pageStructure/NFooter.vue";

const isMobile = ref(false);

onMounted(() => {
	if (window.innerWidth <= 1024) {
		isMobile.value = true;
	} else {
		isMobile.value = false;
	}
});
</script>

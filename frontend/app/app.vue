<template>
	<NuxtRouteAnnouncer />
	<NuxtLayout>
		<NuxtPage :isMobile="isMobile" />
	</NuxtLayout>
</template>

<script setup>
const isMobile = ref(false);

onMounted(() => {
	if (window.innerWidth <= 1024) {
		isMobile.value = true;
	} else {
		isMobile.value = false;
	}
});
</script>

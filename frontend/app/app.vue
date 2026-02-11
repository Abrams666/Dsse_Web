<template>
	<NHeader />
	<NuxtPage />
	<NFooter />
</template>

<script setup>
import NHeader from "~/components/pageStructure/NHeader.vue";
import NFooter from "~/components/pageStructure/NFooter.vue";

const device = useDeviceStore();
</script>

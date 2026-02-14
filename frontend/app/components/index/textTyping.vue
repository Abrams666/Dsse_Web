<template>
	<div id="container">
		<p :class="{ active: !isMobile, inactive: isMobile }" id="text">{{ currentText }}</p>
		<div :class="{ active: !isMobile, inactive: isMobile }" id="cursor"></div>
	</div>
</template>

<script setup>
//values
const isMobile = ref(false);
let currentText = ref("");
let totalSteps = 0;
let remainText = "";
const props = defineProps({
	text: Array,
	time: Number,
});

//functions
function sleep(ms) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

//run
onMounted(() => {
	if (window.innerWidth < window.innerHeight) {
		isMobile.value = true;
	} else {
		isMobile.value = false;
	}
});

for (let i = 0; i < props.text.length; i++) {
	totalSteps += props.text[i].length * 2;
}

onMounted(async () => {
	while (true) {
		currentText.value = "";
		for (let i = 0; i < props.text.length; i++) {
			for (let j = 0; j < props.text[i].length; j++) {
				currentText.value += props.text[i][j];
				await sleep(props.time / totalSteps);
			}

			await sleep(1000);

			for (let j = props.text[i].length - 1; j >= 0; j--) {
				remainText = "";
				for (let k = 0; k < j; k++) {
					remainText += props.text[i][k];
				}
				currentText.value = remainText;
				await sleep(props.time / totalSteps);
			}

			await sleep(1000);
		}
	}
});
</script>

<style scoped>
#container {
	width: auto;
	height: auto;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
}

#text {
	margin-right: 5px;
	color: var(--color4);
	font-weight: bold;
	font-family: sans-serif;
}

#text.active {
	font-size: 80px;
}

#text.inactive {
	font-size: 10vw;
}

#cursor {
	background-color: var(--color2);
	animation: blink 1.5s infinite;
}

#cursor.active {
	height: 100px;
	width: 20px;
}

#cursor.inactive {
	height: 30px;
	width: 5px;
}

@keyframes blink {
	0% {
		opacity: 1;
	}
	50% {
		opacity: 0;
	}
	100% {
		opacity: 1;
	}
}
</style>

<template>
	<div id="card" class="w-[500px] aspect-[7/5] relative" :class="{ active: isFlip, inactive: !isFlip }">
		<div id="front" class="w-[500px] aspect-[7/4] bg-[var(--color4)] flex flex-row justify-center items-center gap-5 p-5 absolute top-0 left-0">
			<div class="w-1/3 h-[90%] border-r-[var(--color2)] border-r-5 flex items-center justify-center border-r-[5px] pr-3">
				<img :src="`/faculty/f${props.id}.png`" alt="" class="h-auto w-full" />
			</div>
			<div class="w-2/3 h-[80%] flex flex-col justify-between gap-3 text-[var(--color1)]">
				<div class="h-[35%] flex flex-col gap-1 border-b-[var(--color2)] border-b-2 pb-1">
					<h2 class="text-4xl font-bold">{{ props.name }}</h2>
					<div class="flex flex-row items-center justify-left gap-1">
						<p v-for="position in props.positions">{{ position }} /</p>
					</div>
				</div>
				<ul class="h-[65%] flex flex-col justify-center">
					<li>電話:{{ props.phone }}</li>
					<li>Email:{{ props.email }}</li>
					<li>
						網頁:<a :href="props.website" target="_blank">{{ props.website }}</a>
					</li>
				</ul>
			</div>
		</div>
		<div
			id="back"
			class="w-[500px] aspect-[7/4] bg-[var(--color1)] flex flex-row justify-center items-center gap-5 p-5 absolute top-0 left-0"
		></div>
		<input
			type="button"
			id="flip"
			class="w-[60%] h-[10%] bg-[var(--color3)] rounded-full absolute bottom-0 left-1/2 -translate-y-1/2 -translate-x-1/2 cursor-pointer text-[var(--color1)] text-lg"
			value="View More"
			@click="flip"
		/>
	</div>
</template>

<script setup>
const props = defineProps({
	id: Number,
	name: String,
	positions: Array,
	phone: String,
	email: String,
	website: String,
});
const isFlip = ref(false);

const flip = () => {
	isFlip.value = !isFlip.value;
};
</script>

<style scoped>
#card {
	perspective: 1500px;
}
#card.inactive #front {
	animation: flipFront2 0.5s forwards linear;
}
#card.inactive #back {
	animation: flipBack2 0.5s forwards linear;
}
#card.active #front {
	animation: flipFront1 0.5s forwards linear;
}
#card.active #back {
	animation: flipBack1 0.5s forwards linear;
}

@keyframes flipFront1 {
	0% {
		transform: rotate3d(0, 1, 0, 0deg);
		display: flex;
	}
	50% {
		transform: rotate3d(0, 1, 0, 90deg);
		display: flex;
	}
	100% {
		transform: rotate3d(0, 1, 0, 180deg);
		display: none;
	}
}

@keyframes flipBack1 {
	0% {
		transform: rotate3d(0, 1, 0, 180deg);
		display: none;
	}
	50% {
		transform: rotate3d(0, 1, 0, 270deg);
		display: none;
	}
	100% {
		transform: rotate3d(0, 1, 0, 360deg);
		display: flex;
	}
}
@keyframes flipFront2 {
	0% {
		transform: rotate3d(0, 1, 0, 180deg);
		display: none;
	}
	50% {
		transform: rotate3d(0, 1, 0, 90deg);
		display: flex;
	}
	100% {
		transform: rotate3d(0, 1, 0, 0deg);
		display: flex;
	}
}

@keyframes flipBack2 {
	0% {
		transform: rotate3d(0, 1, 0, 360deg);
		display: flex;
	}
	50% {
		transform: rotate3d(0, 1, 0, 270deg);
		display: none;
	}
	100% {
		transform: rotate3d(0, 1, 0, 180deg);
		display: none;
	}
}
</style>

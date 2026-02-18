<template>
	<section v-if="showLoading" class="w-screen h-screen bg-[var(--color1)] absolute top-0 left-0 flex items-center justify-center z-50">
		<h1 class="text-[var(--color4)] text-7xl">Loading...</h1>
	</section>
	<section class="w-screen h-screen flex flex-row justify-start items-start">
		<header class="w-[15%] h-full bg-[var(--color1)] flex flex-col items-start justify-between user-select-none">
			<div class="w-full h-auto flex flex-col items-start justify-start gap-5">
				<a href="/admin" class="w-full h-auto flex flex-row items-center justify-start gap-1 p-2">
					<img class="w-[25%] aspect-square rounded-full" src="/pageStructure/dsseLogo.png" alt="" />
					<h1 class="text-[var(--color4)] text-xl font-bold">Back Stage</h1>
				</a>
				<div class="w-full h-auto flex flex-col">
					<input
						@click="clickNav(1)"
						v-if="showNav[0]"
						class="w-full h-[50px] bg-[var(--color2)] cursor-pointer text-[var(--color4)] text-left p-3"
						type="button"
						value="News Management"
					/>
				</div>
			</div>
			<input class="w-full h-[50px] text-[var(--color1)] bg-[var(--color3)] cursor-pointer" type="button" value="Logout" @click="logout" />
		</header>
		<div class="w-[85%] h-full p-20 pb-0 bg-[var(--color4)] flex flex-col items-start justify-start overflow-y-auto">
			<welcome v-if="showComponent[0]" :account="account" />
			<news v-if="showComponent[1]" />
		</div>
	</section>
</template>

<script setup>
import welcome from "~/components/admin/welcome.vue";
import news from "~/components/admin/news.vue";

const userId = ref();
const account = ref("");
const accesss = ref(0);
const showNav = ref([0, 0, 0]);
const showComponent = ref([1, 0, 0, 0]);
const showLoading = ref(true);
const props = defineProps({
	isMobile: Boolean,
});

const logout = () => {
	localStorage.removeItem("token");
	window.location.href = "/admin/login";
};

const clickNav = (index) => {
	for (let i = 0; i < showComponent.value.length; i++) {
		if (i == index) {
			showComponent.value[i] = 1;
		} else {
			showComponent.value[i] = 0;
		}
	}
};

onMounted(async () => {
	const token = localStorage.getItem("token");

	if (token != null) {
		const res = await fetch("api/admin/auth/verify", {
			method: "POST",
			headers: { Authorization: `Bearer ${token}` },
		});

		if (res.status == 200) {
			const data = await res.json();
			userId.value = data.userId;
			account.value = data.account;
			accesss.value = data.access;

			if (accesss.value == 0) {
				showNav.value = [0, 0, 0];
			} else if (accesss.value == 1) {
				showNav.value = [1, 1, 0];
			} else if (accesss.value == 2) {
				showNav.value = [1, 1, 1];
			}

			showLoading.value = false;
		} else {
			localStorage.removeItem("token");
			userId.value = 0;
			window.location.href = "/admin/login";
		}
	} else {
		userId.value = 0;
		window.location.href = "/admin/login";
	}
});
</script>

<template>
	<section class="w-screen h-screen flex items-center justify-center bg-[var(--color2)]">
		<div class="w-[400px] bg-[var(--color1)] p-14 pb-7 text-[var(--color4)] h-auto flex flex-col items-center justify-center">
			<h1 class="text-4xl font-bold mb-5">LOGIN</h1>
			<div class="w-full h-auto flex flex-col items-start mb-7">
				<p>Account</p>
				<input v-model="account" class="w-full h-[40px] text-lg bg-transparent border-b-[1px] border-b-[var(--color4)]" type="text" />
			</div>
			<div class="w-full h-auto flex flex-col items-start mb-10">
				<p>Password</p>
				<input v-model="password" class="w-full h-[40px] text-lg bg-transparent border-b-[1px] border-b-[var(--color4)]" type="password" />
			</div>
			<input @click="submit" class="w-full h-[40px] bg-[var(--color3)] rounded-full text-[var(--color1)] submit" type="button" value="Submit" />
			<p id="err" class="mt-3 text-center w-full h-auto">{{ errMsg }}</p>
		</div>
	</section>
</template>

<script setup>
const account = ref("");
const password = ref("");
const errMsg = ref("");

const submit = async () => {
	errMsg.value = "";
	let isErr = 0;

	if (account.value == "") {
		errMsg.value += "Account can't be blank,";
		isErr = 1;
	}
	if (password.value == "") {
		errMsg.value += "Password can't be blank,";
		isErr = 1;
	}

	if (isErr == 0) {
		const res = await fetch("/api/admin/auth/login", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				account: account.value,
				pwd: password.value,
			}),
		});

		const data = await res.json();

		console.log(data);

		if (res.status == 200) {
			localStorage.setItem("token", data.token);
			window.location.href = "/admin";
		} else {
			errMsg.value = data.message;
		}
	}
};

const props = defineProps({
	isMobile: Boolean,
});
</script>

<style scoped>
.submit {
	transition: transform 0.3s;
}
.submit:hover {
	transform: scale(1.05);
	transition: transform 0.3s;
}
#err {
	color: red;
}
</style>

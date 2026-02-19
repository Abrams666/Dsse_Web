<template>
	<div class="w-full h-auto flex flex-col items-start justify-start gap-5 text-[var(--color1)]">
		<h1 class="text-4xl text-[var(--color1)] font-bold">Regulation Management</h1>
		<div class="w-full h-auto flex flex-col items-start justify-start gap-3">
			<h3 class="text-2xl">Regulation Editor</h3>
			<div class="w-full h-auto flex flex-col items-start justify-start gap-2">
				<div class="w-full h-[50px] flex flex-row justify-start gap-2">
					<p class="w-[150px] h-full p-2 gap-2 bg-[var(--color2)] text-[var(--color4)] flex flex-row items-center justify-center">
						File Name
					</p>
					<input v-model="name" type="text" class="w-full h-full p-2" />
				</div>
				<div class="w-full h-[50px] flex flex-row justify-start gap-2">
					<p class="w-[150px] h-full p-2 gap-2 bg-[var(--color2)] text-[var(--color4)] flex flex-row items-center justify-center">Tag</p>
					<select v-model="tag" class="w-full h-full p-3" name="" id="">
						<option v-for="tag in tags">{{ tag }}</option>
					</select>
				</div>
				<div class="w-full h-[50px] flex flex-row justify-start gap-2">
					<p class="w-[150px] h-full p-2 gap-2 bg-[var(--color2)] text-[var(--color4)] flex flex-row items-center justify-center">Links</p>
					<input v-model="link" type="text" class="w-full h-full p-2 flex flex-row items-start justify-start flex-wrap text-wrap" />
				</div>
				<div v-if="editType == 1" class="w-full h-[50px] flex flex-row justify-start items-center gap-3">
					<input @click="addReg" class="w-[20%] h-full bg-[var(--color3)] cursor-pointer" type="button" value="Add" />
					<p class="msg">{{ errMsg }}</p>
				</div>
				<div v-if="editType == 2" class="w-full h-[50px] flex flex-row justify-start items-center gap-3">
					<input @click="updateRegData" class="w-[20%] h-full bg-[var(--color3)] cursor-pointer" type="button" value="Update" />
					<input @click="deleteReg" class="w-[20%] h-full bg-[var(--color3)] cursor-pointer" type="button" value="Delete" />
					<input @click="cancelEdit" class="w-[20%] h-full bg-[var(--color3)] cursor-pointer" type="button" value="Cancel" />
					<p class="msg">{{ errMsg }}</p>
				</div>
			</div>
		</div>
		<hr />
		<div class="w-full h-auto flex flex-col items-start justify-start gap-3 mb-10">
			<h3 class="text-2xl">Regulation List</h3>
			<div class="w-full h-auto flex flex-col justify-start items-start gap-2">
				<div class="w-full h-[50px] p-3 bg-[var(--color1)] text-[var(--color4)] flex flex-row items-center justify-between gap-1">
					<p class="w-[5%]">ID</p>
					<p class="w-[10%]">Tag</p>
					<p class="w-[70%]">Name</p>
					<p class="w-[10%]">Date</p>
					<input class="w-[5%]" type="button" value="Edit" />
				</div>
				<p
					v-for="(reg, index) in showReg"
					class="w-full h-[50px] cursor-pointer p-3 bg-[var(--color2)] text-[var(--color4)] flex flex-row items-center justify-between gap-1"
				>
					<p class="w-[5%]">{{ reg.id }}</p>
					<p class="w-[10%]">{{ reg.tag }}</p>
					<p class="w-[70%]"><a :href="reg.doclink">{{ reg.filename }}</a></p>
					<p class="w-[10%]">{{ reg.date.substr(0, 10) }}</p>
					<input
						@click="editReg(index)"
						class="w-[5%] h-full bg-[var(--color3)] text-[var(--color1)] cursor-pointer"
						type="button"
						value="Edit"
					/>
				</p>
			</div>
		</div>
	</div>
</template>

<script setup>
import regulationTags from "~/assets/json/regulationDocTags.json";

const id = ref();
const tags = regulationTags;
const name = ref("");
const tag = ref("");
const link = ref("");
const showReg = ref([]);
const editType = ref(1);
const errMsg = ref("");
const token = localStorage.getItem("token");

const updateReg = async () => {
	let resReg = await $fetch("/api/regulation", {
		method: "GET",
	});

	console.log(resReg);

	showReg.value = resReg;

	for (let i = 0; i < showReg.value.length; i++) {
		showReg.value[i].tag = tags[showReg.value[i].tag];
	}
};

const verifyData = () => {
	errMsg.value = "";
	let isErr = 0;

	if (name.value == "") {
		errMsg.value += "Name can't be blank,";
		isErr = 1;
	}
	if (tag.value == "") {
		errMsg.value += "Tag can't be blank,";
		isErr = 1;
	}
	if (link.value == "") {
		errMsg.value += "Link can't be blank,";
		isErr = 1;
	}

	return isErr == 0;
};

const addReg = async () => {
	if (verifyData()) {
		let tagCode = tags.indexOf(tag.value);

		const res = await fetch("/api/admin/regulation/add", {
			method: "POST",
			headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
			body: JSON.stringify({
				fileName: name.value,
				tag: tagCode,
				docLink: link.value,
			}),
		});

		if (res.status == 200) {
			name.value = "";
			tag.value = "";
			link.value = "";
			errMsg.value = "";
			updateReg();
		} else {
			const data = await res.json();
			errMsg.value = data.message;
		}
	}
};

const editReg = (index) => {
	id.value = showReg.value[index].id;
	tag.value = showReg.value[index].tag;
	link.value = showReg.value[index].doclink;
	name.value = showReg.value[index].filename;
	editType.value = 2;
	errMsg.value = "";
};

const cancelEdit = () => {
	id.value = null;
	name.value = "";
	tag.value = "";
	link.value = "";
	editType.value = 1;
	errMsg.value = "";
};

const updateRegData = async () => {
	if (verifyData()) {
		let tagCode = tags.indexOf(tag.value);

		const res = await fetch("/api/admin/regulation/update", {
			method: "POST",
			headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
			body: JSON.stringify({
				fileName: name.value,
				tag: tagCode,
				docLink: link.value,
				id: id.value,
			}),
		});

		if (res.status == 200) {
			name.value = "";
			tag.value = "";
			link.value = "";
			errMsg.value = "";
			id.value = null;
			editType.value = 1;
			updateReg();
		} else {
			const data = await res.json();
			errMsg.value = data.message;
		}
	}
};

const deleteReg = async () => {
	if (verifyData()) {
		const res = await fetch("/api/admin/regulation/delete", {
			method: "POST",
			headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
			body: JSON.stringify({ id: id.value }),
		});

		if (res.status == 200) {
			name.value = "";
			tag.value = "";
			link.value = "";
			errMsg.value = "";
			id.value = null;
			editType.value = 1;
			updateReg();
		} else {
			const data = await res.json();
			errMsg.value = data.message;
		}
	}
};

updateReg();
</script>

<style scoped>
.msg {
	color: red;
}
</style>

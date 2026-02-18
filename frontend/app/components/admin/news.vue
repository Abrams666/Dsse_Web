<template>
	<div class="w-full h-auto flex flex-col items-start justify-start gap-5 text-[var(--color1)]">
		<h1 class="text-4xl text-[var(--color1)] font-bold">News Management</h1>
		<div class="w-full h-auto flex flex-col items-start justify-start gap-3">
			<h3 class="text-2xl">News Editor</h3>
			<div class="w-full h-auto flex flex-col items-start justify-start gap-2">
				<div class="w-full h-[50px] flex flex-row justify-start gap-2">
					<p class="w-[150px] h-full p-2 gap-2 bg-[var(--color2)] text-[var(--color4)] flex flex-row items-center justify-center">Title</p>
					<input v-model="title" type="text" class="w-full h-full p-2" />
				</div>
				<div class="w-full h-[50px] flex flex-row justify-start gap-2">
					<div class="w-[50%] h-[50px] flex flex-row justify-start gap-2">
						<p class="w-[150px] h-full p-2 gap-2 bg-[var(--color2)] text-[var(--color4)] flex flex-row items-center justify-center">
							Date
						</p>
						<input v-model="date" class="w-full h-full p-3" type="date" name="" id="" />
					</div>
					<div class="w-[50%] h-[50px] flex flex-row justify-start gap-2">
						<p class="w-[150px] h-full p-2 gap-2 bg-[var(--color2)] text-[var(--color4)] flex flex-row items-center justify-center">
							Tag
						</p>
						<select v-model="tag" class="w-full h-full p-3" name="" id="">
							<option v-for="tag in tags">{{ tag }}</option>
						</select>
					</div>
				</div>
				<div class="w-full h-[200px] flex flex-row justify-start gap-2">
					<p class="w-[150px] h-full p-2 gap-2 bg-[var(--color2)] text-[var(--color4)] flex flex-row items-center justify-center">
						Content
					</p>
					<textarea v-model="content" type="text" class="w-full h-full p-2 flex flex-row items-start justify-start flex-wrap text-wrap" />
				</div>
				<div class="w-full h-[70px] flex flex-row justify-start gap-2">
					<p class="w-[150px] h-full p-2 gap-2 bg-[var(--color2)] text-[var(--color4)] flex flex-row items-center justify-center">
						Links<br />(Separate<br />with ",")
					</p>
					<textarea v-model="links" type="text" class="w-full h-full p-2 flex flex-row items-start justify-start flex-wrap text-wrap" />
				</div>
				<div v-if="editType == 1" class="w-full h-[50px] flex flex-row justify-start items-center gap-3">
					<input @click="addNews" class="w-[20%] h-full bg-[var(--color3)] cursor-pointer" type="button" value="Add" />
					<p class="msg">{{ errMsg }}</p>
				</div>
				<div v-if="editType == 2" class="w-full h-[50px] flex flex-row justify-start items-center gap-3">
					<input @click="updateNewsData" class="w-[20%] h-full bg-[var(--color3)] cursor-pointer" type="button" value="Update" />
					<input @click="deleteNewsData" class="w-[20%] h-full bg-[var(--color3)] cursor-pointer" type="button" value="Delete" />
					<input @click="cancelEdit" class="w-[20%] h-full bg-[var(--color3)] cursor-pointer" type="button" value="Cancel" />
					<p class="msg">{{ errMsg }}</p>
				</div>
			</div>
		</div>
		<hr />
		<div class="w-full h-auto flex flex-col items-start justify-start gap-3 mb-10">
			<h3 class="text-2xl">News</h3>
			<div class="w-full h-auto flex flex-col justify-start items-start gap-2">
				<div class="w-full h-[50px] p-3 bg-[var(--color1)] text-[var(--color4)] flex flex-row items-center justify-between gap-1">
					<p class="w-[5%]">ID</p>
					<p class="w-[5%]">Tag</p>
					<p class="w-[75%]">Title</p>
					<p class="w-[10%]">Date</p>
					<input class="w-[5%]" type="button" value="Edit" />
				</div>
				<div
					v-for="(news, index) in shownews"
					class="w-full h-[50px] p-3 bg-[var(--color2)] text-[var(--color4)] flex flex-row items-center justify-between gap-1"
				>
					<p class="w-[5%]">{{ news.id }}</p>
					<p class="w-[5%]">{{ news.tag }}</p>
					<p class="w-[75%]">{{ news.title }}</p>
					<p class="w-[10%]">{{ news.date }}</p>
					<input
						@click="editNews(index)"
						class="w-[5%] h-full bg-[var(--color3)] text-[var(--color1)] cursor-pointer"
						type="button"
						value="Edit"
					/>
				</div>
			</div>
			<div class="w-full h-[50px] p-3 text-[var(--color1)] flex flex-row items-center justify-center gap-3 text-xl">
				<input class="cursor-pointer" @click="lastPage" type="button" value="<" />
				<input class="w-[5%] text-center" @keyup.enter="enterPressed" v-model="currentPage" type="text" />
				<input class="cursor-pointer" @click="nextPage" type="button" value=">" />
			</div>
		</div>
	</div>
</template>

<script setup>
import newsCatalog from "~/assets/json/newsCatalog.json";

const id = ref();
const tags = newsCatalog.tags;
const title = ref("");
const date = ref("");
const tag = ref("");
const content = ref("");
const today = new Date();
const links = ref("");
const numPerPage = 20;
const currentPage = ref(1);
const shownews = ref([]);
const editType = ref(1);
const errMsg = ref("");
const token = localStorage.getItem("token");

date.value = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;

const updateNews = async () => {
	if (currentPage.value <= 0) {
		currentPage.value = 1;
	}

	let resNews = await $fetch(`/api/news/${currentPage.value * numPerPage}/all`, {
		method: "GET",
	});

	if (resNews.length == 0) {
		currentPage.value -= 1;
		updateNews();
		return;
	}

	shownews.value = [];

	for (let i = (currentPage.value - 1) * numPerPage; i < resNews.length; i++) {
		let newsModel = {
			id: resNews[i].id,
			title: resNews[i].title,
			date: resNews[i].date.substr(0, 10),
			tag: newsCatalog.tags[Number(resNews[i].tag) - 1],
			publishDate: resNews[i].publishDate,
			content: resNews[i].content,
			links: resNews[i].filelinks,
		};
		shownews.value.push(newsModel);
	}

	if (shownews.value.length == 0 && resNews.length != 0) {
		currentPage.value -= 1;
		updateNews();
	}
};

const lastPage = () => {
	currentPage.value -= 1;
	updateNews();
};

const nextPage = () => {
	currentPage.value += 1;
	updateNews();
};

const enterPressed = () => {
	updateNews();
};

const verifyData = () => {
	errMsg.value = "";
	let isErr = 0;

	if (title.value == "") {
		errMsg.value += "Title can't be blank,";
		isErr = 1;
	}
	if (date.value == "") {
		errMsg.value += "Date can't be blank,";
		isErr = 1;
	}
	if (tag.value == "") {
		errMsg.value += "Tag can't be blank,";
		isErr = 1;
	}
	if (content.value == "") {
		errMsg.value += "Content can't be blank,";
		isErr = 1;
	}

	return isErr == 0;
};

const addNews = async () => {
	if (verifyData()) {
		let tagCode = newsCatalog.tags.indexOf(tag.value) + 1;

		const res = await fetch("/api/admin/news/add", {
			method: "POST",
			headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
			body: JSON.stringify({
				title: title.value,
				date: date.value,
				tag: tagCode,
				content: content.value,
				links: links.value.split(","),
			}),
		});

		if (res.status == 200) {
			title.value = "";
			date.value = "";
			tag.value = "";
			content.value = "";
			links.value = "";
			errMsg.value = "";
			updateNews();
		} else {
			const data = await res.json();
			errMsg.value = data.message;
		}
	}
};

const editNews = (index) => {
	console.log(date.value);
	const news = shownews.value[index];
	title.value = news.title;
	date.value = news.date;
	tag.value = news.tag;
	content.value = news.content;
	links.value = news.links.join(",");
	editType.value = 2;
	errMsg.value = "";
	id.value = shownews.value[index].id;
};

const cancelEdit = () => {
	title.value = "";
	date.value = `${today.getFullYear()}/${String(today.getMonth() + 1).padStart(2, "0")}/${String(today.getDate()).padStart(2, "0")}`;
	tag.value = "";
	content.value = "";
	links.value = "";
	editType.value = 1;
	errMsg.value = "";
};

const updateNewsData = async () => {
	if (verifyData()) {
		let tagCode = newsCatalog.tags.indexOf(tag.value) + 1;

		const res = await fetch("/api/admin/news/update", {
			method: "POST",
			headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
			body: JSON.stringify({
				title: title.value,
				date: date.value,
				tag: tagCode,
				content: content.value,
				links: links.value.split(","),
				id: id.value,
			}),
		});

		if (res.status == 200) {
			title.value = "";
			date.value = "";
			tag.value = "";
			content.value = "";
			links.value = "";
			errMsg.value = "";
			id.value = null;
			editType.value = 1;
			updateNews();
		} else {
			const data = await res.json();
			errMsg.value = data.message;
		}
	}
};

const deleteNewsData = async () => {
	if (verifyData()) {
		const res = await fetch("/api/admin/news/delete", {
			method: "POST",
			headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" },
			body: JSON.stringify({ id: id.value }),
		});

		if (res.status == 200) {
			title.value = "";
			date.value = "";
			tag.value = "";
			content.value = "";
			links.value = "";
			errMsg.value = "";
			id.value = null;
			editType.value = 1;
			updateNews();
		} else {
			const data = await res.json();
			errMsg.value = data.message;
		}
	}
};

updateNews();
</script>

<style scoped>
.msg {
	color: red;
}
</style>

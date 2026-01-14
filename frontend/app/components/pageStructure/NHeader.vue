<template>
	<header>
		<a href="/" id="logoLink"><img src="/pageStructure/dsseLogo.png" alt="" /></a>
		<ul>
			<li>
				<a href="/"><i class="fa-solid fa-house"></i>首頁 Home</a>
			</li>
			<li>
				<a href="#"><i class="fa-solid fa-circle-info"></i>簡介 Introduction</a>
			</li>
			<li>
				<a href="#"><i class="fa-solid fa-people-group"></i>人員 Faculty</a>
			</li>
			<li>
				<a href="#"><i class="fa-solid fa-ticket"></i>招生 Admission</a>
			</li>
			<li>
				<a href="#"><i class="fa-solid fa-gavel"></i>規章 Regulation</a>
			</li>
			<li>
				<a href="#"><i class="fa-solid fa-trophy"></i>成就 Achievement</a>
			</li>
		</ul>
	</header>
</template>

<script setup></script>

<style scoped>
header {
	width: calc(100vw - 30px);
	height: 8vh;
	background-color: var(--color1);
	padding: 15px;
	position: fixed;
	top: 0;
	left: 0;
	z-index: 50;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: space-between;
}
#logoLink {
	height: 100%;
	aspect-ratio: 1/1;
}
#logoLink img {
	height: 100%;
	aspect-ratio: 1/1;
}
ul {
	height: 100%;
	width: auto;
	list-style: none;
	display: flex;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	gap: 20px;
}
a {
	color: var(--color4);
	font-size: 1rem;
}
</style>

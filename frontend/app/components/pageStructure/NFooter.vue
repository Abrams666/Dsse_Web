<template>
	<footer>
		<div id="top">
			<div class="topDiv" id="left">
				<div id="lefttop">
					<img id="footerLogo" src="/pageStructure/dsseLogo.png" alt="" />
					<div id="footerSchoolName">
						<p id="chinese">國立中央大學太空科學與工程學系</p>
						<p id="english">Department of Space Science and Engineering, NCU</p>
					</div>
				</div>
				<ul>
					<li>地址:桃園市中壢區中大路300號</li>
					<li>Address: No. 300, Zhongda Rd., Zhongli District, Taoyuan City 32001, Taiwan</li>
					<li>TEL:+886-3-4227151 Ext.65750</li>
					<li>FAX:+886-3-4224394</li>
				</ul>
			</div>
			<div class="topDiv">
				<p class="title">Pages</p>
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
			</div>
			<div class="topDiv">
				<p class="title">Quick Links</p>
				<ul>
					<li>
						<a href="https://www.ncu.edu.tw">中大校網</a>
					</li>
					<li>
						<a href="https://portal.ncu.edu.tw">Portal</a>
					</li>
					<li>
						<a href="https://www.facebook.com">Facebook</a>
					</li>
					<li>
						<a href="https://www.instagram.com">Instagram</a>
					</li>
				</ul>
			</div>
		</div>
		<div id="copyright">
			<p>Copyright © 2026 Abrams. All rights reserved.</p>
		</div>
	</footer>
</template>

<script setup></script>

<style scoped>
footer {
	width: calc(100vw - 70px);
	height: auto;
	background-color: var(--color1);
	padding: 35px;
	padding-bottom: 5px;
	color: var(--color4);
	font-size: 0.8rem;
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}
a {
	color: var(--color4);
}
ul {
	margin-top: 10px;
}
#top {
	width: 100%;
	display: flex;
	flex-direction: row;
	justify-content: space-evenly;
	align-items: start;
	gap: 50px;
}
.topDiv {
	width: 25%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
}
#copyright {
	width: 100%;
	margin-top: 15px;
	border-top: 1px solid var(--color4);
	display: flex;
	align-items: center;
	justify-content: center;
}
#left {
	width: 50%;
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: space-between;
}
#lefttop {
	width: 100%;
	height: auto;
	display: flex;
	flex-direction: row;
	align-items: center;
	justify-content: start;
}
#footerLogo {
	width: 10%;
	aspect-ratio: 1/1;
	margin-right: 10px;
}
#footerSchoolName {
	width: calc(90% - 10px);
	height: auto;
	display: flex;
	flex-direction: column;
	align-items: start;
	justify-content: center;
}
#chinese {
	width: 100%;
	font-size: 1.5rem;
	font-weight: bold;
}
.title {
	font-size: 1rem;
	font-weight: bold;
}
</style>

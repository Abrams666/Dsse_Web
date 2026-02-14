<template>
	<footer class="w-screen h-auto bg-[var(--color1)] text-[var(--color4)] p-8 pb-1 flex flex-col items-center justify-center">
		<div class="w-full h-auto flex flex-row items-stretch lg:justify-between justify-around">
			<div v-if="!isMobile" class="w-1/2 h-auto flex flex-col items-start justify-between">
				<div class="w-full h-auto flex flex-row items-center justify-left gap-3">
					<img class="w-[12%] aspect-square" src="/pageStructure/dsseLogo.png" alt="" />
					<div class="w-auto h-auto flex flex-col items-start justify-center">
						<p class="text-2xl font-bold">國立中央大學太空科學與工程學系</p>
						<p id="english">Department of Space Science and Engineering, NCU</p>
					</div>
				</div>
				<ul class="text-[0.9rem]">
					<li>地址:桃園市中壢區中大路300號</li>
					<li>Address: No. 300, Zhongda Rd., Zhongli District, Taoyuan City 32001, Taiwan</li>
					<li>TEL:+886-3-4227151 Ext.65750</li>
					<li>FAX:+886-3-4224394</li>
				</ul>
			</div>
			<div class="w-1/2 lg:w-1/5 h-auto flex flex-col items-start justify-start">
				<p class="font-bold text-[1.2rem] mb-2">Pages</p>
				<ul>
					<li v-for="(page, index) in pages" :key="index">
						<a :href="page.url"><i :class="page.icon"></i>{{ page.name }}</a>
					</li>
				</ul>
			</div>
			<div class="w-1/3 lg:w-1/6 h-auto flex flex-col items-start justify-start">
				<p class="font-bold text-[1.2rem] mb-2">Quick Links</p>
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
		<div class="w-full mt-4 border-t border-(--color4) flex items-center justify-center">
			<p class="text-sm">Copyright © 2026 Abrams. All rights reserved.</p>
		</div>
	</footer>
</template>

<script setup>
import pages from "~/assets/json/pages.json";

const isMobile = ref(false);

onMounted(() => {
	if (window.innerWidth <= 1024) {
		isMobile.value = true;
	} else {
		isMobile.value = false;
	}
});
</script>

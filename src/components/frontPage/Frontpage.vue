<template>
	<div class="undergroundColor">
		<div class="backgroundImage">
			<head-frontpage></head-frontpage>
			<theater-frontpage></theater-frontpage>
			<performance-frontpage></performance-frontpage>
		</div>
	</div>
</template>

<script>
import theaterFrontpage from './theaterFrontpage.vue'
import headFrontpage from './headFrontpage.vue'
import performanceFrontpage from './performanceFrontpage.vue'
export default {
	components: {
		theaterFrontpage,
		headFrontpage,
		performanceFrontpage,
	},
}
</script>

<style scoped>
.undergroundColor {
	background-color: #8ea045;
	min-height: 100vh;
	overflow-x: hidden;
	overflow-y: auto;
	/* 允许垂直滚动 */
}

/* 此部分有问题，需要修改 */
.backgroundImage {
	background: url('/src/assets/background/front-background.svg') no-repeat center center;
	background-size: cover;
	/* 图片自适应覆盖 */
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: start;
	position: relative;
	/* 确保内容正常定位 */
	z-index: 1;
	/* 确保在绿色背景上层 */
}
</style>

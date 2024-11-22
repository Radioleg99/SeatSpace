<script setup>
const handleBackClick = () => {
	console.log('Navigating back...')
	router.back()
}
</script>

<template>
	<button class="backButton" @click="handleBackClick">
		<img class="backIcon" src="../assets/icon/back.svg" alt="back" />
	</button>
</template>

<style scoped>
/* 返回按钮 */
.backButton {
	background: none;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	width: 35px;
	height: 35px;
	margin-right: 10px; /* 与搜索框的间距 */
	border-radius: 50%;
}

.backIcon {
	width: 100%;
	height: 100%;
}
</style>

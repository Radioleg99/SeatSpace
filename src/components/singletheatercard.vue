<template>
	<div class="singlecardtoTheater" @click="$emit('click')">
		<img :src="image" alt="theater image" class="theater-img" />
		<div class="theater-card">
			<div class="theater-info">
				<div class="color-icon"></div>
				<div class="theater-name">{{ name }}</div>
			</div>
			<div class="theater-description">{{ description }}</div>
		</div>
	</div>
</template>

<script setup>
const props = defineProps({
	image: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
		required: true,
	},
})
</script>

<style scoped>
.singlecardtoTheater {
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 20px;
	width: 360px;
	height: 240px;
	background: #ffffff;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.theater-img {
	display: flex;
	width: 100%;
	height: 142px;
	margin-bottom: 11px;
	border-top-left-radius: 20px;
	border-top-right-radius: 20px;
	object-fit: cover;
	margin: 0;
}

.theater-card {
	width: 100%;
	height: 96px;
	padding: 10px 16.5px;
	justify-content: flex-start;
}

.theater-info {
	display: flex;
	flex-direction: row;
	gap: 10px;
	margin-bottom: 10px;
	align-content: center;
}

.color-icon {
	border-radius: 50%;
	background-color: #9747ff;
	height: 22px;
	width: 22px;
	margin-left: 15px;
}

.theater-name {
	display: flex;
	align-items: center;
	font-family: Sora;
	font-size: 10px;
	font-weight: 700;
	line-height: 12.6px;
	text-underline-position: from-font;
	text-decoration-skip-ink: none;
}

.theater-description {
	display: flex;
	align-items: flex-start;
	/* 确保左对齐文本 */
	margin-left: 15px;
	font-size: 10px;
	font-family: Sora;
	color: #2f2f42;
	width: 290px;
	white-space: normal;
	overflow: hidden;
	/* 显示省略号 */
	text-overflow: ellipsis;
}
</style>

<template>
	<div class="singlecardtoShow" @click="$emit('click')">
		<img class="img-box" :src="image" alt="Theater Image" />
		<div class="rightBox">
			<div class="title">{{ name }}</div>
			<div class="contentBox">
				<div class="locationContent">
					<img class="locationIcon" src="../assets/icon/search-location.svg" alt="location" />
					<div class="location">{{ hall }}</div>
				</div>
				<div class="timeContent">
					<img class="timeIcon" src="../assets/icon/clock.svg" alt="time" />
					<div class="time">{{ time }}</div>
				</div>
				<div class="rankContent">
					<RatingStars :rating="rating" size="10" />
				</div>
			</div>
		</div>
	</div>
</template>

<script setup>
import RatingStars from './RatingStars.vue'

const props = defineProps({
	image: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	hall: {
		type: String,
		required: true,
	},
	time: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
		required: true,
	},
})
</script>

<style scoped>
/* .singlecardtoShow {
	display: flex;
	border: 1px solid #ccc;
	border-radius: 8px;
	overflow: hidden;
	margin: 20px;
	background-color: #fff;
} */

.singlecardtoShow {
	display: flex;
	flex-direction: row;
	border-radius: 20px;
	width: 360px;
	height: 200px;
	background: #fff;
	/* 白色背景带透明度 */
	border: 1px solid rgba(0, 0, 0, 0.1);
	/* 边框为淡灰色 */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	flex-shrink: 0;
	/* 可选：增加轻微阴影 */
}

.img-box {
	display: flex;
	margin-left: 12px;
	margin-top: 12px;
	width: 134px;
	height: 175px;
	border-radius: 7px;
	object-fit: cover;
	flex-shrink: 0;
}

.rightBox {
	position: relative;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	margin-left: 19px;
	margin-right: 11px;
	text-align: left;
}

.title {
	font-family: Helvetica;
	font-size: 20px;
	font-weight: 700;
	line-height: 22px;
	color: #333;
	margin-top: 36px;
	text-align: left;
}

.contentBox {
	position: absolute;
	display: flex;
	flex-direction: column;
	align-items: flex-start;
	bottom: 23px;
	gap: 7px;
}
.locationContent,
.timeContent {
	display: flex;
	align-items: center;
	color: black;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
	max-width: 150px;
}

.locationIcon,
.timeIcon {
	width: 10px;
	height: 10px;
	margin-right: 2px;
}

.location,
.time {
	font-family: Helvetica;
	font-size: 10px;
	font-weight: 400;
	line-height: 10px;
	color: black;
	white-space: nowrap;
	overflow: hidden;
	text-overflow: ellipsis;
}

.rankContent {
	font-size: 18px;
	color: #ff8800;
	margin-bottom: 10px;
}
</style>

<script setup></script>

<template>
	<div class="theater-info-page">
		<div class="background-color"></div>

		<!-- 新的父容器 -->
		<div class="top-layout">
			<!-- 背景图片和渐变叠加层 -->
			<img class="new-photo-background" src="../assets/data/Image.png" alt="Theater Image" />
			<div class="gradient-overlay"></div>
			<!-- 装饰图案 -->
			<img class="theater-info-decoration" src="../assets/decoration/theater-detail-decoration.svg" alt="Theater Info Decoration" />
			<img class="theaterinfo-top-decoration" src="../assets/decoration/theaterinfo-top-decoration.svg" alt="Theater Info Decoration" />
			<!-- 文本内容 -->
			<div class="theater-info-detail">
				<div class="theater-name">{{ theaterInfo.name }}</div>
				<div class="theater-address">{{ theaterInfo.address }}</div>
			</div>
		</div>

		<div class="decoration-theater"></div>
		<div class="show-list-layout">
			<singleshowcard
				v-for="show in showList"
				:key="show.showId"
				:image="show.imgUrl"
				:name="show.showName"
				:hall="show.hall"
				:time="show.startTime"
				:rating="show.rating"
				@click="goToShowDetail(show.showId)"
			/>
		</div>
	</div>
</template>

<style scoped>
.theater-info-page {
	position: relative; /* 创建层叠上下文 */
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;
}

.background-color {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #8ea045;
	z-index: -4; /* 最底层 */
}

.top-layout {
	position: relative; /* 创建新的层叠上下文 */
	width: 100%;
	height: 200px; /* 根据需要调整 */
	border: 1px solid #000000;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.new-photo-background {
	width: 100%;
	height: 100%;
	opacity: 68%;
	z-index: 1; /* 图片层 */
	object-fit: cover;
}

.gradient-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(91, 102, 44, 0.64) 64%, #8ea045 100%);
	z-index: 2; /* 渐变层 */
}

.theater-info-decoration {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 3; /* 装饰层 */
}
.theaterinfo-top-decoration {
	position: absolute;
	top: 150px;
	right: -31px;
	z-index: 3; /* 装饰层 */
}

.theater-info-detail {
	position: absolute;
	bottom: 40px;
	left: 50%;
	transform: translateX(-50%);
	z-index: 3;
	text-align: center;
	color: #ffffff;
}

.theater-name {
	font-family: Helvetica;
	font-size: 32px;
	font-weight: 700;
	line-height: 1.2;
}

.theater-address {
	font-family: Helvetica;
	font-size: 16px;
	font-weight: 400;
	line-height: 1.2;
}

/* 根据需要调整其他元素的样式 */
.decoration-theater {
	/* ... */
}

.show-list-layout {
	display: flex;
	flex-wrap: nowrap;
	overflow-y: scroll;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	margin-top: 10px;
	gap: 22px;
	scrollbar-width: none;
	z-index: 4;
}
</style>

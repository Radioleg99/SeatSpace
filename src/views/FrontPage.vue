<script setup>

import { ref, onMounted } from 'vue'
import axiosInstance from '../services/axios'
import { useRoute, useRouter } from 'vue-router'

import singletheaterCard from '../components/singletheaterCard.vue'

// this is for using push to navigate
const longitude = ref(0)
const latitude = ref(0)
const route = useRoute()
const router = useRouter()
const theaterList = ref([])
const router = useRouter()
const performanceList = ref([])

const getLocation = async () => {
	return new Promise((resolve, reject) => {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				(position) => {
					console.log('Latitude:', position.coords.latitude)
					console.log('Longitude:', position.coords.longitude)
					longitude.value = position.coords.longitude
					latitude.value = position.coords.latitude
					resolve()
				},
				(error) => {
					console.error('Error getting location:', error)
					reject(error)
				}
			)
		} else {
			console.error('Geolocation is not supported by this browser.')
			reject(new Error('Geolocation is not supported by this browser.'))
		}
	})
}

const getTheaterList = async () => {
	try {
		await getLocation()
		const response = await axiosInstance.get('/theater/nearby', {
			params: {
				longitude: longitude.value,
				latitude: latitude.value,
			},
		})
		theaterList.value = response.data
		console.log('theaterList:', theaterList.value)
	} catch (error) {
		console.error('Error fetching theater list:', error)
	}
}

const handleSearchClick = () => {
	router.push('/search')
}

const goToTheaterDetail = (theaterId) => {
	router.push('/theater/' + theaterId) // Pass the theater ID
}

onMounted(async () => {
	console.log('Page mounted, fetching data...')
	await getTheaterList() // 自动获取数据
})
</script>

<template>
	<div class="frontpage-layout">
		<div class="head-Layout">
			<div class="title">SeatSpace</div>
			<button class="search-Button" @click="handleSearchClick">
				<img class="search-Icon" src="../../assets/icon/search.svg" alt="search" />
			</button>
		</div>
		<div class="theater-container">
			<div class="theater-name-container">
				<img class="decoration" src="../../assets/decor/Vector-PF.svg" alt="decoration" />
				<div class="theater-title">Theater</div>
			</div>
			<!-- <div class="multitheater-container">
			<div v-for="theater in theaterList" :key="theater.id" class="theater-item" @click="goToTheaterDetail(theater.id)">
				<img :src="theater.image" alt="theater image" class="theater-img" />
				<div class="theater-card">
					<div class="theater-info">
						<div class="color-icon"></div>
						<div class="theater-name">{{ theater.name }}</div>
					</div>
					<div class="theater-description">{{ theater.description }}</div>
				</div>
			</div>
		</div>
	</div> -->
			<div class="multitheater-container">
				<!-- 使用 singletheaterCard 动态渲染剧院列表 -->
				<singletheaterCard v-for="theater in theaterList" :key="theater.id" :image="theater.imgUrl" :name="theater.name" :description="theater.description" @click="goToTheaterDetail(theater.id)" />
			</div>
		</div>
		<!-- 此处有问题需要改善 -->
		<div class="performanceLayout">
			<div class="performance-title">Performance</div>
			<div class="performance-container">
				<div class="multiperformance-container">
					<div v-for="performance in performanceList" :key="performance.id" class="performance-item" @click="goToTheaterDetail(theater.id)">
						<img :src="theater.image" alt="performance image" class="performance-img" />
						<div class="performance-info">
							<div class="performance-name">{{ performancename }}</div>
							<div class="location-info">
								<img class="location-icon" alt="" src="../../assets/icon/location_on.svg" />
								<div class="location-name">{{ locationname }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<img class="decoration" src="../../assets/decor/Vector (Stroke).svg" alt="" />
	</div>
</template>

<style scoped>
/* headlayout */
.frontpage-layout {
	display: flex;
	flex-direction: column;
	height: 100vh; /* 占满视窗高度 */
	overflow: hidden; /* 禁止页面滚动 */
}

.head-Layout {
	display: flex;
	justify-content: space-between;
	align-items: flex-start; /* 子元素顶部对齐 */
	padding-top: 20px; /* 调整这个值以控制向下偏移的程度 */
	box-shadow: 0px 16px 32px -4px rgba(12, 12, 13, 0.1), 0px 4px 4px -4px rgba(12, 12, 13, 0.05);
	background: linear-gradient(180deg, #e2f2a2, #e2f2a7 0.01%, #e9ebea 59%);
	z-index: 10;
}
.title {
	margin: 0; /* 移除外边距，防止垂直方向的偏移 */
	font-size: 24px;
	line-height: 1.5;
	font-family: jsMath-cmbx10;
	color: #480b91;
}
.search-Button {
	background: none;
	border: none;
	cursor: pointer;
}
.search-Icon {
	width: 36px;
	height: 36px;
}

/* theater-container */
.theater-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}

.theater-name-container {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.decoration {
	margin-top: 40px;
	width: 54px;
	height: 54px;
	margin-left: auto;
	/* 水平居中 */
	margin-right: auto;
	/* 水平居中 */
}
.theater-title {
	font-size: 24px;
	font-family: jsMath-cmbx10;
	color: #012a34;
	text-align: center;
}

.multitheater-container {
	display: flex;
	flex-direction: row;
	gap: 21px;
	width: 100vw;
	overflow-x: auto;
	scrollbar-width: none; /* Firefox */
}
.multitheater-container::-webkit-scrollbar {
	display: none; /* Safari and Chrome */
}
.theater-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	width: 325px;
	height: 238px;
	background-color: rgba(255, 255, 255, 0.8);
	/* 白色背景带透明度 */
	border: 1px solid rgba(0, 0, 0, 0.1);
	/* 边框为淡灰色 */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	/* 可选：增加轻微阴影 */
	margin-left: 16px;
}
.theater-img {
	width: 325px;
	height: 142px;
	margin-bottom: 11px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
}
.theater-card {
	display: flex;
	flex-direction: column;
}
.theater-info {
	display: flex;
	flex-direction: row;
	gap: 8.25px;
	margin-bottom: 10px;
}
.color-icon {
	border-radius: 50%;
	background-color: #9747ff;
	height: 22px;
	width: 22px;
	margin-left: 10px;
}
.theater-name {
	font-size: 10px;
	font-family: Sora;
	color: #2f2f42;
}
.theater-description {
	margin-left: 10px;
	font-size: 10px;
	font-family: Sora;
	color: #2f2f42;
}

/* performance-container */
.performanceLayout {
	display: flex;
	flex-direction: column;
	background-color: beige;
}

.performance-title {
	margin-top: 30px;
	margin-bottom: 40px;
	font-size: 24px;
	line-height: 14px;
	font-family: 'JSMath-cmbx10', sans-serif;
	color: #380970;
	text-align: center;
}

.MultiplecardLayout {
	margin-bottom: 10px;
}

.decoration {
	overflow: hidden;
	width: 54px;
	height: 54px;
	display: block;
	margin-left: auto;
	margin-right: auto;
}
.performance-item {
	display: flex;
	flex-direction: column;
	align-items: center;
	flex: 1;
}
.performance-img {
	width: 95px;
	height: 139px;
	margin-bottom: 5px;
	border-radius: 10px;
}
.performance-info {
	display: flex;
	flex-direction: column;
	align-items: center;
}
.performance-name {
	text-align: center;
	font-size: 13px;
	line-height: 14px;
	font-family: Helvetica;
}
.location-info {
	display: flex;
}
.location-icon {
	width: 8px;
	height: 8px;
}
.location-name {
	font-size: 8px;
	line-height: 14px;
	font-family: Helvetica;
	color: #505e2c;
}
</style>

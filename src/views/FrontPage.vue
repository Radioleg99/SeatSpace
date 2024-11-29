<script setup>
import { ref, onMounted } from 'vue'
import axiosInstance from '../services/axios'
import { useRoute, useRouter } from 'vue-router'

// this is for using push to navigate
const longitude = ref(0)
const latitude = ref(0)
const route = useRoute()
const router = useRouter()
const theaterList = ref([])
const showList = ref([])

// const getLocation = async () => {
// 	return new Promise((resolve, reject) => {
// 		if (navigator.geolocation) {
// 			navigator.geolocation.getCurrentPosition(
// 				(position) => {
// 					console.log('Latitude:', position.coords.latitude)
// 					console.log('Longitude:', position.coords.longitude)
// 					longitude.value = position.coords.longitude
// 					latitude.value = position.coords.latitude
// 					resolve()
// 				},
// 				(error) => {
// 					console.error('Error getting location:', error)
// 					reject(error)
// 				}
// 			)
// 		} else {
// 			console.error('Geolocation is not supported by this browser.')
// 			reject(new Error('Geolocation is not supported by this browser.'))
// 		}
// 	})
// }
const getLocation = async () => {
	try {
		const response = await fetch('https://ipinfo.io/json?token=5664e0eedfcb9a')
		const data = await response.json()
		if (data && data.loc) {
			const [latitude, longitude] = data.loc.split(',')
			console.log('IP Based Location:', latitude, longitude)
		} else {
			console.error('No location data received from the server.')
		}
	} catch (error) {
		console.error('Error fetching location:', error)
		return null
	}
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
const getShowList = async () => {
	try {
		await getTheaterList()
		const response = await axiosInstance.get('/show/recent', {
			params: {
				page: 1,
			},
		})
		showList.value = response.data
		console.log('showList:', showList.value)
	} catch (error) {
		console.error('Error fetching show list:', error)
	}
}
const handleSearchClick = () => {
	router.push('/search')
}
const goToTheaterDetail = (theaterId) => {
	router.push('/theater/' + theaterId) // Pass the theater ID
}

const goToShowDetail = (showId) => {
	router.push('/show/' + showId) // Pass the show ID
}
onMounted(async () => {
	console.log('Page mounted, fetching data...')
	await getTheaterList() // 自动获取数据
	await getShowList()
})
</script>

<template>
	<div class="frontpage-layout">
		<div class="fpbackground-color"></div>
		<img class="fpbackground-img" src="../assets/frontpage-background.svg" alt="background" />
		<div class="head-Layout">
			<div class="title">SeatSpace</div>
			<button class="search-Button" @click="handleSearchClick">
				<img class="search-Icon" src="../assets/icon/search.svg" alt="search" />
			</button>
		</div>
		<div class="theater-container">
			<div class="theater-name-container">
				<img class="decoration-theatertop" src="../assets/decoration/theater-decoration.svg" alt="decoration" />
				<div class="theater-title">Theater</div>
			</div>
			<div class="multitheater-container">
				<div v-for="theater in theaterList" :key="theater.id" class="theater-item" @click="goToTheaterDetail(theater.id)">
					<img :src="theater.imgUrl" alt="theater image" class="theater-img" />
					<div class="theater-card">
						<div class="theater-info">
							<div class="color-icon"></div>
							<div class="theater-name">{{ theater.name }}</div>
						</div>
						<div class="theater-description">{{ theater.description }}</div>
					</div>
				</div>
			</div>
		</div>

		<!-- <div class="multitheater-container">
				<singletheaterCard v-for="theater in theaterList" :key="theater.id" :image="theater.imgUrl" :name="theater.name" :description="theater.description" @click="goToTheaterDetail(theater.id)" />
			</div> -->
		<!-- <img class="decoration-showtop" src="../assets/decoration/showtop-decoration.svg" alt="decoration-theater" /> -->

		<!-- 此处有问题需要改善 -->
		<div class="showLayout">
			<img class="decoration-showtop" src="../assets/decoration/showtop-decoration.svg" alt="decoration-theater" />
			<div class="show-title">Performance</div>
			<div class="multishow-container">
				<div class="show-container">
					<div v-for="(show, index) in showList" :key="show.id">
						<div v-show="index % 2 === 1" class="show-item" @click="goToShowDetail(show.id)">
							<img :src="show.imgUrl" alt="show image" class="show-img" />
							<div class="show-name">{{ show.name }}</div>
							<div class="show-info">
								<img class="location-icon" alt="" src="../assets/icon/location_on.svg" />
								<div class="show-theater-name">{{ show.theater }}</div>
							</div>
						</div>
					</div>
				</div>
				<div class="show-container">
					<div v-for="(show, index) in showList" :key="show.id">
						<div v-show="index % 2 === 0" class="show-item" @click="goToShowDetail(show.id)">
							<img :src="show.imgUrl" alt="show image" class="show-img" />
							<div class="show-name">{{ show.name }}</div>
							<div class="show-info">
								<img class="location-icon" alt="" src="../assets/icon/location_on.svg" />
								<div class="show-theater-name">{{ show.theater }}</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<img class="decoration" src="../assets/decoration/showbotton-decoration.svg" alt="" />
		</div>
	</div>
</template>

<style scoped>
/* headlayout */
@import url('https://fonts.googleapis.com/css2?family=Sora:wght@100..800&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Roboto+Slab:wght@700&display=swap');

.frontpage-layout {
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow-x: hidden;
	/* 禁止页面滚动 */
	overflow-y: scroll;
}

.fpbackground-color {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #8ea045;
	z-index: -2;
}

.fpbackground-img {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	object-fit: cover;
	z-index: -1;
}

.head-Layout {
	display: flex;
	justify-content: space-between;
	align-items: flex-start;
	/* 子元素顶部对齐 */
	padding-top: 43px;
	/* 调整这个值以控制向下偏移的程度 */
	padding-bottom: 15px;
	padding-left: 20px;
	padding-right: 20px;
	box-shadow: 0px 16px 32px -4px rgba(12, 12, 13, 0.1), 0px 4px 4px -4px rgba(12, 12, 13, 0.05);
	background: linear-gradient(180deg, #e2f2a2, #e2f2a7 0.01%, #e9ebea 59%);
	z-index: 10;
}

.title {
	margin: 0;
	/* 移除外边距，防止垂直方向的偏移 */
	font-size: 24px;
	line-height: 1.5;
	font-family: 'Roboto Slab', serif;
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

.decoration-theatertop {
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
	font-family: 'Roboto Slab', serif;
	color: #012a34;
	text-align: center;
}

.multitheater-container {
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	overflow-y: hidden;
	flex-direction: row;
	gap: 21px;
	width: 100%;
	scrollbar-width: none;
	/* Firefox */
	margin-top: 10px;
	margin-bottom: 50px;
}

.multitheater-container::-webkit-scrollbar {
	display: none;
	/* Safari and Chrome */
}

/* decoration-theater */
.decoration-showtop {
	margin-top: -10px;
	width: 105px;
	height: 38px;
	margin-left: auto;
	/* 水平居中 */
	margin-right: auto;
	/* 水平居中 */
}

.theater-item {
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	border-radius: 10px;
	width: 325px;
	height: 238px;
	background: linear-gradient(360deg, #ffffff 0%, #e9ebea 100%);
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	/* 可选：增加轻微阴影 */
	margin-left: 16px;
}

.theater-img {
	width: 100%;
	height: 142px;
	border-top-left-radius: 10px;
	border-top-right-radius: 10px;
	object-fit: cover;
}

.theater-card {
	width: 100%;
	height: 96px;
	margin-top: 11px;
	margin-left: 16.5px;
	justify-content: flex-start;
}

.theater-info {
	display: flex;
	flex-direction: row;
	gap: 8.25px;
	margin-bottom: 10px;
	align-content: center;
}

.color-icon {
	border-radius: 50%;
	background-color: #9747ff;
	height: 22px;
	width: 22px;
	margin-left: 10px;
}

.theater-name {
	display: flex;
	align-items: center;
	font-family: Sora;
	color: #2f2f42;
	font-size: 10px;
	font-weight: 700;
	line-height: 12.6px;
	text-underline-position: from-font;
	text-decoration-skip-ink: none;
}

.theater-description {
	display: -webkit-box;
	-webkit-line-clamp: 3;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-overflow: ellipsis;
	line-height: 10.08px;
	font-size: 8px;
	font-family: Sora;
	color: #666666;
	max-height: 45px;
	max-width: 288px;
	margin-left: 10px;
	text-align: left;
}

/* show-container */
.showLayout {
	display: flex;
	flex-direction: column;
	background: linear-gradient(180deg, #e9ebea 27.3%, #e7ecda 65.34%);
	height: 1000px;
}

.show-title {
	margin-top: 30px;
	margin-bottom: 40px;
	font-size: 24px;
	line-height: 14px;
	font-family: 'Roboto Slab', serif;
	color: #380970;
	text-align: center;
}

/* show-item */

.multishow-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 20px;
}

.show-container {
	display: flex;
	flex-wrap: nowrap;
	overflow-x: auto;
	flex-direction: row;
	width: 100%;
	scrollbar-width: none;
	/* Firefox */
}

.show-container::-webkit-scrollbar {
	display: none;
	/* Safari and Chrome */
}

.show-item {
	margin-left: 26px;
	flex-shrink: 0;
	display: flex;
	flex-direction: column;
	align-items: center;
	width: 95px;
	height: 173px;
}

.show-img {
	width: 100%;
	height: 139px;
	margin-bottom: 5px;
	border-radius: 10px;
	object-fit: cover;
	flex-shrink: 0;
}

.show-name {
	display: -webkit-box;
	-webkit-line-clamp: 1;
	-webkit-box-orient: vertical;
	overflow: hidden;
	text-align: center;
	text-overflow: ellipsis;
	font-size: 13px;
	line-height: 14px;
	font-family: Helvetica;
	color: #444444;
}

.show-info {
	display: flex;
	flex-direction: row;
	align-items: center;
}

.location-icon {
	width: 8px;
	height: 8px;
}

.show-theater-name {
	display: flex;
	align-items: center;
	font-size: 8px;
	line-height: 14px;
	font-family: Helvetica;
	color: #505e2c;
}

.decoration {
	width: 54px;
	height: 54px;
	display: block;
	margin-top: 15px;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 60px;
}
</style>

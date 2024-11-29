<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '../services/axios'
import singleshowcard from '../components/singleShowcard.vue'
import backButton from '../components/BackButton.vue'

const route = useRoute()
const router = useRouter()
const theaterInfo = ref({})
const showList = ref([])
const page = ref(1)
const isLoading = ref(false)
const isEnd = ref(false)
const containerRef = ref(null)
const MIN_LOADING_TIME = 3000

const getTheaterInfo = async () => {
	try {
		const theaterId = route.params.id
		const response = await axiosInstance.get(`/theater/basic/${theaterId}`)
		theaterInfo.value = response.data || {}
	} catch (error) {
		console.error('Error fetching theater info:', error)
	}
}

const loadShowList = async () => {
	if (isLoading.value || isEnd.value) return
	isLoading.value = true
	const theaterId = route.params.id
	// 创建一个最小加载时间的 Promise
	const minLoadingPromise = new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME))
	try {
		// 发送网络请求获取演出列表
		const response = await axiosInstance.get(`/theater/shows/${theaterId}`, {
			params: {
				page: page.value,
			},
		})
		console.log('Loading page:', page.value)
		const newShows = response.data || []
		if (newShows.length > 0) {
			showList.value = [...showList.value, ...newShows]
			page.value++
		} else {
			isEnd.value = true
		}
	} catch (error) {
		console.error('Error fetching show list:', error)
	} finally {
		// 等待最小加载时间的 Promise 完成
		await minLoadingPromise
		isLoading.value = false
	}
}

const handleScroll = () => {
	const container = containerRef.value
	if (!container || isLoading.value || isEnd.value) return
	if (container.scrollTop + container.clientHeight >= container.scrollHeight - 10) {
		loadShowList()
	}
}

const goToShowDetail = (showId) => {
	router.push({ name: 'show', params: { id: showId } }) // Pass the show ID
}

onMounted(() => {
	getTheaterInfo()
	loadShowList()
})
</script>

<template>
	<div class="theater-info-page">
		<div class="background-color"></div>
		<!-- 新的父容器 -->
		<div class="top-layout">
			<!-- 背景图片和渐变叠加层 -->
			<backButton />
			<img class="new-photo-background" :src="theaterInfo.imgUrl" alt="Theater Image" />
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
		<div class="show-list-layout" ref="containerRef" @scroll="handleScroll">
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
			<div v-if="isLoading && !isEnd" class="loading-indicator">
				<img src="../assets/icon/refresh.svg" alt="Loading..." class="rotating-icon" />
			</div>
			<div v-if="isEnd" class="end-indicator">No more results</div>
		</div>
	</div>
</template>

<style scoped>
.theater-info-page {
	position: relative;
	/* 创建层叠上下文 */
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
	z-index: -4;
	/* 最底层 */
}

.top-layout {
	position: relative;
	flex-shrink: 0;
	/* 创建新的层叠上下文 */
	width: 100%;
	height: 200px;
	/* 根据需要调整 */
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.new-photo-background {
	position: absolute;
	width: 100%;
	height: 100%;
	opacity: 68%;
	z-index: 1;
	/* 图片层 */
	object-fit: cover;
}

.gradient-overlay {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(180deg, rgba(0, 0, 0, 0) 0%, rgba(91, 102, 44, 0.64) 64%, #8ea045 100%);
	z-index: 2;
	/* 渐变层 */
}

.theater-info-decoration {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 3;
	/* 装饰层 */
}

.theaterinfo-top-decoration {
	position: absolute;
	top: 150px;
	right: -31px;
	z-index: 3;
	/* 装饰层 */
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

.rotating-icon {
	width: 20px;
	/* 根据需要调整图标大小 */
	height: 20px;
	animation: rotate 1s linear infinite;
}

.end-indicator {
	margin-top: 2px;
	color: white;
	font-size: 20px;
}
</style>
<style>
@keyframes rotate {
	from {
		transform: rotate(0deg);
	}

	to {
		transform: rotate(360deg);
	}
}
</style>

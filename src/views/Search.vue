<script setup>
import { ref, onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../services/axios'
import singletheaterCard from '../components/singletheaterCard.vue'
import singleshowCard from '../components/singleShowcard.vue'
import backButton from '../components/BackButton.vue'

const router = useRouter()
const searchQuery = ref('') // Bound to the search input
const resultList = ref([])
const hasSearched = ref(false)
const showNoResult = ref(false)
const page = ref(1) // 当前页码
const isLoading = ref(false) // 加载状态
const isEnd = ref(false) // 是否到达末尾
const containerRef = ref(null) // 引用滚动容器
const MIN_LOADING_TIME = 3000 // 最小加载时间

// Helper function to check network status
const checkConnection = () => {
	if (!navigator.onLine) {
		console.warn('Network connection lost. Please check your internet connection.')
		return false
	}
	return true
}
const resetSearchState = () => {
	hasSearched.value = false
	showNoResult.value = false
	resultList.value = []
	page.value = 1
	isLoading.value = false
	isEnd.value = false
}
const fetchSearchResults = async (query, pageNumber) => {
	try {
		const response = await axiosInstance.get('/search', {
			params: {
				search_content: query,
				page: pageNumber,
			},
		})
		return response.data || []
	} catch (error) {
		return []
	}
}
const processSearchResults = (newSearchResults) => {
	if (newSearchResults.length > 0) {
		resultList.value = [...resultList.value, ...newSearchResults]
		page.value++
	} else {
		isEnd.value = true
	}
	showNoResult.value = resultList.value.length === 0
	if (showNoResult.value) {
		console.warn('未找到与查询相关的结果。')
	}
}
// 执行搜索的函数
const performSearch = async () => {
	const query = searchQuery.value.trim()
	if (!query) {
		resetSearchState()
		return
	}

	// 检查网络连接
	if (!checkConnection()) {
		console.error('NO NET')
		showNoResult.value = true
		return
	}

	hasSearched.value = true

	// 如果正在加载或已到达末尾，直接返回
	if (isLoading.value || isEnd.value) return

	isLoading.value = true
	const minLoadingPromise = new Promise((resolve) => setTimeout(resolve, MIN_LOADING_TIME))

	try {
		console.log('Search', query)
		const newSearchResults = await fetchSearchResults(query, page.value)
		processSearchResults(newSearchResults)
	} catch (err) {
		if (page.value === 1) resultList.value = []
		showNoResult.value = true
	} finally {
		await minLoadingPromise
		isLoading.value = false
	}
}

// 处理滚动事件的函数
const handleScroll = () => {
	const container = containerRef.value
	if (!container || isLoading.value || isEnd.value) return

	const nearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 10

	if (nearBottom) {
		console.log('Near bottom. Loading more search results.')
		performSearch()
	}
}

const startSearch = () => {
	resetSearchState()
	performSearch()
}

const goToTheaterDetail = (theaterId) => {
	router.push({ name: 'theater', params: { id: theaterId } })
}
const goToShowDetail = (showId) => {
	router.push({ name: 'show', params: { id: showId } })
}

// Debugging on mounted
onMounted(() => {
	console.log('Search page mounted.')
})
</script>

<template>
	<div class="searchpage-layout">
		<div class="searchbackground-color"></div>
		<img class="search-decoration" src="../assets/decoration/search-decoration.svg" alt="search-decoration" />
		<img class="search-bottom-decoration" src="../assets/decoration/search-bottom-decoration.svg" alt="search-bottom-decoration" />
		<!-- 顶部布局 -->
		<!-- 返回按钮 -->
		<backButton></backButton>
		<!-- 搜索框 -->
		<div class="searchBox">
			<input v-model.lazy="searchQuery" class="searchboxDescription" placeholder="theater name, show name, etc." @keyup.enter="startSearch" />
			<button class="searchButton" @click="startSearch">
				<img class="searchIcon" src="../assets/icon/search.svg" alt="search" />
			</button>
		</div>

		<!-- 搜索结果显示 -->
		<div v-if="hasSearched">
			<div v-if="showNoResult" class="no-result">No result found</div>
			<div v-else class="search-results" ref="containerRef" @scroll="handleScroll">
				<div v-for="(result, index) in resultList" :key="result.data.theaterId || result.data.showId || index">
					<div v-if="result.itemType === 'theater'">
						<singletheaterCard :image="result.data.imgUrl" :name="result.data.name" :description="result.data.description" @click="goToTheaterDetail(result.data.theaterId)" />
					</div>
					<div v-else-if="result.itemType === 'show'">
						<singleshowCard
							:image="result.data.imgUrl"
							:name="result.data.showName"
							:time="result.data.startTime"
							:hall="result.data.hall"
							:rating="result.data.rating"
							@click="goToShowDetail(result.data.showId)"
						/>
					</div>
				</div>
				<div v-if="isLoading && !isEnd">
					<img src="../assets/icon/refresh.svg" alt="Loading..." class="rotating-icon" />
				</div>
				<div v-if="isEnd" class="end-indicator">No more results</div>
			</div>
		</div>
		<div class="decoration"></div>
	</div>
</template>

<style scoped>
.searchpage-layout {
	display: flex;
	flex-direction: column;
	height: 100vh;
	overflow: hidden;
}

/* 背景装饰 */
.searchbackground-color {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: linear-gradient(355.93deg, #e2f2a2 -64.4%, #b5c670 24.26%, #8ea045 101.31%);
	z-index: -2;
}

.search-decoration {
	position: absolute;
	top: 266px;
	left: 50%;
	transform: translate(-50%, 0);
	height: 288px;
	width: 288px;
	z-index: -1;
}

.search-bottom-decoration {
	position: fixed;
	/* 固定位置，始终在视口内 */
	bottom: 0;
	/* 紧贴页面底部 */
	right: 0;
	/* 紧贴页面右侧 */
	z-index: -1;
	/* 确保在其他元素之上 */
}

.searchBox {
	margin-top: 33px;
	margin-left: 75px;
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 292px;
	height: 50px;
	border-radius: 32px;
	background-color: #e9ebea;
	/* 默认背景颜色 */
	border: 0.5px solid transparent;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
	transition: background-color 0.3s, border-color 0.3s;
	/* 添加平滑过渡效果 */
}

/* 输入框样式 */
.searchboxDescription {
	width: 100%;
	border: none;
	/* 移除输入框自带边框 */
	outline: none;
	/* 移除聚焦时默认的外边框 */
	background-color: transparent;
	/* 背景透明，与父容器一致 */
	font-family: 'InputFont', sans-serif;
	font-size: 16px;
	color: #333;
	padding: 0 20px;
	/* 左右内边距 */
	word-wrap: break-word;
	/* 长单词自动换行 */
	word-break: break-word;
	/* 超过宽度强制换行 */
	white-space: normal;
	/* 允许换行 */
}

/* Placeholder 样式 */
.searchboxDescription::placeholder {
	font-family: 'PlaceholderFont', sans-serif;
	/* Placeholder 字体 */
	color: #aaa;
	font-style: italic;
}

/* 聚焦时的样式：容器和输入框统一变化 */
.searchBox:focus-within {
	background-color: #fff;
	/* 聚焦时背景颜色 */
	border-color: #0078ff;
	/* 聚焦时边框颜色 */
	box-shadow: 0 0 5px rgba(0, 120, 255, 0.5);
	/* 可选的阴影效果 */
}

.searchButton {
	background: none;
	border: none;
	display: flex;
	align-items: center;
	justify-content: center;
	padding: 5px;
}

.searchIcon {
	width: 24px;
	height: 24px;
}

.search-results-container {
	flex: 1;
	overflow-y: auto;
	position: relative;
	margin-top: 20px;
}

/* “no result found” 文本 */
.no-result {
	font-size: 20px;
	font-weight: 700;
	line-height: 14px;
	font-family: Arial, Helvetica, sans-serif;
	color: #e9ebea;
	position: absolute;
	/* 使用绝对定位 */
	top: 400px;
	/* 垂直方向居中 */
	left: 50%;
	/* 水平方向居中 */
	transform: translate(-50%, 0);
	/* 将元素的中心点与父容器中心点对齐 */
	text-align: center;
	/* 文本居中对齐 */
	font-family: Helvetica;
}

/* 搜索结果样式 */
.search-results {
	display: flex;
	flex-wrap: nowrap;
	overflow-y: scroll;
	overflow-x: hidden;
	flex-direction: column;
	justify-content: flex-start;
	align-items: center;
	gap: 18px;
	margin-top: 25px;
	max-height: 87vh;
	scrollbar-width: none;
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
	margin-bottom: 20px;
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

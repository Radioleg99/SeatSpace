<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../services/axios'
import singletheaterCard from '../components/singletheaterCard.vue'
import singleshowCard from '../components/singleshowcard.vue'

const router = useRouter()
const searchQuery = ref('') // Bound to the search input
const resultList = ref([])
const hasSearched = ref(false)
const showNoResult = ref(false)

// Helper function to check network status
const checkConnection = () => {
	if (!navigator.onLine) {
		console.warn('Network connection lost. Please check your internet connection.')
		return false
	}
	return true
}

// 搜索功能
const performSearch = async () => {
	const query = searchQuery.value.trim()
	if (!query) {
		// 如果搜索内容为空，则不进行搜索
		console.log('Search query is empty. Resetting search results.')
		hasSearched.value = false
		resultList.value = []
		showNoResult.value = false
		return
	}

	// Check for internet connection before making the request
	if (!checkConnection()) {
		console.error('Not connected to the internet. Cannot perform search.')
		showNoResult.value = true
		return
	}

	hasSearched.value = true
	try {
		console.log('Performing search with query:', query)
		const response = await axiosInstance.get('/search', {
			params: {
				search_content: query,
				page: 1,
			},
		})
		// 切分数据的方式取决于服务器返回的数据结构
		resultList.value = response.data
		console.log('Search results:', response.data)

		// Check if both lists are empty
		showNoResult.value = resultList.value.length === 0 && resultList.value.length === 0
		if (showNoResult.value) {
			console.warn('No results found for the query:', query)
		}
	} catch (err) {
		console.error('Search failed:', err.message)
		resultList.value = [] // 清空搜索结果
		hasSearched.value = true
		showNoResult.value = true // 如果出错，显示“无结果”
	}
}

// Handle back navigation
const handleBackClick = () => {
	console.log('Navigating back...')
	router.back()
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
		<img class="search-bottom-decoration" src="../assets/decoration/search-bottom-decoration.svg"
			alt="search-bottom-decoration" />
		<!-- 顶部布局 -->
		<div class="search-toplayout">
			<!-- 返回按钮 -->
			<button class="backButton" @click="handleBackClick">
				<img class="backIcon" src="../assets/icon/back.svg" alt="back" />
			</button>
			<!-- 搜索框 -->
			<div class="searchBox">
				<input v-model.lazy="searchQuery" class="searchboxDescription" placeholder="theater name, show name, etc."
					@keyup.enter="performSearch" />
				<button class="searchButton" @click="performSearch">
					<img class="searchIcon" src="../assets/icon/search.svg" alt="search" />
				</button>
			</div>
		</div>

		<!-- 搜索结果显示 -->
		<div v-if="hasSearched">
			<div v-if="showNoResult" class="no-result">No result found</div>
			<div v-else class="search-results">
				<div v-for="(result, index) in resultList" :key="result.data.theaterId || result.data.showId || index">
					<div v-if="result.itemType === 'theater'">
						<singletheaterCard :image="result.data.imgUrl" :name="result.data.name"
							:description="result.data.description" @click="goToTheaterDetail(result.data.theaterId)" />
					</div>
					<div v-else-if="result.itemType === 'show'">
						<singleshowCard :image="result.data.imgUrl" :name="result.data.showName" :time="result.data.startTime"
							:hall="result.data.hall" :rating="result.data.rating" @click="goToShowDetail(result.data.showId)" />
					</div>
				</div>
			</div>
		</div>
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

/* 顶部布局 */
.search-toplayout {
	margin-top: 40px;
	display: flex;
	justify-content: space-between;
	align-items: center;
	z-index: 10;
	padding: 0 20px;
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

/* 返回按钮 */
.backButton {
	background: none;
	border: none;
	display: flex;
	width: 35px;
	height: 35px;
	margin-right: 10px;
	/* 与搜索框的间距 */
	align-items: center;
	justify-content: center;
	padding: 0;
	/* Remove any default padding */
}

.backIcon {
	width: 100%;
	height: 100%;
	object-fit: cover;
	/* Ensure the icon fills the space */
}

/* 搜索框 */

/* 默认的搜索框容器样式 */
.searchBox {
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
	overflow-y: auto;
	flex-direction: column;
	justify-content: flex-start;
	/* Align items to the top (default for column direction) */
	align-items: center;
	/* Center items horizontally */
	gap: 18px;
	/* Gap between items in the vertical direction */
	margin-top: 25px;
	/* Space above the entire container */
	scrollbar-width: none;
	/* Firefox */
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
	/* 根据需要调整移动端样式 */
}
</style>

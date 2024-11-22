<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import axiosInstance from '../services/axios'
import singletheaterCard from '../components/singletheaterCard.vue'
import singleshowCard from '../components/singleshowcard.vue'

const router = useRouter()
const searchQuery = ref('') // Bound to the search input
const theaterList = ref([])
const showList = ref([])
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
		theaterList.value = []
		showList.value = []
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
		const response = await axiosInstance.get('/theater/search', {
			params: {
				query: searchQuery.value, // 将搜索内容传递给服务器
			},
		})
		// 切分数据的方式取决于服务器返回的数据结构
		theaterList.value = response.data.theaterInfo || []
		showList.value = response.data.showList || []
		console.log('Search results:', { theaterList: theaterList.value, showList: showList.value })

		// Check if both lists are empty
		showNoResult.value = theaterList.value.length === 0 && showList.value.length === 0

		if (showNoResult.value) {
			console.warn('No results found for the query:', query)
		}
	} catch (err) {
		console.error('Search failed:', err.message)
		theaterList.value = [] // 清空搜索结果
		showList.value = []
		hasSearched.value = true
		showNoResult.value = true // 如果出错，显示“无结果”
	}
}

// Handle back navigation
const handleBackClick = () => {
	console.log('Navigating back...')
	router.back()
}

// Debugging on mounted
onMounted(() => {
	console.log('Router info on mount:', router)
	console.log('Component mounted. Ready to perform actions.')
	if (!checkConnection()) {
		console.warn('No internet connection on mount. Please check your network.')
	}
})
</script>

<template>
	<div class="page">
		<!-- 顶部布局 -->
		<div class="top-layout">
			<!-- 返回按钮 -->
			<button class="backButton" @click="handleBackClick">
				<img class="backIcon" src="../assets/icon/" alt="back" />
			</button>
			<!-- 搜索框 -->
			<div class="searchBox">
				<input v-model.lazy="searchQuery" class="searchboxDescription" placeholder="theater name, show name, etc." @keyup.enter="performSearch" />
				<button class="searchButton" @click="performSearch">
					<img class="searchIcon" src="./assets/icon/search.svg" alt="search" />
				</button>
			</div>
		</div>

		<!-- 搜索结果显示 -->
		<div v-if="hasSearched">
			<div v-if="showNoResult" class="no-result">No result found</div>
			<div v-else class="search-results">
				<!--使用单个剧院卡片组件 -->
				<singletheaterCard v-for="theater in theaterList" :key="theater.id" :image="theater.image" :name="theater.name" :description="theater.description" @click="goToTheaterDetail(theater.id)" />
				<!--使用单个show组件-->
				<singleshowCard v-for="show in showList" :key="show.showId" :image="show.image" :name="show.name" :time="show.time" :rating="show.rating" @click="goToShowDetail(theater.id)" />
			</div>
		</div>
	</div>
</template>

<style scoped>
/* 页面样式 */
.page {
	position: relative;
	width: 100%;
	min-height: 100vh;
	background: url('./assets/background.jpg') no-repeat center center fixed;
	background-size: cover;
}

/* 背景装饰 */
.background-decoration {
	/* 您可以在这里添加装饰图片或其他元素 */
}

/* 顶部布局 */
.top-layout {
	display: flex;
	left: 0;
	width: 100%;
	display: flex;
	align-items: center;
}

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

/* 搜索框 */

/* 默认的搜索框容器样式 */
.searchBox {
	display: flex;
	align-items: center;
	justify-content: space-between;
	width: 292px;
	height: 50px;
	border-radius: 32px;
	background-color: #e9ebea; /* 默认背景颜色 */
	border: 0.5px solid transparent; /* 无边框，但预留位置 */
	transition: background-color 0.3s, border-color 0.3s; /* 添加平滑过渡效果 */
}

/* 输入框样式 */
.searchboxDescription {
	width: 100%;
	border: none; /* 移除输入框自带边框 */
	outline: none; /* 移除聚焦时默认的外边框 */
	background-color: transparent; /* 背景透明，与父容器一致 */
	font-family: 'InputFont', sans-serif;
	font-size: 16px;
	color: #333;
	padding: 0;
}
/* Placeholder 样式 */
.searchboxDescription::placeholder {
	font-family: 'PlaceholderFont', sans-serif; /* Placeholder 字体 */
	color: #aaa;
	font-style: italic;
}
/* 聚焦时的样式：容器和输入框统一变化 */
.searchBox:focus-within {
	background-color: #fff; /* 聚焦时背景颜色 */
	border-color: #0078ff; /* 聚焦时边框颜色 */
	box-shadow: 0 0 5px rgba(0, 120, 255, 0.5); /* 可选的阴影效果 */
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
	text-align: center;
	margin-top: 200px;
	font-size: 20px;
	font-family: Arial, Helvetica, sans-serif;
	color: #aaa;
}

/* 搜索结果样式 */
.search-results {
	display: flex;
	flex-direction: column; /* Set items to align vertically */
	justify-content: flex-start; /* Align items to the top (default for column direction) */
	align-items: center; /* Center items horizontally */
	gap: 18px; /* Gap between items in the vertical direction */
	margin-top: 20px; /* Space above the entire container */
}

/* 响应式设计 */
@media screen and (max-width: 768px) {
	/* 根据需要调整移动端样式 */
}
</style>

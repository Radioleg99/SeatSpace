<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import axiosInstance from '../services/axios'

const route = useRoute()
const router = useRouter()
const theaterInfo = ref({})
const showList = ref([])

// Fetch theater details based on the route parameter (theater ID)
const getTheaterList = async () => {
	try {
		const theaterId = route.params.id // Get the ID from the route
		const response = await axiosInstance.get(`/theater/${theaterId}`) // Fetch details for the specific theater
		if (response.data) {
			theaterInfo.value = response.data.theaterInfo || []
			showList.value = response.data.showList || []
		}
		console.log('Theater Info:', theaterDetail.value)
		console.log('Show List:', showList.value)
	} catch (error) {
		console.error('Error fetching theater list:', error)
	}
}
const handleBackClick = () => {
	console.log('Navigating back...')
	router.back()
}

const goToShowDetail = (showId) => {
	router.push({ name: 'show', params: { id: showId } }) // Pass the show ID
}

onMounted(() => {
	getTheaterList()
})
</script>

<template>
	<div>
		<button class="backButton" @click="handleBackClick">Back</button>
		<h2>Theater Information</h2>
		<pre>{{ theaterInfo.name }}</pre>
		<pre>{{ theaterInfo.description }}</pre>
		<pre>{{ theaterInfo.address }}</pre>
		<h2>Show List</h2>
		<ul>
			<li v-for="show in showList" :key="show.showId">{{ show.showName }} - {{ show.startTime }} (Rating: {{ show.rating }})</li>
		</ul>
	</div>
</template>

<style scoped></style>
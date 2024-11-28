<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import singleshowcard from '../components/singleshowcard.vue'

const allShows = ref([
	{
		showId: 607,
		showName: 'solutions Jamaica Guiana',
		hall: 'A232',
		startTime: '2024-10-10 10:00:00',
		rating: 4,
		imgUrl: 'https://espoonteatteri.fi/wp-content/uploads/2024/11/swafom.jpg',
	},
	{
		showId: 965,
		showName: 'Soft Oklahoma scalable',
		hall: 'A879',
		startTime: '2024-10-10 10:00:00',
		rating: 2.3,
		imgUrl: 'https://espoonteatteri.fi/wp-content/uploads/2024/11/swafom.jpg',
	},
	{
		showId: 482,
		showName: 'state Tools compress Metal',
		hall: 'A485',
		startTime: '2024-10-10 10:00:00',
		rating: 5,
		imgUrl: 'https://espoonteatteri.fi/wp-content/uploads/2024/11/swafom.jpg',
	},
	{
		showId: 627,
		showName: 'Otaniemi',
		hall: 'A032',
		startTime: '2024-10-10 10:00:00',
		rating: 2,
		imgUrl: 'https://espoonteatteri.fi/wp-content/uploads/2024/11/swafom.jpg',
	},
	{
		showId: 965,
		showName: 'Helsinki',
		hall: '124',
		startTime: '2024-10-10 10:00:00',
		rating: 2.3,
		imgUrl: 'https://espoonteatteri.fi/wp-content/uploads/2024/11/swafom.jpg',
	},
	{
		showId: 482,
		showName: 'Espoo',
		hall: '125',
		startTime: '2024-10-10 10:00:00',
		rating: 5,
		imgUrl: 'https://espoonteatteri.fi/wp-content/uploads/2024/11/swafom.jpg',
	},
	{
		showId: 67,
		showName: 'Vantaa',
		hall: '126',
		startTime: '2024-10-10 10:00:00',
		rating: 2,
		imgUrl: 'https://espoonteatteri.fi/wp-content/uploads/2024/11/swafom.jpg',
	},
	{
		showId: 635,
		showName: 'China',
		hall: '126',
		startTime: '2024-10-10 10:00:00',
		rating: 2.3,
		imgUrl: 'https://espoonteatteri.fi/wp-content/uploads/2024/11/swafom.jpg',
	},
	{
		showId: 891,
		showName: 'Lijiang',
		hall: '157',
		startTime: '2024-10-10 10:00:00',
		rating: 5,
		imgUrl: 'https://espoonteatteri.fi/wp-content/uploads/2024/11/swafom.jpg',
	},
])

const page = ref(1)
const pageSize = ref(4) // Show 4 items per page
const showList = ref([])
const isLoading = ref(false)
const hasMore = ref(true)
const observerTarget = ref(null)

// Load shows function
const loadShows = () => {
	if (isLoading.value || !hasMore.value) return

	isLoading.value = true

	setTimeout(() => {
		const start = (page.value - 1) * pageSize.value
		const end = page.value * pageSize.value
		const newShows = allShows.value.slice(start, end)

		if (newShows.length === 0) {
			hasMore.value = false
		} else {
			showList.value = [...showList.value, ...newShows]
			page.value += 1
		}

		isLoading.value = false
	}, 1000) // Simulate network delay
}

// Setup Intersection Observer
onMounted(() => {
	const observer = new IntersectionObserver(
		(entries) => {
			if (entries[0].isIntersecting) {
				loadShows()
			}
		},
		{
			threshold: 0.5,
			rootMargin: '100px',
		}
	)

	if (observerTarget.value) {
		observer.observe(observerTarget.value)
	}

	// Initial load
	loadShows()

	// Cleanup
	onUnmounted(() => {
		observer.disconnect()
	})
})
</script>

<template>
	<div class="theater-info-page">
		<div class="background-color"></div>

		<!-- Top layout -->
		<div class="top-layout">
			<img class="new-photo-background" src="../assets/data/Image.png" alt="Theater Image" />
			<div class="gradient-overlay"></div>
			<img class="theater-info-decoration" src="../assets/decoration/theater-detail-decoration.svg" alt="Theater Info Decoration" />
			<img class="theaterinfo-top-decoration" src="../assets/decoration/theaterinfo-top-decoration.svg" alt="Theater Info Decoration" />
			<div class="theater-info-detail">
				<div class="theater-name">NIHAO</div>
				<div class="theater-address">Beijing</div>
			</div>
		</div>

		<div class="decoration-theater"></div>

		<!-- Show list with infinite scroll -->
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

			<!-- Observer target and loading states -->
			<div ref="observerTarget" class="observer-target">
				<div v-if="isLoading" class="loading">Loading...</div>
				<div v-if="!hasMore && !isLoading" class="no-more">No more shows</div>
			</div>
		</div>
	</div>
</template>

<style scoped>
.theater-info-page {
	position: relative;
	display: flex;
	flex-direction: column;
	min-height: 100vh;
	overflow-x: hidden;
}

.background-color {
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background: #8ea045;
	z-index: -4;
}

.top-layout {
	position: relative;
	width: 100%;
	height: 200px;
	border: 1px solid #000000;
	box-shadow: 0 4px 8px rgba(0, 0, 0, 0.4);
}

.new-photo-background {
	width: 100%;
	height: 100%;
	opacity: 68%;
	z-index: 1;
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
}

.theater-info-decoration {
	position: absolute;
	top: 0;
	left: 0;
	z-index: 3;
}

.theaterinfo-top-decoration {
	position: absolute;
	top: 150px;
	right: -31px;
	z-index: 3;
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
	flex-direction: column;
	align-items: center;
	gap: 22px;
	padding: 20px;
	margin-top: 10px;
	z-index: 4;
}

.observer-target {
	width: 100%;
	height: 60px;
	display: flex;
	justify-content: center;
	align-items: center;
}

.loading,
.no-more {
	color: white;
	font-size: 16px;
	padding: 10px;
	text-align: center;
}
</style>

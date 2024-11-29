<template>
	<img src="../assets/backButton.svg" @click="goBack" class="btn" :style="{ top: `${top}px`, left: `${left}px`, position: 'absolute' }" />
</template>

<script setup>
import { useRouter } from 'vue-router'
const router = useRouter()
import { defineProps } from 'vue'

defineProps({
	top: { type: Number, default: 40 }, // 默认顶部位置
	left: { type: Number, default: 30 }, // 默认左侧位置
})

function goBack() {
	router.go(-1)
}
</script>

<style scoped>
.btn {
	cursor: pointer;
	border-radius: 50px;
	z-index: 5;
	width: 35px;
	height: 35px;
	box-shadow: 0px 8px 16px rgba(0, 0, 0, 0.2);
}
</style>

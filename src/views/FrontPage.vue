<script setup>
import { ref, onMounted } from 'vue';
import axiosInstance from '../services/axios';
import { useRoute } from 'vue-router';

const route = useRoute()
const theaterList = ref([])

const getTheaterList = async () => {
  axiosInstance.get('/theater/nearby', {
    params: {
      longitude: 37.5662952,
      latitude: 126.9779451
    }
  }).then((res) => {
    console.log(res.data)
    theaterList.value = res.data
  }).catch((err) => {
    console.log(err)
  })

  onMounted(() => {
    console.log(route)
  })
}

</script>

<template>
  <button type="button" @click="getTheaterList">获取测试数据</button>
</template>

<style scoped></style>
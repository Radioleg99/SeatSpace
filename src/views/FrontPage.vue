<script setup>
import { ref } from 'vue';
import axiosInstance from '../services/axios';

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
}

</script>

<template>
  <button type="button" @click="getTheaterList">获取测试数据</button>
</template>

<style scoped></style>
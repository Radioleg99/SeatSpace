<template>
  <img src="../assets/backButton.svg" @click="goBack" class="btn"></img>
</template>

<script setup>
import { useRouter } from 'vue-router';
const router = useRouter();

function goBack() {
  router.go(-1);
}
</script>

<style scoped>
.btn {
  cursor: pointer;
  border-radius: 50px;
  z-index: 4;
  width: 35px;
  height: 35px;
}
</style>
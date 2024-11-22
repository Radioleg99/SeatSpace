<script setup lang="js">
import { onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()

onMounted(() => {
  console.log('Theater ID:', route.params.id)
})

</script>
<template>


</template>
<style scoped></style>
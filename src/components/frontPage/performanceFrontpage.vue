<template>
  <div :class="performanceLayout">
    <div :class="title">Performance</div>
    <div :class="MultiplecardLayout">
      <multipleCard></multipleCard>
    </div>
    <img :class="decoration" alt="" src="../../assets/decor/Vector (Stroke).svg" />
  </div>
</template>

<script>
import multipleCard from "./multipleCard.vue";

export default {
  components: {
    multipleCard,
  },
  data() {
    return {
      title: "title",
      performanceLayout: "performanceLayout",
      MultiplecardLayout: "MultiplecardLayout",
      decoration: "decoration",
    };
  },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=JSMath-cmbx10:wght@400&display=swap");

.performanceLayout {
  display: flex;
  flex-direction: column;
  background-color: beige;
}

.title {
  margin-top: 30px;
  margin-bottom: 40px;
  font-size: 24px;
  line-height: 14px;
  font-family: "JSMath-cmbx10", sans-serif;
  color: #380970;
  text-align: center;
}

.MultiplecardLayout {
  margin-bottom: 10px;
}

.decoration {
  overflow: hidden;
  width: 54px;
  height: 54px;
  display: block;
  margin-left: auto;
  margin-right: auto;
}
</style>

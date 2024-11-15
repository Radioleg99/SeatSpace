<template>
  <div class="headLayout">
    <div class="title">SeatSpace</div>
    <button class="searchButton" @click="handleSearchClick">
      <img class="searchIcon" src="../../assets/icon/search.svg" alt="search" />
    </button>
  </div>
</template>

<style scoped>
.headLayout {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start; /* 子元素顶部对齐 */
  padding-top: 20px; /* 调整这个值以控制向下偏移的程度 */
  box-shadow: 0px 16px 32px -4px rgba(12, 12, 13, 0.1),
    0px 4px 4px -4px rgba(12, 12, 13, 0.05);
  background: linear-gradient(180deg, #e2f2a2, #e2f2a7 0.01%, #e9ebea 59%);
}

.title {
  margin: 0; /* 移除外边距，防止垂直方向的偏移 */
  font-size: 24px;
  line-height: 1.5;
  font-family: jsMath-cmbx10;
  color: #480b91;
}

.searchButton {
  background: none;
  border: none;
  cursor: pointer;
}

.searchIcon {
  width: 36px;
  height: 36px;
}
</style>

<script>
export default {
  methods: {
    handleSearchClick() {
      console.log("Search button clicked");
      // this.$router.push({ name: 'SearchPage' });
    },
  },
};
</script>

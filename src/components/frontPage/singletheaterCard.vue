<template>
  <div class="wholeCard">
    <img class="theaterImage" :src="theaterImageSrc" alt="Theater Image" />
    <div class="theaterCard">
      <div class="theaterInfo">
        <div class="colorIcon"></div>
        <div class="theaterName">{{ theaterNameContent }}</div>
      </div>
      <div class="theaterDescription">{{ theaterDescriptionContent }}</div>
    </div>
  </div>
</template>

<style scoped>
.wholeCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 10px;
  width: 325px;
  height: 238px;
  background-color: rgba(255, 255, 255, 0.8);
  /* 白色背景带透明度 */
  border: 1px solid rgba(0, 0, 0, 0.1);
  /* 边框为淡灰色 */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  /* 可选：增加轻微阴影 */
  margin-left: 16px;
}

.theaterImage {
  width: 325px;
  height: 142px;
  margin-bottom: 11px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.theaterCard {
  display: flex;
  flex-direction: column;
}

.theaterInfo {
  display: flex;
  flex-direction: row;
  gap: 8.25px;
  margin-bottom: 10px;
}

.colorIcon {
  border-radius: 50%;
  background-color: #9747ff;
  height: 22px;
  width: 22px;
  margin-left: 10px;
}

.theaterName {
  font-size: 10px;
  font-family: Sora;
  color: #2f2f42;
}

.theaterDescription {
  margin-left: 10px;
  font-size: 10px;
  font-family: Sora;
  color: #2f2f42;
}
</style>

<script>
export default {
  props: {
    theaterImageSrc: {
      type: String,
      required: true,
    },
    theaterNameContent: {
      type: String,
      required: true,
    },
    theaterDescriptionContent: {
      type: String,
      required: true,
    },
  },
};
</script>

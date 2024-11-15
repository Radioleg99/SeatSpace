<template>
  <div class="performanceCard">
    <img class="posterImg" alt="performanceName" :src="performanceImgSrc" />
    <div class="title">
      <div class="performanceName">{{ performanceContent }}</div>
      <div class="locationInfo">
        <img class="locationIcon" alt="" src="../../assets/icon/location_on.svg" />
        <div class="locationName">{{ locationNameContent }}</div>
      </div>
    </div>
  </div>
</template>
<style scoped>
.title {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.posterImg {
  width: 95px;
  height: 139px;
  margin-bottom: 5px;
  border-radius: 10px;
}

.performanceName {
  text-align: center;
  font-size: 13px;
  line-height: 14px;
  font-family: Helvetica;
}

.locationName {
  font-size: 8px;
  line-height: 14px;
  font-family: Helvetica;
  color: #505e2c;
}

.locationInfo {
  display: flex;
}

.performanceCard {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex: 1;
}
</style>

<script>
export default {
  props: {
    performanceImgSrc: {
      type: String,
      required: true,
    },
    performanceContent: {
      type: String,
      required: true,
    },
    locationNameContent: {
      type: String,
      required: true,
    },
  },
};
</script>

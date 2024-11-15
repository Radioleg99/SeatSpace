<template>
  <div class="theaterPage">
    <div class="head">
      <img :class="decoration" src="../../assets/decor/Vector-PF.svg" alt="decoration" />
      <div :class="title">Theater</div>
    </div>
    <div class="theaterCardlayout">
      <multitheater-card></multitheater-card>
    </div>
  </div>
</template>

<style scoped>
.theaterPage {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.head {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.decoration {
  margin-top: 40px;
  width: 54px;
  height: 54px;
  margin-left: auto;
  /* 水平居中 */
  margin-right: auto;
  /* 水平居中 */
}

.title {
  font-size: 24px;
  font-family: jsMath-cmbx10;
  color: #012a34;
  text-align: center;
}

.theaterCardlayout {
  display: flex;
  margin-bottom: 80px;
}
</style>

<script>
import multitheaterCard from "./multitheaterCard.vue";
export default {
  components: {
    multitheaterCard,
  },
  data() {
    return {
      decoration: "decoration",
      title: "title",
    };
  },
};
</script>

<script setup lang="js">
import BackButton from "../components/BackButton.vue"
import RatingStars from "../components/RatingStars.vue";
import { ref, watch } from "vue";
import uploadSingleImage from "../services/uploadImage";


const seatRating = ref(4)
const showRaintg = ref(3)
const fileInput = ref(null)

// trigger the input element to open file dialog
const triggerUploadImg = (e) => {
  if (fileInput.value) fileInput.value.click()
}

// upload image to server
const handleFileChange = (e) => {
  console.log('handleFileChange called: ', e.target.files)

  const files = e.target.files

  uploadSingleImage(files, (progress) => { console.log('uploadSingleImage callback: ', progress) })
    .then((res) => {
      console.log('uploadSingleImage res: ', res)
    })
    .catch((err) => {
      console.log('uploadSingleImage err: ', err)
    })
}

// upload comment to server
const submitComment = () => {
  console.log('submitComment called')
}

</script>

<template>
  <BackButton class="backBtn" />

  <!-- main -->
  <div class="container">
    <!-- <h1>Minna Craucher</h1> -->

    <div class="dialog">
      <div class="ratingContainer">
        <div class="title">Seat:</div>
        <RatingStars class="star" v-model:rating="seatRating" :totalStars="5" mode="input" size="24" />
      </div>

      <div class="ratingContainer">
        <div class="title">Seat:</div>
        <RatingStars class="star" v-model:rating="showRaintg" :totalStars="5" mode="input" size="24" />
      </div>

      <div class="ratingContainer" style="margin-left: 18px;">Comment: </div>

      <div class="commentContainer">

      </div>
    </div>

    <div class="imgUploadBtn" @click.stop="triggerUploadImg">
      <img src="../assets/camera.svg" alt="camera" />
      <input multiple type="file" ref="fileInput" accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
        @change="handleFileChange" style="display: none;" />
    </div>


    <div class="submitBtn" @click="submitComment">Submit</div>

    <!-- background -->
    <div class="bg">
      <img src="../assets/comment-background.png" alt="comment-background" />
    </div>
  </div>
</template>

<style scoped>
.bg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.bg img {
  height: 100%;
  width: 100%;
  object-fit: fill;
}

.backBtn {
  position: fixed;
  top: 46px;
  left: 35px;
}

.container {
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  left: 0;
  padding: 0 36px;
  height: 100vh;
  color: white;
  justify-content: center;
  align-items: center;
}

.container h1 {
  margin: 0;
  line-height: 31px;
  text-wrap: wrap;
  margin-bottom: 20px;
  text-align: center;
}

.container .dialog {
  background-image: url("../assets/comment-dialog.png");
  width: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;

  padding: 32px 0;

  color: #482727;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  margin-bottom: 13px;

  display: flex;
  flex-direction: column;
  align-items: center;
}

.container .dialog .ratingContainer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 13px;
  width: 100%;
}

.container .dialog .ratingContainer .title {
  width: 115px;
  height: 54px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #E2F2A2;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  right: 17px;
}

.container .dialog .ratingContainer .star {
  margin-right: 25px;
}

.container .dialog .commentContainer {
  width: calc(100% - 34px);
  height: 268px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #FFF;
  /* Inner Shadow/200 */
  box-shadow: var(--sds-size-depth-0) var(--sds-size-depth-025) var(--sds-size-depth-100) var(--sds-size-depth-0) var(--sds-color-black-100) inset;
}

.submitBtn {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  border-radius: 35px;
  background: #E2F2A2;
  box-shadow: 0px 0px 5px 0px rgba(0, 0, 0, 0.47);
  height: 51px;

  color: #6E3535;
  font-family: Helvetica;
  font-size: 24px;
  font-weight: 700;
}

.imgUploadBtn {
  display: flex;
  width: 80px;
  height: 80px;
  justify-content: center;
  align-items: center;
  flex-shrink: 0;
  border-radius: 10px;
  background: var(--main-Background-warm, #F3F0ED);
}

.imgUploadBtn input {
  pointer-events: none;
}

.imgUploadBtn img {
  width: 22px;
  height: 18px;
}
</style>
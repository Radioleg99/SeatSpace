<script setup lang="js">
import BackButton from "../components/BackButton.vue"
import RatingStars from "../components/RatingStars.vue";
import { ref, watch } from "vue";
import { useRoute } from "vue-router";
import PostNewComment from "../services/PostNewComment";

const fileInput = ref(null)

const seatRating = ref(0.0)
const showRating = ref(0.0)
const displayImgList = ref([])
const content = ref('')

const route = useRoute()

// trigger the input element to open file dialog
const triggerUploadImg = () => {
  if (displayImgList.value.length >= 5) {
    alert('You can only upload up to 5 images')
    return
  }

  if (fileInput.value) fileInput.value.click()
}

// push new images to displayImgList
const handleFileChange = (e) => {
  console.log('handleFileChange called: ', e.target.files)
  const files = e.target.files

  if (files.length + displayImgList.value.length > 5) {
    alert('You can only upload up to 5 images')
    return
  }

  const selectedImgList = []
  Object.keys(files).forEach((key) => {
    selectedImgList.push({
      localUrl: URL.createObjectURL(files[key]),
      fileObject: files[key],
    })
  })
  console.log('selectedImages: ', selectedImgList)
  displayImgList.value.push(...selectedImgList)
}

// delete image from displayImgList
const deleteImg = (index) => {
  displayImgList.value.splice(index, 1)
}

// upload comment to server
const submitComment = async () => {
  console.log('submitComment called')
  try {
    // build request data
    const images = displayImgList.value.map((img) => img.fileObject)
    const showId = route.params.showId
    const seatId = route.params.seatId

    const res = await PostNewComment(images, showId, seatId, seatRating.value, showRating.value, content.value, onUpdateCommentProgress)
    console.log('post new comment res: ', res)
    alert('Comment submitted successfully')
  } catch (error) {
    console.log('post new comment error: ', error)
    alert('Failed to submit comment')
  }
}

// callback function for updating comment progress changes
const onUpdateCommentProgress = (progress) => {
  console.log('onUpdateCommentProgress called: ', progress)
}

</script>

<template>
  <BackButton class="backBtn" />
  <h1 class="pageTitle">Comment</h1>

  <!-- main -->
  <div class="container">

    <div class="dialog">
      <div class="ratingContainer">
        <div class="title">Seat:</div>
        <RatingStars class="star" v-model:rating="seatRating" :totalStars="5" mode="input" size="24" />
      </div>

      <div class="ratingContainer">
        <div class="title">Show:</div>
        <RatingStars class="star" v-model:rating="showRating" :totalStars="5" mode="input" size="24" />
      </div>

      <div class="commentTitle">Comment: </div>

      <div class="commentContainer">
        <textarea name="comment" id="comment" placeholder="Anything comes up to your mind……" v-model="content"
          maxlength="200"></textarea>
      </div>

      <div class="imageContainer">
        <!-- upload button -->
        <div class="imgUploadBtn" @click.stop="triggerUploadImg">
          <img src="../assets/camera.svg" alt="camera" />
          <input multiple type="file" ref="fileInput" accept="image/jpeg, image/png, image/gif, image/bmp, image/webp"
            @change="handleFileChange" style="display: none;" @click.stop="" />
        </div>

        <!-- selected images -->
        <div v-for="(img, index) in displayImgList" class="imgPreview">
          <img :src="img.localUrl" :alt="img.sequence" class="imgPreview">

          <!-- close -->
          <div class="closeBtn" @click="deleteImg(index)">
            <img src="../assets/close-btn.svg" alt="close">
          </div>
        </div>

      </div>

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

.pageTitle {
  position: fixed;
  top: 46px;
  height: 35px;
  width: 100%;
  margin: 0;

  margin-left: 20px;

  display: flex;
  justify-content: center;
  align-items: center;

  color: white;
  font-family: jsMath-cmbx10;
  font-size: 32px;
  font-style: normal;
  font-weight: 700;
  line-height: 31px;
  /* 96.875% */
}

.backBtn {
  position: fixed;
  top: 46px;
  left: 35px;
}

.container {
  /* margin-top: 104px; */
  top: 100px;
  left: 0;
  padding: 0 36px;
  position: relative;

  color: white;
  overflow-y: scroll;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.container .dialog {
  /* background-image: url("../assets/comment-dialog.png"); */
  width: 100%;
  background-size: 100% 100%;
  background-repeat: no-repeat;
  background-position: center center;
  box-sizing: border-box;

  padding: 25px 27px;

  color: #482727;
  text-align: center;
  font-size: 20px;
  font-style: normal;
  font-weight: 700;
  line-height: 16px;
  margin-bottom: 26px;

  display: flex;
  flex-direction: column;
  align-items: center;

  background-color: #F3F6F4;
  border-radius: 20px;
}

.container .dialog .ratingContainer {
  display: flex;
  align-items: center;
  margin-bottom: 13px;
  width: 100%;
}

.container .dialog .ratingContainer .title {
  width: 88px;
  height: 35px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #E2F2A2;
  display: flex;
  align-items: center;
  justify-content: center;

  color: #542F2F;
  font-family: Helvetica;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
}

.container .dialog .ratingContainer .star {
  margin-left: 17px;
}

.container .dialog .commentTitle {
  font-size: 14px;

  color: #542F2F;
  font-family: Helvetica;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;

  display: flex;
  width: 100%;
  flex-shrink: 0;
  align-items: center;
  margin-bottom: 10px;
  padding-left: 15px;
  box-sizing: border-box;
}

.container .dialog .commentContainer {
  box-sizing: border-box;
  padding: 10px 20px;
  width: 100%;
  height: 120px;
  flex-shrink: 0;
  border-radius: 20px;
  background: #FFF;
  /* Inner Shadow/200 */
  box-shadow: var(--sds-size-depth-0) var(--sds-size-depth-025) var(--sds-size-depth-100) var(--sds-size-depth-0) var(--sds-color-black-100) inset;

  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 20px;
}

.container .dialog .commentContainer textarea {
  width: 100%;
  height: 100%;
  border: none;
  background: none;
  font-size: 14px;
  color: #542F2F;
  box-sizing: border-box;
  vertical-align: top;
}

.container .imgPreview {
  width: 80px;
  height: 80px;
  border-radius: 10px;
  object-fit: cover;

  position: relative;
}

.container .imgPreview .closeBtn {
  position: absolute;
  top: 4px;
  right: 4px;

  width: 20px;
  height: 20px;
  flex-shrink: 0;
  border-radius: 20px;

  background-color: rgba(217, 217, 217, 0.66);

  display: flex;
  justify-content: center;
  align-items: center;
}

.container .imgPreview .closeBtn img {
  width: 18px;
  height: 18px;
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

.imgUploadBtn img {
  width: 22px;
  height: 18px;
}

.imageContainer {
  width: 100%;
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
  margin-bottom: 10px;
}
</style>
<script setup lang="js">
import BackButton from "../components/BackButton.vue"
import RatingStars from "../components/RatingStars.vue";
import { ref, watch, onMounted } from "vue";
import { useRoute } from "vue-router";
import PostNewComment from "../services/PostNewComment";
import Swal from "sweetalert2";
import draggable from "vuedraggable";

const fileInput = ref(null)

const seatRating = ref(0.0)
const showRating = ref(0.0)
const displayImgList = ref([])
const content = ref('')

const route = useRoute()

// trigger the input element to open file dialog
const triggerUploadImg = () => {
  if (displayImgList.value.length >= 5) {
    Swal.fire({
      text: 'You can only upload up to 5 images',
      icon: 'error',
      showConfirmButton: true,
      allowOutsideClick: false,
    })
    return
  }

  if (fileInput.value) fileInput.value.click()
}

// push new images to displayImgList
const handleFileChange = (e) => {
  // console.log('handleFileChange called: ', e.target.files)
  const files = e.target.files

  // check if the total number of images exceeds 5
  if (files.length + displayImgList.value.length > 5) {
    Swal.fire({
      text: 'You can only upload up to 5 images',
      icon: 'error',
      showConfirmButton: true,
      allowOutsideClick: false,
    })
    return
  }

  // check if the image size exceeds 10MB
  for (let key of Object.keys(files)) {
    if (files[key].size > 10 * 1024 * 1024) {
      Swal.fire({
        text: 'Image size should be less than 10MB',
        icon: 'info',
        showConfirmButton: true,
        timer: 3000,
        timerProgressBar: true,
      })
      return
    }
  }

  // push new images to displayImgList
  Object.keys(files).forEach((key) => {
    displayImgList.value.push({
      localUrl: URL.createObjectURL(files[key]),
      fileObject: files[key],
      index: key
    })
  })

}

// delete image from displayImgList
const deleteImg = (index) => {
  displayImgList.value.splice(index, 1)
}

// upload comment to server
const submitComment = async () => {
  try {
    // build request data
    const images = displayImgList.value.map((img) => img.fileObject)
    const showId = route.params.showId
    const seatId = route.params.seatId

    // check if images are uploaded
    if (images.length === 0) {
      Swal.fire({
        text: 'Please upload at least one image',
        icon: 'error',
        showConfirmButton: true,
        allowOutsideClick: false,
      })
      return
    }

    // check if ratings are given
    if (seatRating.value === 0 || showRating.value === 0) {
      Swal.fire({
        text: 'Please give ratings for seat and show',
        icon: 'error',
        showConfirmButton: true,
        allowOutsideClick: false,
      })
      return
    }

    // check if content is given
    if (content.value === '') {
      Swal.fire({
        text: 'Please write some comments',
        icon: 'error',
        showConfirmButton: true,
        allowOutsideClick: false,
      })
      return
    }

    // show loading
    Swal.fire({
      text: 'Uploading...',
      showConfirmButton: true,
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading()
      },
    })
    // network request
    await PostNewComment(images, showId, seatId, seatRating.value, showRating.value, content.value)
    // close loading
    Swal.close()

  } catch (error) {
    console.log('post new comment error: ', error)
    Swal.fire({
      text: 'Failed to submit comment, please try again later',
      icon: 'error',
      showConfirmButton: true,
      allowOutsideClick: false,
    })
  }
}

</script>

<template>
  <BackButton class="backBtn" />
  <h1 class="pageTitle">Comment</h1>

  <div class="bg">
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
          <draggable class="imageSelectedContainer" v-model="displayImgList" itemKey="index">
            <template #item="{ element, index }">
              <div class="imgPreview">
                <img :src="element.localUrl" :alt="element.index" class="imgPreview">
                <div class="closeBtn" @click="deleteImg(index)">
                  <img src="../assets/close-btn.svg" alt="close">
                </div>
              </div>
            </template>
          </draggable>

          <span v-if="displayImgList.length > 1">* drag to reorder</span>
        </div>

      </div>

      <div class="submitBtn" @click="submitComment">Submit</div>

      <!-- background -->
      <div class="bgImg">
        <img src="../assets/comment-background.png" alt="comment-background" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.bg {
  width: 100%;
  height: calc(100vh - 100px);
  overflow-y: scroll;

  position: relative;
  top: 100px;
}

.bgImg {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: -1;
}

.bgImg img {
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

  margin-bottom: 15px;
}

.imageContainer {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin-bottom: 10px;
  position: relative;
  min-height: 80px;
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

  position: absolute;
  top: 0;
  left: 0;
}

.imgUploadBtn img {
  width: 22px;
  height: 18px;
}

.imageContainer .imageSelectedContainer {
  width: 100%;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin-bottom: 10px;
  gap: 10px;
}

.imageContainer .imageSelectedContainer> :first-child {
  margin-left: 90px;
}

.imageContainer> :last-child {
  text-align: left;
  font-size: 10px;
  font-style: italic;
  color: grey;
}
</style>
<template>
  <div class="rating" @touchstart.prevent="updateRating" @touchmove.prevent="updateRating">
    <img v-for="i in totalStars" :key="i" class="star" :src="getStarImgUrl(i)" alt="star"
      :height="parseFloat(size) + 'px'" />
  </div>
</template>

<script setup>
import { ref } from "vue";
import starActive from "../assets/stars/star-active.svg";
import starHalf from "../assets/stars/star-half.svg";
import starInactive from "../assets/stars/star-inactive.svg";

const props = defineProps({
  totalStars: {
    type: Number,
    default: 5,
  },
  rating: {
    type: Number,
    default: 0,
  },
  // star rating mode: input(changeable), show(static)
  mode: {
    type: String,
    default: "show",
  },
  size: {
    type: String,
    default: '24',
  }
});

const emit = defineEmits(["update:rating"]);

const { totalStars, mode, size, rating } = props;
const localRating = ref(rating)

const getStarImgUrl = (i) => {
  const ratingValue = localRating.value;
  let url = ''
  if (ratingValue >= i) {
    url = starActive;
  } else if (ratingValue >= i - 0.5) {
    url = starHalf;
  } else {
    url = starInactive;
  }
  return new URL(url, import.meta.url).href;
};

// updaterating when touchstart or touchmove
const updateRating = (event) => {
  if (mode !== "input") return;
  const rect = event.currentTarget.getBoundingClientRect();
  const touch = event.touches[0];
  const offsetX = touch.clientX - rect.left;
  const starWidth = rect.width / totalStars;
  const ratingValue = Math.min(Math.ceil((offsetX / starWidth) * 2) / 2, totalStars);
  localRating.value = ratingValue;
  // console.log('ratingValue:', ratingValue)
  emit("update:rating", ratingValue);
};
</script>

<style scoped>
.rating {
  display: flex;
  gap: 5px;
  cursor: pointer;
  user-select: none;
}

.star {
  color: #ccc;
  transition: color 0.3s;
}
</style>
<template>
  <div>
    <div class="multipletheaterCard">
      <singletheater-card
        v-for="(theater, index) in theaters.slice(0, 4)"
        :key="index"
        :theaterImageSrc="theater.theaterImageSrc"
        :theaterNameContent="theater.theaterNameContent"
        :theaterDescriptionContent="theater.theaterDescriptionContent"
        @click="handleCardClick(index)"
        class="theater-card"
      ></singletheater-card>
    </div>
  </div>
</template>

<script>
import singletheaterCard from "./singletheaterCard.vue";
import axios from "axios"; // Ensure axios is imported

export default {
  components: {
    singletheaterCard,
  },
  data() {
    return {
      theaters: [
        {
          theaterImageSrc: "https://example.com/image1.jpg",
          theaterNameContent: "Espoo City Theater",
          theaterDescriptionContent: "A great place to enjoy performances.",
        },
        {
          theaterImageSrc: "https://example.com/image2.jpg",
          theaterNameContent: "Helsinki Theater",
          theaterDescriptionContent: "Experience top-notch plays and musicals.",
        },
        {
          theaterImageSrc: "https://example.com/image3.jpg",
          theaterNameContent: "Tampere Theater",
          theaterDescriptionContent:
            "Enjoy a night of entertainment in Tampere.",
        },
        {
          theaterImageSrc: "https://example.com/image4.jpg",
          theaterNameContent: "Turku Theater",
          theaterDescriptionContent: "A wonderful theater in Turku.",
        },
        {
          theaterImageSrc: "https://example.com/image5.jpg",
          theaterNameContent: "Oulu Theater",
          theaterDescriptionContent: "A great place for cultural events.",
        },
      ],
    };
  },
  methods: {
    handleCardClick(index) {
      console.log("Clicked card index:", index);
    },
    // async fetchTheaters() {
    //   try {
    //     const response = await axios.get("YOUR_API_ENDPOINT"); // Replace with your API endpoint
    //     this.theaters = response.data.theaters; // Adjust based on your API's response structure
    //   } catch (error) {
    //     console.error("Error fetching data:", error);
    //   }
    // },
  },
  // created() {
  //   this.fetchTheaters();
  // },
};
</script>

<style scoped>
.multipletheaterCard {
  display: flex;
  flex-direction: row;
  gap: 21px;
  width: 100vw;
  overflow-x: auto;
  scrollbar-width: none; /* Firefox */
}

.multipletheaterCard::-webkit-scrollbar {
  display: none; /* Hides scrollbar for WebKit browsers */
}

.theater-card {
  transition: opacity 0.3s ease;
}

.theater-card:hover {
  opacity: 0.7;
}
</style>

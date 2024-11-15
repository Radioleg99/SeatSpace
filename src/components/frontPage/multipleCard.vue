<template>
  <div>
    <div class="multipleCard">
      <single-card
        v-for="(performance, index) in performances.slice(0, 5)"
        :key="index"
        :performanceImgSrc="performance.performanceImgSrc"
        :performanceContent="performance.performanceContent"
        :locationNameContent="performance.locationNameContent"
        @click="handleCardClick(index)"
      ></single-card>
    </div>
    <!-- Second row -->
    <div class="multipleCard">
      <single-card
        v-for="(performance, index) in performances.slice(5, 8)"
        :key="index + 3"
        :performanceImgSrc="performance.performanceImgSrc"
        :performanceContent="performance.performanceContent"
        :locationNameContent="performance.locationNameContent"
        @click="handleCardClick(index)"
      ></single-card>
    </div>
  </div>
</template>

<script>
import singleCard from "./singleCard.vue";

export default {
  components: {
    singleCard,
  },
  data() {
    return {
      performances: [
        {
          performanceImgSrc: "https://example.com/image1.jpg",
          performanceContent: "Espoo City Theater Performance",
          locationNameContent: "Espoo City, Finland",
        },
        {
          performanceImgSrc: "https://example.com/image2.jpg",
          performanceContent: "Helsinki Theater Show",
          locationNameContent: "Helsinki, Finland",
        },
        {
          performanceImgSrc: "https://example.com/image3.jpg",
          performanceContent: "Tampere Drama Night",
          locationNameContent: "Tampere, Finland",
        },
        {
          performanceImgSrc: "https://example.com/image4.jpg",
          performanceContent: "Turku Cultural Evening",
          locationNameContent: "Turku, Finland",
        },
        {
          performanceImgSrc: "https://example.com/image5.jpg",
          performanceContent: "Oulu Theater Fest",
          locationNameContent: "Oulu, Finland",
        },
        {
          performanceImgSrc: "https://example.com/image6.jpg",
          performanceContent: "Lapland Winter Performance",
          locationNameContent: "Rovaniemi, Finland",
        },
      ],
    };
  },
  methods: {
    handleCardClick(index) {
      console.log("Clicked card index:", index);
    },
  },
};

// created() {
//   this.fetchTheaters();
// },
// methods: {
//   async fetchTheaters() {
//     try {
//       const response = await axios.get("YOUR_API_ENDPOINT"); // Replace with your API endpoint
//       this.theaters = response.data.theaters; // Adjust based on your API's response structure
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   },
// },
</script>

<style scoped>
.multipleCard {
  margin: 10px;
  display: flex;
  gap: 26px;
  overflow-x: auto;
  width: 100vw;
  scrollbar-width: none; /* Firefox */
}

.multipleCard::-webkit-scrollbar {
  display: none; /* WebKit */
}
</style>

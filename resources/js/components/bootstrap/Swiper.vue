<template>
  <swiper
    :spaceBetween="30"
    :centeredSlides="true"
    :autoplay="{
      delay: 3000,
      disableOnInteraction: false,
    }"
    :pagination="{ clickable: true }"
    :navigation="true"
    :modules="[Autoplay, Pagination, Navigation]"
    class="mySwiper"
  >
    <swiper-slide v-for="(slide, index) in sliderContent" :key="index">
      <div class="text-slide">
        <h3>{{ slide.title }}</h3>
        <img :src="slide.image" alt="Slide Image" class="slide-image" v-if="slide.image" />
        <!-- <p> {{ truncateText(slide.content, truncateLimit) }}</p> -->
        <p v-html="truncateText(slide.content, truncateLimit)"></p>

        
        <button class="btn btn-outline-light border-2 rounded-pill mt-1 fs-0 py-0 btn-sm " type="button"  @click="storeInLocalStorage()">
        <router-link :to="defaultRoute" class="text-info "  
        target="_blank">Read More</router-link>

      </button>
      </div>
    </swiper-slide>
  </swiper>
</template>

<script setup>
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import { Autoplay, Pagination, Navigation } from 'swiper/modules';

// Define the prop
defineProps({
  sliderContent: {
    type: Array,
    required: true,
  },
  truncateLimit: {
    type: Number,
    default: 30, // Default to 30 if no value is provided
  },
  defaultRoute: {
      type: String,
      default: "/tourismsector/event-tourism"
    }
});

function truncateText(text, wordLimit) {
  if (!text) return ""; // Handle empty content
  const words = text.split(" "); // Split the content into words
  if (words.length > wordLimit) {
    return words.slice(0, wordLimit).join(" ") + "..."; // Truncate and add ellipsis
  }
  return text; // If within the limit, return the full content
}

</script>

<style scoped>
.swiper {
  width: 100%;
  height: auto;
}

.swiper-slide {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  background: rgba(255, 255, 255, 0.7); /* Transparent white background */
  padding: 25px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: 300px; /* Set a fixed height for the card */
  box-sizing: border-box; /* Ensure padding is included in height */
}

.text-slide {
  max-width: 800px;
  overflow: hidden;
}

.text-slide h3 {
  font-size: 1.5rem;
  margin-bottom: 10px;
  color: #333;
}

.text-slide p {
  font-size: 1rem;
  line-height: 1.5;
  color: #1f1e1e;
  font-weight: 500;
}

.slide-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 15px;
  border-radius: 8px;
}
</style>

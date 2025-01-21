<template>


    <section class="py-0 overflow-hidden light" id="banner">
        <div class="bg-holder overlay " style="background-image:url(/assets/img/mare-1200x900.jpg);background-position: center bottom;"></div>
        <div class="container">
          <div class="row flex-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
            <div class="col-md-12 col-lg-12 col-xl-8 pb-7 pb-xl-9 text-center text-lg-start">
              <!-- <h1 class="fs-2 fs-sm-4 fs-md-5 text-white "></h1>
              <p class=" text-white fw-light text-600 opacity-10">
                </p> -->
            </div>
          </div>
        </div>
      </section>
    
    
        <section style="background-color: #ffff">
    
    <div class="container">
      <div class="row justify-content-center text-justify" >
        <div class="col-lg-10 col-xl-9 col-xxl-8">
          
            <div v-for="(slide, index) in tourism" :key="index" class="mb-4">
                <h3 class="fs-2" style="color:#0b1727">{{ slide.title }}</h3>
                <p class="lead" v-if="slide.content">{{ slide.content }}</p>
              </div>
    
        </div>
        
      </div>
      
    </div>
    <!-- end of .container-->
    
    </section>
     
      
      </template>
      
      <script setup>
      import { ref, computed,onMounted } from 'vue';
      import tourism from "../SwiperContent/tourism.json" 
      //const slides = ref([]);
    
    // Fetch the JSON data on component mount
    // onMounted(async () => {
    //   try {
    //     const response = await fetch("../SwiperContent/tourism.json"); // Update with the correct path
    //     slides.value = await response.json();
    //   } catch (error) {
    //     console.error("Error fetching tourism data:", error);
    //   }
    // });
     
      
      </script>
      
      <style scoped>
      
      .right-enter-active, .right-leave-active {
        transition: transform 0.8s ease;
      }
      .right-enter {
        transform: translateX(100%); /* Enter from right */
      }
      .right-leave-to {
        transform: translateX(-100%); /* Leave to left */
      }
      
      /* Left Slide (Back) */
      .left-enter-active, .left-leave-active {
        transition: transform 0.8s ease;
      }
      .left-enter {
        transform: translateX(-100%); /* Enter from left */
      }
      .left-leave-to {
        transform: translateX(100%); /* Leave to right */
      }
      
      /* Fade for Skip */
      .fade-enter-active, .fade-leave-active {
        transition: opacity 0.8s ease;
      }
      .fade-enter, .fade-leave-to {
        opacity: 0;
      }
      
      .card {
        padding: 20px;
        border: 0; /* No border */
        background-color: rgba(0, 0, 0, 0.0); /* 50% transparent black */
        margin-top: 10px;
        border-radius: 10px;
        transition: opacity 0.5s ease-in-out;
      }
      
       
      
      .bg-holder-natural.natural-overlay::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent black overlay */
        z-index: 1; /* Ensures the overlay is above the background image */
      }
      
      .bg-holder-natural.natural-overlay > * {
        position: relative;
        z-index: 2; /* Ensures the content inside the div is above the overlay */
      }
      
      </style>
      
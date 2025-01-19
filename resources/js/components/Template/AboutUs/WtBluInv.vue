<template>
  <section class="banner light">
    <div class="bg-holder overlay" style="background-image:url(/assets/img/mare-1200x900.jpg); background-position: center bottom;"></div>
    <!-- <div class="container text-center text-lg-start">
      <div class="row flex-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
        <div class="col-md-12 col-lg-12 col-xl-8 pb-7 pb-xl-9">
          <h2 class="fs-3 text-primary">Welcome to Our Services</h2>
  
        </div>
      </div>
    </div> -->
    
  </section>

  <section style="background-color: #ffff">
    <div class="container">
      <div class="row justify-content-center text-justify">
        <div class="col-lg-10 col-xl-9 col-xxl-8">
         

          <h1 class="fs-2 fs-sm-4 fs-md-5" style="color:#0b1727">About BluInvest</h1>

            <p style="color:#0b1727">
            In Sri Lanka, the journey towards sustainable blue economy investments is built on a collaborative and practical approach. Recognising the challenges of fully implementing Marine Spatial Planning (MSP), a strategy was developed to combine development and conservation efforts, aligned with the Paris Agreement.
            <br>

            Guided by the National Physical Planning Policy – 2048, this process involved multi-sectoral collaboration, with over 50 agencies pooling data and insights. A Strategic Environment Assessment (SEA) framework was used to identify key areas for investment, address environmental conflicts, and integrate disaster risk reduction and conservation measures from the start.
            <br>
            A key outcome is the creation of the “Blue Opportunity Mapping Too” (BOM Tool), a GIS-based system that highlights optimal locations for sustainable investments and conservation projects. This dynamic tool is supported by a new GIS Data Analytics and Operations Centre, which ensures informed decision-making and continuous monitoring of coastal and marine resources.
            </p>
            <br>

            <Swiper :sliderContent="boat"/>

          <br />
          <!-- Loop through the sections array -->
          <div v-for="(section, index) in sections" :key="index" class="mb-4">
            <h3 style="color:#0b1727">{{ section.title }}</h3>
            <p style="color:#0b1727">{{ section.content }}</p>
          </div>


          

        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed } from 'vue';
import Swiper from '../../bootstrap/Swiper.vue';
import boat from '../SwiperContent/aboutusimg.json';


const sections = ref([
  {
    title: "Marine Industries in Sri Lanka",
    content:
      "Sri Lanka’s marine industries form a vital part of its economy, leveraging the nation's strategic location and abundant marine resources. As the blue economy expands, sectors such as fish processing, ship repairing, and maritime logistics are thriving, creating opportunities for economic growth, job creation, and sustainable practices.",
  },
  {
    title: "Fish Processing",
    content:
      "The fish processing industry is rapidly growing, fueled by rich marine resources and advanced processing techniques. Catering to both domestic and global markets, this sector is bolstered by increasing demand for seafood and government initiatives promoting aquaculture and modernization.",
  },
  {
    title: "Ship Repairing and Layup Services",
    content:
      "Sri Lanka's ship repair and layup services sector is crucial to the maritime economy. Equipped with state-of-the-art facilities and skilled professionals, the country provides efficient repair, maintenance, and layup solutions for vessels of all sizes, making it a preferred choice for shipowners worldwide.",
  },
  {
    title: "Maritime Logistics",
    content:
      "As a major transshipment hub, Sri Lanka's maritime logistics industry is integral to global trade. Its strategic location at the crossroads of East-West shipping routes ensures efficient cargo handling, contributing significantly to the nation's GDP and supporting the growth of international supply chains.",
  },
  
]);

</script>

<style scoped>
.right-enter-active,
.right-leave-active,
.left-enter-active,
.left-leave-active {
  transition: transform 0.8s ease;
}
.right-enter {
  transform: translateX(100%);
}
.right-leave-to {
  transform: translateX(-100%);
}
.left-enter {
  transform: translateX(-100%);
}
.left-leave-to {
  transform: translateX(100%);
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.8s ease;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}

.card {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.0);
  margin-top: 10px;
  border-radius: 10px;
  transition: opacity 0.5s ease-in-out;
}

.bg-holder-natural.natural-overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.bg-holder-natural.natural-overlay > * {
  position: relative;
  z-index: 2;
}
</style>

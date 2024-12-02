<template>
  <div id="page">
    <!-- Banner Section -->
    <section class="py-0 overflow-hidden light" id="banner">
      <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/pexels-tomfisk-4603274.jpg);background-position: center bottom;"></div>
      <div class="container">
        <div class="row flex-center pt-4 pt-lg-8 pb-lg-9 pb-xl-0">
          <div class="col-md-12 col-lg-12 col-xl-12 pb-7 pb-xl-3 text-justify text-lg-start">
       
              <h1 class="text-white fw-light">MARINE INDUSTRIES</h1>
            <p class="text-white fw-light text-600 opacity-10">
             <b>Fisheries</b> 

             <br>
Fisheries are a vital part of Sri Lanka’s economy, contributing significantly to food security and livelihoods. The sector provides about 50 percent of animal protein for Sri Lankans—three times the global average—and supports nearly 1 million people through full- or part-time employment. Coastal and marine fisheries also benefit 3.6 million Sri Lankans indirectly, strengthening the island’s socio-economic fabric. Key products like yellowfin tuna and blue swimming crabs are central to the sector, with areas such as Negombo and Mirissa serving as prime locations for visitors to explore traditional fishing practices. While the sector’s contribution to GDP and export revenues remains modest, it remains a key component of Sri Lanka’s marine industries and sustainable tourism offerings.
<br/>
<b>Aquaculture</b>
<br>
Aquaculture in Sri Lanka has seen significant growth, providing sustainable alternatives to wild-caught seafood. Key products like barramundi and sea cucumbers are farmed along the southern and western coasts, including areas near Galle and Kalutara, where eco-friendly aquaculture practices are on the rise. These aquaculture tours allow visitors to learn about sustainable seafood harvesting methods while promoting awareness of responsible marine resource management. By combining leisure with environmental stewardship, these activities highlight Sri Lanka’s commitment to aquaculture as a sustainable tourism offering.
<br>
<b>Blue Biotechnology</b>
<br>
Sri Lanka’s blue biotechnology sector is leveraging marine resources to create innovative products with global appeal. From anti-aging skin care solutions to collagen supplements derived from marine life, the industry taps into the unique properties of sea cucumbers, corals, and other marine organisms. Locations such as Colombo and Galle are emerging as hubs for blue biotech, where companies are conducting cutting-edge research and development. By integrating these marine-based products into wellness and tourism experiences, Sri Lanka positions itself as a leader in both sustainable biotechnology and eco-tourism.            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Dynamic Sections -->
    <InfrastructureSection :sections="infrastructureSectionsData" :title="infrastructureTitle" :description="infrastructureDescription" :backgroundImage="infrastructureImageUrl"/>
  <InfrastructureSection :sections="naturalSectionsData" :title="naturalTitle" :description="naturalDescription" :backgroundImage="naturalImageUrl"/>


    <!-- Access to Documents -->
    <section class="light bg-dark">
      <div class="bg-holder overlay" style="background-image:url(/assets/img/generic/bg-2.jpg);background-position: center top;"></div>
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-9">
            <p class="fs-2 fs-sm-3 text-white">
              Access valuable insights, industry reports, and updates on Sri Lanka's marine industries driving economic growth.
            </p>
            <button class="btn btn-outline-light border-2 rounded-pill btn-lg mt-4 fs-0 py-2">
              <router-link to="/map/analyze" class="text-info">Explore Map</router-link>
            </button>
          </div>
        </div>
      </div>
    </section>

    
   
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InfrastructureSection from './InfrastructureSection.vue';
import {infrastructureTitle, infrastructureDescription, infrastructureimageUrl, infrastructureSectionsData} from './infrastructureCards.js'
  import {naturalTitle, naturalDescription, naturalImageUrl, naturalSectionsData} from './naturalResourcesCards.js'

const handleDone = () => {
  console.log('Infrastructure section complete');
};
</script>

<style scoped>
.bg-holder {
  position: relative;
  width: 100%;
  height: auto;
  background-size: cover;
  background-repeat: no-repeat;
}
.overlay {
  background-color: rgba(0, 0, 0, 0.6);
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
}
.text-facebook {
  color: #3b5998;
}
.text-twitter {
  color: #1da1f2;
}
.text-google-plus {
  color: #db4a39;
}
.text-linkedin {
  color: #0077b5;
}
</style>

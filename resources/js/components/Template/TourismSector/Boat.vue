<template>
  <div id="page">
    <!-- Banner Section -->
    <section class="py-0 overflow-hidden light" id="banner">
      <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/Boat.jpeg);background-position: center bottom;"></div>
      <div class="container">
        <div class="row flex-center pt-4 pt-lg-8 pb-lg-9 pb-xl-0">
          <div class="col-md-12 col-lg-12 col-xl-12 pb-7 pb-xl-3 text-justify text-lg-start">
       
               <h1 class="text-white fw-light">BOAT BUILDING</h1>
            <p class="text-white fw-light text-600 opacity-10">
              Sri Lanka’s boat-building industry plays a pivotal role in both tourism and export revenue generation, positioning the country as a prime destination for boat-building ventures. The strategic geographical location of Sri Lanka, nestled at a key marine crossroads in the Indian Ocean, provides a unique advantage for the growth of the boat-building and shipbuilding industry. With a highly trainable workforce, low labour costs, and one of the best natural harbours in Asia, Sri Lanka has become a key player in producing boats that navigate global oceanic channels as well as inland waterways.
<br/>
In the tourism sector, eco-friendly boat designs enhance activities such as whale watching, snorkelling tours, and island-hopping excursions, ensuring minimal environmental impact while enriching visitor experiences. These sustainable watercraft not only elevate the appeal of marine tourism but also serve as a competitive edge for businesses in the sector.
<br>
Beyond tourism, the expanding technological capacity in boat building and drydock services positions Sri Lanka as a hub for nautical tourism and maritime services, including boat assembly, refuelling, refit, and repair. By investing in sustainable, innovative boat designs, businesses can tap into both the growing demand for eco-tourism and the global market for boat exports, strengthening Sri Lanka’s position in the maritime industry.
<br>
Take a closer look at any location of your choice, use the tool to explore detailed insights about its surrounding environment, and make informed business decisions with confidence and clarity!            </p>
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
              Access technical insights, industry reports, and updates on Sri Lanka’s thriving boat-building sector.
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

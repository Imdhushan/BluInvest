<template>
  <div id="page">
    <!-- Banner Section -->
    <section class="py-0 overflow-hidden light" id="banner">
      <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/wind.jpg);background-position: center bottom;"></div>
      <div class="container">
        <div class="row flex-center pt-4 pt-lg-8 pb-lg-9 pb-xl-0">
          <div class="col-md-12 col-lg-12 col-xl-12 pb-7 pb-xl-3 text-justify text-lg-start">
       
            <h1 class="text-white fw-light">WIND ENERGY</h1>
            <p class="text-white fw-light text-600 opacity-10">
              Sri Lanka’s coastal winds offer significant potential for large-scale renewable energy generation, to meet domestic energy needs and supply the wider region. The country’s offshore wind potential is exceptional, with an estimated 56GW capacity. This includes 27GW of fixed offshore wind in shallow waters (less than 50 meters) and 29GW of floating offshore wind in deeper waters (between 50 and 1,000 meters).
<br/>
In addition to offshore wind, Sri Lanka also boasts favourable conditions for onshore wind power development. Many areas experience annual average wind speeds exceeding 7 meters per second, as indicated by the Global Wind Atlas. 
<br/>
By harnessing its abundant wind energy, Sri Lanka can strengthen its energy security and become a key player in the region's transition to renewable energy. Large-scale wind energy investments will not only advance Sri Lanka’s renewable energy goals but also provide a scalable, sustainable solution for meeting both national and regional energy demands while promoting a greener and more sustainable future.
<br/>
Use the tool to conveniently explore the ideal location for wind energy investments.
            </p>
          </div>
        </div>
      </div>
    </section>

  <InfrastructureSection :sections="naturalSectionsData" :title="naturalTitle" :description="naturalDescription" :backgroundImage="naturalImageUrl"/>


    <!-- Access to Documents -->
    <section class="light bg-dark">
      <div class="bg-holder overlay" style="background-image:url(/assets/img/generic/bg-2.jpg);background-position: center top;"></div>
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-9">
            <p class="fs-2 fs-sm-3 text-white">
              Explore policies, updates, and insights into Sri Lanka's wind energy projects contributing to sustainable development.
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

<template>
  <div id="page">
    <!-- Banner Section -->
    <section class="py-0 overflow-hidden light" id="banner">
      <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/solor.jpeg);background-position: center bottom;"></div>
      <div class="container">
        <div class="row flex-center pt-4 pt-lg-8 pb-lg-9 pb-xl-0">
          <div class="col-md-12 col-lg-12 col-xl-12 pb-7 pb-xl-3 text-justify text-lg-start">
        
            <h1 class="text-white fw-light">SOLAR ENERGY</h1>
            <p class="text-white fw-light text-600 opacity-0">
              Solar energy presents a transformative solution for reducing carbon emissions and meeting the growing energy demands of Sri Lanka and the wider region. With its high solar irradiance, Sri Lanka is positioned as a central hub for renewable energy — supplying power not only to its own needs but also to neighbouring markets. This is particularly crucial as the region undergoes a “just energy transition” from fossil fuels to renewable sources.
<br/>
By leveraging solar power, countries in the region can significantly reduce their reliance 
on fossil fuels, improve energy security, and contribute 
to the global commitment to achieving net-zero emissions. 
Investments in solar energy ensure long-term cost efficiency 
while aligning with the region's goals for sustainable development and 
clean energy. Solar power is not just an environmentally responsible choice — it 
is a strategic route to a resilient, self-sufficient energy future for the region as a whole.
<br></p>
<p class="text-white fw-light text-600 opacity-0">Investing in solar energy offers several key benefits:</p>
<ul class="text-white fw-light text-600 opacity-0">
<li>Ensures long-term, stable returns, driven by the growing demand for renewable energy.</li>
<li>Government incentives aimed at reducing carbon footprints enhance the investment's value.</li>
<li>Solar projects typically have predictable cash flows, offering a degree of financial certainty.</li>
<li>Typically less volatile compared to other industries, making it a safer investment.</li>
</ul>
<p  class="text-white fw-light text-600 opacity-0">With the tool, you can conveniently discover optimal locations for solar energy projects.
            </p>
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
              Access government policies, plans, and updates regarding solar energy projects and renewable energy advancements in Sri Lanka.
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

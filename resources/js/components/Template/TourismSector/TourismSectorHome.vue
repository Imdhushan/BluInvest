<template>
  <section class="py-0 overflow-hidden light" id="banner">
    <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/malindabandaralk.jpg);background-position: center bottom;"></div>
    <div class="container">
      <div class="row flex-center pt-4 pt-lg-8 pb-lg-9 pb-xl-0">
        <div class="col-md-12 col-lg-12 col-xl-12 pb-7 pb-xl-3 text-justify text-lg-start">
          <h1 class="text-white fw-light">TOURISM</h1>
          <p class=" text-white  text-600 opacity-10">
           
Sri Lanka’s tourism sector lies at the heart of its Blue Economy, seamlessly combining stunning beaches, thriving marine ecosystems, and a rich cultural heritage into exciting opportunities for sustainable growth and meaningful investments.
As a global hotspot for eco-conscious travellers, Sri Lanka offers unforgettable experiences, such as whale watching in Mirissa, spotting dolphins in Kalpitiya, and encountering all five species of sea turtles in Rekawa and Kosgoda. 

With 114 historic shipwrecks dotting its coastline — the oldest dating back to the 2nd century BCE — and renowned scuba diving sites like Pigeon Island and Bar Reef, the island offers fascinating underwater adventures. According to the National Shipwreck Database of Sri Lanka (NSDSL), of these recorded shipwrecks, 38 are historical and 10 are protected sites, earning Sri Lanka the title of "wreck diving capital of the Indian Ocean. These shipwrecks are not only significant marine heritage sites but also biodiversity hotspots, providing shelter for a diverse array of fish and attracting international divers.

Emerging activities such as kite surfing in Kalpitiya, sport fishing in Weligama, and match racing further cement its reputation as a haven for water sports enthusiasts.

With BluInvest, you can unlock Sri Lanka’s tourism potential by leveraging industry insights and sustainable development strategies. The Blue Investment Opportunity Map (BIOM) enables you to pinpoint prime locations for development, from luxurious coastal resorts to thrilling adventure hubs, all while balancing environmental and economic factors.

Take a closer look at any location of your choice, use the tool to explore detailed insights about its surrounding environment, and make informed business decisions with confidence and clarity!

Unlock the chance to achieve significant returns while contributing to Sri Lanka's rise as a leader in sustainable tourism in South Asia!
          </p>
        </div>
      </div>
    </div>
  </section>

  <!-- <InfrastructureSection :sections="sectionsData" :title="title" :description="description"/> -->
  <!-- <NaturalResourcesSection ref="naturalResourcesSectionRef"/> -->
  <InfrastructureSection :sections="infrastructureSectionsData" :title="infrastructureTitle" :description="infrastructureDescription" :backgroundImage="infrastructureImageUrl"/>
  <InfrastructureSection :sections="naturalSectionsData" :title="naturalTitle" :description="naturalDescription" :backgroundImage="naturalImageUrl"/>


  <!-- <QuestionSection title="Natural Resources and Land Use"
  description="Focus on sustainable resource management and land use for a thriving environment."
  :naturalResourcesCards="infrastructureCards"/> -->



  <section class="light bg-dark">

<div class="bg-holder overlay" style="background-image:url(/assets/img/generic/bg-2.jpg);background-position: center top;">
</div>
<!--/.bg-holder-->

<div class="container">
  <div class="row justify-content-center text-center">
    <div class="col-lg-9">
      <!-- <p class="fs-2 fs-sm-3 text-white">Access Sri Lanka’s Government Circulars and Documents. All the official forms, guidelines, and regulatory documents related to Blue Economy investments are available here.</p> -->
      <button class="btn btn-outline-light border-2 rounded-pill btn-lg mt-4 fs-0 py-2" type="button"  @click="storeInLocalStorage()">
        <router-link to="/map/analyze" class="text-info">Explore Map</router-link>

      </button>
    </div>
  </div>
</div>
<!-- end of .container-->

</section>


 
</template>

<script setup>
  import { ref, computed, watch ,onMounted} from 'vue';
  
  import InfrastructureSection from './InfrastructureSection.vue';
  import {infrastructureTitle, infrastructureDescription, infrastructureimageUrl, infrastructureSectionsData} from './infrastructureCards.js'
  import {naturalTitle, naturalDescription, naturalImageUrl, naturalSectionsData} from './naturalResourcesCards.js'


  console.log('title',infrastructureTitle);
  </script>
  
  <style scoped>
  /* Add any needed custom styling here */
  </style>
  
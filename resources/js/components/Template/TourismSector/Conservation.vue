<template>
  <div id="page">
    <!-- Banner Section -->
    <section class="py-0 overflow-hidden light" id="banner">
      <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/financ.jpeg);background-position: center bottom;"></div>
      <div class="container">
        <div class="row flex-center pt-4 pt-lg-8 pb-lg-9 pb-xl-0">
          <div class="col-md-12 col-lg-12 col-xl-12 pb-7 pb-xl-3 text-justify text-lg-start">
            <h1 class="text-white fw-light">CONSERVATION</h1>
            <p class="text-white fw-light text-600 opacity-10">
              Conservation initiatives are vital to preserving Sri Lanka’s marine ecosystems for future generations. Opportunities include coral reef restoration, blue carbon initiatives in seagrass meadows and mudflats, and protecting rare marine species like bivalves, endangered turtles, and whales. Sri Lanka’s Marine Protected Areas (MPAs) — 28 declared and 8 proposed — present many opportunities for targeted conservation management, vital for safeguarding biodiversity and ecosystem health.

A robust technological infrastructure is essential for conservation, with digital tools supporting biodiversity monitoring, pollution control, and adaptive marine resource management. Additionally, developing incentive structures for communities and stakeholders — such as private sector and CSR initiatives — can drive marine asset protection, sustainable MPA management, and pollution reduction. Localising these efforts not only fosters grassroots economic and financial benefits but also builds value chains that empower local communities while preserving marine ecosystems.

Aligning projects with conservation goals ensures long-term viability, compliance with international sustainability standards, and support for blue carbon initiatives — solidifying Sri Lanka’s leadership in the conservation of marine biodiversity. With the tool, you can easily identify suitable locations for conservation projects.            </p>
          </div>
        </div>
      </div>
    </section>

    <InfrastructureSection :sections="infrastructureSectionsData" :title="infrastructureTitle" :description="infrastructureDescription" :backgroundImage="infrastructureImageUrl"/>
  <InfrastructureSection :sections="naturalSectionsData" :title="naturalTitle" :description="naturalDescription" :backgroundImage="naturalImageUrl"/>


    <!-- Access to Documents -->
    <section class="light bg-dark">
      <div class="bg-holder overlay" style="background-image:url(/assets/img/generic/bg-2.jpg);background-position: center top;"></div>
      <div class="container">
        <div class="row justify-content-center text-center">
          <div class="col-lg-9">
            <p class="fs-2 fs-sm-3 text-white">
              Access essential government circulars and documents related to conservation and sustainability efforts in Sri Lanka.
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

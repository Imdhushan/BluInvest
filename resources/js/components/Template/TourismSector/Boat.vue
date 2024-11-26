<template>
  <div id="page">
    <!-- Banner Section -->
    <section class="py-0 overflow-hidden light" id="banner">
      <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/Boat.jpeg);background-position: center bottom;"></div>
      <div class="container">
        <div class="row flex-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
          <div class="col-md-12 col-lg-12 col-xl-8 pb-7 pb-xl-9 text-center text-lg-start">
            <h1 class="text-white fw-light">BOAT BUILDING</h1>
            <p class="text-white fw-light text-600 opacity-10">
              Sri Lanka’s boat-building industry showcases craftsmanship, engineering, and innovation, serving local and international markets.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Dynamic Sections -->
    <InfrastructureSection @done="handleDone" />
    <NaturalResourcesSection ref="naturalResourcesSectionRef"/>

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

    <!-- Mission and Partners -->
    <section class="bg-dark pt-8 pb-4 light">
      <div class="container">
        <div class="row">
          <div class="col-lg-4">
            <h5 class="text-uppercase text-white opacity-85 mb-3">Our Mission</h5>
            <p class="text-600">To promote Sri Lanka as a global hub for high-quality boat building and marine services.</p>
            <div class="icon-group mt-4">
              <a class="icon-item bg-white text-facebook" href="#!"><span class="fab fa-facebook-f"></span></a>
              <a class="icon-item bg-white text-twitter" href="#!"><span class="fab fa-twitter"></span></a>
              <a class="icon-item bg-white text-google-plus" href="#!"><span class="fab fa-google-plus-g"></span></a>
              <a class="icon-item bg-white text-linkedin" href="#!"><span class="fab fa-linkedin-in"></span></a>
            </div>
          </div>
          <div class="col-lg-8">
            <h5 class="text-uppercase text-white opacity-85 mb-3">Insights & Updates</h5>
            <ul class="list-unstyled">
              <li>
                <h5 class="fs-0 mb-0"><a class="link-600" href="#!">Sri Lanka's Boat Building Industry</a></h5>
                <p class="text-600 opacity-50">A growing sector contributing to exports and employment.</p>
              </li>
              <li>
                <h5 class="fs-0 mb-0"><a class="link-600" href="#!">Innovative Marine Engineering</a></h5>
                <p class="text-600 opacity-50">Exploring modern designs and materials for sustainable boats.</p>
              </li>
              <li>
                <h5 class="fs-0 mb-0"><a class="link-600" href="#!">Boat Building for Local Communities</a></h5>
                <p class="text-600 opacity-50">Enhancing livelihoods and supporting coastal economies.</p>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-0 bg-dark light">
      <div>
        <hr class="my-0 text-600 opacity-25" />
        <div class="container py-3">
          <div class="row justify-content-between fs--1">
            <div class="col-12 col-sm-auto text-center">
              <p class="mb-0 text-600 opacity-85">
                Thank you | 2024 &copy; <a class="text-white opacity-85" href="https://themewagon.com">Gsentry</a>
              </p>
            </div>
            <div class="col-12 col-sm-auto text-center">
              <p class="mb-0 text-600 opacity-85">v3.14.0</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import InfrastructureSection from './InfrastructureSection.vue';
import NaturalResourcesSection from './NaturalResourcesSection.vue';

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

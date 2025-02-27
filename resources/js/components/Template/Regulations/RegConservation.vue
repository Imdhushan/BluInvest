<template>
  <section class="py-0 overflow-hidden light" id="banner">
    <div class="bg-holder overlay" style="background-image:url(/assets/img/mare-1200x900.jpg); background-position: center bottom;"></div>
    <div class="container">
      <div class="row flex-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
        <div class="col-md-12 col-lg-12 col-xl-8 pb-7 pb-xl-9 text-center text-lg-start">
          <!-- <h1 class="fs-2 fs-sm-4 fs-md-5 text-white">Regulatory Framework Pertaining to Conservation Projects</h1> -->
        </div>
      </div>
    </div>
  </section>

  <section style="background-color: #ffff">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-9 col-xxl-8">
          <h1 class="fs-2 fs-sm-4 fs-md-5" style="color:#0b1727">Regulatory Framework Pertaining to Conservation Projects</h1>
          <br/>
          <p class="lead ">
            Sri Lanka has a well-established framework for conservation projects, governed by several key laws and initiatives aimed at protecting biodiversity while supporting sustainable development. Below are the key regulations governing conservation projects in Sri Lanka:
          </p>

          <!-- <h3>Key Regulations Governing Conservation Projects</h3> -->
          
          <ol>
            <li>

              <strong>
                <a href="https://www.documents.gov.lk/view/acts/1981/9/57-1981_E.pdf  " target="_blank">

                Coast Conservation and Coastal Resource Management Act No. 57 of 1981:
                </a>
              </strong>

              <p>This act regulates development activities in coastal zones, focusing on conservation and sustainable use of coastal resources. It mandates permits for development projects in coastal areas to ensure environmental standards are met.</p>
            </li>
            <li><strong>
              <a href="https://citizenslanka.org/wp-content/uploads/2016/02/Fauna-and-Flora-Protection-Ordinance-No-02-of-1937-E.pdf " target="_blank">

              Fauna and Flora Protection Ordinance No. 2 of 1937:
              </a>
            </strong>
              <p>This ordinance is a foundational legal framework for wildlife and biodiversity conservation in Sri Lanka. It has been amended several times to strengthen protections, including restrictions on wildlife trade under the Convention on International Trade in Endangered Species (CITES).</p>
            </li>
            <li><strong>
              <a href="https://www.cea.lk/web/images/pdf/acts/act47-80.pdf " target="_blank">

              National Environment Act No. 47 of 1980:
              </a>
            </strong>
              <p>This act governs environmental management and protection, mandating Environmental Impact Assessments (EIAs) for activities with potential environmental impacts. It also ensures the implementation of sustainable development practices across sectors.</p>
            </li>
            <li><strong>
              <a href="https://citizenslanka.org/wp-content/uploads/2016/02/Forest-Ordinance-No-16-of-1907-E.pdf " target="_blank">

              Forest Ordinance No. 16 of 1907:
            </a>
          </strong>
              <p>The Forest Ordinance governs the conservation and management of forests in Sri Lanka. It has been amended to protect forest reserves and address issues such as deforestation and illegal logging.</p>
            </li>
          </ol>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue';
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

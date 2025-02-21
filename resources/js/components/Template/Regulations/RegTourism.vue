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
          <h1 class="fs-2 fs-sm-4 fs-md-5" style="color:#0b1727">Regulations Pertaining to Nautical Tourism</h1>
          <br/>
          <!-- <p class="lead">
            Sri Lanka has a well-established framework for nautical tourism, governed by several key laws and initiatives aimed at supporting sustainable development while ensuring the protection of marine ecosystems and safety for tourists. Below are the key regulations governing nautical tourism in Sri Lanka:
          </p>

          <h3>Key Regulations Governing Nautical Tourism</h3> -->
          
          <ol>
            <li><strong>Coast Conservation and Coastal Resource Management Act No. 57 of 1981:</strong>
              <p>This act regulates development activities in coastal zones, focusing on conservation and sustainable use of coastal resources. It mandates permits for development projects in coastal areas to ensure environmental standards are met.</p>
            </li>
            <li><strong>Tourism Act No. 38 of 2005:</strong>
              <p>The Sri Lanka Tourism Development Authority (SLTDA) regulates the tourism sector, including nautical tourism. Operators must be licensed and comply with safety, environmental, and operational standards.</p>
            </li>
            <li><strong>Marine Pollution Prevention Act No. 35 of 2008:</strong>
              <p>This act ensures that all nautical tourism activities comply with regulations designed to prevent marine pollution, including waste management and fuel spill prevention on vessels.</p>
            </li>
            <li><strong>Sri Lanka Ports Authority Act No. 51 of 1979:</strong>
              <p>This act regulates activities in ports and harbors, including those used for nautical tourism. Operators must comply with docking and mooring regulations and port safety standards.</p>
            </li>
            <li><strong>Merchant Shipping Act No. 52 of 1971:</strong>
              <p>This act governs the registration and safety of vessels, including those used for tourism. Operators must ensure that vessels meet safety and seaworthiness standards.</p>
            </li>
            <li><strong>Fisheries and Aquatic Resources Act No. 2 of 1996:</strong>
              <p>Nautical tourism activities should avoid interference with fishing operations. This act ensures that tourism does not negatively impact the livelihoods of fishing communities or marine biodiversity.</p>
            </li>
            <li><strong>National Environmental Act No. 47 of 1980:</strong>
              <p>Any project that may significantly impact the environment, including nautical tourism infrastructure, requires an Environmental Impact Assessment (EIA) to ensure sustainability.</p>
            </li>
            <li><strong>Customs Ordinance:</strong>
              <p>Vessels entering Sri Lanka's waters for tourism purposes must comply with customs regulations, including clearance procedures for foreign vessels.</p>
            </li>
            <li><strong>Sri Lanka Navy and Coast Guard Regulations:</strong>
              <p>These agencies ensure maritime security and regulate safe navigational practices for nautical tourism operators within Sri Lanka's territorial waters.</p>
            </li>
            <li><strong>Wildlife Protection Laws:</strong>
              <p>Marine parks and protected areas require permits for tourism activities, ensuring that species like whales and dolphins are protected from disturbance during tours.</p>
            </li>
            <li><strong>International Maritime Conventions:</strong>
              <p>Sri Lanka is a signatory to various international conventions under the IMO, and operators must adhere to global standards for safety, security, and environmental protection.</p>
            </li>
          </ol>

          <div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Documents</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(doc, index) in documents" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ formatName(doc) }}</td>
                  <td>
                    <a :href="`${basePath}/${doc}`"  class="text-decoration-none">
                      <i class="bi bi-download"></i> Download
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const basePath = "/assets/pdf/tourisum";

const documents = [
  "Regulatory Framework - Whale Watching.pdf",
  "Guideline for Whale and Dolphin Watching – Water Based Adventure Tourism Activities.pdf",
  "Guideline for Sailing - Water Based Adventure.pdf",
  "Guidelines for Leisure Boat_Small Vessel Operators.pdf",
  "Guidelines for Waterfront and Island Developments for Tourism and Recreational Activities.pdf",
  "Guidelines for Development of Floating Facilities for Tourism and Recreational Purposes.pdf",
  "Guidelines for Siting Over Water Structures (Water bungalows).pdf"
];

const formatName = (filename) => {
  return filename.replace(".pdf", "");
};
</script>

<style scoped>
.bi-download {
  font-size: 1.2rem;
  margin-right: 0.5rem;
}

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

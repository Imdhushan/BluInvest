<template>
  <section class="py-5 overflow-hidden light" id="banner">
    <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/solar-panes-sri-lanka.jpg);background-position: center bottom;"></div>
    <div class="container">
      <div class="row flex-center">
        <div class="col-sm-12 col-md-7 col-lg-7 col-xl-7 pb-2 pt-0 pb-xl-2 ">
          <div class="content-box p-4 mb-3">
            <h1 class="text-white ">SUSTAINABLE ENERGY</h1>
            <h4 class="text-white fw-light opacity-5">Sri Lanka’s Renewable Energy Potential</h4>

            <p class=" text-white  text-600 opacity-10 text-justify">

              Sri Lanka is uniquely positioned to become a renewable energy powerhouse due to the island’s abundant solar irradiance and exceptional wind potential. With an average solar energy generation capacity of 4-6 kWh per square meter per day and vast coastal winds offering an estimated 56GW of offshore wind energy, the nation has the resources to efficiently transform its energy landscape. These renewable energy sources cater to domestic needs and hold the potential to supply power to neighbouring markets, driving regional collaboration in sustainable energy development.

            </p>
          </div>
          <Swiper :sliderContent="enargy"  :defaultRoute="sliderContent"/>

        </div>
        <div class="col-sm-12 col-md-5 col-lg-5 col-xl-5  pt-3 ">
  <!-- <iframe class="img-fluid" src="/assets/img/generic/dashboard-alt.jpg" title="Embedded Content"></iframe> -->
  <iframe  src="https://phpdemo.gsentry.cloud/energy.html" scrolling="no" style="width:600px; height:700px;"></iframe>




    </div>

    </div>
    </div>
  </section>
  <section class="py-4 overflow-hidden light" id="banner" style="background-color: #1A237E">
    <div class="container">
      <div class="row flex-center">
        <div class="col-sm-12 col-md-5 col-lg-5 col-xl-5 pb-2 pt-0 pb-xl-2">
          <card class=" light p-0 mt-2">
            <card-body class="p-1 ">
          <LeafletMap @mapReady="initializeMap" :filters="filters"
             />
            </card-body>
           </card>

        </div>
        <div class="col-sm-12 col-md-7 col-lg-7 col-xl-7 pb-2 pt-0 pb-xl-2 ">

          <InfrastructureSection :sections="infrastructureSectionsData" :title="infrastructureTitle" :description="infrastructureDescription" :backgroundImage="infrastructureImageUrl"
          @process-complete="retrieveFromLocalStorage"
          />
          <!-- <hr class="p-0 m-0"/> -->
          <!-- <InfrastructureSection :sections="naturalSectionsData" :title="naturalTitle" :description="naturalDescription" :backgroundImage="naturalImageUrl"/> -->
          <!-- <button
          @click="retrieveFromLocalStorage"

          class="btn btn-outline-success btn-sm mx-2 mt-2 "
        >
          Done
        </button> -->

        </div>

      </div>
    </div>

  </section>

  <section>
    <div class="container-flude">
      <div class="row justify-content-center text-center">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <h4  class="text-dark  merienda"> Regulations and Guidelines</h4>
          <br/>

          <Swiper :sliderContent="enargyRegulation" :truncateLimit="1000" :defaultRoute="defaultRoute"/>
        </div>
      </div>
    </div>

  </section>

  <!-- <InfrastructureSection :sections="sectionsData" :title="title" :description="description"/> -->
  <!-- <NaturalResourcesSection ref="naturalResourcesSectionRef"/> -->


  <!-- <QuestionSection title="Natural Resources and Land Use"
  description="Focus on sustainable resource management and land use for a thriving environment."
  :naturalResourcesCards="infrastructureCards"/> -->



  <!-- <section class="light bg-dark">

<div class="bg-holder overlay" style="background-image:url(/assets/img/generic/bg-2.jpg);background-position: center top;">
</div>

<div class="container">
  <div class="row justify-content-center text-center">
    <div class="col-lg-9">
      <p class="fs-2 fs-sm-3 text-white">Access Sri Lanka’s Government Circulars and Documents. All the official forms, guidelines, and regulatory documents related to Blue Economy investments are available here.</p>
      <button class="btn btn-outline-light border-2 rounded-pill btn-lg mt-4 fs-0 py-2" type="button"  @click="storeInLocalStorage()">
        <router-link to="/map/analyze" class="text-info">Explore Map</router-link>

      </button>
    </div>
  </div>
</div>

</section> -->



</template>

<script setup>
  import { ref, computed, watch ,onMounted} from 'vue';

  import InfrastructureSection from './InfrastructureSection.vue';
  import {infrastructureTitle, infrastructureDescription, infrastructureimageUrl, infrastructureSectionsData} from './boatCards.js'
  import {naturalTitle, naturalDescription, naturalImageUrl, naturalSectionsData} from './naturalResourcesCards.js'

  import LeafletMap from "../LeafletMap.vue";
import Swiper from '../../bootstrap/Swiper.vue';
import enargy from '../SwiperContent/enargy.json';
import enargyRegulation from '../SwiperContent/enargyRegulation.json';


const sliderContent ="/tourismsector/event-energy"
const defaultRoute="/regulation/energy";
const filters = ref([]);


const retrieveFromLocalStorage = () => {
  filters.value =  [
    { attribute: 'Beach_a', value: '1' }, // Beaches
    { attribute: 'Sta_Hot', value: '1' }, // Standard Hotels
    { attribute: 'Tou_hot', value: '1' }, // Tourist Hotels
    { attribute: 'Surfing', value: '1' }, // Surfing Areas
    { attribute: 'Lagoon', value: '1' }, // Lagoons
  ];
}


  console.log('title',infrastructureTitle);

   const popupData = {
    "torist_map-u-colombo": {
      title: "Colombo",
      id: "colombo",
      description: "Feel the pulse of Sri Lanka in Colombo, a bustling city where modern skyscrapers rise alongside colonial landmarks and bustling street markets."
    },
    // Add more locations
  };

  let activePopup = null;

  Object.keys(popupData).forEach((id) => {
    const element = document.getElementById(id);
    if (element) {
      element.style.cursor = "pointer";

      element.addEventListener("mouseenter", (event) => {
        if (activePopup) activePopup.remove();

        const { title, description } = popupData[id];
        const popup = document.createElement("div");
        popup.className = "popup";
        popup.style.position = "absolute";
        popup.style.left = `${event.pageX + 10}px`;
        popup.style.top = `${event.pageY + 10}px`;
        popup.style.background = "rgba(0, 0, 0, 0.8)";
        popup.style.color = "white";
        popup.style.padding = "15px";
        popup.style.borderRadius = "5px";
        popup.style.zIndex = "1000";
        popup.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.2)";
        popup.style.maxWidth = "250px";

        const titleElement = document.createElement("h4");
        titleElement.style.margin = "0 0 10px 0";
        titleElement.style.color = "#FFD700";
        titleElement.style.fontSize = "16px";
        titleElement.innerText = title;

        const descriptionElement = document.createElement("p");
        descriptionElement.style.margin = "0";
        descriptionElement.style.fontSize = "14px";
        descriptionElement.style.lineHeight = "1.4";
        descriptionElement.innerText = description;

        popup.appendChild(titleElement);
        popup.appendChild(descriptionElement);

        document.body.appendChild(popup);
        activePopup = popup;
      });

      element.addEventListener("mouseleave", () => {
        if (activePopup) {
          activePopup.remove();
          activePopup = null;
        }
      });
    } else {
      console.error(`Element with ID '${id}' not found in the SVG.`);
    }
  });

  </script>

  <style scoped>

.content-box {
  background: rgba(0, 0, 0, 0.4); /* Black with 60% transparency */
  border-radius: 10px; /* Optional: smooth corners */
  padding: 20px; /* Add padding inside */
}

  .popup {
    font-family: Arial, sans-serif;
  }

  #map-container {
    position: relative;
    width: 100%;
    max-width: 600px; /* Adjust as per your needs */
    margin: 0 auto;
  }

  .merienda {
  font-family: "Merienda", serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.bg-holder-natural.natural-overlay::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* Semi-transparent black overlay */
    z-index: 1; /* Ensures the overlay is above the background image */
  }

  .bg-holder-natural.natural-overlay > * {
    position: relative;
    z-index: 2; /* Ensures the content inside the div is above the overlay */
  }
  </style>

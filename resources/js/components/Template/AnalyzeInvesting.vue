<template>
    <!-- <div class="container">
      <div class="row">
        <div class="col-xl-8 col-lg-8">
          <LeafletMap @mapReady="initializeMap" />
        </div>
      </div>
    </div> -->

<section class="py-6 overflow-hidden  light" style="background-color: #1A237E">

<div class="container">
  <card class="mb-3 ">
    <card-body>
    <div class="row g-1 flex-center">
        <div class="col-xl-7 col-lg-7">
          
            <LeafletMap @mapReady="initializeMap" :filters="filters"
             />
             


        </div>
        <div class="col-xl-5 col-lg-5">
           
          <InfrastructureSection :sections="infrastructureSectionsData" :title="infrastructureTitle" :description="infrastructureDescription" :backgroundImage="infrastructureImageUrl" :bgColor="bgColor"/>
  <hr class="p-0 m-0"/>
  <InfrastructureSection :sections="naturalSectionsData" :title="naturalTitle" :description="naturalDescription" :backgroundImage="naturalImageUrl" :bgColor="bgColor"/>





               
        </div>
    </div>
  </card-body>
</card>
</div>
</section>


   

  </template>

  <script setup>
import {computed, inject, nextTick, onMounted, ref, toRaw, watch} from "vue";
import LeafletMap from "./LeafletMap.vue";
  import loadLeafletJSONOnMap from "../../composables/map/loadLeftletJSONOnMap";
  import generalAxiosRequest from "../../composables/application/generalAxiosRequest";
import { Loader } from "@googlemaps/js-api-loader";
import {applyMapLegend, showHideLegends} from "../../composables/map/layers/SpatialListFunctions";

import refactorGeometrytoGeoJSON from "../../composables/map/refactorGeometrytoGeoJSON";

import InfrastructureSection from './TourismSector/InfrastructureSection.vue';
  import {infrastructureTitle, infrastructureDescription, infrastructureimageUrl, infrastructureSectionsData} from './TourismSector/infrastructureCards.js'
  import {naturalTitle, naturalDescription, naturalImageUrl, naturalSectionsData} from './TourismSector/naturalResourcesCards.js'

//
// const selectedAttribute =ref();
// const attributeValue =ref();
const filters = ref([]);
onMounted(() => {
  retrieveFromLocalStorage();
});

const retrieveFromLocalStorage = () => {
  filters.value =  [
    { attribute: 'Beach_a', value: '1' }, // Beaches
    { attribute: 'Sta_Hot', value: '1' }, // Standard Hotels
    { attribute: 'Tou_hot', value: '1' }, // Tourist Hotels
    { attribute: 'Surfing', value: '1' }, // Surfing Areas
    { attribute: 'Lagoon', value: '1' }, // Lagoons
  ];
    // selectedAttribute.value = localStorage.getItem('selectedAttribute');
    // attributeValue.value = localStorage.getItem('attributeValue');

  // console.log("storedAttribute",selectedAttribute,attributeValue)

  // if (storedAttribute) {
  //   selectedAttribute  = storedAttribute;
  // }

  // if (storedValue) {
  //   attributeValue = storedValue;
  // }
};

const bgColor="black";

  const mapInstance = ref(null); // Leaflet map instance

  // Callback for when the Leaflet map is ready
  const initializeMap = (map) => {
    mapInstance.value = map;
    //loadLayerData();
  };

  // Fetch GeoJSON and load it onto the map
//   const loadLayerData = async () => {
//   const payload = {
//     url: "https://services.gsentry.cloud/api/v1/gis-layers/query",
//     data: JSON.stringify({
//       collection: "layer_value", // Replace with your actual collection name
//       query_array: JSON.stringify(["All"]),
//     }),
//   };
//
//   try {
//     const { json_data } = await generalAxiosRequest("curl-requests/post", payload, true);
//     console.log("API response:", json_data); // Log the full response
//
//     // Check if json_data and json_data.value are defined
//     if (json_data && json_data.value && Array.isArray(json_data.value.features) && json_data.value.features.length > 0) {
//       loadLeafletJSONOnMap(json_data.value, mapInstance.value, {
//         color: "blue",
//         fillColor: "lightblue",
//         onEachFeature: (feature, layer) => {
//           layer.bindPopup(`Name: ${feature.properties.name}`);
//         },
//       });
//     } else {
//       console.warn("No valid features found in the response.");
//     }
//   } catch (error) {
//     console.error("Error loading layer data:", error);
//   }
// };



  </script>

  <style scoped>
  .container {
    margin-top: 20px;
  }
  </style>

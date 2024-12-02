<template>
    <!-- <div class="container">
      <div class="row">
        <div class="col-xl-8 col-lg-8">
          <LeafletMap @mapReady="initializeMap" />
        </div>
      </div>
    </div> -->

    <section class="light" style="background-color: #2196F3">

<div class="container">
    <div class="row">
        <div class="col-xl-8 col-lg-8">
            <LeafletMap @mapReady="initializeMap" :filters="filters"
             />


        </div>
        <div class="col-xl-4 col-lg-4">
            <card class="mb-3 ">
                <card-body>
                    <h4>Final Selection Summary</h4>
                    <div class="accordion" id="accordionExample">
                        <div class="accordion-item"  v-if="completed">
                            <h2 class="accordion-header" id="heading1">
                                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse1" aria-expanded="true" aria-controls="collapse1">
                                     INFRASTRUCTURE
                                </button>
                            </h2>
                            <div class="accordion-collapse collapse show" id="collapse1" aria-labelledby="heading1" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    <table class="table table-bordered">
                                        <thead>
                                        <!-- <tr><th colspan="3" class="text-left">INFRASTRUCTURE</th></tr> -->
                                        </thead>
                                        <tbody>
                                        <tr><td colspan="3" class="text-left fw-bold">Accessibility</td></tr>
                                        <tr v-for="(distance, roadType) in finalSelections.INFRASTRUCTURE.Accessibility" :key="roadType">
                                        <td colspan="2">{{ roadType }}</td>
                                        <td>{{ distance.join(", ") }}</td>
                                        </tr>

                                        <tr><td colspan="3" class="text-left fw-bold">Groundwater</td></tr>
                                        <tr>
                                        <td colspan="2">Availability of groundwater</td>
                                        <td>{{ finalSelections.INFRASTRUCTURE.Groundwater["Availability of groundwater"] }}</td>
                                        </tr>

                                        <tr><td colspan="3" class="text-left fw-bold">Accommodation Facilities</td></tr>
                                        <tr>
                                        <td colspan="2">Tourist Hotels</td>
                                        <td>{{ finalSelections.INFRASTRUCTURE["Accommodation Facilities"]["Tourist Hotels"] }}</td>
                                        </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="heading2">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse2" aria-expanded="true" aria-controls="collapse2">
                                Natural Resources and Land Use
                            </button>
                            </h2>
                            <div class="accordion-collapse collapse" id="collapse2" aria-labelledby="heading2" data-bs-parent="#accordionExample">
                                <div class="accordion-body">
                                    Focus on sustainable resource management and land use for a thriving environment.
                                </div>
                            </div>
                        </div>
                        <!-- <div class="accordion-item">
                            <h2 class="accordion-header" id="heading3">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse3" aria-expanded="true" aria-controls="collapse3">How much do disputes costs?</button>
                            </h2>
                            <div class="accordion-collapse collapse" id="collapse3" aria-labelledby="heading3" data-bs-parent="#accordionExample">
                            <div class="accordion-body">Disputed payments (also known as chargebacks) incur a $15.00 fee. If the customer’s bank resolves the dispute in your favor, the fee is fully refunded.</div>
                            </div>
                        </div>
                        <div class="accordion-item">
                            <h2 class="accordion-header" id="heading4">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse4" aria-expanded="true" aria-controls="collapse4">Is there a fee to use Apple Pay or Google Pay?</button>
                            </h2>
                            <div class="accordion-collapse collapse" id="collapse4" aria-labelledby="heading4" data-bs-parent="#accordionExample">
                            <div class="accordion-body">There are no additional fees for using our mobile SDKs or to accept payments using consumer wallets like Apple Pay or Google Pay.</div>
                            </div>
                        </div> -->
                    </div>




                </card-body>
            </card>
        </div>
    </div>
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

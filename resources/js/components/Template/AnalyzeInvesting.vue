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
            <LeafletMap @mapReady="initializeMap" :selectedAttributeIn="selectedAttribute" 
            :attributeValueIn="attributeValue" /> 


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

    <section class="bg-dark pt-8 pb-4 light">

        <div class="container">
        <div class="position-absolute btn-back-to-top bg-dark"><a class="text-600" href="#banner" data-bs-offset-top="0"><span class="fas fa-chevron-up" data-fa-transform="rotate-45"></span></a></div>
        <div class="row">
            <div class="col-lg-4">
            <h5 class="text-uppercase text-white opacity-85 mb-3">Our Mission</h5>
            <p class="text-600">Sri Lanka's Financial Ministry and UNDP are committed to driving sustainable growth through Blue Economy initiatives. By providing comprehensive resources and support, we aim to create opportunities for investors to contribute to the prosperity of Sri Lanka while ensuring environmental protection.</p>
            <div class="icon-group mt-4"><a class="icon-item bg-white text-facebook" href="#!"><span class="fab fa-facebook-f"></span></a><a class="icon-item bg-white text-twitter" href="#!"><span class="fab fa-twitter"></span></a><a class="icon-item bg-white text-google-plus" href="#!"><span class="fab fa-google-plus-g"></span></a><a class="icon-item bg-white text-linkedin" href="#!"><span class="fab fa-linkedin-in"></span></a><a class="icon-item bg-white" href="#!"><span class="fab fa-medium-m"></span></a></div>
            </div>
            <div class="col ">
            <div class="row mt-5 mt-lg-0">
                <div class="col-lg-6 col-md-3">
                <h5 class="text-uppercase text-white opacity-85 mb-3">Partners</h5>
                <ul class="list-unstyled">
                    <li class="mb-1">Our initiatives are supported by a strong network of partners dedicated to sustainable development and growth within Sri Lanka’s Blue Economy. Together, we work to provide resources, expertise, and guidance for impactful investment opportunities</li>
                    <!-- <li class="mb-1">UNDP (United Nations Development Programme): A key driver in fostering sustainable development across Sri Lanka, UNDP works closely with the government and private sector to implement Blue Economy projects that align with global sustainability goals.</li>
                    <li class="mb-1">UDA (Urban Development Authority): The UDA plays a pivotal role in planning and managing the infrastructure development necessary for the success of land and marine-based investments, ensuring long-term sustainability and growth.</li>
                    <li class="mb-1">Sri Lanka Financial Ministry: As the primary government entity for economic management, the Financial Ministry oversees policies and initiatives that create a favorable environment for investors in Sri Lanka's Blue Economy.</li> -->
                    <!-- <li class="mb-1"><a class="link-600" href="#!">Terms</a></li>
                    <li class="mb-1"><a class="link-600" href="#!">Privacy</a></li>
                    <li><a class="link-600" href="#!">Imprint</a></li> -->
                </ul>
                </div>
                <!-- <div class="col-6 col-md-3">
                <h5 class="text-uppercase text-white opacity-85 mb-3">Product</h5>
                <ul class="list-unstyled">
                    <li class="mb-1"><a class="link-600" href="#!">Features</a></li>
                    <li class="mb-1"><a class="link-600" href="#!">Roadmap</a></li>
                    <li class="mb-1"><a class="link-600" href="#!">Changelog</a></li>
                    <li class="mb-1"><a class="link-600" href="#!">Pricing</a></li>
                    <li class="mb-1"><a class="link-600" href="#!">Docs</a></li>
                    <li class="mb-1"><a class="link-600" href="#!">System Status</a></li>
                    <li class="mb-1"><a class="link-600" href="#!">Agencies</a></li>
                    <li class="mb-1"><a class="link-600" href="#!">Enterprise</a></li>
                </ul>
                </div> -->
                <div class="col-lg-6 mt-5 mt-md-0">
                <h5 class="text-uppercase text-white opacity-85 mb-3"> Insights & Updates</h5>
                <ul class="list-unstyled">
                    <li>
                    <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> New Investment Strategies for 2024</a></h5>
                    <p class="text-600 opacity-50"> Blue Economy opportunities. </p>
                    </li>
                    <li>
                    <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> Sustainable Development Goals in Action</a></h5>
                    <p class="text-600 opacity-50">Projects align with global sustainability targets.</p>
                    </li>
                    <li>
                    <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> A Look Back at 2023's Progress</a></h5>
                    <p class="text-600 opacity-50">Blue Economy projects.</p>
                    </li>
                    <!-- <li>
                    <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> The New Falcon Theme</a></h5>
                    <p class="text-600 opacity-50">Dec 23 &bull; 10min read </p>
                    </li> -->
                </ul>
                </div>
            </div>
            </div>
        </div>
        </div>
        <!-- end of .container-->

        </section>

 

    <section class="py-0 bg-dark light">

    <div>
    <hr class="my-0 text-600 opacity-25" />
    <div class="container py-3">
        <div class="row justify-content-between fs--1">
        <div class="col-12 col-sm-auto text-center">
            <p class="mb-0 text-600 opacity-85">Thank you  <span class="d-none d-sm-inline-block">| </span><br class="d-sm-none" /> 2024 &copy; <a class="text-white opacity-85" href="https://themewagon.com">Gsentry</a></p>
        </div>
        <div class="col-12 col-sm-auto text-center">
            <p class="mb-0 text-600 opacity-85">v3.14.0</p>
        </div>
        </div>
    </div>
    </div>
    <!-- end of .container-->

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

const selectedAttribute =ref();
const attributeValue =ref();
onMounted(() => {
  retrieveFromLocalStorage();
});

const retrieveFromLocalStorage = () => {
    selectedAttribute.value = localStorage.getItem('selectedAttribute');
    attributeValue.value = localStorage.getItem('attributeValue');

  console.log("storedAttribute",selectedAttribute,attributeValue)

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
  const loadLayerData = async () => {
  const payload = {
    url: "https://services.gsentry.cloud/api/v1/gis-layers/query",
    data: JSON.stringify({
      collection: "layer_value", // Replace with your actual collection name
      query_array: JSON.stringify(["All"]),
    }),
  };

  try {
    const { json_data } = await generalAxiosRequest("curl-requests/post", payload, true);
    console.log("API response:", json_data); // Log the full response

    // Check if json_data and json_data.value are defined
    if (json_data && json_data.value && Array.isArray(json_data.value.features) && json_data.value.features.length > 0) {
      loadLeafletJSONOnMap(json_data.value, mapInstance.value, {
        color: "blue",
        fillColor: "lightblue",
        onEachFeature: (feature, layer) => {
          layer.bindPopup(`Name: ${feature.properties.name}`);
        },
      });
    } else {
      console.warn("No valid features found in the response.");
    }
  } catch (error) {
    console.error("Error loading layer data:", error);
  }
};



  </script>
  
  <style scoped>
  .container {
    margin-top: 20px;
  }
  </style>
  
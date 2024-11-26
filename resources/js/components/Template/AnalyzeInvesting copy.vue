<template>
    <section class="light" style="background-color: #2196F3">

<div class="container">
    <div class="row">
        <div class="col-xl-8 col-lg-8">
               <master-map
               
               ></master-map>

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

                    <!-- <div v-if="completed">
                    <h4>Final Selection Summary</h4>
                    <table class="table table-bordered">
                    <thead>
                    <tr><th colspan="3" class="text-left">INFRASTRUCTURE</th></tr>
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
                    </div> -->

                    
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
//import Stats from "./stats.vue";
// import {computed, inject,onMounted, ref, watch} from 'vue';
// import generalAxiosRequest from "../../composables/application/generalAxiosRequest";
 import GISLayerWrapper from "./LayerPanel/GISLayerWrapper.vue";
// import refactorGeometrytoGeoJSON from "../../composables/map/refactorGeometrytoGeoJSON";
// import loadGeoJSONOnMap from "../../composables/map/loadGeoJSONOnMap";
// import {applyMapLegend, showHideLegends} from "../../composables/map/layers/SpatialListFunctions";

// import { GoogleMap, Marker , CustomControl ,InfoWindow ,MarkerCluster} from "vue3-google-map";
// import {loadGoogleCharts} from "vue-google-charts";
// import Weather from "./weather.vue";
// import Proximity from "./ToolBar/BottomPanel/proximity.vue";
// import DrawingTools from "./ToolBar/BottomPanel/DrawingTools.vue";
// import BarChart1 from "./Charts/barChart1.vue";
// import AreaChart1 from "./Charts/areaChart1.vue";
// import BarChart2 from "./Charts/barChart2.vue";
// import BarChart3 from "./Charts/barChart3.vue";
// import PieChart1 from "./Charts/pieChart1.vue";
// import AreaChart2 from "./Charts/areaChart2.vue";
// import BarChart4 from "./Charts/barChart4.vue";
// import PolarChart1 from "./Charts/polarChart1.vue";
 import MasterMap from "./masterMap.vue";
// import CIPanel from "./CIDB/CIPanel.vue";
//import Chat from "./chat/chat.vue";
// import GaugeReading from "./MobileReading/GaugeReading.vue";
// import $ from 'jquery';

// import {useStore} from "vuex";

// const store = useStore();
// const $loading =  inject('$loading')
// const googleProperty = inject('$googleProperty')
// const previewdLayers = ref([]);
// /**
//  * TODO : Need update;
//  * 7. weather widget need to show cloud and rain*/
// loadGoogleCharts('current', { packages: ['corechart'] })
// const layer_url=null;
// const lid =1;
// const layer_value ="Project Cascade";
// const color ='#eb2c2c'
// const fillColor = '#eb2c2c'
// const legends ="";
// const chatMarkerData = ref([]);
// const chatMarkerEmit = (data) => {
//     console.log("chat emited",data);
//     chatMarkerData.value = data;
// }

// onMounted(()=>{
//   getLayerFromBack(lid,layer_value,color,fillColor,"Boundary",legends);
// });



//     const getLayerFromBack = async (lid,layer_value,color,fillColor,name,legends) => {
//     let queryArea = localStorage.getItem('queryData');
//     queryArea = JSON.parse(queryArea);
//     let query_array = ['All'];

//     if (queryArea){
//         console.log("qval",queryArea.selected_values)
//             query_array = [
//                 {attribute:queryArea.selected_area,logic:"=",value:queryArea.selected_values[0]}
//             ]
//     }
//     let map = store.state.gmap;
//     if (map) {
//     map.fitBounds(bounds); // bounds should be defined from your data
// } else {
//     console.error("Map is not initialized.");
// }
//     const payload = {
//         url: 'https://services.gsentry.cloud/api/v1/gis-layers/query',
//         data: JSON.stringify({
//             collection: layer_value,
//             query_array: JSON.stringify(query_array),
//         })
//     }
//     const {json_data} = await generalAxiosRequest('curl-requests/post', payload, true,$loading);
//     console.log('boundary Proximity layer', json_data.value);
//     if (json_data.value && json_data.value.features.length>0){
//         let dataType = getDataType(json_data.value.features[0])
//         console.log('dataType', dataType);
//         if (dataType !== 'Point'){
//             applyInitailSpatialOnMap(json_data,layer_value,lid,map,color,fillColor,name,legends);
//         }else{
//             applyInitialPointOnMap(json_data,layer_value,lid,color,name,legends)
//         }
//     }
//     console.log("Inesh previews layers",previewdLayers.value)
// }

// const applyInitailSpatialOnMap = (json_data,layer_value,lid,map,color,fillColor,name,legends) => {
//     let geoString = refactorGeometrytoGeoJSON(json_data.value.features);
    
//     const {previewedLayer} = loadGeoJSONOnMap(geoString, layer_value, lid, map, googleProperty, lid, store, color, $loading,fillColor)
//     previewdLayers.value.push(previewedLayer.value);
//     applyMapLegend(name,color,'polygon',legends,lid,store)
// }

// const applyInitialPointOnMap = (json_data,layer_value,lid,color,name,legends) => {

//     // let data = json_data.value.features.slice(0,1000);
//     let data = json_data.value.features;
//     let attr = Object.keys(data[0].properties);
//     data = _.map(data,function (o) {
//         if (legends && legends.length>0){
//             legends.forEach(function (l) {
//                 switch (l.logic) {
//                     case '=':if (o.properties[l.attr] === l.value){
//                                     o.color = l.color;
//                                 }
//                         break;
//                     case '>':if (o.properties[l.attr] > l.value){
//                                  o.color = l.color;
//                             }
//                         break;
//                     case '<':if (o.properties[l.attr] < l.value){
//                                  o.color = l.color;
//                              }
//                         break;
//                     default : color?o.color = color : o.color = '#FF0000';
//                 }

//             })
//         }else{
//             color?o.color = color : o.color = '#FF0000';
//         }

//         return o;
//     })
//     previewdPoints.value.push({id:lid,data:data,visibility:true,queries:"",attributes:attr,layerType:'point',filteredData:data,name:layer_value})

//     let combData = _.concat(store.state.layerPoints,data);
//     store.commit('setLayerPoints',combData);
//     applyMapLegend(name,color,'point',legends,lid,store)
// }

// const getDataType = (dataset) => {
//     return dataset.geometry.type
// }

import {computed, inject, nextTick, onMounted, ref, toRaw, watch} from "vue";
import mapBounds from "../../composables/map/mapBounds";
import loadGeoJSONOnMap from "../../composables/map/loadGeoJSONOnMap";
import refactorGeometrytoGeoJSON from "../../composables/map/refactorGeometrytoGeoJSON";
import generalAxiosRequest from "../../composables/application/generalAxiosRequest";
import {useStore} from "vuex";
//import LayerQuery from "./LayerPanel/LayerQuery.vue";
    import _ from "lodash";

import { Modal } from 'bootstrap'
import {applyMapLegend, showHideLegends} from "../../composables/map/layers/SpatialListFunctions";
import { Loader } from "@googlemaps/js-api-loader";

const layer_url=null;
const lid =1;
//const layer_value ="BoundaryGrid";
const layer_value ="Project Cascade"; 
const color ='#eb2c2c'
const fillColor = '#eb2c2c'
const legends ="";

const store = useStore();

const props = defineProps({
    item: Object,
});


const completed = ref(false);
const finalSelections = ref({});
// Retrieve final selections when component mounts
onMounted(() => {
  const storedSelections = JSON.parse(localStorage.getItem("formattedSelections"));
  if (storedSelections) {
    finalSelections.value = storedSelections;
    completed.value = true;
  }
});

onMounted(() => {
    // Watch for changes to the map object in the store
    watch(
        () => store.state.gmap,
        (newMap) => {
            if (newMap) {
                console.log("Map initialized, running getLayerFromBack.");
                getLayerFromBack(newMap,lid, layer_value, color, fillColor, "Boundary", legends);
            }
        },
        { immediate: true }
    );
});

const previewdLayers = ref([]);
const previewdPoints = ref([]);
const googleProperty = inject('$googleProperty');
const $loading =  inject('$loading');

// onMounted(()=>{
//     getLayerFromBack(lid,layer_value,color,fillColor,"Boundary",legends);
// });






const getLayerFromBack = async (newMap,lid,layer_value,color,fillColor,name,legends) => {
    console.log("get Value  lid,layer_value,color,fillColor,name,legends",lid,layer_value,color,fillColor,name,legends);
    // let queryArea = localStorage.getItem('queryData');
    // queryArea = JSON.parse(queryArea);
    let query_array = ['All'];

    // if (queryArea){
    //     console.log("qval",queryArea.selected_values)
    //         query_array = [
    //             {attribute:queryArea.selected_area,logic:"=",value:queryArea.selected_values[0]}
    //         ]
    // }
    let map = newMap;
    if (!map) {
        console.error("Map is not initialized.");
        return;
    }
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/gis-layers/query',
        data: JSON.stringify({
            collection: layer_value,
            query_array: JSON.stringify(query_array),
        })
    }
    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, true,$loading);
    console.log('boundary Proximity layer', json_data.value);
    if (json_data.value && json_data.value.features.length>0){
        let dataType = getDataType(json_data.value.features[0])

        if (dataType !== 'Point'){
            applyInitailSpatialOnMap(json_data,layer_value,lid,map,color,fillColor,name,legends);
        }else{
            applyInitialPointOnMap(json_data,layer_value,lid,color,name,legends)
        }
    }
    console.log("fucking previews layers",previewdLayers.value)
}

const applyInitailSpatialOnMap = (json_data,layer_value,lid,map,color,fillColor,name,legends) => {

    console.log("Applying initial spatial data on map:", map);

    let geoString = refactorGeometrytoGeoJSON(json_data.value.features);
    const {previewedLayer} = loadGeoJSONOnMap(geoString, layer_value, lid, map, googleProperty, lid, store, color, $loading,fillColor)
    previewdLayers.value.push(previewedLayer.value);
    applyMapLegend(name,color,'polygon',legends,lid,store)
}

const applyInitialPointOnMap = (json_data,layer_value,lid,color,name,legends) => {

    // let data = json_data.value.features.slice(0,1000);
    let data = json_data.value.features;
    let attr = Object.keys(data[0].properties);
    data = _.map(data,function (o) {
        if (legends && legends.length>0){
            legends.forEach(function (l) {
                switch (l.logic) {
                    case '=':if (o.properties[l.attr] === l.value){
                                    o.color = l.color;
                                }
                        break;
                    case '>':if (o.properties[l.attr] > l.value){
                                 o.color = l.color;
                            }
                        break;
                    case '<':if (o.properties[l.attr] < l.value){
                                 o.color = l.color;
                             }
                        break;
                    default : color?o.color = color : o.color = '#FF0000';
                }

            })
        }else{
            color?o.color = color : o.color = '#FF0000';
        }

        return o;
    })
    previewdPoints.value.push({id:lid,data:data,visibility:true,queries:"",attributes:attr,layerType:'point',filteredData:data,name:layer_value})

    let combData = _.concat(store.state.layerPoints,data);
    store.commit('setLayerPoints',combData);
    applyMapLegend(name,color,'point',legends,lid,store)
}

const applyInitialCIPointOnMap = (json_data,layer_value,lid,color,name,legends) => {
    let attr = Object.keys(json_data[0]);
    let updData = [];

    _.map(json_data,function (o) {
        if (o.geometry) {
            let cicolor = color?o.color = color : o.color = '#FF0000';
            if (legends && legends.length>0){
                legends.forEach(function (l) {
                    switch (l.logic) {
                        case '=':if (o[l.attr] == l.value){
                            cicolor = l.color;
                        }
                            break;
                        case '>':if (o[l.attr] > l.value){
                            cicolor = l.color;
                        }
                            break;
                        case '<':if (o[l.attr] < l.value){
                           cicolor = l.color;
                        }
                            break;
                        default : console.log(o[l.attr] +' !== '+l.value);color?o.color = color : o.color = '#FF0000';
                    }

                })
            }
            updData.push({
                properties:o,
                geometry:o.geometry,
                color:cicolor
            })
        }
    })
    previewdPoints.value.push({id:lid,data:updData,visibility:true,queries:"",attributes:attr,layerType:'point',filteredData:updData,name:layer_value})
    let combData = _.concat(store.state.layerPoints,updData)
    store.commit('setLayerPoints',combData);

    applyMapLegend('CI',color,'point',legends,lid,store)
}



const getDataType = (dataset) => {
    return dataset.geometry.type
}



const query_dialog = ref(false);
const selectedLayer = ref(null);
const selectedLayerID = ref(null);

const filterModalElement = ref(null); // This ref is for the DOM element.
const filterModalInstance = ref(null); // This ref will store the Bootstrap modal instance.

const startQuerying = (lid) => {
    let layer_exists = _.find(previewdLayers.value, {id: lid});
    let point_exists = _.find(previewdPoints.value, {id: lid});
    selectedLayerID.value = lid;
    if (layer_exists){
        selectedLayer.value = layer_exists;
    }else if(point_exists){
        selectedLayer.value = point_exists
    }

    nextTick(() => {
        if (filterModalElement.value && !filterModalInstance.value) {
            // Only create a new Modal instance if one does not already exist
            filterModalInstance.value = new Modal(filterModalElement.value);
        }
        filterModalInstance.value.show(); // Show the modal
    });
}
/**
 * modal not previwing inside default way.
 * this is to attach modal to main root component
 * root component is inside app/Header
 * @type {Ref<UnwrapRef<null>>}
 */
// const componentRoot = ref(null);
// onMounted(() => {
//     nextTick(() => {
//         if (componentRoot.value) {
//             const modal = componentRoot.value.querySelector('.modal');
//             document.getElementById('modal-root').appendChild(modal);
//         }
//     });
// });

const triggureArea = computed(() => {
    return store.getters.queryArea;
});

watch(triggureArea,function (area,oldEvent) {
    if (area){
        clearAllLayers()
    }
});

const clearAllLayers = () => {
   previewdLayers.value.forEach(function (layer) {
       toRaw(layer.data).setMap(null);
   });
    store.commit('setLayerPoints',[]);
    store.commit('setLegend',[]);
}

const modalRequestClose = () => {
    if (filterModalInstance.value) {
        filterModalInstance.value.hide();
    }
}

</script>
<style>
.gm-ui-hover-effect{
    background-color: #fff !important;
}
</style>
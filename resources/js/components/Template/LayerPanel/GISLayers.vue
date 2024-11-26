<template >
    <div>
        <card class="mb-3">

            <card-body>
                <div class="d-flex fw-bold small mb-3">
                    <span class="flex-grow-1">Spatial Layers</span>
                    <card-expand-toggler />
                </div>
                <perfect-scrollbar class="h-300px">
                    <div class="accordion" id="level1">
                        <template v-for="(item, key) in layerArray">
                            <div class="accordion-item" v-if="item.child && item.child.length > 0">
                                <h2 class="accordion-header">
                                    <button class="accordion-button" type="button" data-bs-toggle="collapse" :data-bs-target="'#c'+item.id">
                                        {{ item.name }}
                                    </button>
                                </h2>
                                <div :id="'c'+item.id" class="accordion-collapse collapse show" data-bs-parent="#level1">
                                    <div class="accordion-body">
                                        <div class="accordion" :id="'level2'+item.id">
                                            <template v-for="(item2, key2) in item.child">
                                                <div v-if="item2.child && item2.child.length > 0" class="accordion-item">
                                                    <h2 class="accordion-header">
                                                        <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#c'+item2.id">
                                                            {{ item2.name }}
                                                        </button>
                                                    </h2>
                                                    <div :id="'c'+item2.id" class="accordion-collapse collapse" :data-bs-parent="'#level2'+item.id">
                                                        <div class="accordion-body">
                                                            <div class="accordion" :id="'level3'+item2.id">
                                                                <template v-for="(item3, key3) in item2.child">
                                                                    <div v-if="item3.child && item3.child.length > 0" class="accordion-item">
                                                                        <h2 class="accordion-header">
                                                                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" :data-bs-target="'#c'+item3.id">
                                                                                {{ item3.name }}
                                                                            </button>
                                                                        </h2>
                                                                        <div :id="'c'+item3.id" class="accordion-collapse collapse" :data-bs-parent="'#level3'+item2.id">
                                                                            <div class="accordion-body">
                                                                                <div class="list-group-item d-flex align-items-center" v-for="(item4, key4) in item3.child">
                                                                                    <div class="align-items-center">
                                                                                        <div class="form-check">
                                                                                            <input class="form-check-input" v-model="item4.visibility" type="checkbox">
                                                                                        </div>
                                                                                    </div>
                                                                                    <div class="flex-fill px-3">
                                                                                        <div class="fw-bold">{{ item4.name }}</div>
                                                                                    </div>
                                                                                    <div class="dropdown">
                                                                                        <a href="#" data-bs-toggle="dropdown" class="text-inverse text-opacity-50"><i class="fa fa-ellipsis-h"></i></a>
                                                                                        <div class="dropdown-menu dropdown-menu-end">
                                                                                            <a href="#" class="dropdown-item" @click="startQuerying(item2.name,item4.name,item4.value)">Query</a>
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                    <!-- If there's no child, render list item directly -->
                                                                    <div v-else class="list-group-item d-flex align-items-center">
                                                                        <div class="align-items-center">
                                                                            <div class="form-check">
                                                                                <input class="form-check-input" v-model="item3.visibility" type="checkbox">
                                                                            </div>
                                                                        </div>
                                                                        <div class="flex-fill px-3">
                                                                            <div class="fw-bold">{{ item3.name }}</div>
                                                                        </div>
                                                                        <div class="dropdown">
                                                                            <a href="#" data-bs-toggle="dropdown" class="text-inverse text-opacity-50"><i class="fa fa-ellipsis-h"></i></a>
                                                                            <div class="dropdown-menu dropdown-menu-end">
                                                                                <a href="#" class="dropdown-item" @click="startQuerying(item.name,item3.name,item3.value,item3.visibility,item2.color,item2.fillColor)">Query</a>
                                                                            </div>
                                                                        </div>
                                                                    </div>
                                                                </template>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <!-- If there's no child, render list item directly for level 2 -->
                                                <div v-else class="list-group-item d-flex align-items-center">
                                                    <div class="align-items-center">
                                                        <div class="form-check">
                                                            <input class="form-check-input" v-model="item2.visibility" type="checkbox">
                                                        </div>
                                                    </div>
                                                    <div class="flex-fill px-3">
                                                        <div class="fw-bold">{{ item2.name }}</div>
                                                    </div>
                                                    <div class="dropdown">
                                                        <a href="#" data-bs-toggle="dropdown" class="text-inverse text-opacity-50"><i class="fa fa-ellipsis-h"></i></a>
                                                        <div class="dropdown-menu dropdown-menu-end">
                                                            <a href="#" class="dropdown-item" @click="startQuerying(item.name,item2.name,item2.value,item2.visibility,item2.color,item2.fillColor)">Query</a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <!-- If there's no child, render list item directly for level 1 -->
                            <div class="list-group-item d-flex align-items-center" v-else>
                                <div class="align-items-center">
                                    <div class="form-check">
                                        <input class="form-check-input" v-model="item.visibility" type="checkbox">
                                    </div>
                                </div>
                                <div class="flex-fill px-3">
                                    <div class="fw-bold">{{ item.name }}</div>
                                </div>
                                <div class="dropdown">
                                    <a href="#" data-bs-toggle="dropdown" class="text-inverse text-opacity-50"><i class="fa fa-ellipsis-h"></i></a>
                                    <div class="dropdown-menu dropdown-menu-end">
                                        <a href="#" class="dropdown-item" @click="startQuerying(item.name,item.name,item.value,item.visibility,item.color,item.fillColor)">Query</a>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </div>

                </perfect-scrollbar>
            </card-body>

        </card>


<!--        &lt;!&ndash;Creating new layers&ndash;&gt;-->
<!--        <v-dialog-->
<!--            v-model="new_layer_dialog"-->
<!--            fullscreen-->
<!--            :scrim="false"-->
<!--            transition="dialog-bottom-transition"-->
<!--        >-->
<!--            <v-card color="#f9f9f9">-->
<!--                <v-card-subtitle style="background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(17,55,35,1) 35%, rgba(30,92,41,1) 100%);text-align: right;color: white;opacity: unset;" >-->
<!--                    <v-btn variant="text" size="small" >-->
<!--                        <v-icon style="font-weight: bolder">mdi-close</v-icon>-->
<!--                    </v-btn>-->
<!--                </v-card-subtitle>-->
<!--                <v-card-text>-->
<!--                    <CreateLayer />-->
<!--                </v-card-text>-->
<!--            </v-card>-->
<!--        </v-dialog>-->
<!--        &lt;!&ndash;update data&ndash;&gt;-->
<!--        <v-dialog-->
<!--            v-model="cidb_upload_dialog"-->
<!--            fullscreen-->
<!--            :scrim="false"-->
<!--            transition="dialog-bottom-transition"-->
<!--        >-->
<!--            <v-card color="#f9f9f9">-->
<!--                <v-card-subtitle style="background: linear-gradient(90deg, rgba(2,0,36,1) 0%, rgba(17,55,35,1) 35%, rgba(30,92,41,1) 100%);text-align: right;color: white;opacity: unset;" >-->
<!--                    <v-btn variant="text" size="small" @click="cidb_upload_dialog = false">-->
<!--                        <v-icon style="font-weight: bolder">mdi-close</v-icon>-->
<!--                    </v-btn>-->
<!--                </v-card-subtitle>-->
<!--                <v-card-text>-->
<!--                    <UploadData />-->
<!--                </v-card-text>-->
<!--            </v-card>-->
<!--        </v-dialog>-->

<!--        &lt;!&ndash;Query&ndash;&gt;-->
<!--        <v-dialog-->
<!--            v-model="query_dialog"-->
<!--            width="450"-->
<!--            persistent-->
<!--            :scrim="false"-->
<!--        >-->
<!--            <v-card color="#f9f9f9" class="vss-movable">-->
<!--                <v-card-subtitle style="text-align: right;" >-->
<!--                    <v-btn variant="text" size="small" @click="query_dialog = false">-->
<!--                        <v-icon style="font-weight: bolder">mdi-close</v-icon>-->
<!--                    </v-btn>-->
<!--                </v-card-subtitle>-->
<!--                <v-card-title v-if="selectedLayer" style="align-content: center;justify-content: center;text-align: center;">-->
<!--                    {{selectedLayer.name}} Layer-->
<!--                </v-card-title>-->
<!--                <v-card-text>-->
<!--                    <v-row>-->
<!--                        <v-col cols="12" lg="4">-->
<!--                            <v-select class="small-select" variant="outlined" density="compact" label="Attribute" :items="selectedLayer.attributes" v-model="selectedAttribute" @update:modelValue="setSelectedAttrValues()"></v-select>-->
<!--                        </v-col>-->
<!--                        <v-col cols="12" lg="4">-->
<!--                            <v-select class="small-select" variant="outlined" density="compact" label="Logic" :items="['=','<','>','≠']" v-model="dataOperator"></v-select>-->
<!--                        </v-col>-->
<!--                        <v-col cols="12" lg="4">-->
<!--                            <v-combobox class="small-select" variant="outlined" density="compact" label="Value" :items="selectedAttrValues" v-model="selectedAttrVal"></v-combobox>-->
<!--                        </v-col>-->
<!--                    </v-row>-->
<!--                    <v-card >-->
<!--                        <v-card-text v-if="selectedLayer && selectedLayer.queries">-->
<!--                            {{ selectedLayer.queries}} &nbsp; <span> <v-btn variant="tonal" size="x-small" @click="runQuery('clear','=','All')">Clear</v-btn></span>-->
<!--                        </v-card-text>-->
<!--                    </v-card>-->
<!--                </v-card-text>-->
<!--                <v-card-actions>-->
<!--                        <v-btn variant="tonal" color="primary" @click="runQuery(selectedAttribute,dataOperator,selectedAttrVal)" :disabled="!selectedAttrVal || !dataOperator || !selectedAttrVal">Run Query</v-btn>-->
<!--                        <v-btn variant="tonal" color="success" @click="downLoadResult(selectedLayer.filteredData,selectedLayer.name)" v-if="selectedLayer.queries">Download</v-btn>-->
<!--                </v-card-actions>-->
<!--            </v-card>-->
<!--        </v-dialog>-->
    </div>
</template>
<script setup>
import {computed, inject, ref, toRaw, watch} from "vue";
import handleResize from "../../../composables/application/handleResize";
import generalAxiosRequest from "../../../composables/application/generalAxiosRequest";
import loadGeoJSONOnMap from "../../../composables/map/loadGeoJSONOnMap";
import refactorGeometrytoGeoJSON from "../../../composables/map/refactorGeometrytoGeoJSON";
import $ from 'jquery';
import {useStore} from "vuex";
// import loadGeoJSONOnMapTiled from "../../composables/map/loadGeoJSONOnMapTiled";
// import notificationHandling from "../../composables/application/notificationHandling";
// // import UploadData from "../uploadData.vue";
// import AreaSelection from "../../Reusables/AreaSelection.vue";
// import Query from "../Query.vue";
// import Sentinel from "../sentinel.vue";
import mapBounds from "../../../composables/map/mapBounds";
import ujWorkBook from "../../../composables/application/ujWorkBook";

const store = useStore()
const tab = ref(null);
const new_layer_dialog = ref(false)
//initialising window resizing function
const {applicationWindow} = handleResize(40,87);
const $loading =  inject('$loading')
const layerArray = ref([

    {id:1,name:'Phase 1 - VIS & CSA',child:[
            {id:11,name:'Project Cascade',value:'cascade',visibility:false,layer:null,color:'#673AB7',fillColor:'#E1BEE7'},
            {id:12,name:'Project River Basins',value:'River_Basing',visibility:false,layer:null,color:'#2962FF',fillColor:'#03A9F4'},
            {id:13,name:'Command Area',value:'command_area',visibility:false,layer:null,color:'#2962FF',fillColor:'#03A9F4'},
            {id:14,name:'325_Tanks',value:'tanks',visibility:false,layer:null,color:'#FF0000'},
            {id:15,name:'CI',value:'tanks',visibility:false,layer:null,color:'#FF0000'},
            {id:16,name:'CSA women beneficiaries',
                child:[
                    {id:161,name:'WB Anuradapura',value:'women_b_anuradhapura',visibility:false,layer:null,color:'#673AB7'},
                    {id:162,name:'WB Vavuniya',value:'women_b_vavuniya',visibility:false,layer:null,color:'#2962FF'},
                    {id:163,name:'WB Kurunegala',value:'women_b_kurunegala',visibility:false,layer:null,color:'#FF0000'},
                ]
            },
        ]
    },
    {id:2,name:'Phase 2 - Drinking Water',child:[
            {id:21,name:'CWSS',value:'cwss',visibility:false,layer:null,color:'#000000'},
            {id:22,name:'RWH',value:'rwh',visibility:false,layer:null,color:'#0000FF'},
            {id:23,name:'AFS',value:'afs',visibility:false,layer:null,color:'#FF0000'},
        ]
    },
    {id:3,name:'Phase 3 - Hazard & Early Warnings',child:[
            {id:31,name:'Early Warning',child:[
                    {id:311,name:'Automated Hydro Observation Network',value:'auto_hydro_obs_netwrk',visibility:false,layer:null,color:'#FF0000'},
                    {id:312,name:'Automated Rain Gauges',value:'auto_rain_gauge',visibility:false,layer:null,color:'#0000FF'},
                    {id:313,name:'Manual Rain Gauges',value:'manual_rain_gauge',visibility:false,layer:null,color:'#FF0000'},
                    {id:314,name:'Automated Weather Stations',value:'auto_weather_stn',visibility:false,layer:null,color:'#000000'},
                ]
            } ,
            {id:32,name:'Flood risk assessment',child:[
                    {id:321,name:'Flood Layer',value:'Flood_GND',visibility:false,layer:null,color:'#0000FF',fillColor:'#03A9F4'},
                    {id:322,name:'River/Stream',value:'River',visibility:false,layer:null,color:'#0000FF',fillColor:'#03A9F4'},
                    {id:323,name:'Inundated GNDs',value:'innundated_gnd',visibility:false,layer:null,color:'#0000FF',fillColor:'#03A9F4'},
                    {id:324,name:'Inedited Houses',value:'tanks',visibility:false,layer:null,color:'#FF0000'},
                    {id:325,name:'Houses',child:[
                            {id:3251,name:'Yan Oya_Houses',value:'house_yanoya',visibility:false,layer:null,color:'#FF0000'},
                            {id:3252,name:'Malwathu Oya Houses',value:'house_malwathuoya',visibility:false,layer:null,color:'#0000FF'},
                            {id:3253,name:'Mi Oya_Houses',value:'house_mioya',visibility:false,layer:null,color:'#000000'},
                        ]
                    },
                    {id:326,name:'Early warning and vulnerability',value:'EW_Vul',visibility:false,layer:null,color:'#0000FF',fillColor:'#03A9F4'},
                ]
            }
        ]
    },
]);
const defaultLayerArray = ref([
    {name:'Base Map',child:[
            {name:'ASC',value:'asc',visibility:false,layer:null},
            {name:'GND',value:'gnd',visibility:false,layer:null},
            {name:'DSD',value:'dsd',visibility:false,layer:null},
            {name:'District',value:'district',visibility:false,layer:null},
            {name:'Province',value:'province',visibility:false,layer:null},
            {name:'Road Network',value:'road',visibility:false,layer:null,color:'#0000FF',fillColor:'#03A9F4'},
            {name:'Place Names',value:'places',visibility:false,layer:null,color:'#FF0000'},
        ]
    },

]);

    const previewdLayers = ref([]);
    const previewdPoints = ref([]);
    const googleProperty = inject('$googleProperty')



    const showHideLayers = async (main_category, layer_category, layer_value, visibility,color,fillColor) => {
        console.log("visibility",visibility);
        let layer_url = main_category+"/"+layer_category+"/"+layer_value;
        let layer_exists = _.find(previewdLayers.value, {url: layer_url});
        let point_exists = _.find(previewdPoints.value, {url: layer_url});
        if (!layer_exists && !point_exists){
            console.log("url",layer_url);
            console.log("invalid layers",previewdLayers.value);
        }
        if (visibility) {
            if (layer_exists) {
                showHideFeatures(layer_exists,true);
            }else if(point_exists){
                showHidePoints(layer_url,true,point_exists)
            }
            else{
                await getLayerFromBack(layer_url, layer_value,color,fillColor);
            }
        }else{
            console.log("found layers",layer_exists);
            if (layer_exists){
                toRaw(layer_exists.data).setMap(null)
            }
            else if(point_exists){
                store.commit('setLayerPoints',[]);
                showHidePoints(layer_url,false,point_exists)
            }
        }

    }

    const showHidePoints = (layer_url,visibility,point_exists) => {
        if (visibility){
            let combData = _.concat(store.state.layerPoints,point_exists.filteredData)
            let index = _.findIndex(previewdPoints.value,{url:layer_url});
            if (index && index>0) {
                point_exists.visibility = true;
                previewdPoints.value.splice(index, 1, point_exists);
            }

            store.commit('setLayerPoints',combData)
        }else{
            previewdPoints.value.forEach((dataPoint,index) => {
                console.log("fucking layer url",layer_url)
                if (dataPoint.url === layer_url){
                    dataPoint.visibility = false;
                    previewdPoints.value.splice(index,1,dataPoint);
                }
                else{
                    if (dataPoint.visibility) {
                        // let combData = _.concat(store.state.layerPoints, dataPoint.filteredData)
                        store.commit('setLayerPoints', dataPoint.filteredData)
                    }
                }
            })
        }
    }

    const showHideFeatures = (layer_exists,visibility) => {
        let map = store.state.gmap;
      if (visibility){
          let rawLayer = toRaw(layer_exists.data);
          rawLayer.setMap(map);
          let bounds = new google.maps.LatLngBounds();
          rawLayer.forEach(function(feature) {
              mapBounds(feature.getGeometry(), bounds.extend, bounds);
          });
          map.fitBounds(bounds);
      }else{
          toRaw(layer_exists.data).setMap(null)
      }
    }

    const getLayerFromBack = async (layer_url,layer_value,color,fillColor) => {
        let map = store.state.gmap;
        const payload = {
            url: 'https://services.gsentry.cloud/api/v1/gis-layers/query',
            data: JSON.stringify({
                collection: layer_value,
                query_array: JSON.stringify(['All']),
            })
        }
        const {json_data} = await generalAxiosRequest('curl-requests/post', payload, true,$loading);
        console.log('boundary Proximity layer', json_data.value);
        if (json_data.value && json_data.value.features.length>0){
            let dataType = getDataType(json_data.value.features[0])

            if (dataType !== 'Point'){
                let geoString = refactorGeometrytoGeoJSON(json_data.value.features);
                const {previewedLayer} = loadGeoJSONOnMap(geoString, layer_value, layer_url, map, googleProperty, previewdLayers.value.length, store, color, $loading,fillColor)
                previewdLayers.value.push(previewedLayer.value);
            }else{
                let data = json_data.value.features.slice(0,1000);
                let attr = Object.keys(data[0].properties);
                data = _.map(data,function (o) {
                    color?o.color = color : o.color = '#FF0000';
                    return o;
                })
                previewdPoints.value.push({url:layer_url,data:data,visibility:true,queries:"",attributes:attr,layerType:'point',filteredData:data,name:layer_value})
                let combData = _.concat(store.state.layerPoints,data)
                store.commit('setLayerPoints',combData)
            }
        }
        console.log("fucking previews layers",previewdLayers.value)
    }

    const triggureArea = computed(() => {
        return store.getters.queryArea;
    });

    const getDataType = (dataset) => {
      return dataset.geometry.type
    }

    watch(triggureArea,function (area,oldEvent) {
        if (area){
            console.log("query started",area);
            runQuery(area.selected_area,'=',area.selected_values);
        }
    });


    const query_dialog = ref(false);
    const selectedLayer = ref(null);
    const selectedLayerURL = ref(null);
    const startQuerying = (main_category, layer_category, layer_value) => {
        let layer_url = main_category+"/"+layer_category+"/"+layer_value;
        let layer_exists = _.find(previewdLayers.value, {url: layer_url});
        let point_exists = _.find(previewdPoints.value, {url: layer_url});
        selectedLayerURL.value = layer_url;
        if (layer_exists){
            selectedLayer.value = layer_exists;
        }else if(point_exists){
            selectedLayer.value = point_exists
        }
        query_dialog.value = true;
    }




    const selectedAttribute = ref(null);
    const dataOperator = ref(null);
    const selectedAttrValues = ref([]);
    const selectedAttrVal = ref(null);

    const setSelectedAttrValues = ()=>{
        console.log("selectedLayerValue",selectedLayer.value);
        let groupedData;
        // if (selectedLayer.value.layerType === 'point'){
        //     groupedData = _.groupBy(selectedLayer.value.data,selectedAttribute.value);
        // }else{
            let dataArr = [];
            selectedLayer.value.data.forEach(function(feature) {
                if (selectedLayer.value.layerType === 'point')
                    dataArr.push(feature.properties);
                else
                    dataArr.push(feature[googleProperty]);
            });
            groupedData = _.groupBy(dataArr,selectedAttribute.value);
        // }
        console.log("groupedData",groupedData);
        selectedAttrValues.value = Object.keys(groupedData);
    }

    const runQuery = (attr,operator,values)=>{
        console.log(attr+" "+operator+" "+values);
        if (values === 'All'){
            selectedLayer.value.queries = "";
        }else{
            selectedLayer.value.queries = attr+" "+operator+" "+values;
        }
        if (selectedLayer.value.layerType === 'point')
            filteredPoints(attr,operator,values)
        else
            filterLayers(attr,operator,values)

        // query_dialog.value = false;
        selectedAttribute.value = null;
        selectedAttrValues.value = [];
        dataOperator.value = null;
        selectedAttrVal.value = null;
        // selectedLayerURL.value = null;
    }

    const filterLayers = (attr,operator,values) => {
        let filteredDataset = [];
        // previewdLayers.value.forEach((layer) => {
            selectedLayer.value.data.forEach((feature) => {
                console.log("fucking feature",feature)
            switch (operator) {
                case '=' :  if (isNaN(parseFloat(attr))){
                    if(feature.getProperty(attr) && feature.getProperty(attr).toLowerCase() === values.toLowerCase()){
                        selectedLayer.value.data.overrideStyle(feature, { visible: true });
                        filteredDataset.push(feature[googleProperty])
                        console.log(attr.toLowerCase() +"==="+values.toLowerCase())
                    }else{
                        if (values === 'All'){
                            selectedLayer.value.data.overrideStyle(feature, { visible: true });
                            filteredDataset.push(feature[googleProperty])
                        }else{
                            console.log(attr.toLowerCase() +"==="+values.toLowerCase())
                            selectedLayer.value.data.overrideStyle(feature, { visible: false });
                        }

                    }

                }else{
                    if(parseFloat(feature.getProperty(attr)) === parseFloat(values)){
                        selectedLayer.value.data.overrideStyle(feature, { visible: true });
                        filteredDataset.push(feature[googleProperty])
                    }else{
                        selectedLayer.value.data.overrideStyle(feature, { visible: false });
                    }
                    console.log(feature.getProperty(attr) +"==="+values.toLowerCase())
                }
                    break;
                case ">": if (!isNaN(parseFloat(feature.getProperty(attr)))){
                    if(parseFloat(feature.getProperty(attr)) > parseFloat(values)){
                        selectedLayer.value.data.overrideStyle(feature, { visible: true });
                        filteredDataset.push(feature[googleProperty])
                    }else{
                        selectedLayer.value.data.overrideStyle(feature, { visible: false });
                    }
                }
                    break;
                case "<": if (!isNaN(parseFloat(feature.getProperty(attr)))){
                    if(parseFloat(feature.getProperty(attr)) < parseFloat(values)){
                        selectedLayer.value.data.overrideStyle(feature, { visible: true });
                        filteredDataset.push(feature[googleProperty])
                    }else{
                        selectedLayer.value.data.overrideStyle(feature, { visible: false });
                    }
                }
                    break;
                case "≠":  if(feature.getProperty(attr) !== values){
                    selectedLayer.value.data.overrideStyle(feature, { visible: true });
                    filteredDataset.push(feature[googleProperty])
                }else{
                    selectedLayer.value.data.overrideStyle(feature, { visible: false });
                }
                    break;
            }
        });
        // });
        selectedLayer.value.filteredData = filteredDataset;
        let index = _.findIndex(previewdLayers.value, {url: selectedLayerURL.value});
        console.log("replacing Index",selectedLayerURL);
        previewdLayers.value.splice(index,1,selectedLayer.value);
        console.log("fucking preview Layers",previewdLayers.value)
    }

    const filteredPoints = (attr,operator,values) => {
        let combData = []
        previewdPoints.value.forEach((dataPoint,index) => {

            if (dataPoint.url === selectedLayerURL.value){
                if (values === 'All'){
                    dataPoint.filteredData = dataPoint.data;
                    previewdPoints.value.splice(index,1,dataPoint);
                    combData = _.concat(combData, dataPoint.data)
                }else{
                    const newdataset = [];
                    dataPoint.filteredData.forEach((point,index)=>{
                        switch (operator) {
                            case '=' :  if (isNaN(parseFloat(attr))){
                                if(point.properties[attr] && point.properties[attr].toLowerCase() === values.toLowerCase()){
                                    newdataset.push(point)
                                }
                            }else{
                                if(parseFloat(point.properties[attr]) === parseFloat(values)){
                                    newdataset.push(point)
                                }
                            }
                                break;
                            case ">": if (!isNaN(parseFloat(point.properties[attr]))){
                                if(parseFloat(point.properties[attr]) > parseFloat(values)){
                                    newdataset.push(point)
                                }
                            }
                                break;
                            case "<": if (!isNaN(parseFloat(point.properties[attr]))){
                                if(parseFloat(point.properties[attr]) < parseFloat(values)){
                                    newdataset.push(point)
                                }
                            }
                                break;
                            case "≠":  if(point.properties[attr] !== values){
                                newdataset.push(point)
                            }
                                break;
                        }
                    });
                    dataPoint.filteredData = newdataset;
                    previewdPoints.value.splice(index,1,dataPoint);
                    combData = _.concat(combData, newdataset)
                }

            }
            else{
                if (dataPoint.visibility) {
                     combData = _.concat(combData, dataPoint.filteredData)
                }
            }
        });
        store.commit('setLayerPoints', combData)
    }
    const cidb_upload_dialog = ref(false);
    const isNotPreviewd = (main_category, layer_category, layer_value) => {
        let layer_url = main_category+"/"+layer_category+"/"+layer_value;
        let layer_exists = _.find(previewdLayers.value, {url: layer_url});
        let point_exists = _.find(previewdPoints.value, {url: layer_url});
        return !layer_exists && !point_exists;
    }

    const downLoadResult = (dataset,name) => {
        if (selectedLayer.value.layerType === 'point')
            dataset = _.map(dataset,'properties');

        console.log("fucking result",dataset)
        ujWorkBook(dataset, "Query Result "+name)
    }

</script>

<style>


.scroller::-webkit-scrollbar {
   width: 8px;
}
.scroller::-webkit-scrollbar-track {
    background: #555;
}
.scroller::-webkit-scrollbar-thumb {
    background: #888;
    border: none !important;
}
/*.scroller::-webkit-scrollbar-track-piece {*/
/*    background: #555 !important;*/
/*}*/
.keep-scrolling {
    overflow-y: scroll; /* Add the ability to scroll y axis*/
    overflow-x: hidden;
}

/* Hide scrollbar for Chrome, Safari and Opera */
.keep-scrolling::-webkit-scrollbar {
    display: none;
}

/* Hide scrollbar for IE, Edge and Firefox */
.keep-scrolling {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
}
</style>

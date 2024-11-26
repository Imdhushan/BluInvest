<template>
    <div>
     <div class="list-group-item d-flex align-items-center mt-2">
        <div class="align-items-center">
            <div class="form-check">
                <input class="form-check-input" v-model="item.visibility"
                       type="checkbox"
                       @change="showHideLayers(item.lid,item.value,item.visibility,item.color,item.fillColor,item.name,item.legend)"
                >
            </div>
        </div>
        <div class="flex-fill px-3">
            <div class="fw-bold">{{ item.name }}</div>
        </div>
        <div class="dropdown">
            <a href="#" data-bs-toggle="dropdown" class="text-inverse text-opacity-50"><i class="fa fa-ellipsis-h"></i></a>
            <div class="dropdown-menu dropdown-menu-end">
                <a href="#" class="dropdown-item"  @click="startQuerying(item.lid)">Query</a>
            </div>
        </div>
    </div>
        <div ref="componentRoot">
            <div class="modal fade" :id="'filter'+item.lid" ref="filterModalElement" style="z-index: 9999999;" >
                <div class="modal-dialog" style="z-index: 9999999;">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h4 class="modal-title">
                                Apply Filters for {{item.name}} <br/>
                                <small class="text-opacity-50 small" v-if="selectedLayer">Total of {{selectedLayer.data.length}} features</small>
                            </h4> 
                            
                            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                        </div>
                        <div class="modal-body">
                            <LayerQuery
                                v-if="selectedLayer"
                                :lid="item.lid"
                                :previewd-layers="previewdLayers"
                                :previewd-points="previewdPoints"
                                :selected-layer="selectedLayer"
                                @requestClose="modalRequestClose"
                            />
                            <div v-else>
                                <card class="card mb-3">
                                    <card-body class="p-2">
                                        <div class="d-flex fw-bold small mb-3">
                                            <span class="flex-grow-1">
                                                Please preview the layers before querying it
                                            </span>
                                        </div>
                                    </card-body>
                                </card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import {computed, inject, nextTick, onMounted, ref, toRaw, watch} from "vue";
import mapBounds from "../../../composables/map/mapBounds";
import loadGeoJSONOnMap from "../../../composables/map/loadGeoJSONOnMap";
import refactorGeometrytoGeoJSON from "../../../composables/map/refactorGeometrytoGeoJSON";
import generalAxiosRequest from "../../../composables/application/generalAxiosRequest";
import {useStore} from "vuex";
import LayerQuery from "./LayerQuery.vue";
import { Modal } from 'bootstrap'
import {applyMapLegend, showHideLegends} from "../../../composables/map/layers/SpatialListFunctions";

const store = useStore()
const props = defineProps({
    item: Object,
});

const previewdLayers = ref([]);
const previewdPoints = ref([]);
const googleProperty = inject('$googleProperty')



const showHideLayers = async (lid, layer_value, visibility,color,fillColor,name,legends) => {
    console.log("visibility",visibility);

    let layer_exists = _.find(previewdLayers.value, {id: lid});
    let point_exists = _.find(previewdPoints.value, {id: lid});
    if (!layer_exists && !point_exists){
        console.log("layer id",lid);
        console.log("invalid layers",previewdLayers.value);
    }
    if (visibility) {
        if (layer_exists) {
            showHideFeatures(layer_exists,true,name);
            showHideLegends(lid,visibility,name,store);
        }else if(point_exists){
            showHidePoints(lid,true,point_exists,name)
            showHideLegends(lid,visibility,name,store);
        }
        else{
            if (layer_value !== 'ci_local'){
                await getLayerFromBack(lid, layer_value,color,fillColor,name,legends);
            }else{
                let json_data = localStorage.getItem('ciData');
                json_data = JSON.parse(json_data);
                if (json_data) {
                    applyInitialCIPointOnMap(json_data, layer_value, lid, color, name, legends)

                }
            }

        }
    }else{
        console.log("found layers",layer_exists);
        if (layer_exists){
            toRaw(layer_exists.data).setMap(null);
        }
        else if(point_exists){
            store.commit('setLayerPoints',[]);
            showHidePoints(lid,false,point_exists)
        }
        showHideLegends(lid,visibility,name,store);
    }

}

const showHidePoints = (lid,visibility,point_exists,name) => {
    if (visibility){
        let combData = _.concat(store.state.layerPoints,point_exists.filteredData)
        let index = _.findIndex(previewdPoints.value,{id:lid});
        if (index && index>0) {
            point_exists.visibility = true;
            previewdPoints.value.splice(index, 1, point_exists);
        }

        store.commit('setLayerPoints',combData)
    }else{
        previewdPoints.value.forEach((dataPoint,index) => {
            console.log("fucking layer id",lid)
            if (dataPoint.id === lid){
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

const showHideFeatures = (layer_exists,visibility,name) => {
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

const $loading =  inject('$loading')
const getLayerFromBack = async (lid,layer_value,color,fillColor,name,legends) => {
    console.log("get Value  lid,layer_value,color,fillColor,name,legends",lid,layer_value,color,fillColor,name,legends);
    let queryArea = localStorage.getItem('queryData');
    queryArea = JSON.parse(queryArea);
    let query_array = ['All'];

    if (queryArea){
        console.log("qval",queryArea.selected_values)
            query_array = [
                {attribute:queryArea.selected_area,logic:"=",value:queryArea.selected_values[0]}
            ]
    }
    let map = store.state.gmap;
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
const componentRoot = ref(null);
onMounted(() => {
    nextTick(() => {
        if (componentRoot.value) {
            const modal = componentRoot.value.querySelector('.modal');
            document.getElementById('modal-root').appendChild(modal);
        }
    });
});

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

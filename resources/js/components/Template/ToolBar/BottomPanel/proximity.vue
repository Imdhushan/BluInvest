<template>
<div>
    <card class="mb-3">
        <card-body>
            <div class="d-flex fw-bold small mb-3">
                <span class="flex-grow-1">Proximity Analysis</span>
                <card-expand-toggler />
            </div>
            <div class="row">
                <div class="col-xl-6 col-lg-12">
                    <div>
                        <label class="form-label" for="proxyDataset">Dataset</label>
                        <select class="form-select form-select-sm" id="proxyDataset" v-model="dataset" aria-label="Select a Dataset">
                            <option v-for="dataset in datasets">{{dataset}}</option>
                        </select>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-12">
                    <div>
                        <label class="form-label" for="proxyRadius">Radius (Km)</label>
                        <input type="number" class="form-control form-select-sm" id="proxyRadius"  placeholder="Radius" v-model="radius">
                    </div>
                </div>
            </div>
            <hr />
            <span style="font-size: small">latitude  : <strong>{{lat}}</strong>  </span> &nbsp; , &nbsp;
            <span style="font-size: small">longitude : <strong>{{lng}}</strong> </span>
            <hr />
            <div class="row">
                <div class="col-xl-6 col-lg-12">
                    <div class="form-check">
                        <input class="form-check-input" id="checkBuffer" v-model="buffer" @change="bufferOnOff(buffer)" type="checkbox">
                        <label class="form-check-label" for="checkBuffer">Buffer</label>
                    </div>
                </div>
                <div class="col-xl-6 col-lg-12">
                    <button type="button" @click="doProximity()"
                            class="btn btn-outline-theme btn-sm"
                            :class="isNaN(lat) || !dataset || isNaN(radius) ? 'disabled':''"
                            :aria-disabled="isNaN(lat) || !dataset || isNaN(radius)"
                    >Analyze</button>
                </div>
            </div>
            <hr />
            <card class="mb-3" v-if="previewdLayers.length>0">
                <div class="list-group-item d-flex align-items-center mt-2" v-for="(item,key2) in previewdLayers">
                        <div class="align-items-center">
                            <div class="form-check">
                                <input class="form-check-input" v-model="item.visibility" @change="showHideLayers(key2,item.visibility)" type="checkbox">
                            </div>
                        </div>
                        <div class="flex-fill px-3">
                            <div class="fw-bold">{{ item.name }}</div>
                        </div>
                        <div class="flex-fill px-3">
                            <button type="button" @click="downloadData(item.properties,item.name,item.attributes)"
                                    class="btn btn-outline-secondary btn-sm">Download</button>
                        </div>
                </div>
            </card>


        </card-body>
    </card>
</div>
</template>

<script setup>
import {ref, defineEmits, watch, computed, toRaw, inject} from "vue";
import {useStore} from "vuex";
import {UJCircle, UJPoint} from "../../../../composables/map/Drawings/MapElementDrawer";
import generalAxiosRequest from "../../../../composables/application/generalAxiosRequest";
import ColorArray from "../../../../composables/application/colorArray";
import refactorGeometrytoGeoJSON from "../../../../composables/map/refactorGeometrytoGeoJSON";
import loadGeoJSONOnMap from "../../../../composables/map/loadGeoJSONOnMap";
import ujWorkBook from "../../../../composables/application/ujWorkBook";
import {useProgress} from "@marcoschulte/vue3-progress";

const emits = defineEmits(['update:proximityTable']);
const store = useStore();


const dataset = ref("tanks");
const datasets = ref(['tanks','cascade','women benificiaries','NWSDB_Connection','Inundated_house'])
const lat = ref( "8.581");
const lng = ref("80.363");
const radius = ref(10);

const mapLocation = computed(() => {
    return store.getters.mapLocation
})
watch(mapLocation,function (newEvent,oldEvent) {
    if (newEvent && newEvent.lat){
        lat.value = newEvent.lat.toFixed(3);
        lng.value = newEvent.lng.toFixed(3);
    }
});

const buffer = ref(false);
const bufferCircle = ref(null)
const bufferPoint = ref(null)
const bufferOnOff = async (visibility) => {
    let map = store.state.gmap;
    let latitude = parseFloat(lat.value);
    let longitude = parseFloat(lng.value);
    let radius_len = parseInt(radius.value) * 1000;
    if (visibility) {
        bufferCircle.value = UJCircle(latitude, longitude, radius_len, '#00F', '#00F', 0.2);
        bufferPoint.value = await UJPoint(latitude, longitude, '#000', 2.5);
        toRaw(bufferCircle.value).setMap(map);
        toRaw(bufferPoint.value).setMap(map);
        map.setCenter({lat: latitude, lng: longitude});
        map.setZoom(10);
    } else {
        toRaw(bufferCircle.value).setMap(null);
        toRaw(bufferPoint.value).setMap(null);
    }
}


const runCounter = ref(0);
const loading  = ref(false);
const tableData = ref([]);
const tableHeading = ref([]);
const doProximity = async () => {
    const progressp = useProgress().start();
    loading.value = true;
    let collection = dataset.value;
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/analysis/proximity',
        data: JSON.stringify({
            collection: collection,
            lat: lat.value,
            lng: lng.value,
            radius: radius.value,
            data_filters: JSON.stringify([]),
        })
    }
    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);
    console.log("proximity results",json_data.value);
    let color = ColorArray(runCounter.value);
    let rowData = toRaw(json_data.value);

    let results = _.map(rowData,function (o) {
        // tableData.value.push(o.data.properties);
            o.data.properties.proximity_lat = lat.value;
            o.data.properties.proximity_lng = lng.value;
            o.data.properties.proximity_radius = radius.value;
            o.data.properties.proximity_distance = o.distance;
            return o.data;
    })
    console.log("properties",results)
    // if (tableData.value && tableData.value.length>0) {
        // tableHeading.value = Object.keys(tableData.value[0]);
        showGeoJSON(results,color);
        runCounter.value++;
    // }

    progressp.finish();
    loading.value = false;
}

const previewdLayers = ref([]);
const $loading =  inject('$loading')
const googleProperty = inject('$googleProperty')
const showGeoJSON = (json_data,color) => {
    let geoString = refactorGeometrytoGeoJSON(json_data);
    const {previewedLayer} = loadGeoJSONOnMap(geoString, dataset.value, dataset.value, store.state.gmap, googleProperty, previewdLayers.value.length, store, color, $loading)
    previewdLayers.value.push(previewedLayer.value);
}

const downloadData = (tblData,name,attributes) => {
    ujWorkBook(tblData, "Proximity Result")
    // emits('update:proximityTable', {dataset:tblData,visibility:true,
    //     title:'Proximity Dataset Of '+dataset.value,
    //     subtitle:'Latitude '+tblData[0].proximity_lat+' , '+'Longitude '+tblData[0].proximity_lng+' Radius '+tblData[0].proximity_radius +' Km',
    //     headings:attributes.map(col => ({ key: col, title: col }))
    // });
}

const showHideLayers = (index,visibility) => {
  let layer = previewdLayers.value[index];
  console.log("fucking index",index)
  console.log("fucking all layers",previewdLayers.value)
    if (visibility){
        layer.data.setMap(store.state.gmap);
    }else{
        toRaw(layer.data).setMap(null);
    }
}
</script>

<style scoped>

</style>

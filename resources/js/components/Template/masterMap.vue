<template>
    <div>
         <card class="mb-3 ">
            <card-body>
    
                <GoogleMap ref="mapRef" id="map_canvas" api-key="AIzaSyBKwT3-cq00IaM04TcHh1UiePAgjbp9LN4"
                           v-bind:style="{ 'width': applicationWindow.width/1.86+'px','height':applicationWindow.height +'px' }"
                           :center="center" :zoom="6.8"
                           :zoomControl="false"
                           mapTypeId="hybrid"
                           class="map_div"
                           :control-size="24"
                           :mapTypeControl="false"
                           :fullscreenControl="true"
                           :scaleControl="true"
                           street-view-control-position="LEFT_BOTTOM"
                           fullscreen-control-position="TOP_LEFT"
                           :libraries="['visualization','drawing','geometry','places']"
                           @click="mapClicked">
    
                    <CustomControl position="TOP_RIGHT">
                        <button type="button" class="btn btn-white btn-sm mt-1">
                            <i class="bi bi-arrow-up"></i> N
                        </button>
                    </CustomControl>
    
                    <Marker v-for="(pd, i) in chatPoints" @click="markerClick(pd,'chat')" :options="{ position: {lat:pd.lat , lng:pd.lon },icon: getCircleIcon(pd.color)}" :key="i" />
                   <MarkerCluster :zoomOnClick="true" v-if="clusterCheck">
                        <Marker v-for="(pd, i) in gisLayerPoints" @click="markerClick(pd.properties,'layer',pd.geometry.coordinates[1],pd.geometry.coordinates[0])" :options="{ position: {lat:pd.geometry.coordinates[1] , lng:pd.geometry.coordinates[0] },icon: getCircleIcon(pd.color)}" :key="i" />
                   </MarkerCluster>
                   <Marker v-else v-for="(pd, i) in gisLayerPoints" @click="markerClick(pd.properties,'layer',pd.geometry.coordinates[1],pd.geometry.coordinates[0])" :options="{ position: {lat:pd.geometry.coordinates[1] , lng:pd.geometry.coordinates[0] },icon: getCircleIcon(pd.color)}" :key="i" />
                </GoogleMap>

                
                
  
            </card-body>
        </card>
       
    </div>
    </template>
    
    
    <script setup >
    import {CustomControl, GoogleMap, InfoWindow, Marker, MarkerCluster} from "vue3-google-map";
    import {useStore} from "vuex";
    import {computed, inject, nextTick, ref, toRaw, watch,onUnmounted} from "vue";
    import loadGeoJSONOnMap from "../../composables/map/loadGeoJSONOnMap";
    import toggleInfoJsonMarker from "../../composables/map/toggleInfoJsonMarker";
    import handleResize from "../../composables/application/handleResize";
    import _ from "lodash";
    import CardBody from "../bootstrap/CardBody.vue";
    import html2canvas from "html2canvas";
    import { createCanvasOverlay } from "../../composables/map/PointCanvasDraw"
  
    //import GND from './DetailedPages/GND.geojson';
  
    const store = useStore()
    import $ from 'jquery'
    const props = defineProps({
    chatMarkers:Object
    })

   
  
   
    const mapRef = ref(null)
const GMap = ref(null);
const showLegend = ref(false);
const canvasOverlay = ref(null);
watch(() => mapRef.value?.ready, (ready) => {
    if (!ready) return
    const map = mapRef.value.map
    store.commit('setGMap', map);
    GMap.value = map;
    loadQueryBoundary(map);
    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(
        document.getElementById('bottomBarDiv')
    );
    showLegend.value = true;
    // show_gray_map()
    // overLayCustomDroneImage(map)
});





/**
 * LEGEND update of GIS layer on the fly
 * passing generated legend for the bottom bar
 */
// const mapLegend = computed(() => {
//     return store.getters.legend;
// });
// const checkMapLegendNE = ref(false);
// watch(mapLegend,function (data,oldEvent) {
//     let exists = _.find(data,{visibility:true})
//     checkMapLegendNE.value = !!exists;
// });

const googleProperty = inject('$googleProperty')
const $loading =  inject('$loading')

const queryBoundaryCheck = ref(false);
const queryBoundaryLayer = ref(null);
const loadQueryBoundary = (map) => {
    let boundary = localStorage.getItem('queryBoundary');
    boundary = JSON.parse(boundary);
    let queryData = localStorage.getItem('queryData');
    queryData = JSON.parse(queryData);
    if (boundary && queryData){
        const {previewedLayer} = loadGeoJSONOnMap(boundary, queryData.requested_area, queryData.requested_area, map, googleProperty, 1, store, '#F00', $loading)
        queryBoundaryLayer.value = previewedLayer.value
        queryBoundaryCheck.value = true;
    }
}

/**
 * Boundary update of query layer on the fly
 * passing generated google map boundary for it
 * @type {ComputedRef<null|(function(*): *)|*>}
 */
const triggureBoundary = computed(() => {
    return store.getters.queryBoundary;
});

watch(triggureBoundary,function (boundary,oldEvent) {
    if (boundary){
        if (queryBoundaryLayer.value){
            toRaw(queryBoundaryLayer.value.data).setMap(null);
        }
        queryBoundaryLayer.value = boundary
        queryBoundaryCheck.value = true;
    }
});

const showHideQueryBoundary = (visibility) => {
  if (visibility){
      toRaw(queryBoundaryLayer.value.data).setMap(GMap.value);
  }else{
      toRaw(queryBoundaryLayer.value.data).setMap(null);
  }
}

const markerClick = (data,type,latitude,longitude)=>{
    console.log("markerData",data);
    let lng = longitude
    if (latitude && longitude){
        data.lat = latitude;
        data.lng = longitude;
    }else{
        lng = data.lng? data.lng: data.lon
    }
    const {infoContent,infoPosition} = toggleInfoJsonMarker(data.lat,lng,data);
    infoWindow.value.content = infoContent.value;
    infoWindow.value.position = infoPosition.value;
}

/**
 * *info window (Google Map) arrangement
 * !this will only works with vue3-google-map version 0.17.0
 * retrieving values through vuex state management
 * @author Tayon U J
 * @version 1.0.0
 */
const infoWindow = ref({ opened:false, content:null, position:null});
const gmapInfoWindow = computed(() => {
    return store.getters.gmapInfoWindow
})

watch(gmapInfoWindow,function (newLayer,oldLayer) {
    const {infoContent,infoPosition} = toggleInfoJsonMarker(newLayer.lat,newLayer.lng,newLayer.data,newLayer.key,newLayer.type);
    infoWindow.value.content = infoContent.value;
    infoWindow.value.position = infoPosition.value;
})


//initialising window resizing function
const {applicationWindow} = handleResize(40,87);

//Google map center coordinates
const center = ref({  lat: 7.862, lng: 81.0951  })
const showLocationDetails = ref(null);
const locationData = ref(null);
const mapClicked = (event)=>{
    const { latLng } = event;
    const lat = latLng.lat();
    const lng = latLng.lng();

    const geocoder = new google.maps.Geocoder();

    console.log(`The lat lng of the clicked location is: ${lat} , ${lng}`);
    geocoder.geocode({ location: { lat, lng } }, (results, status) => {
        if (status === google.maps.GeocoderStatus.OK && results[0]) {
            const address = results[0].formatted_address;
            let payload = {lat:lat,lng:lng,address:address}
            store.commit('setMapLocation',payload);
            locationData.value = payload;
            showLocationDetails.value = true;
            console.log(`The address of the clicked location is: ${address}`);
            setTimeout(function () {
                showLocationDetails.value = false;
            },10000)
        } else {
            let payload = {lat:lat,lng:lng,address:status}
            store.commit('setMapLocation',payload);

            console.error(`Geocode was not successful for the following reason: ${status}`);
        }
    })
}

// const gisLayerPoints = computed(() => {
//     return store.getters.layerPoints
// })

const chatPoints = ref([]);
watch(() => props.chatMarkers, (data, oldEvent) => {
    console.log("chat markers triggured",data);
    if (data)
        showChatMarkers(toRaw(data))
})
const showChatMarkers = (data)=>{
    console.log("showChatMarkers",data);
    if (data.visibility){
        chatPoints.value =  _.concat(chatPoints.value,data.points.value);
        GMap.value.fitBounds(data.bounds);
    }
    else{
        chatPoints.value = _.reject(chatPoints.value,{'id':data.id});
    }

}

const getCircleIcon = (color)=> {
    return {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 3.5,
        fillColor: color,
        fillOpacity: 0.6,
        strokeWeight: 0.3,
        labelOrigin: {x: -7, y: 0}
    }
}



// This function is responsible for capturing the map image
const downloadImage = async () => {
    const el = $('#map_canvas').get(0);
    // const el = this.$refs.mapDiv;
    console.log("element",el);
    const options = {
        type: "dataURL",
    };
    const printCanvas = await html2canvas(el, {
        useCORS: true,
        optimized: false,
        allowTaint: false,
    });
    let width = applicationWindow.value.width/2.4;
    let height = applicationWindow.value.height/1.9;
    var tempcanvas=document.createElement('canvas');
    tempcanvas.width=width;
    tempcanvas.height=height;
    var context=tempcanvas.getContext('2d');

    console.log("fucking width",width);
    context.drawImage(printCanvas,0,0,width,height,0,0,width,height);
    var link=document.createElement("a");
    link.href=tempcanvas.toDataURL('image/jpg');   //function blocks CORS
    const date = new Date();
    const dateString = date.toISOString().substring(0, 10); // Format as "YYYY-MM-DD"
    const timeString = date.toTimeString().split(' ')[0].replace(/:/g, '-'); // Format as "HH-MM-SS"
    link.download = `Google Map export-${dateString}-${timeString}.jpg`; // Include date and time in filename

    link.click();
    console.log("done");
};

const clusterCheck = ref(true);


const gisLayerPoints = ref([]);


function addMarkersGradually(allPoints) {
    let index = 0;
    const batchSize = 50; // Adjust based on performance and needs
    const intervalMs = 20; // Time between batches
    // const loader = $loading.show();
    clusterCheck.value = false;
    function addNextBatch() {
        const batch = allPoints.slice(index, index + batchSize);
        batch.forEach(point => gisLayerPoints.value.push(point));
        index += batchSize;

        if (index < allPoints.length) {
            setTimeout(addNextBatch, intervalMs);
        }else{
            clusterCheck.value = true;
            // loader.hide();
        }
    }

    addNextBatch();
}

const allPoints = computed(() => store.getters.layerPoints);

watch(allPoints, (newPoints) => {
    gisLayerPoints.value = []; // Reset when the source changes
    addMarkersGradually(newPoints);
}, { immediate: true });



</script>


<style>
/**Google map info window styling**/
.gm-style .gm-style-iw-d::-webkit-scrollbar-track,
.gm-style .gm-style-iw-d::-webkit-scrollbar-track-piece,
.gm-style .gm-style-iw-c,
.gm-style .gm-style-iw-t::after,
.gm-style .gm-style-iw-tc::after
{background: #1D2936;}
</style>
<template>
    <div>

        <card class="card mb-3">
            <card-body class="p-2">
                <ul class="nav nav-tabs nav-tabs-v2">
                    <li class="nav-item me-1"><a href="#baseMap" class="nav-link active" data-bs-toggle="tab">Base Maps</a></li>
                    <li class="nav-item me-1 dropdown ">
                        <a href="#" class="nav-link dropdown-toggle small" data-bs-toggle="dropdown">Other Maps</a>
                        <div class="dropdown-menu">
                            <a href="#droneMap" class="dropdown-item" data-bs-toggle="tab">Drone Maps</a>
                            <a href="#sentinelMap" class="dropdown-item" data-bs-toggle="tab">Sentinel Maps</a>
                        </div>
                    </li>
                </ul>
                <div class="tab-content pt-3">
                    <div class="tab-pane fade show active" id="baseMap">
                        <div class="row gx-2">
                            <div class="col-6" v-for="map in mapArray">
                                <a href="javascript:;"
                                   v-bind:class="{ 'active': map.isActive}"
                                   @click="setSelectedMap(map.name)"
                                   class="app-theme-mode-link">
                                    <div class="img"><img v-bind:src="map.src" class="object-fit-cover" height="76" width="76" v-bind:alt="map.name"></div>
                                    <div class="text">{{map.name}}</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="droneMap">
                        <div class="row gx-2">
                            <div class="col-6">
                                <a href="javascript:;"
                                   @click="overLayCustomDroneImage('Ampara_Paddy/Tiles/tiles_partially/',7.3503,81.7717)"

                                   class="app-theme-mode-link">
                                    <div class="img"><img src="/img/base_map/ampara_paddy.png" class="object-fit-cover" height="70" width="70" alt="Ampara Paddy Map"></div>
                                    <div class="text">Ampara Paddy</div>
                                </a>
                            </div>

                            <div class="col-6">
                                <a href="javascript:;"
                                   @click="overLayCustomDroneImage('Building_Area/Tiles/',6.9188925,79.8619483)"

                                   class="app-theme-mode-link">
                                    <div class="img"><img src="/img/base_map/union_place.png" class="object-fit-cover" height="70" width="70" alt="Ampara Paddy Map"></div>
                                    <div class="text">Union Place</div>
                                </a>
                            </div>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="sentinelMap">
                        <Sentinel/>
                    </div>
                </div>
            </card-body>
        </card>


    </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import Sentinel from "./sentinel.vue";
const store = useStore();
const selectedBaseMap = ref("Hybrid")
const tab = ref(0);

const mapArray = ref([
    {name:'Road',src:'/img/base_map/road.png',isActive:false},
    {name:'Hybrid',src:'/img/base_map/hybrid.png',isActive:true},
    {name:'Terrain',src:'/img/base_map/terrain.png',isActive:false},
    {name:'Satellite',src:'/img/base_map/satellite.png',isActive:false},
    {name:'Blue',src:'/img/base_map/blue_map.png',isActive:false},
    {name:'Brown',src:'/img/base_map/brown_map.png',isActive:false},
    {name:'Gray',src:'/img/base_map/gray_map.png',isActive:false},
    {name:'Retro',src:'/img/base_map/retro_map.png',isActive:false},
]);


const gMap = computed(() => {
    return store.getters.gmap
})

watch(gMap,function (newEvent,oldEvent) {
    if (newEvent){
        let mapArr = JSON.parse(localStorage.getItem('mapArray'));
        if (mapArr){
            mapArray.value = mapArr;
            let selectedMap = _.find(mapArray.value,{isActive:true});
            if (selectedMap){
                switchMaps(selectedMap.name);
            }
        }
    }
});
// onMounted(() => {
//
// })

const setSelectedMap = (name)=>{
    let index = _.findIndex(mapArray.value,{name:name});
    if (index >-1){
        switchMaps(name);
        mapArray.value.forEach(function (data,key) {
            data.isActive = key === index;
            mapArray.value.splice(key,1,data);
        })
        localStorage.setItem('mapArray',JSON.stringify(mapArray.value))

    }
}

const switchMaps = (name) => {

    switch (name) {
        case 'Road' : show_road_map();break;
        case 'Hybrid' : show_hybrid_map();break;
        case 'Terrain' : show_terrain_map();break;
        case 'Satellite' : show_satellite_map();break;
        case 'Blue' : show_blue_map();break;
        case 'Brown' : show_brown_map();break;
        case 'Gray' : show_gray_map();break;
        case 'Retro' : show_retro_map();break;
    }
}

const show_road_map = () =>{
    let map = store.state.gmap;
    map.setMapTypeId(google.maps.MapTypeId.ROADMAP);
    selectedBaseMap.value = "Road";
}
const show_satellite_map = () =>{
    let map = store.state.gmap;
    map.setMapTypeId(google.maps.MapTypeId.SATELLITE);
    selectedBaseMap.value = "Satellite";
}
const show_hybrid_map = () =>{
    let map = store.state.gmap;
    map.setMapTypeId(google.maps.MapTypeId.HYBRID);
    selectedBaseMap.value = "Hybrid";
}
const show_terrain_map = () =>{
    let map = store.state.gmap;
    map.setMapTypeId(google.maps.MapTypeId.TERRAIN);
    selectedBaseMap.value = "Terrain";
}
const show_blue_map = () =>{
    let map = store.state.gmap;
    let greenMapStyle = [{ "stylers": [{ "saturation": -100 }] }, { "featureType": "water", "elementType": "geometry.fill", "stylers": [{ "color": "#0099dd" }] }, { "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "poi.park", "elementType": "geometry.fill", "stylers": [{ "color": "#aadd55" }] }, { "featureType": "road.highway", "elementType": "labels", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.arterial", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, { "featureType": "road.local", "elementType": "labels.text", "stylers": [{ "visibility": "on" }] }, {}]
    let greenMap = new google.maps.StyledMapType(greenMapStyle, { name: "greenMap" });

    map.setMapTypeId(google.maps.MapTypeId.ROADMAP, 'greenMapID');
    map.mapTypes.set('greenMapID', greenMap);
    map.setMapTypeId('greenMapID');

    selectedBaseMap.value = "BlueMap";
}

const show_brown_map = ()=>{
    let map = store.state.gmap;
    let brownMapStyle = [{"featureType":"all","elementType":"labels","stylers":[{"visibility":"off"},{"color":"#f49f53"}]},{"featureType":"all","elementType":"labels.text","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","elementType":"all","stylers":[{"color":"#f9ddc5"},{"lightness":-7}]},{"featureType":"poi.business","elementType":"all","stylers":[{"color":"#645c20"},{"lightness":38}]},{"featureType":"poi.government","elementType":"all","stylers":[{"color":"#9e5916"},{"lightness":46}]},{"featureType":"poi.medical","elementType":"geometry.fill","stylers":[{"color":"#813033"},{"lightness":38},{"visibility":"off"}]},{"featureType":"poi.park","elementType":"all","stylers":[{"color":"#645c20"},{"lightness":39}]},{"featureType":"poi.school","elementType":"all","stylers":[{"color":"#a95521"},{"lightness":35}]},{"featureType":"poi.sports_complex","elementType":"all","stylers":[{"color":"#9e5916"},{"lightness":32}]},{"featureType":"road","elementType":"all","stylers":[{"color":"#813033"},{"lightness":43}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"color":"#f19f53"},{"weight":1.3},{"visibility":"on"},{"lightness":16}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#f19f53"},{"lightness":-10}]},{"featureType":"transit","elementType":"all","stylers":[{"lightness":38}]},{"featureType":"transit.line","elementType":"all","stylers":[{"color":"#813033"},{"lightness":22}]},{"featureType":"transit.station","elementType":"all","stylers":[{"visibility":"off"}]},{"featureType":"water","elementType":"all","stylers":[{"color":"#1994bf"},{"saturation":-69},{"gamma":0.99},{"lightness":43}]}]
    let brownMap = new google.maps.StyledMapType(brownMapStyle, { name: "brownMap" });

    map.setMapTypeId(google.maps.MapTypeId.ROADMAP, 'brownMapID');
    map.mapTypes.set('brownMapID', brownMap);
    map.setMapTypeId('brownMapID');

    selectedBaseMap.value = "BrownMap";
}

const show_gray_map = ()=>{
    let map = store.state.gmap;
    let grayMapStyle = [{"featureType":"water","elementType":"geometry.fill","stylers":[{"color":"#d3d3d3"}]},{"featureType":"transit","stylers":[{"color":"#808080"},{"visibility":"off"}]},{"featureType":"road.highway","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#b3b3b3"}]},{"featureType":"road.highway","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.local","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ffffff"},{"weight":1.8}]},{"featureType":"road.local","elementType":"geometry.stroke","stylers":[{"color":"#d7d7d7"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#ebebeb"}]},{"featureType":"administrative","elementType":"geometry","stylers":[{"color":"#a7a7a7"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"road.arterial","elementType":"geometry.fill","stylers":[{"color":"#ffffff"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"visibility":"on"},{"color":"#efefef"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#696969"}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"visibility":"on"},{"color":"#737373"}]},{"featureType":"poi","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"poi","elementType":"labels","stylers":[{"visibility":"off"}]},{"featureType":"road.arterial","elementType":"geometry.stroke","stylers":[{"color":"#d6d6d6"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#dadada"}]}]
    let grayMap = new google.maps.StyledMapType(grayMapStyle, { name: "brownMap" });

    map.setMapTypeId(google.maps.MapTypeId.ROADMAP, 'grayMapID');
    map.mapTypes.set('grayMapID', grayMap);
    map.setMapTypeId('grayMapID');

    selectedBaseMap.value = "GrayMap";
}


const show_retro_map = ()=>{
    let map = store.state.gmap;
    let retroMapStyle = [{"featureType":"administrative","stylers":[{"visibility":"off"}]},{"featureType":"poi","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels","stylers":[{"visibility":"simplified"}]},{"featureType":"water","stylers":[{"visibility":"simplified"}]},{"featureType":"transit","stylers":[{"visibility":"simplified"}]},{"featureType":"landscape","stylers":[{"visibility":"simplified"}]},{"featureType":"road.highway","stylers":[{"visibility":"off"}]},{"featureType":"road.local","stylers":[{"visibility":"on"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"visibility":"on"}]},{"featureType":"water","stylers":[{"color":"#84afa3"},{"lightness":52}]},{"stylers":[{"saturation":-17},{"gamma":0.36}]},{"featureType":"transit.line","elementType":"geometry","stylers":[{"color":"#3f518c"}]}]
    let retroMap = new google.maps.StyledMapType(retroMapStyle, { name: "retroMap" });

    map.setMapTypeId(google.maps.MapTypeId.ROADMAP, 'retroMapID');
    map.mapTypes.set('retroMapID', retroMap);
    map.setMapTypeId('retroMapID');

    selectedBaseMap.value = "RetroMap";
}

const checkSelectedMap = (map) => {
    return selectedBaseMap.value === map;
}

const hide_drone = ref(false)
const overLayCustomDroneImage = async (url,x,y) => {
    let map = store.state.gmap;
    hide_drone.value = !hide_drone.value;
    if (hide_drone.value){
        const tileLayer = new google.maps.ImageMapType({
            getTileUrl: function(coord, zoom) {
                return 'https://storage.googleapis.com/wpempmis-storage/GSENTRY/Images/DRONE_IMAGES/'+url+'' + zoom + '/' + coord.x + '/' + coord.y + '.png';
            },
            tileSize: new google.maps.Size(256, 256),
            isPng: true,
            maxZoom: 22, // Maximum zoom
            minZoom: 8, // Minimum zoom
            name: 'MyTiles',
        });
        map.overlayMapTypes.push(tileLayer);
        map.setCenter({  lat: x, lng: y  });
        map.setZoom(17);
    }else{
        map.overlayMapTypes.pop();
    }
}
</script>
<style scoped>
td {
    font-size: xx-small;
}
button{
    font-size: xx-small;
}
a{
    font-size: xx-small;
}
</style>

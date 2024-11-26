<template>
    <div >
        <select class="form-select form-select-sm" v-model="selected_layer" placeholder="Select a layer">
            <option v-for="map in mapItems">{{map}}</option>
        </select>
        <div class="row gx-2 mt-3">
            <div class="col-6">
                <button type="button"  @click="setSentinelLayers" class="btn btn-outline-theme btn-sm">Apply</button>
            </div>
            <div class="col-6">
                <button type="button" @click="removeLayer" class="btn btn-outline-warning btn-sm">Clear</button>
            </div>
        </div>

    </div>
</template>
<script setup>
import {mapState, useStore} from "vuex";
import {ref} from "vue";
import sentinelLayers from "../../../composables/map/sentinelLayers";

const mapItems = ref(['NDVI','AGRICULTURE','BATHYMETRIC','FALSE-COLOR-URBAN','FALSE-COLOR','GEOLOGY'
    ,'MOISTURE-INDEX','NATURAL-COLOR','SWIR','TRUE-COLOR-S2L2A'])
const selected_layer = ref("");
const store = useStore();
const setSentinelLayers = ()=> {

    let map = store.state.gmap;
    map.setZoom(7);
    sentinelLayers(map,selected_layer.value);
}

const removeLayer = () => {
    let map = store.state.gmap;
    map.overlayMapTypes.pop();
}

</script>

<style scoped>
td {
    font-size: xx-small;
}
button{
    font-size: xx-small;
}
</style>

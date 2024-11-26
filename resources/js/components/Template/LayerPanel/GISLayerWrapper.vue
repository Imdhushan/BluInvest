<template>
    <div>
        <card class="mb-3" v-bind:style="{ 'height':applicationWindow.height/1.62 +'px' }">

            <card-body>
                <div class="d-flex fw-bold small mb-3">
                    <span class="flex-grow-1">Spatial Layers</span>
                    <card-expand-toggler />
                </div>
                <perfect-scrollbar v-bind:style="{ 'height':applicationWindow.height/2 +'px' }">
                    <div class="accordion" id="level1">
                        <accordion-item
                            v-for="(item, index) in layerArray"
                            :key="index"
                            :item="item"
                            :level="1"
                        />
                    </div>
                </perfect-scrollbar>
            </card-body>
        </card>
    </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue';
import AccordionItem from './AccordionItem.vue';
import {useStore} from "vuex";
import generalAxiosRequest from "../../../composables/application/generalAxiosRequest";
import {removeLocalStorageData} from "../../../composables/application/localStorageHandling";
import NotificationHandling from "../../../composables/application/notificationHandling";
import {useProgress} from "@marcoschulte/vue3-progress";
import handleResize from "../../../composables/application/handleResize";
const store = useStore();
// const layerArray = ref([
//
//     {
//         "lid": 1,
//         "name": "Component 1 - VIS & CSA",
//         "child": [
//             {
//                 "lid": 11,
//                 "name": "Project Cascade",
//                 "value": "cascade",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#673AB7",
//                 "fillColor": "#E1BEE7"
//             },
//             {
//                 "lid": 12,
//                 "name": "Project River Basins",
//                 "value": "River_Basing",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#2962FF",
//                 "fillColor": "#03A9F4"
//             },
//             {
//                 "lid": 13,
//                 "name": "Command Area",
//                 "value": "command_area",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#2962FF",
//                 "fillColor": "#03A9F4"
//             },
//             {
//                 "lid": 14,
//                 "name": "325_Tanks",
//                 "value": "tanks",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#FF0000"
//             },
//             {
//                 "lid": 15,
//                 "name": "CI",
//                 "value": "ci_local",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#FF0000",
//                 "legend": [
//                     {
//                         "attr": "Less_1",
//                         "logic": "=",
//                         "value": "1",
//                         "color": "#FF0000"
//                     },
//                     {
//                         "attr": "1_0_1_2",
//                         "logic": "=",
//                         "value": "1",
//                         "color": "#9C27B0"
//                     },
//                     {
//                         "attr": "1_2_1_6",
//                         "logic": "=",
//                         "value": "1",
//                         "color": "#0000FF"
//                     },
//                     {
//                         "attr": "more_1_6",
//                         "logic": "=",
//                         "value": "1",
//                         "color": "#00FF00"
//                     }
//                 ]
//             },
//             {
//                 "lid": 16,
//                 "name": "CSA women beneficiaries",
//                 "child": [
//                     {
//                         "lid": 161,
//                         "name": "WB Anuradapura",
//                         "value": "women_b_anuradhapura",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#673AB7"
//                     },
//                     {
//                         "lid": 162,
//                         "name": "WB Vavuniya",
//                         "value": "women_b_vavuniya",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#2962FF"
//                     },
//                     {
//                         "lid": 163,
//                         "name": "WB Kurunegala",
//                         "value": "women_b_kurunegala",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#FF0000"
//                     },
//                     {
//                         "lid": 163,
//                         "name": "WB Mannar",
//                         "value": "WB Mannar",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#000000"
//                     }
//                 ],
//                 "visibility": false
//             },
//             {
//                 "lid": 17,
//                 "name": "Water Availability",
//                 "value": "Water Availability",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#FF0000",
//                 "fillColor": "#FF0000",
//                 "legend": [
//                     {
//                         "attr": "Wa_ca_pe",
//                         "logic": "<",
//                         "value": "20",
//                         "color": "#FF0000"
//                     },
//                     {
//                         "attr": "Wa_ca_pe",
//                         "logic": ">",
//                         "value": "40",
//                         "color": "#0000FF"
//                     },
//                     {
//                         "attr": "Wa_ca_pe",
//                         "logic": ">",
//                         "value": "60",
//                         "color": "#9C27B0"
//                     },
//                     {
//                         "attr": "Wa_ca_pe",
//                         "logic": ">",
//                         "value": "80",
//                         "color": "#00FF00"
//                     }
//                 ]
//             },
//             {
//                 "lid": 18,
//                 "name": "CITanks",
//                 "value": "CITanks",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#001CFF",
//                 "fillColor": "#001CFF"
//             }
//         ]
//     },
//     {
//         "lid": 2,
//         "name": "Component 2 - Drinking Water",
//         "child": [
//             {
//                 "lid": 21,
//                 "name": "CWSS",
//                 "value": "cwss",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#000000"
//             },
//             {
//                 "lid": 22,
//                 "name": "RWH",
//                 "value": "rwh",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#0000FF"
//             },
//             {
//                 "lid": 23,
//                 "name": "AFS",
//                 "value": "afs",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#FF0000"
//             },
//             {
//                 "lid": 23,
//                 "name": "NWSDB Connection",
//                 "value": "NWSDB_Connection",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#0000FF"
//             },
//             {
//                 "lid": 25,
//                 "name": "Drinking Water_Connection",
//                 "value": "Drinking Water_Connection",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#FF0000",
//                 "fillColor": "#FF0000"
//             }
//         ]
//     },
//     {
//         "lid": 3,
//         "name": "Component 3 - Hazard & Early Warnings",
//         "child": [
//             {
//                 "lid": 31,
//                 "name": "Early Warning",
//                 "child": [
//                     {
//                         "lid": 311,
//                         "name": "Automated Hydro Observation Network",
//                         "value": "auto_hydro_obs_netwrk",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#FF0000"
//                     },
//                     {
//                         "lid": 312,
//                         "name": "Automated Rain Gauges",
//                         "value": "auto_rain_gauge",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#0000FF"
//                     },
//                     {
//                         "lid": 313,
//                         "name": "Manual Rain Gauges",
//                         "value": "manual_rain_gauge",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#FF0000"
//                     },
//                     {
//                         "lid": 314,
//                         "name": "Automated Weather Stations",
//                         "value": "auto_weather_stn",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#000000"
//                     },
//                     {
//                         "lid": 315,
//                         "name": "Depth_Guage",
//                         "value": "Depth_Guage",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#FF0000",
//                         "fillColor": "#FF0000"
//                     },
//                     {
//                         "lid": 316,
//                         "name": "Rain_Guage",
//                         "value": "Rain_Guage",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#FF0000",
//                         "fillColor": "#FF0000"
//                     }
//                 ]
//             },
//             {
//                 "lid": 32,
//                 "name": "Flood risk assessment",
//                 "child": [
//                     {
//                         "lid": 321,
//                         "name": "Flood Layer",
//                         "value": "Flood_GND",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#0000FF",
//                         "fillColor": "#03A9F4"
//                     },
//                     {
//                         "lid": 322,
//                         "name": "River/Stream",
//                         "value": "River",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#0000FF",
//                         "fillColor": "#03A9F4"
//                     },
//                     {
//                         "lid": 323,
//                         "name": "Inundated GND",
//                         "value": "Inundated GND",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#0000FF",
//                         "fillColor": "#03A9F4"
//                     },
//                     {
//                         "lid": 324,
//                         "name": "Inundated Houses",
//                         "child": [
//                             {
//                                 "lid": 3251,
//                                 "name": "Indt H Anuradhapura",
//                                 "value": "inundated_anuradapura",
//                                 "visibility": false,
//                                 "layer": null,
//                                 "color": "#FF0000"
//                             },{
//                                 "lid": 3251,
//                                 "name": "Indt H Kurunegala",
//                                 "value": "inundated_kurunegala",
//                                 "visibility": false,
//                                 "layer": null,
//                                 "color": "#FF0000"
//                             },{
//                                 "lid": 3251,
//                                 "name": "Indt H Vavuniya",
//                                 "value": "inundated_vavuniya",
//                                 "visibility": false,
//                                 "layer": null,
//                                 "color": "#FF0000"
//                             },{
//                                 "lid": 3251,
//                                 "name": "Indt H Puttalam",
//                                 "value": "inundated_puttalam",
//                                 "visibility": false,
//                                 "layer": null,
//                                 "color": "#FF0000"
//                             },{
//                                 "lid": 3251,
//                                 "name": "Indt H Trincomalee",
//                                 "value": "inundated_trincomalee",
//                                 "visibility": false,
//                                 "layer": null,
//                                 "color": "#FF0000"
//                             },{
//                                 "lid": 3251,
//                                 "name": "Indt H Mannar",
//                                 "value": "inundated_mannar",
//                                 "visibility": false,
//                                 "layer": null,
//                                 "color": "#FF0000"
//                             },
//
//                         ]
//                     },
//                     {
//                         "lid": 325,
//                         "name": "Houses",
//                         "child": [
//                             {
//                                 "lid": 3251,
//                                 "name": "Yan Oya Houses",
//                                 "child": [
//                                     {
//                                         "lid": 3251,
//                                         "name": "Anuradhapura Houses",
//                                         "value": "house_yanoya_anuradapura",
//                                         "visibility": false,
//                                         "layer": null,
//                                         "color": "#FF0000"
//                                     },{
//                                         "lid": 3251,
//                                         "name": "Trincomalee Houses",
//                                         "value": "house_yanoya_trincomalee",
//                                         "visibility": false,
//                                         "layer": null,
//                                         "color": "#FF0000"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "lid": 3252,
//                                 "name": "Malwathu Oya Houses",
//                                 "child": [
//                                     {
//                                         "lid": 3251,
//                                         "name": "Anuradhapura Houses",
//                                         "value": "house_malwathuoya_anuradapura",
//                                         "visibility": false,
//                                         "layer": null,
//                                         "color": "#0000FF"
//                                     },{
//                                         "lid": 3251,
//                                         "name": "Mannar Houses",
//                                         "value": "house_malwathuoya_mannar",
//                                         "visibility": false,
//                                         "layer": null,
//                                         "color": "#0000FF"
//                                     },
//                                     {
//                                         "lid": 3251,
//                                         "name": "Vavuniya Houses",
//                                         "value": "house_malwathuoya_vavuniya",
//                                         "visibility": false,
//                                         "layer": null,
//                                         "color": "#0000FF"
//                                     }
//                                 ]
//                             },
//                             {
//                                 "lid": 3253,
//                                 "name": "Mi Oya Houses",
//                                 "child": [
//                                     {
//                                         "lid": 3251,
//                                         "name": "Kurunegala Houses",
//                                         "value": "house_mi_oya_kurunegala",
//                                         "visibility": false,
//                                         "layer": null,
//                                         "color": "#FF00FF"
//                                     },{
//                                         "lid": 3251,
//                                         "name": "Puttalam Houses",
//                                         "value": "house_mi_oya_puttalam",
//                                         "visibility": false,
//                                         "layer": null,
//                                         "color": "#FF00FF"
//                                     }
//                                 ]
//                             }
//                         ]
//                     },
//                     {
//                         "lid": 326,
//                         "name": "Early warning and vulnerability",
//                         "value": "EW_Vul",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#0000FF",
//                         "fillColor": "#03A9F4"
//                     },
//                     {
//                         "lid": 327,
//                         "name": "Inundated_house",
//                         "value": "Inundated_house",
//                         "visibility": false,
//                         "layer": null,
//                         "color": "#FF0000",
//                         "fillColor": "#FF0000"
//                     }
//                 ]
//             }
//         ]
//     },
//     {
//         "lid": 4,
//         "name": "Base Maps",
//         "child": [
//             {
//                 "name": "ASC",
//                 "value": "asc",
//                 "visibility": false,
//                 "layer": null
//             },
//             {
//                 "name": "GND",
//                 "value": "gnd",
//                 "visibility": false,
//                 "layer": null
//             },
//             {
//                 "name": "DSD",
//                 "value": "dsd",
//                 "visibility": false,
//                 "layer": null
//             },
//             {
//                 "name": "District",
//                 "value": "district",
//                 "visibility": false,
//                 "layer": null
//             },
//             {
//                 "name": "Province",
//                 "value": "province",
//                 "visibility": false,
//                 "layer": null
//             },
//             {
//                 "name": "Road Network",
//                 "value": "road",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#0000FF",
//                 "fillColor": "#03A9F4"
//             },
//             {
//                 "name": "Place Names",
//                 "value": "places",
//                 "visibility": false,
//                 "layer": null,
//                 "color": "#FF0000"
//             }
//         ]
//     }
// ]);
const layerArray = ref([]);


const newLayerAdd = computed(() => {
    return store.getters.newLayer;
});

watch(newLayerAdd,function (data,oldEvent) {
    if (data){
        handleAddLayer(data);
    }
});
const {applicationWindow} = handleResize(40,87);
/**
 * this logic is developed to calculate the lid and push the dataset into main array
 * TODO: simplify the logic
 * @param data
 */
const handleAddLayer = (data) => {
  console.log("fucking data",data);
    const lidStr = data.lid.toString();
    let layer = data.data;
    switch (lidStr.length) {
        case 1 :    let index1 = parseInt(lidStr[0]);
                    let lid = layerArray.value[index1-1].child.length+1;
                    lid = index1+""+lid;
                    layer.lid = parseInt(lid);
                    if (!checkLayerNameExists(layerArray.value[index1-1],layer.name))
                        layerArray.value[index1-1].child.push(layer);
                    break;
        case 2 :    let index11 = parseInt(lidStr[0]);
                    let index12 = parseInt(lidStr[1]);
                    let lid2 = layerArray.value[index11-1].child[index12-1].child.length+1;
                    lid2 = index11+""+index12+""+lid2;
                    layer.lid = parseInt(lid2);
                    if (!checkLayerNameExists(layerArray.value[index11-1].child[index12-1],layer.name))
                        layerArray.value[index11-1].child[index12-1].child.push(layer);
                    break;
        case 3 :    let index111 = parseInt(lidStr[0]);
                    let index112 = parseInt(lidStr[1]);
                    let index113 = parseInt(lidStr[2]);
                    let lid3 = layerArray.value[index111-1].child[index112-1].child[index113-1].child.length+1;
                    lid3 = index111+""+index112+""+index113+""+lid3;
                    layer.lid = parseInt(lid3);
                    if (!checkLayerNameExists(layerArray.value[index111-1].child[index112-1].child[index113-1],layer.name))
                        layerArray.value[index111-1].child[index112-1].child[index113-1].child.push(layer);
                    break;
    }

    console.log("fucking new layer array",layerArray);
    saveDataset();
}
const checkLayerNameExists = (layerset,name)=>{
    let exists = _.find(layerset.child,{name:name});
    console.log("fucking exists",exists);
    return !!exists;
}

const saveDataset = async () => {
    const progress11 = useProgress().start();

    let time = new Date();
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/mahaweli-cid/saveData',
        data: JSON.stringify({
            collection: 'spatialLayers',
            dataset: JSON.stringify(layerArray.value),
            metadata: JSON.stringify({created_by: 'admin', time: time, year: 2024})
        })
    }

    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);

    progress11.finish();

    // NotificationHandling('success', json_data.value);
    // this.$emit('requestClose');
}
const retrieveDataset = async () => {
    layerArray.value = [];
    const progress10 = useProgress().start();
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/general-queries/readData',
        data: JSON.stringify({
            collection: 'spatialLayers',
        })
    }
    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);

    json_data.value.forEach(function (o) {
        console.log("o.data.properties",o.data.properties)
        layerArray.value.push(o.data.properties)
    })
    progress10.finish();

}

onMounted(()=>{
    // saveDataset();
    retrieveDataset();
});

const triggureArea = computed(() => {
    return store.getters.queryArea;
});

watch(triggureArea,function (area,oldEvent) {
    if (area){
        retrieveDataset();
    }
});
</script>



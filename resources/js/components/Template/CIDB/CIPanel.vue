<template>
    <div>
        <div class="row">
            <div class="col-xl-4 col-lg-6">
                <card class="mb-3">
                    <card-body>
                        <CIQuery
                            :attribute_list="attributes"
                            :ci-data="ciData"
                            @applyFilter="applyFilterCIDB"
                        />
                    </card-body>
                </card>
            </div>
            <div class="col-xl-8 col-lg-6">
                <card class="mb-3">
                    <card-body>
                        <div class="d-flex fw-bold small mb-3">
                            <span class="flex-grow-1">
                                CI DB
                                <button type="button" class="btn btn-outline-theme btn-sm ms-3" @click="downloadData(filteredciData)">
                                    Download
                                    <i class="bi bi-cloud-arrow-down"></i>
                                </button>
                            </span>
                            <card-expand-toggler />
                        </div>
                        <vue-table-lite class="vue-table"
                                        :is-static-mode="true"
                                        :columns="headers"
                                        :rows="filteredciData"
                                        :page-options="pageOptions"
                                        :total="filteredciData.length"
                        />

                    </card-body>
                </card>
            </div>
        </div>

    </div>
</template>

<script setup>
import {useProgress} from "@marcoschulte/vue3-progress";
import generalAxiosRequest from "../../../composables/application/generalAxiosRequest";
import {computed, onMounted, ref, watch} from "vue";
import VueTableLite from 'vue3-table-lite'
import {useStore} from "vuex";
import CIQuery from "./CIQuery.vue";
import ujWorkBook from "../../../composables/application/ujWorkBook";
const ciData = ref([]);
const filteredciData = ref([]);
const attributes = ref([]);
const headers = ref([]);
const bindingAttrFromTank = ref(['Province','District','DSD','GND','ASC','GND_S','RiverBasing']);
const pageOptions = ref([ { value: 10, text: 10 }]);
const store = useStore();
const retrieveDataset = async (year,adminBoundary = ['All'],boundaryType = null) => {
    const progress = useProgress().start();
    let dataset = {
        admin_boundary: JSON.stringify(adminBoundary),
        boundary_type: boundaryType,
        year: year,
    };

    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/mahaweli-cid/readData',
        data: JSON.stringify(dataset)
    }
    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);
    let indexValues = json_data.value[0].data.properties;
    indexValues = Object.keys(indexValues);
    console.log("index values",indexValues);
    indexValues = _.concat(indexValues,bindingAttrFromTank.value);
    attributes.value = indexValues;
    headers.value = indexValues.map(col => ({ label: col, field: col ,sortable: true,}));
    ciData.value = [];
    filteredciData.value = [];
    // ciData.value = json_data.value;
    console.log("fucking ci received",json_data.value);
    json_data.value.forEach(function (o) {
        let obj = o.data.properties;
        if (o.data.tanks && o.data.tanks.length>0) {
            obj.Province = o.data.tanks[0].data.properties.province;
            obj.District = o.data.tanks[0].data.properties.district;
            obj.DSD = o.data.tanks[0].data.properties.dsd;
            obj.GND = o.data.tanks[0].data.properties.gnd;
            obj.ASC = o.data.tanks[0].data.properties.asc;
            obj.GND_S = o.data.tanks[0].data.properties.GND_S;
            obj.RiverBasing = o.data.tanks[0].data.properties.river_basing;
        }
            filteredciData.value.push(obj);
            let newobj = obj;
            if (o.data.tanks && o.data.tanks.length>0) {
                newobj.geometry = o.data.tanks[0].data.geometry;
            }
            ciData.value.push(newobj);

    });
    localStorage.removeItem('ciData');
    localStorage.removeItem('ciDataFiltered');
    console.log("fucking CI DB",ciData.value)
    localStorage.setItem('ciData',JSON.stringify(ciData.value));
    localStorage.setItem('ciDataFiltered',JSON.stringify(filteredciData.value));
    progress.finish();
}
const triggureArea = computed(() => {
    return store.getters.queryArea;
});

const applyFilterCIDB = (data)=>{
    filteredciData.value = data;
    console.log("fucking filter applied",data)
}

onMounted(()=>{
    let cidb = localStorage.getItem('ciDataFiltered');
    cidb = JSON.parse(cidb);
    if (cidb){
        loadCIFromLocalStorage(cidb)
    }else{
        retrieveDataset('2024',['All'],[])
    }

});
const loadCIFromLocalStorage = (filteredCI) => {
    let cidb = localStorage.getItem('ciData');
    cidb = JSON.parse(cidb);
    let indexValues = filteredCI[0];
    indexValues = Object.keys(indexValues);
    indexValues = _.concat(indexValues,bindingAttrFromTank.value);
    attributes.value = indexValues;
    headers.value = indexValues.map(col => ({ label: col, field: col ,sortable: true,}));
    filteredciData.value = filteredCI;
    ciData.value = cidb;
}
watch(triggureArea,function (area,oldEvent) {
    if (area){
        retrieveDataset(area.year,area.selected_values,area.selected_area)
    }
});

const downloadData = (tblData) => {
    ujWorkBook(tblData, "CI DB Queried")
}
</script>

<style scoped>

</style>

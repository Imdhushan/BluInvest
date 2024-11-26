<template>
    <div>
        <div class="row">
            <div class="col-xl-12 col-lg-12">
                <card class="mb-3">
                    <card-body>
                        <div class="d-flex fw-bold small mb-3">
                            <span class="flex-grow-1">Mobile Application Readings</span>
                            <card-expand-toggler />
                        </div>
                        <ul class="nav nav-tabs">
                            <li class="nav-item me-1"><a href="#manualGuage" class="nav-link" :class="activeTab === 'manualGuage'?'active':''" @click="activeTab = 'manualGuage'">Manual Gauge</a></li>
                            <li class="nav-item me-1"><a href="#rainGauge" class="nav-link" :class="activeTab === 'rainGauge'?'active':''" @click="activeTab = 'rainGauge'">Rain Gauge</a></li>
                            <li class="nav-item me-1"><a href="#crop" class="nav-link" :class="activeTab === 'crop'?'active':''" @click="activeTab = 'crop'">Crop Establishment</a></li>
                        </ul>
            <div class="tab-content pt-3">
                <div class="tab-pane fade " :class="activeTab === 'manualGuage'?'show active':''" id="manualGuage">
                        <div class="d-flex fw-bold small mb-3">
                            <span class="flex-grow-1">
                                <button type="button" class="btn btn-outline-theme btn-sm ms-3" @click="retrieveDataset">
                                    Refresh
                                    <i class="bi bi-arrow-clockwise"></i>
                                </button>
                                <button type="button" class="btn btn-outline-theme btn-sm ms-3" @click="downloadData(manualGaugeData)">
                                    Download
                                    <i class="bi bi-cloud-arrow-down"></i>
                                </button>
                            </span>
                        </div>

                        <vue-table-lite class="vue-table"
                                        :isLoading="dataLoading"
                                        :is-slot-mode="true"
                                        :columns="headersGauge"
                                        :rows="manualGaugeData"
                                        :page-options="pageOptions"
                                        :total="manualGaugeData.length"
                        >
                        <template v-slot:image="data">
                            <img width="100" height="100" :src="`data:image/jpeg;base64,${data.value.image}`" />
                        </template>
                        </vue-table-lite>
                </div>
            </div>


            <div class="tab-content pt-3">
                <div class="tab-pane fade " :class="activeTab === 'rainGauge'?'show active':''" id="rainGauge">
                        <div class="d-flex fw-bold small mb-3">
                            <span class="flex-grow-1">
                                <button type="button" class="btn btn-outline-theme btn-sm ms-3" @click="retrieveDataset">
                                    Refresh
                                    <i class="bi bi-arrow-clockwise"></i>
                                </button>
                                <button type="button" class="btn btn-outline-theme btn-sm ms-3" @click="downloadData(rainGaugeData)">
                                    Download
                                    <i class="bi bi-cloud-arrow-down"></i>
                                </button>
                            </span>
                        </div>

                        <vue-table-lite class="vue-table"
                                        :isLoading="dataLoading"
                                        :is-slot-mode="true"
                                        :columns="headersGauge"
                                        :rows="rainGaugeData"
                                        :page-options="pageOptions"
                                        :total="rainGaugeData.length"
                        >
                        <template v-slot:image="data">
                            <img width="100" height="100" :src="`data:image/jpeg;base64,${data.value.image}`" />
                        </template>
                        </vue-table-lite>
                </div>
            </div>
            <div class="tab-content pt-3">
                <div class="tab-pane fade " :class="activeTab === 'crop'?'show active':''" id="crop">
                        <div class="d-flex fw-bold small mb-3">
                            <span class="flex-grow-1">
                                <button type="button" class="btn btn-outline-theme btn-sm ms-3" @click="retrieveDataset">
                                    Refresh
                                    <i class="bi bi-arrow-clockwise"></i>
                                </button>
                                <button type="button" class="btn btn-outline-theme btn-sm ms-3" @click="downloadData(cropData)">
                                    Download
                                    <i class="bi bi-cloud-arrow-down"></i>
                                </button>
                            </span>
                        </div>

                        <vue-table-lite class="vue-table"
                                        :isLoading="dataLoading"
                                        :is-slot-mode="true"
                                        :columns="headersCrop"
                                        :rows="cropData"
                                        :page-options="pageOptions"
                                        :total="cropData.length"
                        >
                        <template v-slot:image="data">
                            <img width="100" height="100" :src="`data:image/jpeg;base64,${data.value.image}`" />
                        </template>
                        </vue-table-lite>
                </div>
            </div>

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
import ujWorkBook from "../../../composables/application/ujWorkBook";
const gaugeData = ref([]);
const manualGaugeData = ref([]);
const rainGaugeData = ref([]);
const cropData = ref([]);
const headersGauge = ref([]);
const headersCrop = ref([]);
const pageOptions = ref([ { value: 10, text: 10 }]);
const store = useStore();
const dataLoading = ref(true);
const activeTab = ref('manualGuage');
const retrieveDataset = async () => {
    const progress = useProgress().start();
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/general-queries/readData',
        data: JSON.stringify({
            collection: 'gaugeReadings',
        })
    }
    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);

    headersGauge.value = [
        { label: 'Image', field: 'image' ,sortable: false,},
        { label: 'Gauge Name', field: 'gaugeName' ,sortable: true,},
        { label: 'Description', field: 'description' ,sortable: true,},
        { label: 'Reading', field: 'reading' ,sortable: true,},

    ];
    headersCrop.value = [
        { label: 'Image', field: 'image' ,sortable: false,},
        { label: 'CropName', field: 'cropName' ,sortable: true,},
        { label: 'ReadingType', field: 'readingType' ,sortable: true,},
        { label: 'CropStablishDate', field: 'cropStablishDate' ,sortable: true,},
        { label: 'CropDuration', field: 'cropDuration' ,sortable: true,},
        { label: 'Description', field: 'description' ,sortable: true,},

    ];
    let data = json_data.value;
    data = _.map(data,function(o){return o.data.properties});
    gaugeData.value = data;
    console.log(gaugeData.value);
    rainGaugeData.value = _.filter(gaugeData.value,{readingType:'Rain Gauge'});
    manualGaugeData.value = _.filter(gaugeData.value,{readingType:'Manual Gauge'});
    cropData.value = _.filter(gaugeData.value,{readingType:'Crop Stablish'});

    progress.finish();
    dataLoading.value = false;
}


onMounted(()=>{
        retrieveDataset('2024',['All'],[])
});


const downloadData = (tblData) => {
    ujWorkBook(tblData, "CI DB Queried")
}
</script>

<style scoped>

</style>

<template >
    <div>
        <card class="mb-3">
            <card-body>
                <div class="d-flex fw-bold small mb-3">
                    <span class="flex-grow-1">({{categoryKey}}) Area  By Surface</span>
                    <card-expand-toggler />
                </div>
                <ApexCustomBarChart
                    v-if="chartData.length >= 3"
                    :data="chartData"
                    valueKey="count"
                    :categoryKey="categoryKey"
                    :isStacked="true"
                    mainTitle="Area By Surface"
                />
            </card-body>
        </card>


    </div>
</template>

<script setup>
import { mdiAccount } from '@mdi/js';
import {mapState, useStore} from "vuex";
import {computed, defineComponent, onMounted, ref, shallowRef, watch} from "vue";
import generalAxiosRequest from "../../composables/application/generalAxiosRequest";
import ApexCustomBarChart from "../Reusables/Charts/ApexCustomBarChart.vue";
import {useProgress} from "@marcoschulte/vue3-progress";

//initialising vuex store
const store = useStore()
const chartdiv = shallowRef(null);
const provinces =  ["EASTERN", "NORTH CENTRAL", "NORTH WESTERN", "NORTHERN"];
const districts =  ref(["ANURADHAPURA", "KURUNEGALA", "MANNAR", "POLONNARUWA","TRINCOMALEE","VAVUNIYA"]);
const triggureArea = computed(() => {
    return store.getters.queryArea;
});

const categoryKey = ref("district");
watch(triggureArea,function (area,oldEvent) {
    if (area){
        categoryKey.value = area.requested_area;
        localStorage.setItem("boundaryKey",categoryKey.value);
        getDataYears(area.requested_values,area.requested_area,area.year);
    }
});
const chartData = ref([]);
const attributes = ref([{name:'Water Surface',value:'W_Surface'},{name:'Command Area',value:'Comd_area'},{name:'Catchment Area',value:'Catchment'}])
const getDataYears = async (selected_values,selected_area,year) => {
    chartData.value = [];
    const progress2 = useProgress().start();
    for (const season of attributes.value) {
        let data = await getStats(year, selected_values, selected_area,season.value)
        if (data) {
            chartData.value.push({title:season.name,type:'column',data:data});
        }
    }
    progress2.finish();

    localStorage.setItem("barChart4",JSON.stringify(chartData.value));
}
const getStats = async (year,selected_values,selected_area,attribute) => {
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/mahaweli-cid/statistics',
        data: JSON.stringify({
            collection: 'ci_db_'+year,
            admin_boundary: JSON.stringify(selected_values),
            boundary_type: selected_area,
            attribute:attribute
        })
    }

    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);
    console.log('Bar Chart stacked Data', json_data.value);
    return json_data.value;
}

onMounted(async () => {
    let existing_chart_data = localStorage.getItem('barChart4');
    existing_chart_data = null;
    if (existing_chart_data && existing_chart_data.length >= 0){
        categoryKey.value = localStorage.getItem('boundaryKey');
        setTimeout(function () {
            chartData.value = existing_chart_data;
        },500)
    }else{
        await getDataYears(districts.value,'district','2024');
        localStorage.setItem("boundaryKey",'district');
    }

})





</script>
<style scoped>
.chart {
    width: 100%;
    height: 35vh;
}
.main_card_style{
    border-radius: 5px;
    margin-top: 10px;
    margin-bottom: 15px;
    margin-left: 10px;
}
.card_title{
    justify-content: center;
    text-align: center
}
</style>

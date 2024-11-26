<template >
    <div>
        <card class="mb-3">
            <card-body>
                <div class="d-flex fw-bold small mb-3">
                    <span class="flex-grow-1">Farmer Distribution</span>
                    <card-expand-toggler />
                </div>
                <ApexCustomPolarAreaChart
                    v-if="chartData.length === 4"
                    :data="chartData"
                    valueKey="sum"
                    categoryKey="attribute"
                    mainTitle="Farmer Distribution"
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
import ApexCustomPieChart from "../Reusables/Charts/ApexCustomPieChart.vue";
import {useProgress} from "@marcoschulte/vue3-progress";
import ApexCustomPolarAreaChart from "../Reusables/Charts/ApexCustomPolarAreaChart.vue";

//initialising vuex store
const store = useStore()
const chartdiv = shallowRef(null);
const provinces =  ["EASTERN", "NORTH CENTRAL", "NORTH WESTERN", "NORTHERN"];

const triggureArea = computed(() => {
    return store.getters.queryArea;
});

watch(triggureArea,function (area,oldEvent) {
    if (area){
        getStats(area.year,area.selected_values,area.selected_area);
    }
});
const chartData = ref([]);

const getStats = async (year,selected_values,selected_area) => {
    const progress5 = useProgress().start();
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/mahaweli-cid/statistics',
        data: JSON.stringify({
            collection: 'ci_db_'+year,
            admin_boundary: JSON.stringify(selected_values),
            boundary_type: selected_area,
            attribute:JSON.stringify(['Male','Female','Youth','Widowed'])
        })
    }

    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);
    chartData.value = json_data.value
    progress5.finish();
    localStorage.setItem("polarChart1",JSON.stringify(chartData.value));
}

onMounted(async () => {
    let existing_chart_data = localStorage.getItem('polarChart1');
    existing_chart_data = JSON.parse(existing_chart_data);
    if (existing_chart_data){
        setTimeout(function () {
            chartData.value = existing_chart_data;
        },500)
    }else{
        await getStats('2024',['All'],'province')
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

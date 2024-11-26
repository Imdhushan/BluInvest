<template >
    <div>
        <card class="mb-3">
            <card-body>
                <div class="d-flex fw-bold small mb-3">
                    <span class="flex-grow-1">Total Farmers Yearly</span>
                    <card-expand-toggler />
                </div>
                <ApexCustomBarChart
                    v-if="chartData.length === 1"
                    :data="chartData"
                    valueKey="count"
                    categoryKey="year"
                    :isStacked="false"
                    mainTitle="Total Farmers Yearly"
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
import barChart from "../../composables/charts/barChart";
import ApexCustomBarChart from "../Reusables/Charts/ApexCustomBarChart.vue";
import ApexCustomAreaChart from "../Reusables/Charts/ApexCustomAreaChart.vue";
import {useProgress} from "@marcoschulte/vue3-progress";

//initialising vuex store
const store = useStore()
const chartdiv = shallowRef(null);
const provinces =  ["EASTERN", "NORTH CENTRAL", "NORTH WESTERN", "NORTHERN"];

const triggureArea = computed(() => {
    return store.getters.queryArea;
});

watch(triggureArea,function (area,oldEvent) {
    if (area){
        getDataYears(area.selected_values,area.selected_area);
    }
});
const chartData = ref([]);
const ci = ref([]);

const years = ref(['2020','2021','2022','2023','2024'])
const getDataYears = async (selected_values,selected_area) => {
    const progress3 = useProgress().start();
    for (const year of years.value) {
        let data = await getStats(year, selected_values, selected_area)
        if (data) {
            ci.value.push({year:year,count:data[0].sum});
        }
    }

        chartData.value = [
            {title:'Total Farmers',type:'column',data:ci.value},
        ];
    progress3.finish();

    localStorage.setItem("barChart3",JSON.stringify(chartData.value));
}
const getStats = async (year,selected_values,selected_area) => {
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/mahaweli-cid/statistics',
        data: JSON.stringify({
            collection: 'ci_db_'+year,
            admin_boundary: JSON.stringify(selected_values),
            boundary_type: selected_area,
            attribute:JSON.stringify(['Total_farm'])
        })
    }

    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);
    console.log('Area Chart Data', json_data.value);
    return json_data.value;
}

onMounted(async () => {
    let existing_chart_data = localStorage.getItem('barChart3');
    existing_chart_data = JSON.parse(existing_chart_data);
    if (existing_chart_data && existing_chart_data.length === 1){
        setTimeout(function () {
            chartData.value = existing_chart_data;
        },500)
    }else{
        await getDataYears(['All'],'province');
    }
    // await getStats(provinces,'province')
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

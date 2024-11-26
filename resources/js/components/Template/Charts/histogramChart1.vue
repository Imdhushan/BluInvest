<template >
    <div>
        <card class="mb-3">
            <card-body>
                <div class="d-flex fw-bold small mb-3">
                    <span class="flex-grow-1">Cropping Intensity Histogram</span>
                    <card-expand-toggler />
                </div>
                <ApexCustomLineChart
                    v-if="chartData.length === 1"
                    :data="chartData"
                    valueKey="sum"
                    categoryKey="attribute"
                    :isStacked="false"
                    mainTitle="Cropping Intensity Histogram"
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
import ApexCustomHistogramChart from "../Reusables/Charts/ApexCustomHistogramChart.vue";
import ApexCustomLineChart from "../Reusables/Charts/ApexCustomLineChart.vue";

//initialising vuex store
const store = useStore()
const chartdiv = shallowRef(null);
const provinces =  ["EASTERN", "NORTH CENTRAL", "NORTH WESTERN", "NORTHERN"];

const triggureArea = computed(() => {
    return store.getters.queryArea;
});

watch(triggureArea,function (area,oldEvent) {
    if (area){
        getStats(area.requested_values,area.requested_area);
    }
});
const chartData = ref([]);



const getStats = async (year,selected_values,selected_area) => {
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/mahaweli-cid/statistics',
        data: JSON.stringify({
            collection: 'ci_db_'+year,
            admin_boundary: JSON.stringify(selected_values),
            boundary_type: selected_area,
            attribute:JSON.stringify(['Less_1','1_0_1_2','1_2_1_6','more_1_6'])
        })
    }

    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);

    chartData.value = [
        {title:'Cropping Intensity',type:'line',data:json_data.value},
    ]
    console.log('histogram Chart Data', chartData.value);
}

onMounted(async () => {
    await getStats('2022',['All'],'province');
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

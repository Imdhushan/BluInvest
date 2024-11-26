<template >
    <div>
        <card class="mb-3">
            <card-body>
                <div class="d-flex fw-bold small mb-3">
                    <span class="flex-grow-1">Cropping Intensity</span>
                    <card-expand-toggler />
                </div>
                <div class="chart" ref="chartdiv"></div>
            </card-body>
        </card>

    </div>
</template>

<script setup>
import SvgIcon from '@jamescoyle/vue-icon';
import { mdiAccount } from '@mdi/js';
import {mapState, useStore} from "vuex";
import {computed, defineComponent, onMounted, shallowRef, watch} from "vue";
import generalAxiosRequest from "../../composables/application/generalAxiosRequest";
import barChart from "../../composables/charts/barChart";
import pieChart from "../../composables/charts/pieChart";

//initialising vuex store
const store = useStore()
const triggureArea = computed(() => {
    return store.getters.queryArea;
});

watch(triggureArea,function (area,oldEvent) {
    if (area){
        console.log("query started",area);
        getStats(area.requested_values,area.requested_area);
    }
});
const chartdiv = shallowRef(null);
const getStats = async (selected_values,selected_area) => {
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/mahaweli-cid/statistics',
        data: JSON.stringify({
            collection: 'ci_db_2021',
            admin_boundary: JSON.stringify(selected_values),
            boundary_type: selected_area,
            attribute:'W_Surface'
        })
    }

    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);
    console.log('Chart Data', json_data.value);
    const color_array = [
        "#003366", // Dark Blue
        "#0066CC", // Medium Blue
        "#0099FF", // Light Blue
        "#33CCFF", // Sky Blue
        "#66CCFF"  // Very Light Blue
    ];
    const {labelColorArray} =  pieChart(json_data.value,chartdiv,color_array);
    console.log("chart_labels pie",labelColorArray.value);
    store.commit('setChartColors',labelColorArray.value);

}
const provinces =  ["CENTRAL", "EASTERN", "NORTH CENTRAL", "NORTH WESTERN", "NORTHERN", "SABARAGAMUWA", "SOUTHERN", "UVA", "WESTERN"];
onMounted(async () => {
    await getStats(provinces,'province')
})
</script>
<style scoped>
.chart {
    width: 100%;
    height: 30vh;
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

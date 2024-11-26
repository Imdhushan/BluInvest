<template >
    <div>
        <card class="mb-3">
            <card-body>
                <div class="d-flex fw-bold small mb-3">
                    <span class="flex-grow-1">Cropping Intensity Growth over Years</span>
                    <card-expand-toggler />
                </div>
                <ApexCustomAreaChart
                    v-if="chartData.length === 4"
                    :data="chartData"
                    valueKey="count"
                    categoryKey="year"
                    :isStacked="false"
                    mainTitle="Water Capacity & Crop Growth"
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
import {useProgress} from "@marcoschulte/vue3-progress";
import ApexCustomLineChart from "../Reusables/Charts/ApexCustomLineChart.vue";
import ApexCustomAreaChart from "../Reusables/Charts/ApexCustomAreaChart.vue";

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
const first = ref([]);
const second = ref([]);
const third = ref([]);
const forth = ref([]);
const years = ref(['2020','2021','2022','2023','2024'])
const getDataYears = async (selected_values,selected_area) => {
    const progress1 = useProgress().start();
    for (const year of years.value) {
        let data = await getStats(year, selected_values, selected_area)
        if (data) {
            first.value.push({year:year,count:data[0].sum});
            second.value.push({year:year,count:data[1].sum});
            third.value.push({year:year,count:data[2].sum});
            forth.value.push({year:year,count:data[3].sum});
        }
    }

        chartData.value = [
            {title:'Less Than 1',type:'area',data:first.value},
            {title:'1_0 to 1_2',type:'area',data:third.value},
            {title:'1_2 to 1_6',type:'area',data:second.value},
            {title:'more than 1_6',type:'area',data:forth.value},
        ]


    progress1.finish();
    localStorage.setItem("areaChart2",JSON.stringify(chartData.value));
}
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
    console.log('Bar Chart Data', json_data.value);
    return json_data.value;
}

onMounted(async () => {
    let existing_chart_data = localStorage.getItem('areaChart2');
    existing_chart_data = JSON.parse(existing_chart_data);
    if (existing_chart_data && existing_chart_data.length === 4){
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

<template >
    <div>
        <card class="mb-3">
            <card-body>
                <div class="d-flex fw-bold small mb-3">
                    <span class="flex-grow-1">Yala,Third,Maha Seasons Over Years</span>
                    <card-expand-toggler />
                </div>
                <ApexCustomBarChart
                    v-if="chartData.length === 3"
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
import ApexCustomBarChart from "../Reusables/Charts/ApexCustomBarChart.vue";
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
const yala = ref([]);
const maha = ref([]);
const third = ref([]);
const income = ref([]);
const years = ref(['2020','2021','2022','2023','2024'])
const getDataYears = async (selected_values,selected_area) => {
    const progress1 = useProgress().start();
    for (const year of years.value) {
        let data = await getStats(year, selected_values, selected_area)
        if (data) {
            yala.value.push({year:year,count:data[0].sum});
            maha.value.push({year:year,count:data[1].sum});
            third.value.push({year:year,count:data[2].sum});
            income.value.push({year:year,count:data[3].sum});
        }
    }

        chartData.value = [
            {title:'Yala Season',type:'column',data:yala.value},
            {title:'Third Season',type:'column',data:third.value},
            {title:'Maha Season',type:'column',data:maha.value},
            // {title:'Total Farmers',type:'line',data:income.value},
        ]
    localStorage.setItem("barChart1",JSON.stringify(chartData.value));
    // console.log("fucking seasons",chartData.value)
    progress1.finish();
}
const getStats = async (year,selected_values,selected_area) => {
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/mahaweli-cid/statistics',
        data: JSON.stringify({
            collection: 'ci_db_'+year,
            admin_boundary: JSON.stringify(selected_values),
            boundary_type: selected_area,
            attribute:JSON.stringify(['Yala_Ac','Maha_Ac','Third_Ac','Total_farm'])
        })
    }

    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);
    console.log('Bar Chart Data', json_data.value);
    // console.log("chart_labels pie",labelColorArray.value);
    // store.commit('setChartColors',labelColorArray.value);
    // data:[
    //     {title:'Income',type:'column',data:[{year:'2013',count:1.4},{year:'2014',count:2},{year:'2015',count:5},etc...}]},
    //     etc...
    //         {title:'Revenue',type:'line',data:[{year:'2013',count:6},{year:'2014',count:2},{year:'2015',count:5}]},
    //     etc...
    // ],
    // chartData.value = [
    //     {title:'Catchment Area',type:'column',data:json_data.value}
    // ]
    return json_data.value;
}

onMounted(async () => {
    let existing_chart_data = localStorage.getItem('barChart1');
    existing_chart_data =null;
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

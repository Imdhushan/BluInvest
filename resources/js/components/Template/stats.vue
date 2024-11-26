<template >
    <div>
<!--        <v-row no-gutters>-->
<!--            <v-col cols="4" v-for="(item,key) in stat_arr" :key="key">-->
<!--                <v-card elevation = "6" class="main_card_style"  color="#3b9ad2" >-->
<!--                    <v-card-subtitle class="card_subtitle" style="font-size: small;font-weight: bolder; color:#ffffff" >-->
<!--                        {{ item.attr }}-->
<!--                    </v-card-subtitle>-->
<!--                    <v-card-title class="card_title">-->
<!--                        {{ numeralFormat(item.value) }}-->
<!--                    </v-card-title>-->
<!--                </v-card>-->
<!--            </v-col>-->
<!--        </v-row>-->

        <div class="row">
            <!-- BEGIN stats -->
            <div class="col-xl-3 col-lg-6" v-for="(item,key) in stat_arr" :key="key">
                <card class="mb-3">
                    <card-body>
                        <div class="d-flex fw-bold small mb-3">
                            <span class="flex-grow-1">{{item.attr}}</span>
                            <card-expand-toggler />
                        </div>
                        <div class="row align-items-center mb-2">
                            <div class="col-7" v-if="item.attr === 'Cropping Intensity - '+selected_year">
                                <h3 class="mb-0">{{ item.value.toFixed(2) }}</h3>
                            </div>
                            <div class="col-7" v-else>
                                <h3 class="mb-0">{{ numeralFormat(item.value) }}</h3>
                            </div>
                            <div class="col-5">
                                <div class="mt-n3 mb-n2">
                                    <apexchart :series="item.chart.series" :options="item.chart.options" height="30"></apexchart>
                                </div>
                            </div>
                        </div>
                        <div class="small text-inverse text-opacity-50 text-truncate">
                            <template v-for="(subitem,key) in item.child">
                                <div >
                                   {{subitem.attr}} &nbsp; {{ numeralFormat(subitem.value) }}
                                </div>
                            </template>
                        </div>
                    </card-body>
                </card>
            </div>
        </div>
    </div>
</template>

<script setup>
import {mapState, useStore} from "vuex";
import {computed, defineComponent, onMounted, ref, shallowRef, watch} from "vue";
import generalAxiosRequest from "../../composables/application/generalAxiosRequest";
import {useAppVariableStore} from "../../stores/app-variable";
import apexchart from '../plugins/Apexcharts.vue';
const skeltonLoading = ref(true);
const stat_arr = ref([])

const store = useStore();
const appVariable = useAppVariableStore();
const selected_year = ref('2024');
const getStats = async (year,boundary,boundary_type) => {
    selected_year.value = year;
    skeltonLoading.value = true;
    stat_arr.value = [];
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/mahaweli-cid/statistics',
        data: JSON.stringify({
            collection: 'ci_db_'+year,
            admin_boundary: JSON.stringify(boundary),
            // admin_boundary: JSON.stringify(['NORTHERN','NORTH CENTRAL','EASTERN']),
            boundary_type: boundary_type,
            attribute: JSON.stringify(['Yala_Ac','Maha_Ac',
                'Third_Ac','CI','Harvst__Y','Harvest_M',
                'Harvest_T','Income_Y','Income_M','Income_T','Male','Female','Youth'
            ])
        })
    }

    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);

    let culty_yala =   json_data.value[0].sum;
    let culty_maha =   json_data.value[1].sum;
    let culty_third =   json_data.value[2].sum;
    let culty_sum = culty_yala+culty_maha+culty_third;

    let ci           =   json_data.value[3].sum/529;
    let harvest_yala =   json_data.value[4].sum;
    let harvest_maha =   json_data.value[5].sum;
    let harvest_third =   json_data.value[6].sum;
    let harvest_sum = harvest_yala+harvest_maha+harvest_third;

    let income_yala =   json_data.value[7].sum;
    let income_maha =   json_data.value[8].sum;
    let income_third =   json_data.value[9].sum;
    let income_sum = income_yala+income_maha+income_third;

    let male =   json_data.value[10].sum;
    let female =   json_data.value[11].sum;
    let youth =   json_data.value[12].sum;
    let total_farmers = male+female+youth;


    stat_arr.value.push(
        // {'attr':"Total Farmers", 'value':json_data.value[0].sum,child:[]},
        {'attr':"Cultivation Area (Ac) - "+year, 'value':culty_sum,
            child:[
                {'attr':"Yala Season", 'value':culty_maha},{'attr':"Maha Season", 'value':culty_maha},{'attr':"Third Season", 'value':culty_third}
            ],
            'chart': {
                height: 30,
                options: { chart: { type: 'bar', sparkline: { enabled: true } }, colors: [appVariable.color.theme], plotOptions: { bar: { horizontal: false, columnWidth: '65%',	endingShape: 'rounded' } } },
                series: [{ name: 'Visitors', data: [randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo()] }]
            }

        },
        {'attr':"Cropping Intensity - "+year, 'value':ci,child:[{'attr':"Harvest", 'value':harvest_sum},{'attr':"Cultivated Area", 'value':culty_sum},{'attr':"Income Rs", 'value':income_sum}],
            'chart': {
                height: 30,
                options: { chart: { type: 'line', sparkline: { enabled: true } }, colors: [appVariable.color.theme], stroke: { curve: 'straight', width: 2 } },
                series: [{ name: 'Visitors', data: [randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo(), randomNo()] }]
            }

        },
        {'attr':"Total Farmers "+year, 'value':total_farmers,child:[{'attr':"Male", 'value':male},{'attr':"Female", 'value':female},{'attr':"Youth", 'value':youth}],
            'chart': {
                height: 45,
                options: { chart: { type: 'pie', sparkline: { enabled: true } }, colors: ['rgba('+ appVariable.color.themeRgb + ', 1)', 'rgba('+ appVariable.color.themeRgb + ', .75)', 'rgba('+ appVariable.color.themeRgb + ', .5)'], stroke: { show: false } },
                series: [randomNo(), randomNo(), randomNo()]
            }

        },
        {'attr':"Harvest (Kg) "+year, 'value':harvest_sum,
            child:[{'attr':"Yala Season", 'value':harvest_yala},{'attr':"Maha Season", 'value':harvest_maha},{'attr':"Third Season", 'value':harvest_third}],
            'chart': {
                height: 45,
                options: { chart: { type: 'donut', sparkline: { enabled: true } }, colors: ['rgba('+ appVariable.color.themeRgb + ', .15)', 'rgba('+ appVariable.color.themeRgb + ', .35)', 'rgba('+ appVariable.color.themeRgb + ', .55)', 'rgba('+ appVariable.color.themeRgb + ', .75)', 'rgba('+ appVariable.color.themeRgb + ', .95)'], stroke: { show: false, curve: 'smooth', lineCap: 'butt', colors: 'rgba(' + appVariable.color.blackRgb + ', .25)', width: 2, dashArray: 0 }, plotOptions: { pie: { donut: { background: 'transparent' } } } },
                series: [randomNo(), randomNo(), randomNo(), randomNo(), randomNo()]
            }

        },
    )
    localStorage.setItem("statData",JSON.stringify(stat_arr.value))
    for (let i = 0;i<4;i++){
        setChartData();
    }
    // loading.value = false;
    console.log("fucking stats",stat_arr.value);
}

const triggureArea = computed(() => {
    return store.getters.queryArea;
});

watch(triggureArea,function (area,oldEvent) {
    if (area){
        console.log("query started",area);
        getStats(area.year,area.selected_values,area.selected_area);
    }
});

onMounted(() => {
    // let availableStat = localStorage.getItem('statData');
    // availableStat = JSON.parse(availableStat)
    // if (availableStat){
    //     stat_arr.value = availableStat;
    //     for (let i = 0;i<4;i++){
    //         setChartData();
    //     }
    // }else{
        getStats('2024',['All'],'Province');
    // }

});

const chartOptions = {
    chart: { type: 'bar', sparkline: { enabled: true } },
    colors: [appVariable.color.theme],
    plotOptions: { bar: { horizontal: false, columnWidth: '65%',	endingShape: 'rounded' } }
};

const setChartOptions = (index)=>{

}

const chartData = ref([]);
const setChartData = () => {
    chartData.value.push([{ name: 'Dataset', data: [
            randomNo(),
            randomNo(),
            randomNo(),
            randomNo(),
            randomNo(),
            randomNo(),
            randomNo(),
            randomNo(),
            randomNo(),
            randomNo(),
            randomNo(),
            randomNo(),
            randomNo()]
    }]);
}
const randomNo = () => {
    return Math.floor(Math.random() * 60) + 30
}
</script>
<style scoped>

.main_card_style{
    border-radius: 5px;
    margin-top: 10px;
    margin-right: 5px;
    margin-bottom: 5px;
}
.card_title{
    justify-content: center;
    text-align: center;
    font-size: x-large;
    font-weight: bolder
}
.card_subtitle{
    margin-top: 5px;
    justify-content: center;
    text-align: center;
    font-size: small;
    color: white;
}
.table_text{
    font-size: small;
}
.blur-image {
    filter: blur(20px); /* Adjust the pixel value as needed */
}

</style>
<style>
.am5-layer-30{
    display: none;
}
</style>

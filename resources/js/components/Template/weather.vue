<template >
    <div>

        <card class="mb-3" v-bind:style="{ 'height':applicationWindow.height/1.62 +'px' }">

            <!-- <ul class="nav nav-tabs">
                <li class="nav-item me-1"><a href="#weather" class="nav-link" :class="activeTab === 'weather'?'active':''" @click="activeTab = 'weather'">Weather</a></li>
                <li class="nav-item me-1"><a href="#gauge" class="nav-link" :class="activeTab === 'gauge'?'active':''" @click="activeTab = 'gauge'">Gauge</a></li>
            </ul>
            <div class="tab-content pt-3">
                <div class="tab-pane fade " :class="activeTab === 'weather'?'show active':''" id="weather"> -->
                    <perfect-scrollbar v-bind:style="{ 'height':applicationWindow.height/2 +'px' }">
                        <!--                    <div class="row">-->
                        <div class="col-xl-12 col-lg-12" v-for="(item,key) in weatherDataArray">
                            <card class="mb-3" style="min-width: 100px">
                                <card-body>
                                    <div class="ms-3">
                                        {{ item.date }}<br />
                                        <img :src="item.icon" width="60">
                                        <div class="small text-inverse text-opacity-50 text-truncate">
                                            <div>
                                                <i v-bind:class="'bi bi-thermometer-half'"></i>{{ item.temperature }}
                                            </div>
                                            <div>
                                                <i v-bind:class="'bi bi-wind'"></i>{{ item.wind }}
                                            </div>
                                        </div>
                                    </div>
                                </card-body>
                            </card>
                        </div>
                        <!--                    </div>-->
                        <!--                    <div class="row">-->
                        <!--                        <div class="col-xl-6 col-lg-12" v-for="(item,key) in weatherDataArray.slice(2,4)">-->
                        <!--                            <card class="mb-3">-->
                        <!--                                <card-body>-->
                        <!--                                    {{ item.date }}<br />-->
                        <!--                                    <img :src="item.icon" width="60">-->
                        <!--                                    <div class="small text-inverse text-opacity-50 text-truncate">-->
                        <!--                                        <div>-->
                        <!--                                            <i v-bind:class="'far fa-hdd fa-fw me-1'"></i>{{ item.temperature }}-->
                        <!--                                        </div>-->
                        <!--                                        <div>-->
                        <!--                                            <i v-bind:class="'far fa-hdd fa-fw me-1'"></i>{{ item.wind }}-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->
                        <!--                                </card-body>-->
                        <!--                            </card>-->
                        <!--                        </div>-->
                        <!--                    </div>-->
                        <!--                    <div class="row">-->
                        <!--                        <div class="col-xl-6 col-lg-12" v-for="(item,key) in weatherDataArray.slice(4,6)">-->
                        <!--                            <card class="mb-3">-->
                        <!--                                <card-body>-->
                        <!--                                    {{ item.date }}<br />-->
                        <!--                                    <img :src="item.icon" width="60">-->
                        <!--                                    <div class="small text-inverse text-opacity-50 text-truncate">-->
                        <!--                                        <div>-->
                        <!--                                            <i v-bind:class="'far fa-hdd fa-fw me-1'"></i>{{ item.temperature }}-->
                        <!--                                        </div>-->
                        <!--                                        <div>-->
                        <!--                                            <i v-bind:class="'far fa-hdd fa-fw me-1'"></i>{{ item.wind }}-->
                        <!--                                        </div>-->
                        <!--                                    </div>-->
                        <!--                                </card-body>-->
                        <!--                            </card>-->
                        <!--                        </div>-->
                        <!--                    </div>-->
                    </perfect-scrollbar>
                <!-- </div>
                <div class="tab-pane fade" :class="activeTab === 'gauge'?'show active':''" id="gauge">
                    <perfect-scrollbar v-bind:style="{ 'height':applicationWindow.height/2 +'px' }">
                        <gauge-report
                            :gaugeData="gaugeData"
                        />
                    </perfect-scrollbar>
                </div>
            </div> -->
        </card>




<!--        <v-card flat class="pt-1" style="background-color: #f2f2f2">-->
<!--            &lt;!&ndash;            <v-card-subtitle>Click on Map to check the weather</v-card-subtitle>&ndash;&gt;-->
<!--            &lt;!&ndash;            <v-card-title>{{ address }} </v-card-title>&ndash;&gt;-->
<!--            <v-carousel style="height: auto" show-arrows="hover" hide-delimiters>-->
<!--                <v-carousel-item :cover="true" >-->
<!--                    &lt;!&ndash;                    <v-tooltip text="Click on the map to check weather"  location="bottom">&ndash;&gt;-->
<!--                    &lt;!&ndash;                        <template v-slot:activator="{ props }">&ndash;&gt;-->
<!--                    <v-card style="background-color: #f2f2f2" variant="flat" v-tooltip:bottom.tooltip="'click on the map to change the location'">-->
<!--                        <v-row>-->
<!--                            <v-col cols="12" lg="4" v-for="(item,key) in weatherDataArray.slice(0,3)">-->
<!--                                <v-skeleton-loader-->
<!--                                    :loading="loading"-->
<!--                                    height="97"-->
<!--                                    type="list-item-three-line"-->
<!--                                    class="pt-2 mb-5 "-->
<!--                                >-->
<!--                                    <v-card   class="weather_card" :color="item.color">-->
<!--                                        <v-card-text class="weather_text">-->
<!--                                            {{ item.date }}<br />-->
<!--                                            <v-avatar>-->
<!--                                                <img :src="item.icon" width="60">-->
<!--                                            </v-avatar> <br />-->
<!--                                            <v-icon>-->
<!--                                                mdi-thermometer-->
<!--                                            </v-icon>-->
<!--                                            <span style="font-size: xx-small"> {{ item.temperature }}</span> &nbsp;&nbsp;-->
<!--                                            <v-icon>-->
<!--                                                mdi-weather-windy-->
<!--                                            </v-icon>-->
<!--                                            <span style="font-size: xx-small">{{ item.wind }}</span>-->
<!--                                        </v-card-text>-->
<!--                                    </v-card>-->
<!--                                </v-skeleton-loader>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                    </v-card>-->
<!--                    &lt;!&ndash;                        </template>&ndash;&gt;-->
<!--                    &lt;!&ndash;                    </v-tooltip>&ndash;&gt;-->
<!--                </v-carousel-item>-->

<!--                <v-carousel-item :cover="true" >-->
<!--                    <v-card variant="flat" style="background-color: #f2f2f2">-->
<!--                        <v-row>-->
<!--                            <v-col cols="12" lg="4" v-for="(item,key) in weatherDataArray.slice(3,6)">-->
<!--                                <v-card elevation="6"  class="pt-2 weather_card" :color="item.color">-->
<!--                                    <v-card-text class="weather_text">-->
<!--                                        {{ item.date }}<br />-->
<!--                                        <v-avatar>-->
<!--                                            <img :src="item.icon" width="60">-->
<!--                                        </v-avatar> <br />-->
<!--                                        <v-icon>-->
<!--                                            mdi-thermometer-->
<!--                                        </v-icon>-->
<!--                                        <span style="font-size: x-small">{{ item.temperature }}</span> &nbsp;&nbsp;-->
<!--                                        <v-icon>-->
<!--                                            mdi-weather-windy-->
<!--                                        </v-icon>-->
<!--                                        <span style="font-size: x-small">{{ item.wind }}</span>-->
<!--                                    </v-card-text>-->
<!--                                </v-card>-->
<!--                            </v-col>-->
<!--                        </v-row>-->
<!--                    </v-card>-->

<!--                </v-carousel-item>-->
<!--            </v-carousel>-->
<!--            &lt;!&ndash;            </div>&ndash;&gt;-->
<!--        </v-card>-->

    </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from 'vue'
import "vue-openweather/style.css";
import {useStore} from "vuex";
import {utcToSimpleDate} from "../../composables/application/timeconversion";
import $ from 'jquery'
import GaugeReport from "./gauges/GaugeReport.vue";
import generalAxiosRequest from "../../composables/application/generalAxiosRequest";
import handleResize from "../../composables/application/handleResize";
const store = useStore();
const lat = ref("7.9708759");
const lng = ref("80.2615532");
const address = ref("Galgamuwa, Sri Lanka");
const activeTab = ref('weather')
const mapLocation = computed(() => {
    return store.getters.mapLocation
})
const {applicationWindow} = handleResize(40,87);
watch(mapLocation,function (newEvent,oldEvent) {
    if (newEvent && newEvent.lat){
        lat.value = newEvent.lat;
        lng.value = newEvent.lng;
        address.value = newEvent.address;
        getWeatherData(lat.value,lng.value);
    }
});
onMounted(() => {
    getWeatherData(lat.value,lng.value);
})
const weather = ref(null)
const weatherDataArray = ref([{},{},{}]);
const timezone_offset = ref(null);
const loading = ref(true);
const getWeatherData = async (lat,lng) => {
    loading.value = true;

    const weatherData = await fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lng}&appid=d619d46a8e5002b6e54434782ff2a2f4&units=metric&exclude=minutely,hourly`);
    weather.value = await weatherData.json();
    console.log("fucking weatherData",weather.value)
    console.log("date",utcToSimpleDate(weather.value.current.dt, weather.value.timezone_offset))
    timezone_offset.value = weather.value.timezone_offset;
    // weatherDataArray.value.push(refactorWeatherObj(weather.value.current))
    weatherDataArray.value = [];
    $.each(weather.value.daily,function (key,val) {
        weatherDataArray.value.push(refactorWeatherObj(val));
    })
    console.log("Weather array",weatherDataArray);
    loading.value = false;
}

const refactorWeatherObj = (data)=>{
    let date = utcToSimpleDate(data.dt, timezone_offset.value);
    let icon  = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`
    let color = '#607D8B';
    switch (data.weather[0].icon) {
        case '10d' : color = '#607D8B';break;
        case '11d' : color = '#263238';break;
        case '09d' : color = '#37474F';break;
        case '04d' : color = '#90A4AE';break;
        case '01d' : color = '#FB8C00';break;
        case '02d' : color = '#FB8C00';break;
    }
    return {
        date:date,
        icon:icon,
        color:color,
        wind:data.wind_speed+" kmph",
        humidity:data.humidity,
        temperature:data.temp.day+" °C",
    }
}

watch(activeTab,function (tab,oldEvent) {
    if (tab === 'gauge'){
        // getDataset();
    }
});
const gaugeData = ref([]);
const getDataset = async () => {
    const payload = {
        url: 'https://services.gsentry.cloud/api/v1/general-queries/readData',
        data: JSON.stringify({
            collection: 'gaugeReadings',
        })
    }
    const {json_data} = await generalAxiosRequest('curl-requests/post', payload, false);
    console.log("gauges",json_data.value);
    gaugeData.value = json_data.value;
}
</script>
<style scoped>
.weather_card {
    border-radius: 20px;
    margin-bottom: 10px;
}
.weather_text {
    font-size: x-small;
    text-align: center;
    justify-content: center;
    padding: 4px;
}
.v-skeleton-loader {
    display: block;
}
/* Global CSS overriding the vue weather widget css two column in single row */
/*.horizontal[data-v-25526f10] {*/
/*    display: flex;*/
/*    flex-wrap: wrap;*/
/*    overflow-x: auto;*/
/*}*/

/*.horizontal[data-v-25526f10] .card {*/
/*    flex: 1;*/
/*    flex-basis: calc(50% - 10px);  !* Assume a 10px margin, adjust accordingly *!*/
/*    margin: 5px;  !* Half of the margin subtracted in flex-basis *!*/
/*}*/

p[data-v-25526f10] {
    margin-bottom: 0.3rem;
    font-size: smaller;
}
img[data-v-25526f10] {
    width: 50px;
    height: 50px;
}
td {
    font-size: xx-small;
}
button{
    font-size: xx-small;
}
a{
    font-size: xx-small;
}
</style>



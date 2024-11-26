<template>
    <div>
        <span>Gauge Reporting</span>
<!--        <ApexCustomGauge-->
<!--            :data="props.gaugeData"-->
<!--            mainTitle="Gauge Reporting"-->
<!--        />-->
        <table class="table table-striped mt-3">
<!--            <thead>-->
<!--                <th>Name</th>-->
<!--                <th>Reading</th>-->
<!--                <th>Date</th>-->
<!--                <th>Description</th>-->
<!--            </thead>-->
            <tbody>
                <tr v-for="(item,key) in gaugeReadings">
                    <td>{{item.gaugeName}}</td>
                    <td>{{item.reading}}</td>
<!--                    <td>{{item.local_times}}</td>-->
<!--                    <td>{{item.description}}</td>-->
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script setup>
import {onMounted, ref, toRaw, watch} from "vue";
import ApexCustomGauge from "../../Reusables/Charts/ApexCustomGauge.vue";
const props = defineProps(['gaugeData'])

watch(() => props.gaugeData, (data, oldEvent) => {
    refactorDataset(data)
})
const gaugeReadings = ref([]);
const refactorDataset = (data) => {
  let newData = [];
  data.forEach(function (o,key) {
      let existIndex = _.findIndex(newData,{gaugeName:o.data.properties.gaugeName});
      if (existIndex && existIndex > -1){
          console.log("found",existIndex)
          let prevData = newData[existIndex];
           prevData.reading += parseFloat(o.data.properties.reading);
          newData.splice(existIndex,1,newData[existIndex]);
      }else{
          newData.push(o.data.properties);
      }

  });
    gaugeReadings.value = newData;
}
</script>
<style scoped>
th {
    font-size: small;
}
td {
    font-size: xx-small;
}
</style>

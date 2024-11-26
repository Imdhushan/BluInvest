<template>
    <ApexCharts :height="chart.height" :options="chart.options" :series="chart.series"></ApexCharts>
</template>

<script setup>
import {onMounted, ref, watchEffect} from 'vue';
import { defineProps } from 'vue';
import ApexCharts from '../../../components/plugins/Apexcharts.vue';
import { useAppVariableStore } from '../../../stores/app-variable';

// Define props
const props = defineProps({
    data: Array,
    mainTitle: String,
    categoryKey: String,
    valueKey: String
});

const appVariable = useAppVariableStore();

    const chart = ref({
        height: 150,
        options: {
            chart: {
                type: 'radialBar',
                offsetY: -20,
                sparkline: {
                    enabled: true
                },
                background: '#1E2936'
            },
            plotOptions: {
                radialBar: {
                    startAngle: -90,
                    endAngle: 90,
                    track: {
                        background: "#e7e7e7",
                        strokeWidth: '97%',
                        margin: 5, // margin is in pixels
                        dropShadow: {
                            enabled: true,
                            top: 2,
                            left: 0,
                            color: '#999',
                            opacity: 1,
                            blur: 2
                        }
                    },
                    dataLabels: {
                        formatter: function(val) {
                            return val;
                        },
                        name: {
                            show: false
                        },
                        value: {
                            offsetY: -2,
                            fontSize: '22px',
                            color:appVariable.color.bodyColor
                        }
                    }
                }
            },
        },
        series: []
    });

    // Function to process dataset
const processChartData = () => {
    chart.value.series = props.data;

};



    // Watch for changes in dataset and mainTitle props and update chart config
watchEffect(() => {
    processChartData();
});
</script>

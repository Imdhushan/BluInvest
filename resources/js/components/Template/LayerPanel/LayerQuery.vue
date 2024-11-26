<template>
    <div>
        <div class="row mb-3">
            <div class="col-xl-4">
                <div class="mb-3">
                    <label for="filterAttr" class="form-label">Attribute</label>
                    <select class="form-select" id="filterAttr" title="All continents" v-model="selectedAttribute" @change="setSelectedAttrValues()">
                        <option v-for="attr in selectedLayer.attributes">{{attr}}</option>
                    </select>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="mb-3">
                    <label for="filterLogic" class="form-label">Logic</label>
                    <select class="form-select" id="filterLogic" title="All continents" v-model="dataOperator">
                        <option selected>=</option>
                        <option><</option>
                        <option>></option>
                        <option>≠</option>
                    </select>
                </div>
            </div>
            <div class="col-xl-4">
                <div class="mb-3">
                    <label for="filterSelectedAttr" class="form-label">Value</label>
                    <typeahead id="filterSelectedAttr"
                               :items="selectedAttrValues"
                               v-model="selectedAttrVal"
                               :minInputLength="0"
                               @selectItem="setAttrSelect"
                    ></typeahead>
                </div>
            </div>
        </div>

        <card class="card mb-3">
            <card-body class="p-2" v-if="selectedLayer && selectedLayer.queries">
                <div class="d-flex fw-bold small mb-3">
                    <span class="flex-grow-1">
                        {{ selectedLayer.queries }} &nbsp;&nbsp;
                    </span>
                    <div class="d-grid gap-2">
                        <button type="button" class="btn btn-outline-warning btn-sm" @click="runQuery('clear','=','All')">Remove</button>
                        <button type="button" class="btn btn-outline-success btn-sm" @click="downLoadResult(selectedLayer.filteredData,selectedLayer.name)">Download</button>
                    </div>
                </div>

            </card-body>
        </card>
        <div class="d-grid gap-2">
            <button type="button" class="btn btn-outline-theme btn-sm mt-3" @click="runQuery(selectedAttribute,dataOperator,selectedAttrVal)">
                Run Query
            </button>
        </div>
    </div>
</template>

<script setup>
import {ref, watch, defineProps, inject} from "vue";
import Typeahead from "../../plugins/Typeahead.vue";
import notificationHandling from "../../../composables/application/notificationHandling";
import ujWorkBook from "../../../composables/application/ujWorkBook";
import {useStore} from "vuex";
const props = defineProps({
    selectedLayer:Object,
    previewdPoints:Array,
    previewdLayers:Array,
    lid:Number

});
const emits = defineEmits(['requestClose']);
const selectedAttribute = ref(null);
const dataOperator = ref(null);
const selectedAttrValues = ref([]);
const selectedAttrVal = ref(null);
const googleProperty = inject('$googleProperty')

const store = useStore();
const setSelectedAttrValues = ()=>{
    console.log("selectedLayerValue",props.selectedLayer);
    let groupedData;
    // if (props.selectedLayer.layerType === 'point'){
    //     groupedData = _.groupBy(props.selectedLayer.data,selectedAttribute.value);
    // }else{
    let dataArr = [];
    props.selectedLayer.data.forEach(function(feature) {
        if (props.selectedLayer.layerType === 'point')
            dataArr.push(feature.properties);
        else
            dataArr.push(feature[googleProperty]);
    });
    groupedData = _.groupBy(dataArr,selectedAttribute.value);
    // }
    console.log("groupedData",groupedData);
    selectedAttrValues.value = Object.keys(groupedData);
}

const setAttrSelect = (data)=>{
    selectedAttrVal.value = data;
    console.log("fucking auto type",data)
}

const runQuery = (attr,operator,values)=>{
    console.log(attr+" "+operator+" "+values);
    if (values === 'All'){
        props.selectedLayer.queries = "";
    }else{
        props.selectedLayer.queries = attr+" "+operator+" "+values;
    }
    if (props.selectedLayer.layerType === 'point')
        filteredPoints(attr,operator,values)
    else
        filterLayers(attr,operator,values)

    // query_dialog.value = false;
    selectedAttribute.value = null;
    selectedAttrValues.value = [];
    dataOperator.value = null;
    selectedAttrVal.value = null;
    // selectedLayerURL.value = null;
}

const filterLayers = (attr,operator,values) => {
    let filteredDataset = [];
    // props.previewdLayers.forEach((layer) => {
    props.selectedLayer.data.forEach((feature) => {
        console.log("fucking feature",feature)
        switch (operator) {
            case '=' :  if (isNaN(parseFloat(attr))){
                if(feature.getProperty(attr) && feature.getProperty(attr).toLowerCase() === values.toLowerCase()){
                    props.selectedLayer.data.overrideStyle(feature, { visible: true });
                    filteredDataset.push(feature[googleProperty])
                    console.log(attr.toLowerCase() +"==="+values.toLowerCase())
                }else{
                    if (values === 'All'){
                        props.selectedLayer.data.overrideStyle(feature, { visible: true });
                        filteredDataset.push(feature[googleProperty])
                    }else{
                        console.log(attr.toLowerCase() +"==="+values.toLowerCase())
                        props.selectedLayer.data.overrideStyle(feature, { visible: false });
                    }

                }

            }else{
                if(parseFloat(feature.getProperty(attr)) === parseFloat(values)){
                    props.selectedLayer.data.overrideStyle(feature, { visible: true });
                    filteredDataset.push(feature[googleProperty])
                }else{
                    props.selectedLayer.data.overrideStyle(feature, { visible: false });
                }
                console.log(feature.getProperty(attr) +"==="+values.toLowerCase())
            }
                break;
            case ">": if (!isNaN(parseFloat(feature.getProperty(attr)))){
                if(parseFloat(feature.getProperty(attr)) > parseFloat(values)){
                    props.selectedLayer.data.overrideStyle(feature, { visible: true });
                    filteredDataset.push(feature[googleProperty])
                }else{
                    props.selectedLayer.data.overrideStyle(feature, { visible: false });
                }
            }
                break;
            case "<": if (!isNaN(parseFloat(feature.getProperty(attr)))){
                if(parseFloat(feature.getProperty(attr)) < parseFloat(values)){
                    props.selectedLayer.data.overrideStyle(feature, { visible: true });
                    filteredDataset.push(feature[googleProperty])
                }else{
                    props.selectedLayer.data.overrideStyle(feature, { visible: false });
                }
            }
                break;
            case "≠":  if(feature.getProperty(attr) !== values){
                props.selectedLayer.data.overrideStyle(feature, { visible: true });
                filteredDataset.push(feature[googleProperty])
            }else{
                props.selectedLayer.data.overrideStyle(feature, { visible: false });
            }
                break;
        }
    });
    // });
    props.selectedLayer.filteredData = filteredDataset;
    let index = _.findIndex(props.previewdLayers, {lid: props.lid});
    console.log("replacing Index",props.lid);
    props.previewdLayers.splice(index,1,props.selectedLayer);
    console.log("fucking preview Layers",props.previewdLayers)
    notificationHandling('success',filteredDataset.length+" Features Returned")
    emits('requestClose');
}

const filteredPoints = (attr,operator,values) => {
    let combData = []
    props.previewdPoints.forEach((dataPoint,index) => {

        if (dataPoint.id === props.lid){
            if (values === 'All'){
                dataPoint.filteredData = dataPoint.data;
                props.previewdPoints.splice(index,1,dataPoint);
                combData = _.concat(combData, dataPoint.data)
            }else{
                const newdataset = [];
                dataPoint.filteredData.forEach((point,index)=>{
                    switch (operator) {
                        case '=' :  if (isNaN(parseFloat(attr))){
                            if(point.properties[attr] && point.properties[attr].toLowerCase() === values.toLowerCase()){
                                newdataset.push(point)
                            }
                        }else{
                            if(parseFloat(point.properties[attr]) === parseFloat(values)){
                                newdataset.push(point)
                            }
                        }
                            break;
                        case ">": if (!isNaN(parseFloat(point.properties[attr]))){
                            if(parseFloat(point.properties[attr]) > parseFloat(values)){
                                newdataset.push(point)
                            }
                        }
                            break;
                        case "<": if (!isNaN(parseFloat(point.properties[attr]))){
                            if(parseFloat(point.properties[attr]) < parseFloat(values)){
                                newdataset.push(point)
                            }
                        }
                            break;
                        case "≠":  if(point.properties[attr] !== values){
                            newdataset.push(point)
                        }
                            break;
                    }
                });
                dataPoint.filteredData = newdataset;
                props.previewdPoints.splice(index,1,dataPoint);
                combData = _.concat(combData, newdataset)
            }

        }
        else{
            if (dataPoint.visibility) {
                combData = _.concat(combData, dataPoint.filteredData)
            }
        }
    });
    store.commit('setLayerPoints', combData)
    notificationHandling('success',"Query Applied Successfully")
    emits('requestClose');
}

const downLoadResult = (dataset,name) => {
    if (props.selectedLayer.layerType === 'point')
        dataset = _.map(dataset,'properties');

    console.log("fucking result",dataset)
    ujWorkBook(dataset, "Query Result "+name)
}


</script>

<style scoped>

</style>

<template>
    <div>
        <div class="mb-3">
            <label for="filterAttr" class="form-label">Attribute</label>
            <select class="form-select" id="filterAttr" title="All continents" v-model="selectedAttribute" @change="setSelectedAttrValues()">
                <option v-for="attr in attribute_list">{{attr}}</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="filterLogic" class="form-label">Logic</label>
            <select class="form-select" id="filterLogic" title="All continents" v-model="dataOperator">
                <option selected>=</option>
                <option><</option>
                <option>></option>
                <option>≠</option>
            </select>
        </div>
        <div class="mb-3">
            <label for="filterSelectedAttr" class="form-label">Value</label>
            <typeahead id="filterSelectedAttr"
                       :items="selectedAttrValues"
                       v-model="selectedAttrVal"
                       :minInputLength="0"
                       @selectItem="setAttrSelect"
            ></typeahead>
        </div>

        <div class="d-grid gap-2">
            <button type="button" class="btn btn-outline-theme btn-sm mt-3" @click="applyQuery">
                Apply Query
                <i class="bi bi-funnel-fill"></i>
            </button>
        </div>

    </div>
</template>

<script setup>
import {ref} from "vue";
import Typeahead from "../../plugins/Typeahead.vue";
import {filterSwitch, groupedAttrValues} from "../../../composables/layers/defaultQuery";
import notificationHandling from "../../../composables/application/notificationHandling";

const props = defineProps({
    attribute_list:Array,
    ciData:Array
})
const emits = defineEmits(['applyFilter'])
const selectedAttribute = ref("");
const dataOperator = ref("=");
const selectedAttrValues = ref([]);
const selectedAttrVal = ref("");

const setSelectedAttrValues = ()=>{
    selectedAttrValues.value = groupedAttrValues(props.ciData,'point',selectedAttribute.value,null)
}

const setAttrSelect = (data)=>{
    selectedAttrVal.value = data;
}

const applyQuery = () => {
    let filteredData = filterSwitch(props.ciData,selectedAttribute.value,dataOperator.value,selectedAttrVal.value)
    // console.log("fucking filtered",filteredData)
    emits('applyFilter',filteredData);
}
</script>



<style scoped>

</style>

<template>
    <div>
        <div class="accordion-item mt-2" v-if="item.child && item.child.length">
            <h2 class="accordion-header" :id="'heading' + item.lid">
                <button
                    class="accordion-button"
                    type="button"
                    :class="{ collapsed: !isExpanded }"
                    :data-bs-target="'#collapse' + item.lid"
                    @click="isExpanded = !isExpanded"
                    :aria-expanded="isExpanded ? 'true' : 'false'"
                    :aria-controls="'collapse' + item.lid"
                >
                    {{ item.name }} &nbsp;&nbsp;
                </button>

            </h2>
            <div
                :id="'collapse' + item.lid"
                class="accordion-collapse collapse"
                :class="{ show: isExpanded }"
                :aria-labelledby="'heading' + item.lid"
            >
                <div class="accordion-body">
                    <!-- Recursive AccordionItem components for children -->
                    <accordion-item
                        v-for="(child, index) in item.child"
                        :key="index"
                        :item="child"
                        :level="level + 1"
                    />
                    <div class="d-grid gap-2">
                        <button type="button" class="btn btn-outline-theme btn-sm mt-3" @click="showUploadModal" :class="{disabled:isAddmoreDisabled}">
                            Add More Data
                            <i class="bi bi-plus-lg"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Direct ListItem component for items without children -->
        <list-item v-else :item="item" />

        <div ref="componentRoot">
            <div class="modal fade" :id="'filter'+item.lid" ref="dUploadModalElement" >
            <div class="modal-dialog  modal-xl" style="z-index: 9999999;">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Upload Data for {{item.name}}</h4>
                        <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
                    </div>
                    <div class="modal-body">
                        <LayerUpload
                            :lid="item.lid"
                            @requestClose="modalRequestClose"
                        />
                    </div>
                </div>
            </div>
        </div>
        </div>
    </div>
</template>

<script setup>
import {nextTick, onMounted, ref} from 'vue';
import AccordionItem from './AccordionItem.vue'; // Ensure path is correct
import ListItem from './Listitem.vue';
import {Modal} from "bootstrap";
import {useStore} from "vuex";
import LayerUpload from "../DataUpload/LayerUpload.vue"; // Ensure path is correct
const store = useStore();
const props = defineProps({
    item: Object,
    level: Number,
});

const isExpanded = ref(false);

const dUploadModalElement = ref(null); // This ref is for the DOM element.
const filterModalInstance = ref(null); // This ref will store the Bootstrap modal instance.
const emits = defineEmits(['add-layer']);
const testLayer = {lid:161,name:'Test',value:'test_collection',visibility:false,layer:null,color:'#673AB7'};
const showUploadModal = () => {
    nextTick(() => {
        if (dUploadModalElement.value && !filterModalInstance.value) {
            // Only create a new Modal instance if one does not already exist
            filterModalInstance.value = new Modal(dUploadModalElement.value);
        }
        filterModalInstance.value.show(); // Show the modal
    });
}

const isAddmoreDisabled = ref(true);

const checkAddMore = () => {
  let user = localStorage.getItem('user');
  user = JSON.parse(user);
  isAddmoreDisabled.value = !(user && user.email === 'gisoperator@gmail.com');
}

const uploadData = (lid) => {
    let payload = {
        data:testLayer,lid:lid
    }
    store.commit('setNewLayer',payload)
    // console.log("fucking add layer clicked",lid)
  // emits('add-layer',{data:testLayer,lid:lid});
}
/**
 * modal not previwing inside default way.
 * this is to attach modal to main root component
 * root component is inside app/Header
 * @type {Ref<UnwrapRef<null>>}
 */
const componentRoot = ref(null);
onMounted(() => {
    checkAddMore()
    nextTick(() => {
        if (componentRoot.value) {
            const modal = componentRoot.value.querySelector('.modal');
            document.getElementById('modal-root').appendChild(modal);
        }
    });
});


const modalRequestClose = () => {
    if (filterModalInstance.value) {
        filterModalInstance.value.hide();
    }
}
</script>

<!-- InfrastructureSection.vue -->
<template>
  <section :key="componentKey" class="bg-dark pt-6 pb-4 light" style="background-color: #2196F3">
    <div class="container">
      <div class="row flex-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-xl-start mt-3">
          <h4 class="text-white fw-light">
            INFRASTRUCTURE 
            <button @click="reSetProcess" class="btn btn-outline-success btn-sm mx-2 my-2">Reset</button>
          </h4>
          <p class="text-white text-200">
            Invest in eco-friendly tourism ventures that capitalize on Sri Lanka’s breathtaking landscapes and coastal beauty, ensuring both profitability and sustainability.
          </p>
          <h5 class="text-white fw-light">
            {{ currentSection.title }}:
            <br />
            <span class="text-600">{{ currentCardText }}</span>
          </h5>

          <div class="d-flex flex-wrap justify-content-between align-items-center pa-10">
            <!-- Render dynamic checkboxes based on the current step and card -->
            <div
              v-for="(input, index) in currentDynamicInputs"
              :key="index"
              class="form-check me-3 text-white"
            >
              <input
                type="checkbox"
                :id="`${input.label}-${index}`"
                :checked="isChecked(currentCardText, input.label)"
                @change="handleCheckboxChange(currentCardText, input.label, $event.target.checked)"
                class="form-check-input text-white"
              />
              <label :for="`${input.label}-${index}`">{{ input.label }}</label>
            </div>
          </div>

          <!-- Navigation Buttons -->
          <button v-if="currentCard > 1" @click="prevCard" class="btn btn-outline-light btn-sm mx-2 my-2">Back</button>
          <button v-if="currentCard < totalCardsInCurrentSection" @click="nextCard" class="btn btn-outline-light btn-sm mx-2 my-2">Next</button>
          <button @click="skipCard" class="btn btn-outline-danger btn-sm mx-2 my-2">Skip</button>
          <button
            v-if="currentCard === totalCardsInCurrentSection && currentSectionIndex < sections.length - 1"
            @click="goToNextSection"
            class="btn btn-outline-light btn-sm mx-2 my-2"
          >
            Next Section
          </button>
          <button
            v-if="currentSectionIndex > 0 && currentCard === 1"
            @click="goToPreviousSection"
            class="btn btn-outline-warning btn-sm mx-2 my-2"
          >
            Back Section
          </button>
          <button v-if="currentSectionIndex === sections.length - 1" @click="completeProcess" class="btn btn-outline-success btn-sm mx-2 my-2">Done</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch, onMounted } from "vue";

// Dynamic sections with cards and inputs
const sections = ref([
  {
    title: "Accessibility",
    cards: [
    { text: "Proximity to the main road ", dynamicInputs: [ { type: "checkbox", label: "0m - 200m", value: false }, { type: "checkbox", label: "200m - 400m", value: false }, { type: "checkbox", label: "400m - 600m", value: false }, { type: "checkbox", label: "600m - 800m", value: false } ] },

    { text: "Proximity to secondary roads", dynamicInputs: [ { type: "checkbox", label: "0m - 200m", value: false }, { type: "checkbox", label: "200m - 400m", value: false }, { type: "checkbox", label: "400m - 600m", value: false }, { type: "checkbox", label: "600m - 800m", value: false } ] },

    { text: "Proximity to a track", dynamicInputs: [ { type: "checkbox", label: "0m - 200m", value: false }, { type: "checkbox", label: "200m - 400m", value: false }, { type: "checkbox", label: "400m - 600m", value: false }, { type: "checkbox", label: "600m - 800m", value: false } ] },

      { text: "Proximity to a highway",
       dynamicInputs:
        [ { type: "checkbox", label: "0m - 200m", value: false }, 
        { type: "checkbox", label: "200m - 400m", value: false },
         { type: "checkbox", label: "400m - 600m", value: false }, 
         { type: "checkbox", label: "600m - 800m", value: false } 
        ] },
  { text: "Proximity to a railway", dynamicInputs: [ { type: "checkbox", label: "0m - 200m", value: false }, { type: "checkbox", label: "200m - 400m", value: false }, { type: "checkbox", label: "400m - 600m", value: false }, { type: "checkbox", label: "600m - 800m", value: false } ] }

    ],
  },
  {
    title: "Water",
    cards: [
      { text: " ", dynamicInputs: [{ label: "Availability of groundwater" }] }],
  },
  {
    title: "Availability of accommodation",
    cards: [
    { text: " ", dynamicInputs: [ { type: "checkbox", label: "Classified Hotels( 1-5 Star)", value: false }, { type: "checkbox", label: "Tourist Hotels", value: false }, { type: "checkbox", label: "Boutique Hotels & Villas", value: false }, { type: "checkbox", label: "Guest Houses", value: false }, { type: "checkbox", label: "Bungalows", value: false }, { type: "checkbox", label: "Home Stay Units", value: false } ] }
    ],
  },
  {
    title: "Security & Life Saving",
    cards: [
    { text: " ", dynamicInputs: [ { type: "checkbox", label: "Locations of Police Marine Units", value: false }, { type: "checkbox", label: "Locations of Tourist Police Units", value: false }, { type: "checkbox", label: "Police Life Saving Units ", value: false } ] }
    ],
  },
  {
    title: "Other Infrastructure",
    cards: [
    { text: " ", dynamicInputs: [ { type: "checkbox", label: "Proximity to school", value: false }, { type: "checkbox", label: "Proximity to hospital", value: false }, { type: "checkbox", label: "Availability of banks/ATMs ", value: false } ] }
    ],
  },
]);

// State variables
const currentSectionIndex = ref(0);
const currentCard = ref(1);
const selections = ref(JSON.parse(localStorage.getItem("selections")) || {});

// Watch selections and update localStorage
watch(
  selections,
  (newSelections) => {
    localStorage.setItem("selections", JSON.stringify(newSelections));
  },
  { deep: true }
);

// Computed properties
const currentSection = computed(() => sections.value[currentSectionIndex.value]);
const currentCards = computed(() => currentSection.value.cards);
const currentCardText = computed(() => currentCards.value[currentCard.value - 1].text);
const currentDynamicInputs = computed(() => currentCards.value[currentCard.value - 1].dynamicInputs);
const totalCardsInCurrentSection = computed(() => currentCards.value.length);

// Helpers
const isChecked = (cardText, label) => selections.value[cardText]?.includes(label);
const handleCheckboxChange = (cardText, label, isSelected) => {
  if (isSelected) {
    if (!selections.value[cardText]) selections.value[cardText] = [];
    if (!selections.value[cardText].includes(label)) selections.value[cardText].push(label);
  } else {
    const index = selections.value[cardText]?.indexOf(label);
    if (index > -1) selections.value[cardText].splice(index, 1);
    if (selections.value[cardText]?.length === 0) delete selections.value[cardText];
  }
};

// Navigation
const nextCard = () => {
  if (currentCard.value < totalCardsInCurrentSection.value) currentCard.value++;
};
const prevCard = () => {
  if (currentCard.value > 1) currentCard.value--;
};
const skipCard = () => {
  if (currentCard.value < totalCardsInCurrentSection.value) {
    currentCard.value++;
  } else {
    goToNextSection();
  }
};
const goToNextSection = () => {
  if (currentSectionIndex.value < sections.value.length - 1) {
    currentSectionIndex.value++;
    currentCard.value = 1;
  }
};
const goToPreviousSection = () => {
  if (currentSectionIndex.value > 0) {
    currentSectionIndex.value--;
    currentCard.value = 1;
  }
};

// Complete process
const completeProcess = () => {
  console.log("Selections:", selections.value);
  alert("Survey completed!");
};

// Reset process
const componentKey = ref(0);
const reSetProcess = () => {
  currentSectionIndex.value = 0;
  currentCard.value = 1;
  selections.value = {};
  localStorage.removeItem("selections");
  componentKey.value++;
};
</script>

<style scoped>
/* Custom styles */
</style>

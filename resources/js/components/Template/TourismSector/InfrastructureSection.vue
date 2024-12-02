<template>
  <section :key="componentKey" class="bg-dark pt-6 pb-4 light" style="background-color: #2196F3">
    <div
      v-if="backgroundImage"
      class="bg-holder overlay bg-holder-natural natural-overlay"
      :style="{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'center bottom' }"
    ></div>
    <div class="container">
      <div class="row flex-center">
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-xl-start mt-3">
          <h4 class="text-white fw-light">
            {{ title }}
            <button @click="reSetProcess" class="btn btn-outline-success btn-sm mx-2 my-2">Reset</button>
          </h4>
          <p class="text-white text-200">
            {{ description }}          </p>
          <h5 class="text-white fw-light">
            {{ currentSection.title || "No Section" }}:
            <br />
            <span class="text-600">{{ currentCardText || "No Card Available" }}</span>
          </h5>

          <div class="d-flex flex-wrap  align-items-center pa-10">
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
            v-if="currentCard === totalCardsInCurrentSection && currentSectionIndex < sectionsData.length - 1"
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
          <button v-if="currentSectionIndex === sectionsData.length - 1" @click="completeProcess" class="btn btn-outline-success btn-sm mx-2 my-2">Done</button>
        </div>
      </div>
    </div>
  </section>
</template>
<script setup>
import { ref, computed, defineProps } from "vue";

const props = defineProps({
  sections: {
    type: Object, // Account for a nested structure
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  backgroundImage: {
    type: String,
    required: false,
    default: '',
  },

});

// Handle nested or flat structure
const sectionsData = computed(() => props.sections.sections || props.sections || []);

// State variables
const currentSectionIndex = ref(0);
const currentCard = ref(1);
const selections = ref({});

// Computed properties
const currentSection = computed(() => sectionsData.value[currentSectionIndex.value] || {});
const currentCards = computed(() => currentSection.value.cards || []);
const currentCardText = computed(() => currentCards.value[currentCard.value - 1]?.text || "");
const currentDynamicInputs = computed(() => currentCards.value[currentCard.value - 1]?.dynamicInputs || []);
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
  if (currentSectionIndex.value < sectionsData.value.length - 1) {
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
  componentKey.value++;
};
</script>

<style scoped>

/* Add relevant styles */
.bg-holder-natural.natural-overlay::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent black overlay */
    z-index: 1; /* Ensures the overlay is above the background image */
  }
  
  .bg-holder-natural.natural-overlay > * {
    position: relative;
    z-index: 2; /* Ensures the content inside the div is above the overlay */
  }

</style>

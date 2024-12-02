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
            v-if="currentCard === totalCardsInCurrentSection && currentSectionIndex < props.sections.length - 1"
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
          <button v-if="currentSectionIndex === props.sections.length - 1" @click="completeProcess" class="btn btn-outline-success btn-sm mx-2 my-2">Done</button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, watch,defineProps } from "vue";


const props = defineProps({
  sections: {
    type: Array,
    required: true,
  },
});

// State variables
const currentSectionIndex = ref(0);
const currentCard = ref(1);
const selections = ref({});

// Computed properties
const currentSection = computed(() => props.sections[currentSectionIndex.value]);
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
  if (currentSectionIndex.value < props.sections.length - 1) {
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
/* Add your styles here */
</style>

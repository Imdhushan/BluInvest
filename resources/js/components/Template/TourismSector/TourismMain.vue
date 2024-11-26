<template>
    <section :key="componentKey" class="py-0 overflow-hidden light mt-10" id="banner">

        <div v-if="completed">
    <h4>Final Selection Summary</h4>
    <table class="table table-bordered">
      <thead>
        <tr><th colspan="3" class="text-center">INFRASTRUCTURE</th></tr>
      </thead>
      <tbody>
        <tr><td colspan="3" class="text-center fw-bold">Accessibility</td></tr>
        <tr v-for="(distance, roadType) in finalSelections.INFRASTRUCTURE.Accessibility" :key="roadType">
          <td colspan="2">{{ roadType }}</td>
          <td>{{ distance.join(", ") }}</td>
        </tr>

        <tr><td colspan="3" class="text-center fw-bold">Groundwater</td></tr>
        <tr>
          <td colspan="2">Availability of groundwater</td>
          <td>{{ finalSelections.INFRASTRUCTURE.Groundwater["Availability of groundwater"] }}</td>
        </tr>

        <tr><td colspan="3" class="text-center fw-bold">Accommodation Facilities</td></tr>
        <tr>
          <td colspan="2">Tourist Hotels</td>
          <td>{{ finalSelections.INFRASTRUCTURE["Accommodation Facilities"]["Tourist Hotels"] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
  
      <div class="container dark">
        <button @click="reSetProcess" class="btn btn-outline-success btn-sm mx-2 my-2">Reset</button>
        <h4 class="text-white fw-light">INFRASTRUCTURE</h4>
        <h5 v-if="currentStep === 1">Accessibility: <span class="text-600">{{ currentAccessibilityCard.text }}</span></h5>
        <h5 v-else-if="currentStep === 2">Groundwater</h5>
        <h5 v-else-if="currentStep === 3">Accommodation Facilities</h5>
  
        <!-- Render dynamic checkboxes based on the current step and card -->
        <div v-for="(input, index) in currentDynamicInputs" :key="index">
          <input
            type="checkbox"
            :id="`${input.label}-${index}`"
            :checked="isChecked(currentCardText, input.label)"
            @change="handleCheckboxChange(currentCardText, input.label, $event.target.checked)"
          />
          <label :for="`${input.label}-${index}`">{{ input.label }}</label>
        </div>
  
        <!-- Navigation Buttons -->
        <button v-if="currentCard > 1" @click="prevCard" class="btn btn-outline-light btn-sm mx-2 my-2">Back</button>
        <button v-if="currentCard < totalCardsInCurrentStep" @click="nextCard" class="btn btn-outline-light btn-sm mx-2 my-2">Next</button>
        <button @click="skipCard" class="btn btn-outline-danger btn-sm mx-2 my-2">Skip</button>
        <button
          v-if="currentCard === totalCardsInCurrentStep && currentStep < 3"
          @click="goToNextStep"
          class="btn btn-outline-light btn-sm mx-2 my-2"
        >
          Next Section
        </button>
        <button
          v-if="currentStep > 1 && currentCard === 1"
          @click="goToBackStep"
          class="btn btn-outline-warning btn-sm mx-2 my-2"
        >
          Back Section
        </button>
        <button v-if="currentStep === 3" @click="completeProcess" class="btn btn-outline-success btn-sm mx-2 my-2">Done</button>
      </div>
    </section>

    <InfrastructureSection />
    <NaturalResourcesSection />
  </template>
  
  <script setup>
  import { ref, computed, watch ,onMounted} from 'vue';
  import InfrastructureSection from './InfrastructureSection.vue';
import NaturalResourcesSection from './NaturalResourcesSection.vue';
  const currentStep = ref(1); // Current step of the process
  const currentCard = ref(1); // Current card within a step
  
  // Card data for each section
  const accessibilityCards = ref([
    { text: "Main road", dynamicInputs: [ { type: "checkbox", label: "0m - 200m", value: false }, { type: "checkbox", label: "200m - 400m", value: false }, { type: "checkbox", label: "400m - 600m", value: false }, { type: "checkbox", label: "600m - 800m", value: false } ] },
    { text: "Secondary road", dynamicInputs: [ { type: "checkbox", label: "0m - 200m", value: false }, { type: "checkbox", label: "200m - 400m", value: false }, { type: "checkbox", label: "400m - 600m", value: false }, { type: "checkbox", label: "600m - 800m", value: false } ] },
    { text: "Track", dynamicInputs: [ { type: "checkbox", label: "0m - 200m", value: false }, { type: "checkbox", label: "200m - 400m", value: false }, { type: "checkbox", label: "400m - 600m", value: false }, { type: "checkbox", label: "600m - 800m", value: false } ] },
    { text: "Highway", dynamicInputs: [ { type: "checkbox", label: "0m - 200m", value: false }, { type: "checkbox", label: "200m - 400m", value: false }, { type: "checkbox", label: "400m - 600m", value: false }, { type: "checkbox", label: "600m - 800m", value: false } ] },
    { text: "Railway station", dynamicInputs: [ { type: "checkbox", label: "0m - 200m", value: false }, { type: "checkbox", label: "200m - 400m", value: false }, { type: "checkbox", label: "400m - 600m", value: false }, { type: "checkbox", label: "600m - 800m", value: false } ] }
  ]);
  const groundwaterCards = ref([
    { text: "Groundwater", dynamicInputs: [{ label: "Availability of groundwater", value: false }] },
  ]);
  const accommodationCards = ref([
    { text: "Accommodation Facilities", dynamicInputs: [ { type: "checkbox", label: "Classified Hotels( 1-5 Star)", value: false }, { type: "checkbox", label: "Tourist Hotels", value: false }, { type: "checkbox", label: "Boutique Hotels & Villas", value: false }, { type: "checkbox", label: "Guest Houses", value: false }, { type: "checkbox", label: "Bungalows", value: false }, { type: "checkbox", label: "Home Stay Units", value: false } ] }
  ]);
  
  // Initial selections loaded from localStorage, or empty object if not found
  const selections = ref(JSON.parse(localStorage.getItem('selections')) || {});
  
  // Watch selections and store them in localStorage
  watch(selections, (newSelections) => {
    localStorage.setItem('selections', JSON.stringify(newSelections));
  }, { deep: true });
  
  // Helper to determine the current card set based on the step
  const currentCards = computed(() => {
    if (currentStep.value === 1) return accessibilityCards.value;
    if (currentStep.value === 2) return groundwaterCards.value;
    if (currentStep.value === 3) return accommodationCards.value;
    return [];
  });
  
  const totalCardsInCurrentStep = computed(() => currentCards.value.length);
  const currentAccessibilityCard = computed(() => currentCards.value[currentCard.value - 1]);
  const currentDynamicInputs = computed(() => currentAccessibilityCard.value.dynamicInputs);
  const currentCardText = computed(() => currentAccessibilityCard.value.text);
  
  // Check if a checkbox is checked based on selections
  const isChecked = (cardText, label) => selections.value[cardText]?.includes(label);
  
  // Handle checkbox selection and deselection
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
  
  // Navigation functions
  const nextCard = () => {
    if (currentCard.value < totalCardsInCurrentStep.value) currentCard.value++;
  };
  
  const prevCard = () => {
    if (currentCard.value > 1) currentCard.value--;
  };
  
  const skipCard = () => {
    if (currentCard.value < totalCardsInCurrentStep.value) {
      currentCard.value++;
    } else {
      goToNextStep();
    }
  };
  
  const goToNextStep = () => {
    currentStep.value++;
    currentCard.value = 1;
  };
  
  const goToBackStep = () => {
    if (currentStep.value > 1) {
      currentStep.value--;
      currentCard.value = 1;
    }
  };
  
//   const completeProcess = () => {
//     const finalSelections = JSON.parse(localStorage.getItem('selections'));
//     console.log("Final selections JSON:", finalSelections);
//     alert("You have completed the survey! JSON saved to localStorage.");
//     currentStep.value = 1;
//   };
  
const completed = ref(false);
const finalSelections = ref({});

// Retrieve final selections when component mounts
onMounted(() => {
  const storedSelections = JSON.parse(localStorage.getItem("formattedSelections"));
  if (storedSelections) {
    finalSelections.value = storedSelections;
    completed.value = true;
  }
});

const completeProcess = () => {
    const formattedSelections = {
      "INFRASTRUCTURE": {
        "Accessibility": {
          "Main road": selections.value["Main road"] || [],
          "Highway": selections.value["Highway"] || [],
          "Railway station": selections.value["Railway station"] || [],
          "Track": selections.value["Track"] || []
        },
        "Groundwater": {
          "Availability of groundwater": selections.value["Groundwater"] ? "Yes" : "No"
        },
        "Accommodation Facilities": {
          "Tourist Hotels": selections.value["Accommodation Facilities"]?.includes("Tourist Hotels") ? "Yes" : "No"
        }
      }
    };

    console.log("Final selections JSON:", formattedSelections);
    alert("Survey completed! JSON saved to localStorage.");
    localStorage.setItem("formattedSelections", JSON.stringify(formattedSelections));  // Save in storage
};


  const componentKey = ref(0); 

  
  const reSetProcess = () => {
  alert("You have completed the survey! JSON saved to localStorage.");
  currentStep.value = 1;
  currentCard.value = 1;
  selections.value = {}; // Reset selections
  localStorage.removeItem('selections');
  componentKey.value += 1; // Change the key to force re-render
};
  
  </script>
  
  <style scoped>
  /* Add any needed custom styling here */
  </style>
  
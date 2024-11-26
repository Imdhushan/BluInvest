<template>
    <section ref="naturalResourcesSectionRef" :key="componentKey2" class="bg-dark pt-6 pb-4 light" >
      <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/nature.jpg);background-position: center bottom;">
      </div>
      <div class="container">
        <div class="row flex-center">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-xl-start mt-3" >
            <h4 class="text-white fw-light">Natural Resources and Land Use
              <button @click="reSetProcess" class="btn btn-outline-success btn-sm mx-2 my-2">Reset</button>
            </h4>
            <p class="text-white text-200">Focus on sustainable resource management and land use for a thriving environment.</p>
  
            <h5 class="text-white fw-light">{{ currentCardText }}</h5>
            
            <div class="d-flex flex-wrap justify-content-between align-items-center pa-10">
              <div v-for="(input, index) in currentDynamicInputs" 
                   :key="index"
                   class="form-check me-3 text-white">
                <input
                  type="checkbox"
                  :id="`${input.label}-${index}`"
                  :checked="input.value"
                  @change="toggleCheckbox(input)"
                  class="form-check-input text-white"
                />
                <label :for="`${input.label}-${index}`">{{ input.label }}</label>
              </div>
            </div>
  
            <div class="button-group">
              <button v-if="currentCard > 1" @click="prevCard" class="btn btn-outline-light btn-sm mx-2 my-2">Back</button>
              <button v-if="currentCard < totalCards" @click="nextCard" class="btn btn-outline-light btn-sm mx-2 my-2">Next</button>
              <button v-if="currentCard < totalCards" @click="skipCard" class="btn btn-outline-warning btn-sm mx-2 my-2">Skip</button>
              <button v-if="currentCard === totalCards" @click="completeProcess" class="btn btn-outline-success btn-sm mx-2 my-2">Complete</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  // Define cards and their dynamic inputs
  const naturalResourcesCards = ref([
    { 
      text: "Land use​", 
      dynamicInputs: [
        { type: "checkbox", label: "Agricultural land​", value: false },
        { type: "checkbox", label: "Built Up Area​", value: false },
        { type: "checkbox", label: "Forest Land​", value: false },
        { type: "checkbox", label: "Sandy Area​", value: false },
        { type: "checkbox", label: "Water body​​", value: false },
        { type: "checkbox", label: "Wetland​​", value: false },
        { type: "checkbox", label: "Bare land​​", value: false },
        { type: "checkbox", label: "Rocky Area​", value: false },
      ]
    },
    { 
      text: "Wind speed (100m)​", 
      dynamicInputs: [
        { type: "checkbox", label: "High area ​", value: false },
        { type: "checkbox", label: "Moderate area​", value: false },
      ]
    },
    { text: "Solar irradiance​" ,
      dynamicInputs: [
        { type: "checkbox", label: "High area (> 4.4 PVOUT)​", value: false },
        { type: "checkbox", label: "Low area​", value: false },
      ]
    },
    { text: "Annual Rainfall (mm)​", dynamicInputs: [
        { type: "checkbox", label: "> 2500​", value: false },
        { type: "checkbox", label: "1750 - 2500​", value: false },
        { type: "checkbox", label: "< 2500​", value: false },
      ] },
    { text: "Distance from the coast (m)​", dynamicInputs: [
        { type: "checkbox", label: "0m - 200m", value: false },
        { type: "checkbox", label: "200m - 400m", value: false },
        { type: "checkbox", label: "400m - 600m", value: false },
        { type: "checkbox", label: "600m - 800m", value: false },
      ]},
  ]);
  
  const currentCard = ref(1);
  const currentCardData = computed(() => naturalResourcesCards.value[currentCard.value - 1]);
  const currentDynamicInputs = computed(() => currentCardData.value.dynamicInputs);
  const currentCardText = computed(() => currentCardData.value.text);
  const totalCards = computed(() => naturalResourcesCards.value.length);
  
  const completed = ref(false);
  const finalSelections = ref({});
  
  const selections = ref({}); // Store selections during the process
  
  // Retrieve final selections from localStorage when component mounts
  onMounted(() => {
    const storedSelections = JSON.parse(localStorage.getItem("formattedSelections"));
    if (storedSelections) {
      finalSelections.value = storedSelections;
      completed.value = true;
    }
  });
  
  // Function to store selections when the process is completed
  const completeProcess = () => {
    const formattedSelections = {
      "Natural Resources and Land Use": naturalResourcesCards.value.map(card => ({
        text: card.text,
        dynamicInputs: card.dynamicInputs.map(input => ({
          label: input.label,
          value: input.value
        }))
      }))
    };
  
    console.log("Final selections JSON:", formattedSelections);
    alert("Survey completed! JSON saved to localStorage.");
    localStorage.setItem("formattedSelections", JSON.stringify(formattedSelections));  // Save in localStorage
  };
  
  // Skip card functionality
  const skipCard = () => {
    if (currentCard.value < totalCards.value) currentCard.value++;
  };
  
  const componentKey2 = ref(0); 
  // Reset process and clear selections
//   const reSetProcess = () => {
//     alert("You have completed the survey! JSON saved to localStorage.");
//     currentCard.value = 1;
//     finalSelections.value = {}; // Reset selections
//     localStorage.removeItem('formattedSelections'); // Clear localStorage
//     componentKey2.value += 1; // Change the key to force re-render
//   };

  const reSetProcess = () => {
  alert("You have completed the survey! JSON saved to localStorage.");
  currentCard.value = 1;
  finalSelections.value = {}; // Reset selections
  localStorage.removeItem('formattedSelections'); // Clear localStorage
  
  // Reset dynamicInputs (checkbox values) to their initial state (false)
  naturalResourcesCards.value.forEach(card => {
    card.dynamicInputs.forEach(input => {
      input.value = false; // Reset each checkbox value
    });
  });
  
  componentKey2.value += 1; // Change the key to force re-render
};

  
  // Logic for navigation between cards
  function nextCard() {
    if (currentCard.value < totalCards.value) currentCard.value++;
  }
  
  function prevCard() {
    if (currentCard.value > 1) currentCard.value--;
  }
  
  function toggleCheckbox(input) {
    input.value = !input.value;
  }
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
  
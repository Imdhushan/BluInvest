<template>
    <section ref="naturalResourcesSectionRef" :key="componentKey2" class="bg-dark pt-6 pb-4 light">
      <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/nature.jpg);background-position: center bottom;">
      </div>
      <div class="container">
        <div class="row flex-center">
          <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-xl-start mt-3">
            <h4 class="text-white fw-light">
              {{ title }}
              <button @click="reSetProcess" class="btn btn-outline-success btn-sm mx-2 my-2">Reset</button>
            </h4>
            <p class="text-white text-200">{{ description }}</p>
  
            <!-- Loop through the sections (e.g., Accessibility, Main road, etc.) -->
            <div v-if="currentCardData">
              <h5 class="text-white fw-light">{{ currentCardData.title }}</h5>
              <div v-for="(input, inputIndex) in currentCardData.dynamicInputs" :key="inputIndex" class="form-check me-3 text-white">
                <input
                  type="checkbox"
                  :id="`${input.label}-${inputIndex}`"
                  :checked="input.value"
                  @change="toggleCheckbox(input)"
                  class="form-check-input text-white"
                />
                <label :for="`${input.label}-${inputIndex}`">{{ input.label }}</label>
              </div>
            </div>
  
            <!-- Navigation Buttons -->
            <div class="button-group mt-3">
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
  
  // Props passed from parent component
  const props = defineProps({
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    },
    naturalResourcesCards: {
      type: Array,
      required: true
    }
  });
  
  // Cards state handling
  const cards = ref(JSON.parse(JSON.stringify(props.naturalResourcesCards)));
  const currentCard = ref(1);
  const totalCards = computed(() => cards.value.length);
  const currentCardData = computed(() => cards.value[currentCard.value - 1]);
  const completed = ref(false);
  const finalSelections = ref({});
  const componentKey2 = ref(0);
  
  // Load stored selections from localStorage on mounted
  onMounted(() => {
    const storedSelections = localStorage.getItem("formattedSelections");
    if (storedSelections) {
      try {
        finalSelections.value = JSON.parse(storedSelections);
        completed.value = true;
      } catch (error) {
        console.error("Error parsing stored selections:", error);
      }
    }
  });
  
  // Function to handle process completion
  const completeProcess = () => {
    const formattedSelections = {
      [props.title]: cards.value.map(card => ({
        title: card.title,
        text: card.text,
        dynamicInputs: card.dynamicInputs.map(input => ({
          label: input.label,
          value: input.value
        }))
      }))
    };
  
    console.log("Final selections JSON:", formattedSelections);
    alert("Survey completed! JSON saved to localStorage.");
    localStorage.setItem("formattedSelections", JSON.stringify(formattedSelections));
  };
  
  // Function to reset the process
  const reSetProcess = () => {
    alert("Survey reset!");
    currentCard.value = 1;
    finalSelections.value = {};
    localStorage.removeItem('formattedSelections');
  
    cards.value.forEach(card => {
      card.dynamicInputs.forEach(input => {
        input.value = false;
      });
    });
  
    componentKey2.value += 1;
  };
  
  // Navigation functions
  const nextCard = () => {
    if (currentCard.value < totalCards.value) currentCard.value++;
  };
  
  const prevCard = () => {
    if (currentCard.value > 1) currentCard.value--;
  };
  
  const skipCard = () => {
    if (currentCard.value < totalCards.value) currentCard.value++;
  };
  
  // Toggle checkbox value
  const toggleCheckbox = (input) => {
    input.value = !input.value;
  };
  </script>
  
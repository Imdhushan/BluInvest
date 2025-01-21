<template>
  <section :key="componentKey" class="pt-2 pb-2 light" :style="{ backgroundColor: bgColor }">
    <div
      v-if="backgroundImage"
      class="bg-holder overlay bg-holder-natural natural-overlay"
      :style="{ backgroundImage: `url(${backgroundImage})`, backgroundPosition: 'center bottom' }"
    ></div>
    <div class="container">
      <div class="row">
        <!-- Loop through two sections at a time -->
        <div
          v-for="(section, index) in currentSections"
          :key="index"
          class="col-xl-12 col-lg-12 col-md-12 col-sm-12  mt-3 mb-3"
        >
          <!-- <div class="text-xl-start"> -->
            <h4 class="text-white fw-light merienda">
              {{ section.title || "No Section" }}
            </h4>
            <div v-for="(card, cardIndex) in section.cards" :key="cardIndex">
              <h5 class="text-info fw-light anton-sc-regular">{{ card.text || "No Card Available" }}</h5>
              <div class=" align-items-right pa-10 ml-5 me-3 row">
                <!-- Render dynamic checkboxes -->
                <div
                  v-for="(input, inputIndex) in card.dynamicInputs"
                  :key="inputIndex"
                  :class="[
    'form-check text-white col-sm-12 mt-1',

    card.dynamicInputs.length === 6
    ? 'col-md-4 col-lg-4'
    : card.dynamicInputs.length === 4 && input.label.split(' ').length > 3
      ? 'col-md-12 col-lg-12 col-sm-12'
      : card.dynamicInputs.length <= 3
        ? 'col-md-12 col-lg-12 col-sm-12'
        : 'col-md-3 col-lg-3'

  ]"
                >
                  <input
                    type="checkbox"
                    :id="`${input.label}-${cardIndex}-${inputIndex}`"
                    :checked="isChecked(card.text, input.label)"
                    @change="handleCheckboxChange(card.text, input.label, $event.target.checked)"
                    class="form-check-input text-white"
                  />
                  <label :for="`${input.label}-${cardIndex}-${inputIndex}`">
                    {{ input.label }}
                  </label>
                </div>
                <hr style="color:rgba(255, 255, 255, 0.7);"/>
              </div>
            </div>
          <!-- </div> -->
        </div>
      </div>
      <!-- Navigation Buttons -->
      <!-- <div class="row flex-center mt-3"> -->
        <button v-if="currentSectionIndex > 0" @click="prevSections" class="btn btn-outline-warning btn-sm mx-2">
          Previous Sections
        </button>
        <button
          v-if="currentSectionIndex < totalSections - 2"
          @click="nextSections"
          class="btn btn-outline-success btn-sm mx-2"
        >
          Next Sections
        </button>


        <button @click="reSetProcess" class="btn btn-outline-light btn-sm mx-2">Reset</button>
        <button
          v-if="currentSectionIndex === totalSections - 1"
          @click="handleDone"
          class="btn btn-outline-success btn-sm mx-2"
        >
          Done
        </button>
      <!-- </div> -->
    </div>
  </section>
</template>


<script setup>
import { ref, computed, defineProps } from "vue";

const props = defineProps({
  sections: {
    type: Array,
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
    default: "",
  },
  bgColor: {
    type: String,
    required: false,
    default: "#1A237E",
  },
});

const emit = defineEmits(["process-complete"]);

function handleDone() {

  const formattedSelections = {
    // [props.title]: cards.value.map(card => ({
    //   title: card.title,
    //   text: card.text,
    //   dynamicInputs: card.dynamicInputs.map(input => ({
    //     label: input.label,
    //     value: input.value
    //   }))
    // }))
  };
  emit("process-complete"); // Emit the event to the parent
}

// State variables
const currentSectionIndex = ref(0);
const selections = ref({});

// Computed properties
const currentSections = computed(() => {
  return props.sections.slice(currentSectionIndex.value, currentSectionIndex.value + 2);
});
const totalSections = computed(() => props.sections.length);

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
const nextSections = () => {
  if (currentSectionIndex.value < totalSections.value - 2) {
    currentSectionIndex.value += 2;
  }
};
const prevSections = () => {
  if (currentSectionIndex.value > 0) {
    currentSectionIndex.value -= 2;
  }
};

const completeProcess = () => {
  console.log("Survey completed. Selections:", selections.value);
  alert("You have successfully completed the survey!");
};



// Reset process
const componentKey = ref(0);
const reSetProcess = () => {
  currentSectionIndex.value = 0;
  selections.value = {};
  componentKey.value++;
};
</script>

<style scoped>


.merienda {
  font-family: "Merienda", serif;
  font-optical-sizing: auto;
  font-style: normal;
}

.anton-sc-regular {
  font-family: "Anton SC", sans-serif;
  font-weight: 800;
  font-style: normal;
}

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

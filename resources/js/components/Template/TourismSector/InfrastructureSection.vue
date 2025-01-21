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
          class="col-xl-12 col-lg-12 col-md-12 col-sm-12 mt-3 mb-3"
        >
          <h4 class="text-white fw-light merienda">
            {{ section.title || "No Section" }}
          </h4>
          <div v-for="(card, cardIndex) in section.cards" :key="cardIndex">
            <h5 class="text-info fw-light anton-sc-regular">{{ card.text || "No Card Available" }}</h5>
            <div class="align-items-right pa-10 ml-5 me-3 row">
              <!-- Render dynamic checkboxes -->
              <div
                v-for="(input, inputIndex) in card.dynamicInputs"
                :key="inputIndex"
                :class="getDynamicInputClass(card.dynamicInputs.length, input.label)"
              >
                <input
                  type="checkbox"
                  :id="`${input.label}-${cardIndex}-${inputIndex}`"
                  :checked="isChecked(card.text, input.label)"
                  @change="handleCheckboxChange(card.text, input.label, $event.target.checked)"
                  class="form-check-input"
                  :value="input.attribute"
                />
                <label
                  :for="`${input.label}-${cardIndex}-${inputIndex}`"
                  class="form-check-label text-white"
                >
                  {{ input.label }}
                </label>
              </div>
              <hr class="text-white opacity-70" />
            </div>
          </div>
        </div>
      </div>
      <!-- Navigation Buttons -->
      <div class="row flex-center mt-3">
        <div class="col-lg-12 col-md-12 col-sm-12">
          <button
            v-if="currentSectionIndex > 0"
            @click="prevSections"
            class="btn btn-outline-warning btn-sm mx-2"
            aria-label="Previous Sections"
          >
            Previous
          </button>
          <button
            v-if="currentSectionIndex < totalSections - 2"
            @click="nextSections"
            class="btn btn-outline-success btn-sm mx-2"
            aria-label="Next Sections"
          >
            Next
          </button>
          <button @click="reSetProcess" class="btn btn-outline-light btn-sm mx-2" aria-label="Reset">
            Reset
          </button>
          <button
            v-if="currentSectionIndex === totalSections - 1"
            @click="handleDone"
            class="btn btn-outline-success btn-sm mx-2"
            aria-label="Complete Process"
          >
            Done
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, defineProps } from "vue";

// Props
const props = defineProps({
  sections: { type: Array, required: true },
  title: { type: String, required: true },
  description: { type: String, required: true },
  backgroundImage: { type: String, default: "" },
  bgColor: { type: String, default: "#1A237E" },
});

// Emit
const emit = defineEmits(["process-complete"]);

// State
const currentSectionIndex = ref(0);
const selections = ref({});
const componentKey = ref(0);

// Computed Properties
const currentSections = computed(() =>
  props.sections.slice(currentSectionIndex.value, currentSectionIndex.value + 2)
);
const totalSections = computed(() => props.sections.length);

// Helper Methods
const isChecked = (cardText, label) =>
  selections.value[cardText]?.includes(label);

const handleCheckboxChange = (cardText, label, isSelected) => {
  if (isSelected) {
    selections.value[cardText] = selections.value[cardText] || [];
    if (!selections.value[cardText].includes(label)) {
      selections.value[cardText].push(label);
    }
  } else {
    const index = selections.value[cardText]?.indexOf(label);
    if (index > -1) selections.value[cardText].splice(index, 1);
    if (!selections.value[cardText]?.length) delete selections.value[cardText];
  }
};

const getDynamicInputClass = (inputCount, label) => {
  const wordCount = label.split(" ").length;
  return [
    "form-check text-white col-sm-12 mt-1",
    inputCount === 6
      ? "col-md-4"
      : inputCount === 4 && wordCount > 3
      ? "col-md-12"
      : inputCount <= 3
      ? "col-md-12"
      : "col-md-3",
  ];
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

const handleDone = () => {
  // const eventData = [
  //   { attribute: "Beach_a", value: "1" },
  //   { attribute: "Sta_Hot", value: "1" },
  //   { attribute: "Tou_hot", value: "1" },
  //   { attribute: "Surfing", value: "1" },
  //   { attribute: "Lagoon", value: "1" },
  // ];


  const eventData = [];

  for (const cardText in selections.value) {
    const selectedLabels = selections.value[cardText];

    selectedLabels.forEach((label) => {
      // Find the corresponding card and input based on the label
      props.sections.forEach((section) => {
        section.cards.forEach((card) => {
          card.dynamicInputs.forEach((input) => {
            if (input.label === label) {
              eventData.push({
                attribute: input.attribute,
                value: "1", // Value can be customized if needed
              });
            }
          });
        });
      });
    });
  }

  emit("process-complete", JSON.parse(JSON.stringify(eventData)));
 // emit("process-complete", { selections: selections.value });
  console.log("Process completed with selections:", eventData);
};

// Reset
const reSetProcess = () => {
  currentSectionIndex.value = 0;
  selections.value = {};
  componentKey.value++;
};
</script>

<style scoped>
/* Typography */
.merienda {
  font-family: "Merienda", serif;
}
.anton-sc-regular {
  font-family: "Anton SC", sans-serif;
  font-weight: 800;
}

/* Overlay Styling */
.bg-holder-natural.natural-overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 1;
}

.bg-holder-natural.natural-overlay > * {
  position: relative;
  z-index: 2;
}

/* Buttons */
.btn {
  text-transform: uppercase;
}
</style>

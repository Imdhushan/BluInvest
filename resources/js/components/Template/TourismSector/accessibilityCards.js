// data.js
const title = "INFRASTRUCTURE";
const description =
  "Invest in eco-friendly tourism ventures that capitalize on Sri Lanka’s breathtaking landscapes and coastal beauty, ensuring both profitability and sustainability.";
const imageUrl = "/assets/img/nature.jpg";
const sectionsData = [
  {
    title: "Accessibility",
    cards: [
      { text: "Proximity to the main road", dynamicInputs: [{ type: "checkbox", label: "0m - 200m", value: false }] },
      // ...other cards
    ],
  },
  {
    title: "Water",
    cards: [
      { text: "Availability of groundwater", dynamicInputs: [{ label: "Groundwater availability" }] },
      // ...other cards
    ],
  },
  // ...other sections
];

// Export all variables at once
export { title, description, imageUrl, sectionsData };

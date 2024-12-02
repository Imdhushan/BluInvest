const infrastructureTitle = "INFRASTRUCTURE";
const infrastructureDescription =
  "Invest in eco-friendly tourism ventures that capitalize on Sri Lanka’s breathtaking landscapes and coastal beauty, ensuring both profitability and sustainability.";

  const infrastructureimageUrl = "";
const infrastructureSectionsData = [
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
];


// Export all variables at once
export { infrastructureTitle, infrastructureDescription, infrastructureimageUrl, infrastructureSectionsData };

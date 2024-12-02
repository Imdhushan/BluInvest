const marineTitle = "Natural Resources and Land Use";
const marineDescription =
  "Focus on sustainable resource management and land use for a thriving environment.";

  const marineImageUrl = "/assets/img/nature.jpg";
const marineSectionsData = [
  {
    title: "Resources",
    cards: [
      { 
        text: "Land use​", 
        dynamicInputs: [
          { type: "checkbox", label: "Proximity to Terrestrial / Coastal Archeological Sites​", value: false },
          
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
        {
          text: "Natural Environment ", dynamicInputs: [
            { type: "checkbox", label: "Proximity to Department of Wildlife Conservation Areas", value: false },
            { type: "checkbox", label: "Proximity to Forest Department Protected Areas", value: false },
            { type: "checkbox", label: "Proximity to Environmentally Sensitive Areas", value: false },
            { type: "checkbox", label: "Proximity to Mangrove Forests", value: false },
          ]        }
    ],
  },
  
];


// Export all variables at once
export { naturalTitle, naturalDescription, naturalImageUrl, naturalSectionsData };

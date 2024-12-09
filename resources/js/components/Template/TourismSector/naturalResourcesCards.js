const naturalTitle = "";
const naturalDescription =
  "";

  const naturalImageUrl = "";
const naturalSectionsData = [
  {
    title: "Are you looking for certain types of land based on their uses",
    cards: [
      { 
        text: "​", 
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
      
    ],
  },
  {
    title: "Select the wind speed in your prefered location if applicable",
    cards: [
      { 
        text: "​", 
        dynamicInputs: [
          { type: "checkbox", label: "High area ​", value: false },
          { type: "checkbox", label: "Moderate area​", value: false },
        ]
      }
        ]
         ,
  },
  {
    title: "Select the solar irradiance in your prefered location if applicable",
    cards: [
      { text: "​" ,
        dynamicInputs: [
          { type: "checkbox", label: "High area (> 4.4 PVOUT)​", value: false },
          { type: "checkbox", label: "Low area​", value: false },
        ]
      }
    ],
  },
  {
    title: "Select the annual rainfall in your prefered location if applicable",
    cards: [
      { text: "​", dynamicInputs: [
        { type: "checkbox", label: "> 2500 mm​", value: false },
        { type: "checkbox", label: "1750 mm - 2500 mm​", value: false },
        { type: "checkbox", label: "< 2500 mm​", value: false },
      ] }
    
    ],
  },
  {
    title: "Do you want a location that is near the coast",
    cards: [
      { text: " ​", dynamicInputs: [
        { type: "checkbox", label: "0m - 200m", value: false },
        { type: "checkbox", label: "200m - 400m", value: false },
        { type: "checkbox", label: "400m - 600m", value: false },
        { type: "checkbox", label: "600m - 800m", value: false },
      ]}
    
    ],
  },
  {
    title: "Is your location near natural environment and biodiversity hotspots",
    cards: [
      {
        text: " ", dynamicInputs: [
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

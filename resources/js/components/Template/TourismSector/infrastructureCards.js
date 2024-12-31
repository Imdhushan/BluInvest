const infrastructureTitle = "";
const infrastructureDescription =
  "";

  const infrastructureimageUrl = "";
const infrastructureSectionsData = [
  {
    title: "What kind of facilities do you need in the area",
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
    title: "Do you need access to ground water",
    cards: [
      { text: " ", dynamicInputs: [{ label: "Availability of groundwater" }] }],
  },
  {
    title: "Do you require accomodation facilities in the area",
    cards: [
    { text: " ", dynamicInputs: [ { type: "checkbox", label: "Classified Hotels( 1-5 Star)", value: false }, { type: "checkbox", label: "Tourist Hotels", value: false }, { type: "checkbox", label: "Boutique Hotels & Villas", value: false }, { type: "checkbox", label: "Guest Houses", value: false }, { type: "checkbox", label: "Bungalows", value: false }, { type: "checkbox", label: "Home Stay Units", value: false } ] }
    ],
  },
  {
    title: "Do you need security and life saving services in the area",
    cards: [
    { text: " ", dynamicInputs: [ { type: "checkbox", label: "Locations of Police Marine Units", value: false }, { type: "checkbox", label: "Locations of Tourist Police Units", value: false }, { type: "checkbox", label: "Police Life Saving Units ", value: false } ] }
    ],
  },
  {
    title: "Do you need schools/hospitals/banks near your location",
    cards: [
    { text: " ", dynamicInputs: [ { type: "checkbox", label: "Proximity to school", value: false }, { type: "checkbox", label: "Proximity to hospital", value: false }, { type: "checkbox", label: "Availability of banks/ATMs ", value: false } ] }
    ],
  },

  ////
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
  {
    title: "Is your location near marine biodiversity and recreation activities",
    cards: [
      {
        text: " ", dynamicInputs: [
          { type: "checkbox", label: "Whales", value: false },
          { type: "checkbox", label: "Dolphins", value: false },
          { type: "checkbox", label: "Sharks", value: false },
          { type: "checkbox", label: "Coral reefs", value: false },
          { type: "checkbox", label: "Seagrass", value: false },
          { type: "checkbox", label: "Bi-valve", value: false },
          { type: "checkbox", label: "Mud flats", value: false },
          { type: "checkbox", label: "Sand dune", value: false },
          { type: "checkbox", label: "Lagoon", value: false },
          { type: "checkbox", label: "Estuary", value: false },
          { type: "checkbox", label: "Bathing site", value: false },
          { type: "checkbox", label: "Surfing area", value: false },
          { type: "checkbox", label: "River mouth", value: false },
          { type: "checkbox", label: "Beach area", value: false },

        ]        }
    
    ],
  },
  {
    title: "Is your location near terrestrial or coastal archeological sites",
    cards: [
      {
        text: " ", dynamicInputs: [
          { type: "checkbox", label: "Proximity to Terrestrial / Coastal Archeological Sites", value: false },
         

        ]        }
    
    ],
  },
  
  
  
];


// Export all variables at once
export { infrastructureTitle, infrastructureDescription, infrastructureimageUrl, infrastructureSectionsData };

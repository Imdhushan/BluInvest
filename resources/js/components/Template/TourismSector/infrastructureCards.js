const infrastructureTitle = "";
const infrastructureDescription =
  "";

  const infrastructureimageUrl = "";
const infrastructureSectionsData = [
  {
    title: "What kind of facilities do you need in the area",
    cards: [
    { text: "Proximity to the main road ", dynamicInputs: [ 
      { type: "checkbox", label: "0m - 200m", value: false,attribute: 'Main_road' },
       { type: "checkbox", label: "200m - 400m", value: false ,attribute: 'Main_road'}, 
       { type: "checkbox", label: "400m - 600m", value: false ,attribute: 'Main_road'}, 
       { type: "checkbox", label: "600m - 800m", value: false ,attribute: 'Main_road'} ] },

    { text: "Proximity to secondary roads", dynamicInputs: [ 
      { type: "checkbox", label: "0m - 200m", value: false ,attribute: 'Se_raod' },
       { type: "checkbox", label: "200m - 400m", value: false ,attribute: 'Se_raod' }, 
       { type: "checkbox", label: "400m - 600m", value: false ,attribute: 'Se_raod' }, 
       { type: "checkbox", label: "600m - 800m", value: false ,attribute: 'Se_raod' } ] },

    { text: "Proximity to a track", dynamicInputs: [ 
      { type: "checkbox", label: "0m - 200m", value: false ,attribute: 'By_raod' },
       { type: "checkbox", label: "200m - 400m", value: false,attribute: 'By_raod' }, 
       { type: "checkbox", label: "400m - 600m", value: false,attribute: 'By_raod' },
        { type: "checkbox", label: "600m - 800m", value: false ,attribute: 'By_raod'} ] },

      { text: "Proximity to a highway",
       dynamicInputs:
        [ { type: "checkbox", label: "0m - 200m", value: false,attribute: 'Highway' }, 
        { type: "checkbox", label: "200m - 400m", value: false ,attribute: 'Highway'},
         { type: "checkbox", label: "400m - 600m", value: false ,attribute: 'Highway'}, 
         { type: "checkbox", label: "600m - 800m", value: false ,attribute: 'Highway'} 
        ] },
  { text: "Proximity to a railway", dynamicInputs: [ { type: "checkbox", label: "0m - 200m", value: false,attribute:'Railway' }, { type: "checkbox", label: "200m - 400m", value: false }, { type: "checkbox", label: "400m - 600m", value: false }, { type: "checkbox", label: "600m - 800m", value: false } ] }

    ],
  },
  {
    title: "Do you need access to ground water",
    cards: [
      { text: " ", dynamicInputs: [{ type: "checkbox", label: "Availability of groundwater" ,attribute: 'Gr_wate'}] }],
  },
  {
    title: "Do you require accomodation facilities in the area",
    cards: [
    { text: " ", dynamicInputs: [ { type: "checkbox", label: "Classified Hotels( 1-5 Star)", value: false,attribute: 'Sta_Hot' }, 
      { type: "checkbox", label: "Tourist Hotels", value: false ,attribute: 'Tou_hot'}, 
      { type: "checkbox", label: "Boutique Hotels & Villas", value: false,attribute: 'Bou_hot'}, 
      { type: "checkbox", label: "Guest Houses", value: false,attribute: 'Gue_hou' },
       { type: "checkbox", label: "Bungalows", value: false,attribute: 'Bangalo' }, 
      { type: "checkbox", label: "Home Stay Units", value: false ,attribute: 'Home_st'} ] }
    ],
  },
  
  {
    title: "Do you need security and life saving services in the area",
    cards: [
      { 
        text: " ",
        dynamicInputs: [
          { type: "checkbox", label: "Locations of Police Marine Units", value: false, attribute: 'Po_ma_un' },
          { type: "checkbox", label: "Locations of Tourist Police Units", value: false, attribute: 'To_po_un' },
          { type: "checkbox", label: "Police Life Saving Units", value: false, attribute: 'Po_li_Sa_un' }
        ] 
      }
    ],
  },
  {
    title: "Do you need schools/hospitals/banks near your location",
    cards: [
      { 
        text: " ",
        dynamicInputs: [
          { type: "checkbox", label: "Proximity to school", value: false, attribute: 'School' },
          { type: "checkbox", label: "Proximity to hospital", value: false, attribute: 'Hospital' },
          { type: "checkbox", label: "Availability of banks/ATMs", value: false, attribute: 'Banks_ATMs' }
        ]
      }
    ],
  },
  {
    title: "Are you looking for certain types of land based on their uses",
    cards: [
      { 
        text: "​", 
        dynamicInputs: [
          { type: "checkbox", label: "Agricultural land​", value: false, attribute: 'Ag_land' },
          { type: "checkbox", label: "Built Up Area​", value: false, attribute: 'Bu_up_a' },
          { type: "checkbox", label: "Forest Land​", value: false, attribute: 'Fo_land' },
          { type: "checkbox", label: "Sandy Area​", value: false, attribute: 'Sandy_a' },
          { type: "checkbox", label: "Water body​​", value: false, attribute: 'Wa_body' },
          { type: "checkbox", label: "Wetland​​", value: false, attribute: 'Wetland' },
          { type: "checkbox", label: "Bare land​​", value: false, attribute: 'Ba_land' },
          { type: "checkbox", label: "Rocky Area​", value: false, attribute: 'Rocky_a' }
        ]
      }
    ],
  },
  {
    title: "Select the wind speed in your preferred location if applicable",
    cards: [
      { 
        text: "​", 
        dynamicInputs: [
          { type: "checkbox", label: "High area ​", value: false, attribute: 'High_area' },
          { type: "checkbox", label: "Moderate area​", value: false, attribute: 'Moderate_area' },
        ]
      }
    ]
  },
  {
    title: "Select the solar irradiance in your prefered location if applicable",
    cards: [
      { text: "​" ,
        dynamicInputs: [
          { type: "checkbox", label: "High area (> 4.4 PVOUT)​", value: false,attribute: 'Dry_Zone' },
          { type: "checkbox", label: "Low area​", value: false,attribute: 'In_me_Zone' },
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
        { type: "checkbox", label: "0m - 200m", value: false,attribute: '0_200' },
        { type: "checkbox", label: "200m - 400m", value: false,attribute: '200_400' },
        { type: "checkbox", label: "400m - 600m", value: false,attribute: '400_600' },
        { type: "checkbox", label: "600m - 800m", value: false,attribute: '600_800' },
        { type: "checkbox", label: "800m - 1000m", value: false,attribute: '800_1000' },
      ]}
    
    ],
  },
  {
    title: "Is your location near natural environment and biodiversity hotspots",
    cards: [
      {
        text: " ", dynamicInputs: [
          { type: "checkbox", label: "Proximity to Department of Wildlife Conservation Areas", value: false,attribute: 'DWC_PA' },
          { type: "checkbox", label: "Proximity to Forest Department Protected Areas", value: false,attribute: 'FD_PA' },
          { type: "checkbox", label: "Proximity to Environmentally Sensitive Areas", value: false,attribute: 'ESA' },
          { type: "checkbox", label: "Proximity to Mangrove Forests", value: false,attribute: 'Mangrove' },
        ]        }
    
    ],
  },
  {
    title: "Is your location near marine biodiversity and recreation activities",
    cards: [
      {
        text: " ", dynamicInputs: [
          { type: "checkbox", label: "Whales", value: false ,attribute: 'Whales'},
          { type: "checkbox", label: "Dolphins", value: false,attribute: 'Dolphin' },
          { type: "checkbox", label: "Sharks", value: false,attribute: 'Sharks' },
          { type: "checkbox", label: "Coral reefs", value: false,attribute: 'Coral_r' },
          { type: "checkbox", label: "Seagrass", value: false ,attribute: 'Sea_gra'},
          { type: "checkbox", label: "Bi-valve", value: false,attribute: 'Bivalve' },
          { type: "checkbox", label: "Mud flats", value: false,attribute: 'Mudflat' },
          { type: "checkbox", label: "Sand dune", value: false ,attribute: 'Sand_du'},
          { type: "checkbox", label: "Lagoon", value: false,attribute: 'Lagoon' },
          { type: "checkbox", label: "Estuary", value: false,attribute: 'Estuary' },
          { type: "checkbox", label: "Bathing site", value: false,attribute: 'Bathing' },
          { type: "checkbox", label: "Surfing area", value: false ,attribute: 'Surfing'},
          { type: "checkbox", label: "River mouth", value: false,attribute: 'River_m' },
          { type: "checkbox", label: "Beach area", value: false ,attribute: 'Beach_a'},

        ]        }
    
    ],
  },
  {
    title: "Is your location near terrestrial or coastal archeological sites",
    cards: [
      {
        text: " ", dynamicInputs: [
          { type: "checkbox", label: "Proximity to Terrestrial / Coastal Archeological Sites", value: false,attribute: 'Ar_Sites' },
         

        ]        }
    
    ],
  },
  
  
  
];


// Export all variables at once
export { infrastructureTitle, infrastructureDescription, infrastructureimageUrl, infrastructureSectionsData };

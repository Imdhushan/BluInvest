<template>


    <section class="py-0 overflow-hidden light" id="banner">
      <div class="bg-holder overlay" style="background-image:url(/assets/img/mare-1200x900.jpg); background-position: center bottom;"></div>
      <div class="container">
          <div class="row flex-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
            <div class="col-md-12 col-lg-12 col-xl-8 pb-7 pb-xl-9 text-center text-lg-start">
              <!-- <h1 class="text-white fw-light">What is BluInvest</h1> -->
              <!-- <p class=" text-white fw-light text-600 opacity-10">Sri Lanka's marine industries offer dynamic opportunities within the Blue Economy, encompassing fisheries, aquaculture, shipbuilding, and marine biotechnology. With extensive coastal and marine resources, the sector is primed for sustainable growth. Investments in marine industries can enhance food security, support livelihoods, and promote innovative practices like offshore aquaculture and eco-friendly shipbuilding. By focusing on sustainable practices and advanced technologies, your investment can contribute to responsible resource management, economic resilience, and environmental conservation, all while positioning Sri Lanka as a leader in sustainable marine development in South Asia.</p> -->
            </div>
          </div>
        </div>
      </section>
    
    
        <section style="background-color: #ffff">
    
    <div class="container">
      <div class="row justify-content-center text-left">
        <div class="col-lg-9 col-xl-8 col-xxl-7">
          <h1 class="fs-2 fs-sm-4 fs-md-5">How to use BluInvest</h1>
          <p class="lead">
    
            Here are a few guidelines to help you find your way to places of interest for your investments.
    
            </p>
            <ol class="lead">
              <li><strong>Click on an investment area that interests you</strong></li>
              <br/>
              <p>Hover over the map and discover opportunities for boat building, marine conservation, and a variety of marine industry sectors. </p>
              <br/>
              <li><strong>This will take you to a questionnaire</strong></li>
              <br/>
              <p>Please select your preferred options for Infrastructure, Natural Resources and land Use, Natural Environment and Biodiversity, 
                Biodiversity and recreation, and Marine Archeology.</p>
                <br/>
                <li><strong>Optimal locations will be generated</strong></li>
                <br/>
                <p>Once the questionnaire is completed, our GIS tool will generate the ideal 
                  locations for your blue business venture. </p>
                  <br/>
                <li><strong>Zoom in on suggested locations</strong></li>
                <br/>
                <p>Zoom in on these locations to learn more about the 
                  availability and feasibility of your preferred investment
                   idea in a select location.</p>
                   <br/>
                <li><strong>Learn about the corresponding
                   rules, laws & regulations for your investment</strong></li>
                   <br/>
                <p>Next, take a look at the comprehensive regulatory framework for 
                  investments in Sri Lanka.</p>
                  <br/>
            </ol>
            <p class="">For further information on what we offer investors at BluInvest, contact the Ministry of Finance via any of the hotlines below.</p>
            <address>
              GIS Unit, National Planning Department, 1st Floor,
              The Secretariat,Colombo 1
            </address>
            <p>srilanka.msp@gmail.com</p>
            <p>Tel :(+94) 11 248 46 12</p>
            <p>Tel :(+94) 11 248 46 13</p>
            <p>Tel :(+94) 11 244 80 63</p>
            <p>Tel :(+94) 11 243 16 20</p>

    
        </div>
      </div>
      
    </div>
    <!-- end of .container-->
    
    </section>
     
      
       
      
      
      </template>
      
      <script setup>
      import { ref, computed } from 'vue';
      
      // const currentCard = ref(1); // Track the current card being shown
      // const cards = ref([
      //   {
      //     title: 'Infrastructure',
      //     question: 'Accessibility',
      //     description: 'Proximity to a  main road?',
      //     image: '/assets/img/icons/spot-illustrations/50.png'
      //   },
      //   {
      //     title: 'PLAN',
      //     question: 'Question 2: Development',
      //     description: 'What stage of development are you in?',
      //     image: '/assets/img/icons/spot-illustrations/50.png'
      //   },
      //   {
      //     title: 'PLAN',
      //     question: 'Question 3: Future Plan',
      //     description: 'What are your future development plans?',
      //     image: '/assets/img/icons/spot-illustrations/50.png'
      //   }
      // ]);
      
      // // Computed property to filter the card to be shown
      // const filteredCards = computed(() => {
      //   return cards.value.filter((card, index) => currentCard.value === index + 1);
      // });
      
      // // Function to go to the next card
      // const nextCard = () => {
      //   if (currentCard.value < cards.value.length) {
      //     currentCard.value++;
      //   }
      // };
      
      // // Function to go to the previous card
      // const prevCard = () => {
      //   if (currentCard.value > 1) {
      //     currentCard.value--;
      //   }
      // };
      
      // // Skip function (same as next in this case)
      // const skipCard = () => {
      //   nextCard();
      // };
      
      // const cards = ref([
      //   { text: "Main road" },
      //   { text: "Secondary road" },
      //   { text: "Track" },
      //   { text: "Highway" },
      //   { text: "Railway station" },
      
      
      // ]);
      
      const BiodiversityCards =  ref([
        { 
          text: "Natural Environment​​", 
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
          text: "Marine biodiversity Watching areas​​", 
          dynamicInputs: [
            { type: "checkbox", label: "High area ​", value: false },
            { type: "checkbox", label: "Moderate area​", value: false },
          ]
        },
        { text: "Marine Archeology​​" ,
        dynamicInputs: [
            { type: "checkbox", label: "Near to DWC PAs​​", value: false },
            { type: "checkbox", label: "Near to FD PAs​​", value: false },
            { type: "checkbox", label: "Near to EPAS​​​", value: false },
            { type: "checkbox", label: "Near to Mangrove areas​​​​", value: false },
            { type: "checkbox", label: "Near to Archeological sites​​​", value: false },
          ]
        }
       
        
      ]);
      
      
      const NaturalResousesCards = ref([
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
        { text: "Annual Rainfall (mm)​",dynamicInputs: [
            { type: "checkbox", label: "> 2500​", value: false },
            { type: "checkbox", label: "1750 - 2500​", value: false },
            { type: "checkbox", label: "< 2500​", value: false },
          ] },
        { text: "Distance from the coast (m)​" ,dynamicInputs: [
            { type: "checkbox", label: "0m - 200m", value: false },
            { type: "checkbox", label: "200m - 400m", value: false },
            { type: "checkbox", label: "400m - 600m", value: false },
            { type: "checkbox", label: "600m - 800m", value: false },
          ]},
        
      ]);
      
      
      
      const cards = ref([
        { 
          text: "Main road", 
          dynamicInputs: [
            { type: "checkbox", label: "0m - 200m", value: false },
            { type: "checkbox", label: "200m - 400m", value: false },
            { type: "checkbox", label: "400m - 600m", value: false },
            { type: "checkbox", label: "600m - 800m", value: false },
          ]
        },
        { 
          text: "Secondary road", 
          dynamicInputs: [
            { type: "checkbox", label: "0m - 200m", value: false },
            { type: "checkbox", label: "200m - 400m", value: false },
            { type: "checkbox", label: "400m - 600m", value: false },
            { type: "checkbox", label: "600m - 800m", value: false },
          ]
        },
        { text: "Track" ,
        dynamicInputs: [
            { type: "checkbox", label: "0m - 200m", value: false },
            { type: "checkbox", label: "200m - 400m", value: false },
            { type: "checkbox", label: "400m - 600m", value: false },
            { type: "checkbox", label: "600m - 800m", value: false },
          ]
        },
        { text: "Highway",dynamicInputs: [
            { type: "checkbox", label: "0m - 200m", value: false },
            { type: "checkbox", label: "200m - 400m", value: false },
            { type: "checkbox", label: "400m - 600m", value: false },
            { type: "checkbox", label: "600m - 800m", value: false },
          ] },
        { text: "Railway station" ,dynamicInputs: [
            { type: "checkbox", label: "0m - 200m", value: false },
            { type: "checkbox", label: "200m - 400m", value: false },
            { type: "checkbox", label: "400m - 600m", value: false },
            { type: "checkbox", label: "600m - 800m", value: false },
          ]},
        
      ]);
      
      
      const Groundcards = ref([
        { 
          text: " ", 
          dynamicInputs: [
            { type: "checkbox", label: "Availability of groundwater", value: false },
            
            
          ]
        },
       
        
      ]);
      
      const Accommodationcards = ref([
        { 
          text: " ", 
          dynamicInputs: [
            { type: "checkbox", label: "Classified Hotels( 1-5 Star)​", value: false },
            { type: "checkbox", label: "Tourist Hotels​", value: false },
            { type: "checkbox", label: "Boutique Hotels & Villas​", value: false },
            { type: "checkbox", label: "Guest Houses​", value: false },
            { type: "checkbox", label: "Bangalow's​​", value: false },
            { type: "checkbox", label: "Home Stay Units​", value: false },
           
          ]
        },
       
        
      ]);
      
      
      // Initialize currentCard to start at the first card
      const currentCard = ref(1);
      const currentGroundWaterCard = ref(1);
      const currentAccommodationCard = ref(1);
      const naturalResousesCard = ref(1);
      const BiodiversityCard = ref(1);
      
      const direction = ref('right');
      // Computed property to filter the card to be shown (optional)
      // const filteredCards = computed(() => {
      //   return cards.value.filter((card, index) => currentCard.value === index + 1);
      // });
      
      // Function to go to the next card
      const nextCard = () => {
        if (currentCard.value < cards.value.length) {
          direction.value = 'right';
          currentCard.value++;
        }
      };
      
      // Function to go to the previous card
      const prevCard = () => {
        if (currentCard.value > 1) {
          direction.value = 'left';
          currentCard.value--;
        }
      };
      
      // Skip function (same as next in this case)
      const skipCard = () => {
        direction.value = 'fade';
        nextCard();
      
        // if (currentCard.value < cards.value.length) {
        //   currentCard.value++;
        // }
      
      };
      
      const naturalnextCard = () => {
        if (naturalResousesCard.value < cards.value.length) {
          direction.value = 'right';
          naturalResousesCard.value++;
        }
      };
      
      // Function to go to the previous card
      const naturalprevCard = () => {
        if (naturalResousesCard.value > 1) {
          direction.value = 'left';
          naturalResousesCard.value--;
        }
      };
      
      // Skip function (same as next in this case)
      const naturalskipCard = () => {
        direction.value = 'fade';
        naturalnextCard();
      
        // if (currentCard.value < cards.value.length) {
        //   currentCard.value++;
        // }
      
      };
      
      const biodiversitynextCard = () => {
        if (BiodiversityCard.value < cards.value.length) {
          direction.value = 'right';
          BiodiversityCard.value++;
        }
      };
      
      // Function to go to the previous card
      const biodiversityprevCard = () => {
        if (BiodiversityCard.value > 1) {
          direction.value = 'left';
          BiodiversityCard.value--;
        }
      };
      
      // Skip function (same as next in this case)
      const biodiversityskipCard = () => {
        direction.value = 'fade';
        biodiversitynextCard();
      
        // if (currentCard.value < cards.value.length) {
        //   currentCard.value++;
        // }
      
      };
      
      </script>
      
      <style scoped>
      
      .right-enter-active, .right-leave-active {
        transition: transform 0.8s ease;
      }
      .right-enter {
        transform: translateX(100%); /* Enter from right */
      }
      .right-leave-to {
        transform: translateX(-100%); /* Leave to left */
      }
      
      /* Left Slide (Back) */
      .left-enter-active, .left-leave-active {
        transition: transform 0.8s ease;
      }
      .left-enter {
        transform: translateX(-100%); /* Enter from left */
      }
      .left-leave-to {
        transform: translateX(100%); /* Leave to right */
      }
      
      /* Fade for Skip */
      .fade-enter-active, .fade-leave-active {
        transition: opacity 0.8s ease;
      }
      .fade-enter, .fade-leave-to {
        opacity: 0;
      }
      
      .card {
        padding: 20px;
        border: 0; /* No border */
        background-color: rgba(0, 0, 0, 0.0); /* 50% transparent black */
        margin-top: 10px;
        border-radius: 10px;
        transition: opacity 0.5s ease-in-out;
      }
      
       
      
      .bg-holder-natural.natural-overlay::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3); /* Semi-transparent black overlay */
        z-index: 1; /* Ensures the overlay is above the background image */
      }
      
      .bg-holder-natural.natural-overlay > * {
        position: relative;
        z-index: 2; /* Ensures the content inside the div is above the overlay */
      }
      
      </style>
      
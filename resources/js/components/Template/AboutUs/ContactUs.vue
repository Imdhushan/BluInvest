<template>
    <section class="py-0 overflow-hidden light" id="banner">
      <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/images_1111.jpg);background-position: center bottom;"></div>
      <div class="container">
        <div class="row flex-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
          <div class="col-md-12 col-lg-12 col-xl-8 pb-7 pb-xl-9 text-center text-lg-start">
            <h1 class="text-white fw-light">MARINE INDUSTRIES</h1>
            <p class=" text-white fw-light text-600 opacity-10">Sri Lanka's marine industries offer dynamic opportunities within the Blue Economy, encompassing fisheries, aquaculture, shipbuilding, and marine biotechnology. With extensive coastal and marine resources, the sector is primed for sustainable growth. Investments in marine industries can enhance food security, support livelihoods, and promote innovative practices like offshore aquaculture and eco-friendly shipbuilding. By focusing on sustainable practices and advanced technologies, your investment can contribute to responsible resource management, economic resilience, and environmental conservation, all while positioning Sri Lanka as a leader in sustainable marine development in South Asia.</p>
          </div>
        </div>
      </div>
    </section>
  <section class="bg-dark pt-6 pb-4 light" >
    <!-- <div class="bg-holder overlay  bg-holder-natural natural-overlay" style="background-image:url(/assets/img/INFRASTRUCTURE.jpeg);background-position: center bottom;">
    </div> -->
    <div class="container">
  
      <div class="row flex-center">
        <h4 class="text-white fw-light">INFRASTRUCTURE</h4>
        <p class="text-white">Invest in eco-friendly tourism ventures that capitalize on Sri Lanka’s breathtaking landscapes and coastal beauty, ensuring both profitability and sustainability.</p>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center text-xl-start mt-3 ">
          
          <h5 class=" text-600 opacity-10 text-white">Accessibility​</h5>
          <!-- <p>Proximity to :</p> -->
          <p class=" text-600 opacity-10 text-white">Select Proximity range for</p>
          <transition :name="direction">
            <div v-if="currentCard !== null">
            <div v-for="(card, index) in cards" :key="index" class="card text-white" v-show="currentCard === index + 1">
                <p> {{ card.text }}:</p>
              
                <div class="d-flex flex-wrap justify-content-between align-items-center">
                  <div 
                    v-for="(input, inputIndex) in card.dynamicInputs " 
                    :key="inputIndex" 
                    class="form-check me-3  text-white">
                    <label>
                      <input 
                        :type="input.type" 
                        v-model="input.value" 
                        :value="input.value" 
                        class="form-check-input text-white"
                      /> 
                      {{ input.label }}
                    </label>
                  </div>
                </div>   
               </div>
              </div>
            </transition>
          <!-- Navigation Buttons -->
          <button v-if="currentCard > 1" class="btn btn-outline-light border-2 rounded-pill btn-sm mx-2 my-2" @click="prevCard()">Back</button>
          <button v-if="currentCard < cards.length" class="btn btn-outline-light border-2 rounded-pill btn-sm mx-2 my-2" @click="nextCard()">Next</button>
          <button v-if="currentCard < cards.length" class="btn btn-outline-danger border-2 rounded-pill btn-sm mx-2 my-2" @click="skipCard()">Skip</button>
  
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center text-xl-start mt-3">
          
          <h5 class="text-white ">Ground water​</h5>
          <!-- <p>Proximity to :</p> -->
          <!-- <p>Select Proximity range for</p> -->
            <div v-for="(card, index) in Groundcards" :key="index" class="card" v-show="currentGroundWaterCard === index + 1">
              <p> {{ card.text }}</p>
              <!-- Card content here -->
              <!-- <div v-for="(input, inputIndex) in card.dynamicInputs" :key="inputIndex">
              <label>
                <input :type="input.type" v-model="input.value" :value="input.value" /> {{ input.label }}
              </label>
            </div> -->
            <div class="d-flex flex-wrap justify-content-between align-items-center text-white">
            <div 
              v-for="(input, inputIndex) in card.dynamicInputs" 
              :key="inputIndex" 
              class="form-check me-3 text-white"
            >
              <label>
                <input 
                  :type="input.type" 
                  v-model="input.value" 
                  :value="input.value" 
                  class="form-check-input text-white"
                /> 
                {{ input.label }}
              </label>
            </div>
          </div>
  
          </div>
  
          <!-- Navigation Buttons -->
          <!-- <button v-if="currentGroundWaterCard > 1" class="btn btn-outline-light border-2 rounded-pill btn-sm mx-1 my-1" @click="prevCard()">Back</button>
          <button v-if="currentGroundWaterCard < cards.length" class="btn btn-outline-light border-2 rounded-pill btn-sm mx-1 my-1" @click="nextCard()">Next</button>
          <button v-if="currentGroundWaterCard < cards.length" class="btn btn-outline-danger border-2 rounded-pill btn-sm mx-1 my-1" @click="skipCard()">Skip</button> -->
  
        </div>
        <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center text-xl-start mt-3">
          
          <h5 class=" text-white ">Accommodation facilities​</h5>
          <!-- <p>Proximity to :</p> -->
          <!-- <p>Select Proximity range for</p> -->
            <div v-for="(card, index) in Accommodationcards" :key="index" class="card" v-show="currentAccommodationCard === index + 1">
              <p> {{ card.text }}</p>
              <!-- Card content here -->
              <!-- <div v-for="(input, inputIndex) in card.dynamicInputs" :key="inputIndex">
              <label>
                <input :type="input.type" v-model="input.value" :value="input.value" /> {{ input.label }}
              </label>
            </div> -->
            <div class="d-flex flex-wrap justify-content-between align-items-center">
            <div 
              v-for="(input, inputIndex) in card.dynamicInputs" 
              :key="inputIndex" 
              class="form-check me-3 text-white"
            >
              <label>
                <input 
                  :type="input.type" 
                  v-model="input.value" 
                  :value="input.value" 
                  class="form-check-input"
                /> 
                {{ input.label }}
              </label>
            </div>
          </div>
  
          </div>
  
          <!-- Navigation Buttons -->
          <!-- <button v-if="currentAccommodationCard > 1" class="btn btn-outline-light border-2 rounded-pill btn-sm mx-1 my-1" @click="prevCard()">Back</button>
          <button v-if="currentAccommodationCard < cards.length" class="btn btn-outline-light border-2 rounded-pill btn-sm mx-1 my-1" @click="nextCard()">Next</button>
          <button v-if="currentAccommodationCard < cards.length" class="btn btn-outline-danger border-2 rounded-pill btn-sm mx-1 my-1" @click="skipCard()">Skip</button> -->
  
        </div>
       
         
      </div>
    </div>
  </section>
  
    <section class="py-4 overflow-hidden light" id="banner">
      <div class="bg-holder overlay  bg-holder-natural natural-overlay" style="background-image:url(/assets/img/nature.jpg);background-position: center bottom;">
      </div>
  
        <div class="container">
  
  <div class="row flex-center">
    <h4 class="text-white fw-light">Natural Resources and Land use ​</h4>
    <p class="text-600 opacity-10 text-white">Invest in eco-friendly tourism ventures that capitalize on Sri Lanka’s breathtaking landscapes and coastal beauty, ensuring both profitability and sustainability.</p>
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center text-xl-start mt-0 ">
      
      <!-- <h5 class=" ">Land use​</h5>
      
       <br/>
      <p>Select Proximity range for</p> -->
      <transition :name="direction">
        <div v-if="currentCard !== null">
        <div v-for="(card, index) in NaturalResousesCards" :key="index" class="card mt-0 text-white" v-show="naturalResousesCard === index + 1">
            <p> {{ card.text }}:</p>
          
            <div class="d-flex flex-wrap  align-items-center">
              <div 
                v-for="(input, inputIndex) in card.dynamicInputs " 
                :key="inputIndex" 
                class="form-check me-3">
                <label>
                  <input 
                    :type="input.type" 
                    v-model="input.value" 
                    :value="input.value" 
                    class="form-check-input"
                  /> 
                  {{ input.label }}
                </label>
              </div>
            </div>   
           </div>
          </div>
        </transition>
      <!-- Navigation Buttons -->
      <button v-if="naturalResousesCard > 1" class="btn btn-outline-light border-2 rounded-pill btn-sm mx-2 my-2" @click="naturalprevCard()">Back</button>
      <button v-if="naturalResousesCard < cards.length" class="btn btn-outline-light border-2 rounded-pill btn-sm mx-2 my-2" @click="naturalnextCard()">Next</button>
      <button v-if="naturalResousesCard < cards.length" class="btn btn-outline-danger border-2 rounded-pill btn-sm mx-2 my-2" @click="naturalskipCard()">Skip</button>
  
    </div>
    
     
  </div>
  </div>
        
  
    </section>
  
    <section class="bg-dark py-4 overflow-hidden light" >
      
  
        <div class="container">
  
  <div class="row flex-center">
    <h4 class="text-white fw-light">Natural Environment & Biodiversity​ ​</h4>
    <p>Invest in eco-friendly tourism ventures that capitalize on Sri Lanka’s breathtaking landscapes and coastal beauty, ensuring both profitability and sustainability.</p>
    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 text-center text-xl-start mt-0 ">
      
      <!-- <h5 class=" ">Land use​</h5>
      
       <br/>
      <p>Select Proximity range for</p> -->
      <transition :name="direction">
        <div v-if="BiodiversityCards !== null">
        <div v-for="(card, index) in BiodiversityCards" :key="index" class="card mt-0" v-show="BiodiversityCard === index + 1">
            <p> {{ card.text }}:</p>
          
            <div class="d-flex flex-wrap  align-items-center">
              <div 
                v-for="(input, inputIndex) in card.dynamicInputs " 
                :key="inputIndex" 
                class="form-check me-3">
                <label>
                  <input 
                    :type="input.type" 
                    v-model="input.value" 
                    :value="input.value" 
                    class="form-check-input"
                  /> 
                  {{ input.label }}
                </label>
              </div>
            </div>   
           </div>
          </div>
        </transition>
      <!-- Navigation Buttons -->
      <button v-if="BiodiversityCard > 1" class="btn btn-outline-light border-2 rounded-pill btn-sm mx-2 my-2" @click="biodiversityprevCard()">Back</button>
      <button v-if="BiodiversityCard < cards.length" class="btn btn-outline-light border-2 rounded-pill btn-sm mx-2 my-2" @click="biodiversitynextCard()">Next</button>
      <button v-if="BiodiversityCard < cards.length" class="btn btn-outline-danger border-2 rounded-pill btn-sm mx-2 my-2" @click="biodiversityskipCard()">Skip</button>
  
    </div>
    
     
  </div>
  </div>
        
  
    </section>
  
  
  
    <section class="light bg-dark">
  
  <div class="bg-holder overlay" style="background-image:url(/assets/img/generic/bg-2.jpg);background-position: center top;">
  </div>
  <!--/.bg-holder-->
  
  <div class="container">
    <div class="row justify-content-center text-center">
      <div class="col-lg-9">
        <p class="fs-2 fs-sm-3 text-white">Access Sri Lanka’s Government Circulars and Documents. All the official forms, guidelines, and regulatory documents related to Blue Economy investments are available here.</p>
        <button class="btn btn-outline-light border-2 rounded-pill btn-lg mt-4 fs-0 py-2" type="button">Explore Documents</button>
      </div>
    </div>
  </div>
  <!-- end of .container-->
  
  </section>
  
  <section class="bg-dark pt-8 pb-4 light">
  
  <div class="container">
    <div class="position-absolute btn-back-to-top bg-dark"><a class="text-600" href="#banner" data-bs-offset-top="0"><span class="fas fa-chevron-up" data-fa-transform="rotate-45"></span></a></div>
    <div class="row">
      <div class="col-lg-4">
        <h5 class="text-uppercase text-white opacity-85 mb-3">Our Mission</h5>
        <p class="text-600">Sri Lanka's Financial Ministry and UNDP are committed to driving sustainable growth through Blue Economy initiatives. By providing comprehensive resources and support, we aim to create opportunities for investors to contribute to the prosperity of Sri Lanka while ensuring environmental protection.</p>
        <div class="icon-group mt-4"><a class="icon-item bg-white text-facebook" href="#!"><span class="fab fa-facebook-f"></span></a><a class="icon-item bg-white text-twitter" href="#!"><span class="fab fa-twitter"></span></a><a class="icon-item bg-white text-google-plus" href="#!"><span class="fab fa-google-plus-g"></span></a><a class="icon-item bg-white text-linkedin" href="#!"><span class="fab fa-linkedin-in"></span></a><a class="icon-item bg-white" href="#!"><span class="fab fa-medium-m"></span></a></div>
      </div>
      <div class="col ">
        <div class="row mt-5 mt-lg-0">
          <div class="col-lg-6 col-md-3">
            <h5 class="text-uppercase text-white opacity-85 mb-3">Partners</h5>
            <ul class="list-unstyled">
              <li class="mb-1">Our initiatives are supported by a strong network of partners dedicated to sustainable development and growth within Sri Lanka’s Blue Economy. Together, we work to provide resources, expertise, and guidance for impactful investment opportunities</li>
              <!-- <li class="mb-1">UNDP (United Nations Development Programme): A key driver in fostering sustainable development across Sri Lanka, UNDP works closely with the government and private sector to implement Blue Economy projects that align with global sustainability goals.</li>
              <li class="mb-1">UDA (Urban Development Authority): The UDA plays a pivotal role in planning and managing the infrastructure development necessary for the success of land and marine-based investments, ensuring long-term sustainability and growth.</li>
              <li class="mb-1">Sri Lanka Financial Ministry: As the primary government entity for economic management, the Financial Ministry oversees policies and initiatives that create a favorable environment for investors in Sri Lanka's Blue Economy.</li> -->
              <!-- <li class="mb-1"><a class="link-600" href="#!">Terms</a></li>
              <li class="mb-1"><a class="link-600" href="#!">Privacy</a></li>
              <li><a class="link-600" href="#!">Imprint</a></li> -->
            </ul>
          </div>
          <!-- <div class="col-6 col-md-3">
            <h5 class="text-uppercase text-white opacity-85 mb-3">Product</h5>
            <ul class="list-unstyled">
              <li class="mb-1"><a class="link-600" href="#!">Features</a></li>
              <li class="mb-1"><a class="link-600" href="#!">Roadmap</a></li>
              <li class="mb-1"><a class="link-600" href="#!">Changelog</a></li>
              <li class="mb-1"><a class="link-600" href="#!">Pricing</a></li>
              <li class="mb-1"><a class="link-600" href="#!">Docs</a></li>
              <li class="mb-1"><a class="link-600" href="#!">System Status</a></li>
              <li class="mb-1"><a class="link-600" href="#!">Agencies</a></li>
              <li class="mb-1"><a class="link-600" href="#!">Enterprise</a></li>
            </ul>
          </div> -->
          <div class="col-lg-6 mt-5 mt-md-0">
            <h5 class="text-uppercase text-white opacity-85 mb-3"> Insights & Updates</h5>
            <ul class="list-unstyled">
              <li>
                <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> New Investment Strategies for 2024</a></h5>
                <p class="text-600 opacity-50"> Blue Economy opportunities. </p>
              </li>
              <li>
                <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> Sustainable Development Goals in Action</a></h5>
                <p class="text-600 opacity-50">Projects align with global sustainability targets.</p>
              </li>
              <li>
                <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> A Look Back at 2023's Progress</a></h5>
                <p class="text-600 opacity-50">Blue Economy projects.</p>
              </li>
              <!-- <li>
                <h5 class="fs-0 mb-0"><a class="link-600" href="#!"> The New Falcon Theme</a></h5>
                <p class="text-600 opacity-50">Dec 23 &bull; 10min read </p>
              </li> -->
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- end of .container-->
  
  </section>
  
   
  
  <section class="py-0 bg-dark light">
  
  <div>
    <hr class="my-0 text-600 opacity-25" />
    <div class="container py-3">
      <div class="row justify-content-between fs--1">
        <div class="col-12 col-sm-auto text-center">
          <p class="mb-0 text-600 opacity-85">Thank you  <span class="d-none d-sm-inline-block">| </span><br class="d-sm-none" /> 2024 &copy; <a class="text-white opacity-85" href="https://themewagon.com">Gsentry</a></p>
        </div>
        <div class="col-12 col-sm-auto text-center">
          <p class="mb-0 text-600 opacity-85">v3.14.0</p>
        </div>
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
  
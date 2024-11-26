<template>
  <section class="py-0 overflow-hidden light" id="banner">
    <div class="bg-holder overlay bg-holder-natural natural-overlay" style="background-image:url(/assets/img/malindabandaralk.jpg);background-position: center bottom;"></div>
    <div class="container">
      <div class="row flex-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
        <div class="col-md-12 col-lg-12 col-xl-8 pb-7 pb-xl-9 text-center text-lg-start">
          <h1 class="text-white fw-light">TOURISM</h1>
          <p class=" text-white fw-light text-600 opacity-10">Sri Lanka's marine industries offer dynamic opportunities within the Blue Economy, encompassing fisheries, aquaculture, shipbuilding, and marine biotechnology. With extensive coastal and marine resources, the sector is primed for sustainable growth. Investments in marine industries can enhance food security, support livelihoods, and promote innovative practices like offshore aquaculture and eco-friendly shipbuilding. By focusing on sustainable practices and advanced technologies, your investment can contribute to responsible resource management, economic resilience, and environmental conservation, all while positioning Sri Lanka as a leader in sustainable marine development in South Asia.</p>
        </div>
      </div>
    </div>
  </section>

  <InfrastructureSection @done="handleDone"/>
  <NaturalResourcesSection ref="naturalResourcesSectionRef"/>
  <!-- <QuestionSection title="Natural Resources and Land Use"
  description="Focus on sustainable resource management and land use for a thriving environment."
  :naturalResourcesCards="infrastructureCards"/> -->



  <section class="light bg-dark">

<div class="bg-holder overlay" style="background-image:url(/assets/img/generic/bg-2.jpg);background-position: center top;">
</div>
<!--/.bg-holder-->

<div class="container">
  <div class="row justify-content-center text-center">
    <div class="col-lg-9">
      <p class="fs-2 fs-sm-3 text-white">Access Sri Lanka’s Government Circulars and Documents. All the official forms, guidelines, and regulatory documents related to Blue Economy investments are available here.</p>
      <button class="btn btn-outline-light border-2 rounded-pill btn-lg mt-4 fs-0 py-2" type="button"  @click="storeInLocalStorage()">
        <router-link to="/map/analyze" class="text-info">Explore Map</router-link>

      </button>
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
  import { ref, computed, watch ,onMounted} from 'vue';
  
  import InfrastructureSection from './InfrastructureSection.vue';
  import NaturalResourcesSection from './NaturalResourcesSection.vue';
  import QuestionSection from './QuestionSection.vue';

  const selectedAttribute = 'DISTRICT_N';
  const attributeValue = 'JAFFNA';

  const storeInLocalStorage = () => {
  localStorage.setItem('selectedAttribute', selectedAttribute);
  localStorage.setItem('attributeValue', attributeValue);
};  
  // import naturalResourcesCards from './naturalResourcesCards';


//   const naturalResourcesCards = ref([
//   { 
//     text: "Land use​", 
//     dynamicInputs: [
//       { type: "checkbox", label: "Agricultural land​", value: false },
//       { type: "checkbox", label: "Built Up Area​", value: false },
//       { type: "checkbox", label: "Forest Land​", value: false },
//       { type: "checkbox", label: "Sandy Area​", value: false },
//       { type: "checkbox", label: "Water body​​", value: false },
//       { type: "checkbox", label: "Wetland​​", value: false },
//       { type: "checkbox", label: "Bare land​​", value: false },
//       { type: "checkbox", label: "Rocky Area​", value: false },
//     ]
//   },
//   { 
//     text: "Wind speed (100m)​", 
//     dynamicInputs: [
//       { type: "checkbox", label: "High area ​", value: false },
//       { type: "checkbox", label: "Moderate area​", value: false },
//     ]
//   },
//   { 
//     text: "Solar irradiance​", 
//     dynamicInputs: [
//       { type: "checkbox", label: "High area (> 4.4 PVOUT)​", value: false },
//       { type: "checkbox", label: "Low area​", value: false },
//     ]
//   },
//   { 
//     text: "Annual Rainfall (mm)​", 
//     dynamicInputs: [
//       { type: "checkbox", label: "> 2500​", value: false },
//       { type: "checkbox", label: "1750 - 2500​", value: false },
//       { type: "checkbox", label: "< 2500​", value: false },
//     ]
//   },
//   { 
//     text: "Distance from the coast (m)​", 
//     dynamicInputs: [
//       { type: "checkbox", label: "0m - 200m", value: false },
//       { type: "checkbox", label: "200m - 400m", value: false },
//       { type: "checkbox", label: "400m - 600m", value: false },
//       { type: "checkbox", label: "600m - 800m", value: false },
//     ]
//   }
// ]);
const naturalResourcesCards = ref([
  {
    title: "Natural Resources",
    cards: [
      {
        text: "Land use",
        dynamicInputs: [
          { type: "checkbox", label: "Agricultural land", value: false },
          { type: "checkbox", label: "Built Up Area", value: false },
          { type: "checkbox", label: "Forest Land", value: false },
          { type: "checkbox", label: "Sandy Area", value: false },
          { type: "checkbox", label: "Water body", value: false },
          { type: "checkbox", label: "Wetland", value: false },
          { type: "checkbox", label: "Bare land", value: false },
          { type: "checkbox", label: "Rocky Area", value: false }
        ]
      },
      {
        text: "Wind speed (100m)",
        dynamicInputs: [
          { type: "checkbox", label: "High area", value: false },
          { type: "checkbox", label: "Moderate area", value: false }
        ]
      },
      {
        text: "Solar irradiance",
        dynamicInputs: [
          { type: "checkbox", label: "High area (> 4.4 PVOUT)", value: false },
          { type: "checkbox", label: "Low area", value: false }
        ]
      },
      {
        text: "Annual Rainfall (mm)",
        dynamicInputs: [
          { type: "checkbox", label: "> 2500", value: false },
          { type: "checkbox", label: "1750 - 2500", value: false },
          { type: "checkbox", label: "< 2500", value: false }
        ]
      },
      {
        text: "Distance from the coast (m)",
        dynamicInputs: [
          { type: "checkbox", label: "0m - 200m", value: false },
          { type: "checkbox", label: "200m - 400m", value: false },
          { type: "checkbox", label: "400m - 600m", value: false },
          { type: "checkbox", label: "600m - 800m", value: false }
        ]
      }
    ]
  }
]);
const infrastructureCards = ref([
  {
    title: "Accessibility",
    cards: [
      {
        text: "Main road",
        dynamicInputs: [
          { type: "checkbox", label: "0m - 200m", value: false },
          { type: "checkbox", label: "200m - 400m", value: false },
          { type: "checkbox", label: "400m - 600m", value: false },
          { type: "checkbox", label: "600m - 800m", value: false }
        ]
      },
      {
        text: "Secondary road",
        dynamicInputs: [
          { type: "checkbox", label: "0m - 200m", value: false },
          { type: "checkbox", label: "200m - 400m", value: false },
          { type: "checkbox", label: "400m - 600m", value: false },
          { type: "checkbox", label: "600m - 800m", value: false }
        ]
      },
      {
        text: "Track",
        dynamicInputs: [
          { type: "checkbox", label: "0m - 200m", value: false },
          { type: "checkbox", label: "200m - 400m", value: false },
          { type: "checkbox", label: "400m - 600m", value: false },
          { type: "checkbox", label: "600m - 800m", value: false }
        ]
      },
      {
        text: "Highway",
        dynamicInputs: [
          { type: "checkbox", label: "0m - 200m", value: false },
          { type: "checkbox", label: "200m - 400m", value: false },
          { type: "checkbox", label: "400m - 600m", value: false },
          { type: "checkbox", label: "600m - 800m", value: false }
        ]
      },
      {
        text: "Railway station",
        dynamicInputs: [
          { type: "checkbox", label: "0m - 200m", value: false },
          { type: "checkbox", label: "200m - 400m", value: false },
          { type: "checkbox", label: "400m - 600m", value: false },
          { type: "checkbox", label: "600m - 800m", value: false }
        ]
      }
    ]
  },
  {
    title: "Groundwater",
    cards: [
      {
        text: "Groundwater",
        dynamicInputs: [
          { label: "Availability of groundwater", value: false }
        ]
      }
    ]
  },
  {
    title: "Accommodation Facilities",
    cards: [
      {
        text: "Accommodation Facilities",
        dynamicInputs: [
          { type: "checkbox", label: "Classified Hotels( 1-5 Star)", value: false },
          { type: "checkbox", label: "Tourist Hotels", value: false },
          { type: "checkbox", label: "Boutique Hotels & Villas", value: false },
          { type: "checkbox", label: "Guest Houses", value: false },
          { type: "checkbox", label: "Bungalows", value: false },
          { type: "checkbox", label: "Home Stay Units", value: false }
        ]
      }
    ]
  }
]);


  // Create a ref for NaturalResourcesSection
const naturalResourcesSectionRef = ref(null);

// Handle the 'done' event and scroll to NaturalResourcesSection
const handleDone = () => {
  console.log('naturalResourcesSectionRef:', naturalResourcesSectionRef.value); // Check if ref is correctly assigned
  
  if (naturalResourcesSectionRef.value) {
    // Ensure the ref points to the DOM element before calling scrollIntoView
    naturalResourcesSectionRef.value.scrollIntoView({ behavior: 'smooth' });
  } else {
    console.error('naturalResourcesSectionRef is not available');
  }
};
  </script>
  
  <style scoped>
  /* Add any needed custom styling here */
  </style>
  
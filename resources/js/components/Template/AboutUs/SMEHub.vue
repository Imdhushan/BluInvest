<template>
  <section class="banner light">
    <div class="bg-holder overlay" style="background-image:url(/assets/img/mare-1200x900.jpg); background-position: center bottom;"></div>
  </section>

  <section class="services">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-9 col-xxl-8">
          <h1 class="heading">SME Hub</h1>
          <br />
          <div v-for="(service, index) in services" :key="index" class="service-item">
            <h4 class="service-item-title">{{ service.title }}</h4>
            <p class="lead">{{ service.description }}</p>
            <span v-if="service.link">
               <a :href="service.link" target="_blank">{{ service.linkText }}</a>
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';

const services = ref([
  {
    title: "Emerging Opportunities in Sri Lanka's Marine Sector",
    description: `Sri Lanka's marine industries present promising opportunities for small and medium-sized enterprises (SMEs), 
      particularly in sea cucumber harvesting and export, and seaweed harvesting and processing. These sectors hold 
      potential for economic growth and offer sustainable solutions for coastal communities.`,
  },
  {
    title: "Sea Cucumber Harvesting and Export",
    description: `Highly valued in international markets, sea cucumbers have been a vital part of Sri Lanka's seafood industry 
      for over 50 years. The North-Sri Lankan sea has become a central hub for the trade, with companies like Suganth 
      International Pvt Ltd leading the way in sea cucumber exports. The business is growing steadily, and Sri Lanka is 
      making efforts to expand sea cucumber farming, with a focus on sustainable practices.\n\n
      The government has designated specialised zones in Jaffna, Kilinochchi, Mannar, and Kalpitiya for sea cucumber farming, 
      with 5000 acres of land available for cultivation. The hatchery requirement is substantial, with an annual need for 
      21 million seeds. With the support of expert divers and sustainable harvesting methods, the sector is poised to grow, 
      meeting the increasing global demand for high-quality sea cucumbers. Investments in hatcheries, infrastructure, and 
      processing facilities are expected to yield a return on investment within 3-5 years.`,
  },
  {
    title: "Seaweed Harvesting and Processing",
    description: `Seaweed farming has become an integral part of the global food system, offering a range of benefits including 
      coastal livelihood sustainability, climate change mitigation, and the production of organic fertilisers. The potential 
      for growth in this sector is immense, with investment in technology, infrastructure, and processing required to 
      revitalise the industry.\n\n
      The government has identified key coastal zones, including Jaffna, Kilinochchi, Mannar, and Kalpitiya, for seaweed 
      farming, offering vast opportunities for large-scale operations. The development of hatcheries and processing 
      facilities can enhance Sri Lanka's position in the global market, contributing to both domestic food production 
      and export revenue. With strategic investments, the country can meet the growing demand for seaweed while fostering 
      environmental sustainability.`,
  },
  {
    title: "Related Documents",
    description: `Spatial Planning for Marine Investments: A paper by the Ministry of Finance, Planning and Economic Development and UNDP.`,
    link: "https://www.undp.org/srilanka/publications/sri-lankas-blue-economy-position-paper-undp-sri-lanka-lakshman-kadirgamar-institute-international-relations-and-strategic",
    linkText: "Sri Lanka's Blue Economy: A position paper by UNDP Sri Lanka & Lakshman Kadirgamar Institute of International Relations and Strategic Studies."
  }
]);
</script>

<style scoped>
/* Global Styles */
.banner {
  position: relative;
  padding: 0;
  overflow: hidden;
}

.bg-holder {
  position: relative;
  background-size: cover;
  background-repeat: no-repeat;
  height: 300px;
}

.overlay::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  z-index: 1;
}

.container {
  z-index: 2;
  position: relative;
}

.services {
  background-color: #fff;
  padding: 40px 0;
}

.heading {
  color: #0b1727;
  font-size: 2rem;
}

.service-item {
  margin-bottom: 30px;
  color:#0b1727;
}
.service-item-title {
  color: #0b1727;
}

.service-item a {
  color: #0056b3;
  text-decoration: underline;
}

.service-item a:hover {
  text-decoration: none;
}
</style>

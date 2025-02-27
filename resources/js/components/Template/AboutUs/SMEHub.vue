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
            <br />
            <!-- <p class="lead">{{ service.description }}</p> -->
            <p class="lead" v-html="service.description"></p>  
            
            <span v-if="service.link">
               <a :href="service.link" target="_blank">{{ service.linkText }}</a>
            </span>
            <br />
          </div>
          <Swiper :sliderContent='seaweedimg'/>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue';
import seaweedimg from "../SwiperContent/seaweedimg.json" 
import Swiper from '../../bootstrap/Swiper.vue';

const services = ref([
  {
    title: "Sea Cucumber Industry in Sri Lanka: A Growing Export Opportunity",
    description: `<p>Sri Lanka’s sea cucumber industry has long been a vital part of the nation’s seafood sector, buoyed by increasing global demand—especially in East Asia—for high-quality products with culinary and medicinal value. Key species such as Holothuria scabra (sandfish) and Stichopus japonicus (Japanese sea cucumber) are harvested both from the wild and through emerging aquaculture initiatives.</p>
    <p>Recognizing the industry’s potential, the government has allocated specialized zones in regions like Jaffna, Kilinochchi, Mannar, and Kalpitiya for farming, covering roughly 5,000 acres. This expansion, combined with the need for an estimated 21 million seeds annually, signals substantial opportunities for investment in hatcheries, sustainable production methods, and processing facilities. Already, Sri Lanka exported around 1,000 metric tons of processed sea cucumbers in 2023, generating USD 15 million in revenue—a figure poised to grow by 8–10% per year.</p>
    <p>While challenges such as overharvesting, illegal trade, and climate change persist, strategic solutions are in place. Enhanced aquaculture can relieve pressure on wild stocks, and improved value addition—producing premium dried sea cucumbers—can fetch higher export prices. With supportive policies, investment in research and infrastructure, and a focus on sustainability, Sri Lanka’s sea cucumber sector is well-positioned for robust growth and increased global market share.</p>
    `,
  },
  {
    title: "Economic Contribution",
    description: `<p><b>Export Revenue:</b> In 2023, Sri Lanka exported approximately 1,000 metric tons of
       processed sea cucumbers, generating an estimated revenue 
       of USD 15 million. This figure is projected to grow at an annual 
       rate of 8-10% due to increasing global demand.</p>
       <p><b>Employment:</b> The industry supports livelihoods in coastal communities, directly employing over 10,000 individuals in fishing, aquaculture, processing, and trade.</p>
<p><b>Market Trends:</b> Major export destinations include China, Hong Kong, and Singapore, where demand for dried and processed sea cucumbers remains strong. The global sea cucumber market is valued at USD 2.4 billion in 2023 and is expected to reach USD 3.8 billion by 2030, offering substantial growth opportunities for Sri Lanka.</p>
       `,
  },
  {
    title: "Opportunities",
    description: `<p><b>Aquaculture Development: </b>
       Expanding sea cucumber farming can reduce pressure on wild stocks and ensure consistent 
       supply for export markets. Currently, aquaculture 
       accounts for less than 20% of Sri Lanka’s sea cucumber production, 
       highlighting significant growth potential.
       </p>
       <p><b>Value Addition:</b>
       Developing processing facilities to produce high-quality dried sea cucumbers can enhance export value. Processed products fetch prices ranging from USD 300 to USD 1,200 per kilogram, depending on species and quality.
       </p>
       <p><b>Sustainable Practices:</b>
      Implementing community-based management and certification programs can ensure long-term sustainability.      
       </p>
       <p><b>Research and Development:</b>
      Investing in R&D for breeding, farming, and disease management can improve productivity and resilience.     
       </p>

<p><b><a href='https://citizenslanka.org/wp-content/uploads/2016/02/Fisheries-and-Aquatic-Resources-Act-No-2-of-1996-E.pdf' target='_blank'>Policy and Regulatory Framework</a></b>
   - The Fisheries and Aquatic Resources Act governs the sea cucumber industry,
    with specific measures to regulate harvesting, export, and aquaculture. 
  
  </p>

       `
       
       ,

       
  },
  {
    title: "Seaweed Industry in Sri Lanka: Potential for Scaled-Up Exports",
    description: `<p>
      With a global production value of over USD 6 billion and more than 40 countries engaged in commercial seaweed activity, the seaweed sector presents a significant export opportunity for Sri Lanka. Currently, most of Sri Lanka’s commercial seaweed production is concentrated in the Northern Province—particularly in Mannar, Kilinochchi, Nainathivu, and Karenagar—cultivating Kappaphycus alvarezii and Eucheuma spinosum, both high-demand species for the international market. These species are valued for their phycocolloids, which are widely used in food, pharmaceutical, and cosmetic industries.
      </p>
       <p>
        As global demand continues to rise and natural wild stocks decline, expanding seaweed farming offers Sri Lanka a promising path to economic growth and poverty reduction in coastal communities. The government’s support and policies, combined with established culture techniques and low operational costs, strengthen the prospects for scaling up. Plans to open new seedling banks in Mannar, Kilinochchi, Jaffna, Nilaweli, Kayankerni, Okanda, and Tangalle will further bolster supply, while providing job opportunities and stable incomes. By capitalizing on its vast coastal areas, efficient farming practices, and strong export potential, Sri Lanka is poised to become a key player in the global seaweed market.
        </p>`,
  },
  // {
  //   title: "Related Documents",
  //   description: `Spatial Planning for Marine Investments: A paper by the Ministry of Finance, Planning and Economic Development and UNDP.`,
  //   link: "https://www.undp.org/srilanka/publications/sri-lankas-blue-economy-position-paper-undp-sri-lanka-lakshman-kadirgamar-institute-international-relations-and-strategic",
  //   linkText: "Sri Lanka's Blue Economy: A position paper by UNDP Sri Lanka & Lakshman Kadirgamar Institute of International Relations and Strategic Studies."
  // }
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

<template>
  <section class="banner light">
    <div class="bg-holder overlay" style="background-image:url(/assets/img/mare-1200x900.jpg); background-position: center bottom;"></div>
    <!-- <div class="container text-center text-lg-start">
      <div class="row flex-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
        <div class="col-md-12 col-lg-12 col-xl-8 pb-7 pb-xl-9">
          <h2 class="fs-3 text-primary">Welcome to Our Services</h2>
  
        </div>
      </div>
    </div> -->
  </section>

  <section class="services">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-lg-10 col-xl-9 col-xxl-8">
          <h1 class="heading">Services</h1>
          <br />
          <div v-for="(service, index) in services" :key="index" class="service-item">
            <h4 class="service-item-title">{{ service.title }}</h4>
            <br>
            <p class="lead">
              {{ service.description }}
              <br/><br/>
              <span >Learn more at: 
                <a :href="service.link" target="_blank">{{ service.linkText }}</a>
              </span>
            </p>
            <br/>
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
    title: "Board of Investment of Sri Lanka",
    description: `Founded in 1978, the Board of Investment of Sri Lanka promotes foreign direct 
      investment and oversees over 1,600 enterprises. The BOI provides sector-based investor 
      targeting, aftercare, and operational guidance to help businesses reach their full potential.`,
    link: "https://investsrilanka.com/",
    linkText: "Invest Srilanka"
  },
  {
    title: "Sri Lanka Export Development Board (SLEDB)",
    description: `Established in 1979, the Sri Lanka Export Development Board promotes and develops 
      exports with guidance from international trade bodies like ITC and UNCTAD. It works to boost 
      Sri Lanka’s global trade presence.`,
    link: "https://www.srilankabusiness.com/",
    linkText: "Srilanka Business"
  },
  {
    title: "Industrial Development Board",
    description: `The Industrial Development Board, under Sri Lanka’s Ministry of Industry and 
      Entrepreneurship Development, supports industrial growth. It develops the industrial 
      sector through the implementation of the Industrial Development Act of 1969.`,
    link: "https://idb.gov.lk/",
    linkText: "IDB"
  },
  {
    title: "Inland Revenue Department",
    description: `The Inland Revenue Department of Sri Lanka is responsible for collecting taxes and 
      enforcing tax laws. It plays a key role in generating government revenue and supporting 
      economic stability.`,
    link: "https://www.ird.gov.lk/SitePages/Default.aspx",
    linkText: "IRD"
  },
  {
    title: "Sri Lanka Customs",
    description: `Sri Lanka Customs regulates imports, exports, and trade, ensuring compliance with 
      international trade laws and safeguarding the country’s borders. It facilitates efficient 
      and secure movement of goods.`,
    link: "https://www.customs.gov.lk/",
    linkText: "Customs"
  },
  {
    title: "Excise Department of Sri Lanka",
    description: `The Excise Department manages and regulates the production, distribution, and sale 
      of alcoholic beverages and tobacco products. It ensures compliance with laws while 
      contributing to government revenue.`,
    link: "https://www.excise.gov.lk/index.php?lang=en",
    linkText: "Excise"
  },
  {
    title: "Geological Survey & Mines Bureau",
    description: `The Geological Survey & Mines Bureau provides geoscientific advice, including 
      mineral exploration and mining regulations. It offers laboratory services and 
      disseminates geoscience information to the public, industry, and government.`,
    link: "https://www.gsmb.gov.lk/index.php?lang=en",
    linkText: "GSMB"
  },
  {
    title: "Coast Conservation & Coastal Resource Management Department",
    description: `The Coast Conservation & Coastal Resource Management Department is 
      responsible for preserving Sri Lanka's coastal environments. It implements policies 
      to manage and protect the country's coastal resources effectively.`,
    link: "https://www.coastal.gov.lk/index.php?lang=en",
    linkText: "Coastal"
  },
  {
    title: "Sri Lanka Tourism Development Authority",
    description: `The Sri Lanka Tourism Development Authority (SLTDA) oversees the planning, 
      development, regulation, and policy implementation of Sri Lanka’s tourism sector. 
      Established in 2007, it replaced the Sri Lanka Tourism Board.`,
    link: "https://sltda.gov.lk/en",
    linkText: "SLTDA"
  },
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

<template>
  <section class="py-0 overflow-hidden light" id="banner">
    <div class="bg-holder overlay" style="background-image:url(/assets/img/mare-1200x900.jpg); background-position: center bottom;"></div>
    <div class="container">
      <div class="row flex-center pt-8 pt-lg-10 pb-lg-9 pb-xl-0">
        <div class="col-md-12 col-lg-12 col-xl-8 pb-7 pb-xl-9 text-center text-lg-start">
          <!-- Banner content (optional) -->
        </div>
      </div>
    </div>
  </section>

  <section style="background-color: #ffff">
    <div class="container">
      <div class="row justify-content-center text-justify">
        <div class="col-lg-10 col-xl-9 col-xxl-8">
          <h1 class="fs-2 fs-sm-4 fs-md-5" style="color:#0b1727">Regulatory Framework Pertaining to the Boat-Building Industry</h1>
          <br/>
          <p class="lead">
            The boat-building industry in Sri Lanka is a significant contributor to the country’s maritime economy, catering to domestic and international markets. This industry is governed by a comprehensive regulatory framework designed to ensure safety, environmental sustainability, and compliance with international standards. The regulations span multiple sectors, including maritime law, environmental protection, and international trade.
          </p>

          <h3>Key Regulations Governing the Boat-Building Industry</h3>
          <ul>
            <li>
              <strong>1. Merchant Shipping Act No. 52 of 1971</strong>
              <p>This foundational act mandates the registration and licensing of all vessels, including those used for both commercial and private purposes. It also regulates boat builders and operators, ensuring that all boats meet specific safety and construction standards. Subsequent amendments, such as the Merchant Shipping (Amendment) Act No. 17 of 2019, and related regulations like the Merchant Shipping (Small Commercial Vessels) Regulations of 2017, provide additional guidelines relevant to the boat-building industry.</p>
            </li>

            <li>
              <strong>2. Fisheries and Aquatic Resources Act No. 2 of 1996</strong>
              <p>The Fisheries and Aquatic Resources Act provides specific regulations for fishing vessels, which constitute a significant portion of the boat-building industry in Sri Lanka. This act includes guidelines on vessel size, safety standards, and eco-friendly materials. Furthermore, fishing boats must be registered with the Department of Fisheries and are subject to regular inspections to ensure compliance with these standards.</p>
            </li>

            <li>
              <strong>3. Environmental Regulations</strong>
              <p>The Coast Conservation and Coastal Resource Management Act No. 57 of 1981 and Amendment Act No. 47 of 2011 ensures that boat-building activities near coastal areas comply with environmental guidelines to protect marine ecosystems. Builders must obtain permits for construction or modifications within the coastal zone. Large-scale boat-building projects may also require an Environmental Impact Assessment (EIA) to evaluate potential environmental impacts.</p>
              <p>Additionally, the Fauna and Flora Protection (Amendment) Act No. 22 of 2009 ensures that boat-building activities do not threaten local wildlife and plant species.</p>
            </li>

            <li>
              <strong>4. Sri Lanka Export Development Board (EDB) Guidelines</strong>
              <p>The EDB plays a critical role for boat builders engaged in exporting, providing guidelines on maintaining high-quality standards, ensuring market access, and complying with international trade regulations. Adhering to EDB regulations is essential for businesses looking to expand into global markets.</p>
            </li>

            <li>
              <strong>5. Board of Investment (BOI) Legislation</strong>
              <p>Under section 16 of the Board of Investment Law No. 4 of 1978, the BOI provides a regulatory framework that facilitates investment in the boat-building industry. BOI-approved projects benefit from incentives such as tax breaks and streamlined regulatory processes, encouraging local and foreign investment in boat-building enterprises.</p>
            </li>

            <li>
              <strong>6. Marine Pollution Prevention Act No. 35 of 2008</strong>
              <p>This act addresses the environmental impact of boat-building activities, particularly concerning waste disposal and the prevention of marine pollution. Compliance ensures that boat builders adhere to standards that protect the marine environment, a key consideration for sustainable industry practices.</p>
            </li>

            <li>
              <strong>7. Local Authorities and Provincial Councils</strong>
              <p>Local governments are responsible for regulating boat-building activities within their jurisdictions. Builders must obtain construction permits and comply with local zoning laws. This decentralized regulatory approach ensures that boat-building activities align with regional priorities and environmental guidelines.</p>
            </li>

            <li>
              <strong>8. Admiralty Jurisdiction and Carriage of Goods by Sea</strong>
              <p>The Admiralty Jurisdiction Act No. 40 of 1983 governs maritime disputes, ensuring legal protection for boat builders and operators under Sri Lankan law. Additionally, the Carriage of Goods by Sea Act No. 21 of 1982 regulates the transport of goods, including boats and boat components, ensuring compliance with international shipping standards.</p>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
  import { ref, computed } from 'vue';
</script>

<style scoped>
  /* Optional custom styles here */
  .lead {
    font-size: 1.25rem;
    line-height: 1.75rem;
    color: #555;
  }

  h3 {
    margin-top: 20px;
    font-size: 1.5rem;
    color: #0b1727;
  }

  ul {
    list-style-type: none;
    padding-left: 0;
  }

  ul li {
    margin-bottom: 20px;
  }

  ul li strong {
    font-size: 1.2rem;
    color: #0b1727;
  }

  /* Styling for the content */
  .container {
    margin-top: 20px;
  }
</style>

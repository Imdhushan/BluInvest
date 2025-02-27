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
              <strong>
                <a href="https://www.commonlii.org/lk/legis/num_act/msa52o1971231/ " target="_blank">

                1. Merchant Shipping Act No. 52 of 1971
                </a>
              </strong>
              <p>This foundational act mandates the registration and licensing of all vessels, including those used for both commercial and private purposes. It also regulates boat builders and operators, ensuring that all boats meet specific safety and construction standards. Subsequent amendments, such as the Merchant Shipping (Amendment) Act No. 17 of 2019, and related regulations like the Merchant Shipping (Small Commercial Vessels) Regulations of 2017, provide additional guidelines relevant to the boat-building industry.</p>
            </li>

            <li>
              <strong>
                <a href="https://www.commonlii.org/lk/legis/num_act/faara2o1996351/" target="_blank">

                2. Fisheries and Aquatic Resources Act No. 2 of 1996
                </a>
              </strong>
              <p>The Fisheries and Aquatic Resources Act provides specific regulations for fishing vessels, which constitute a significant portion of the boat-building industry in Sri Lanka. This act includes guidelines on vessel size, safety standards, and eco-friendly materials. Furthermore, fishing boats must be registered with the Department of Fisheries and are subject to regular inspections to ensure compliance with these standards.</p>
            </li>

            <li>
              <strong>

                3. Environmental Regulations
              
              </strong>
              <p>
                <strong>
                <a href="https://www.srilankalaw.lk/YearWisePdf/2011/COAST_CONSERVATION_(AMENDMENT)_ACT,_NO._49_OF_2011.pdf " target="_blank">
 Coast Conservation and Coastal Resource Management Act No. 57 of 1981 and Amendment Act No. 47 of 2011: 
</a>
</strong>
                These acts ensure that boat-building activities near coastal areas comply with environmental guidelines to protect marine ecosystems. Builders must obtain permits for construction or modifications within the coastal zone. 
              </p>
              <p>
               <strong> Environmental Impact Assessments (EIAs): </strong>
                Large-scale boat-building projects may require an EIA to evaluate potential
                 impacts on the environment, ensuring that projects do not harm 
                 the marine or coastal ecosystem.  

                  </p>
                  <p>
                    <strong>
                      <a href="https://stepbysteptrade.lk/media/ordinanceeng_1.pdf" target="_blank">

                       
                      Fauna and Flora Protection (Amendment) Act No. 22 of 2009: 
                      </a>
                    </strong>
                    This act complements the coastal management regulations by ensuring that 
                    boat-building activities do not threaten local wildlife and plant species. 
                  </p>
            </li>

            <li>
              <strong>

                4. Sri Lanka Export Development Board (EDB) Guidelines
              </strong>
              <p>The EDB plays a critical role for boat builders engaged in exporting, providing guidelines on maintaining high-quality standards, ensuring market access, and complying with international trade regulations. Adhering to EDB regulations is essential for businesses looking to expand into global markets.</p>
            </li>

            <li>
              <strong>
                <a href="https://investsrilanka.com/wp-content/uploads/2020/04/Act_No_4_of_1978.pdf" target="_blank">

                5. Board of Investment (BOI) Legislation
              </a>
              </strong>
              <p>Under section 16 of the Board of Investment Law No. 4 of 1978, the BOI provides a regulatory framework that facilitates investment in the boat-building industry. BOI-approved projects benefit from incentives such as tax breaks and streamlined regulatory processes, encouraging local and foreign investment in boat-building enterprises.</p>
            </li>

            <li>
              <strong>
                <a href="https://env.gov.lk/web/images/downloads/acts/marine_pollution_prevention_act_no_35_of_2008.pdf " target="_blank">

                6. Marine Pollution Prevention Act No. 35 of 2008
              </a>
              </strong>
              <p>This act addresses the environmental impact of boat-building activities, particularly concerning waste disposal and the prevention of marine pollution. Compliance ensures that boat builders adhere to standards that protect the marine environment, a key consideration for sustainable industry practices.</p>
            </li>

            <li>
              <strong>

                7. Local Authorities and Provincial Councils
              </strong>
              <p>Local governments are responsible for regulating boat-building activities within their jurisdictions. Builders must obtain construction permits and comply with local zoning laws. This decentralized regulatory approach ensures that boat-building activities align with regional priorities and environmental guidelines.</p>
            </li>

            <li>
              <strong>
                <a href="https://www.parliament.lk/uploads/acts/gbills/english/3048.pdf " target="_blank">

                8. Admiralty Jurisdiction and Carriage of Goods by Sea
              </a>
              </strong>
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

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

  <section class="py-0 overflow-hidden light" id="regulations">
    <div class="container">
      <div class="row flex-center pt-3 pt-lg-8 pb-lg-9 pb-xl-0">
        <div class="renewable-energy-regulations">
          <h1>Regulations Pertaining to Renewable Energy Projects</h1>

          <section v-for="(regulation, index) in regulations" :key="index" class="regulation">
            <a :href="regulation.linktitle"  target="_blank" class="text-decoration-none">

            <h2>{{ regulation.title }}</h2>
            </a>
            <ul>
              <li v-for="(point, idx) in regulation.points" :key="idx">{{ point }}</li>
            </ul>
          </section>

          <section class="guidelines">
            <h2>Guidelines for Renewable Energy Development</h2>
            <ul>
              <li v-for="(guideline, index) in guidelines" :key="index">{{ guideline }}</li>
            </ul>
          </section>

          <div>
            <table class="table table-striped">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Documents</th>
                  <th>Download</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(doc, index) in documents" :key="index">
                  <td>{{ index + 1 }}</td>
                  <td>{{ formatName(doc) }}</td>
                  <td>
                    <a :href="`${basePath}/${doc}`" class="text-decoration-none">
                      <i class="bi bi-download"></i> Download
                    </a>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  name: 'RenewableEnergyRegulations',
  data() {
    return {
      basePath: "/assets/pdf/tourisum",
      documents: [
        "Guidelines for Renewable Energy Development.pdf",
      ],
      regulations: [
        {
          linktitle:"https://citizenslanka.org/wp-content/uploads/2016/02/Coast-Conservation-Act-No-57-of-1981-E.pdf",
          title: "1. Coastal Conservation and Coastal Resources Management Act (No. 57 of 1981, amended in 1988 and 2011)",
          points: [
            "This act governs development activities in the coastal zone, which includes land within 300 meters of the high-water mark and adjoining marine areas.",
            "Developers must obtain a permit from the Coast Conservation and Coastal Resource Management Department (CCD) for any construction or alteration in coastal zones.",
            "Environmental Impact Assessments (EIA) are mandatory for significant projects, including renewable energy installations like wind farms or solar parks."
          ]
        },
        {
          linktitle:"https://www.cea.lk/web/images/pdf/acts/act56-88.pdf",
          title: "2. National Environmental Act (No. 47 of 1980, amended in 1988)",
          points: [
            "The Central Environmental Authority (CEA) enforces this act, requiring renewable energy projects to conduct EIAs or Initial Environmental Examinations (IEE) depending on the scale and location.",
            "The CEA works closely with the CCD in coastal regions to ensure that renewable energy projects do not adversely affect the environment.",
          ]
        },
        {
          linktitle:"https://www.parliament.lk/uploads/acts/gbills/english/6347.pdf ",

          title: "3. Sri Lanka Electricity Act, No. 36 of 2024",
          points: [
            "Licensing and Regulation: Renewable energy projects, including those in coastal areas, would likely need to comply with the licensing requirements outlined in the Act. This would include obtaining necessary approvals from the Public Utilities Commission of Sri Lanka (PUCSL).",
            "Grid Connection: If a renewable energy project intends to feed electricity into the national grid, it must adhere to the regulations governing grid connections, technical standards, and the responsibilities of the project developers.",
            "Tariffs and Pricing: The Act outlines the process for setting tariffs and may influence the financial viability of renewable energy projects by determining the rates at which electricity can be sold to the grid.",
            "Sustainability and Environmental Compliance: While the Act itself may not directly address environmental concerns, compliance with environmental standards and sustainability practices is crucial for projects, especially in ecologically sensitive coastal areas.",
            "Policy Support for Renewables: Any amendments or directives under this Act that encourage the development of renewable energy could impact projects in coastal areas by providing incentives or removing regulatory barriers."
          ]
        },
        {
          linktitle:"https://www.energy.gov.lk/images/about-us/inception/2007-act-no-35-sri-lanka-sustainable-energy-authority-e.pdf ",

          title: "4. Sri Lanka Sustainable Energy Authority Act (No. 35 of 2007)",
          points: [
            "This act provides a regulatory framework for the development of renewable energy sources.",
            "The Sri Lanka Sustainable Energy Authority (SLSEA) promotes renewable energy projects, including solar, wind, and bioenergy, and ensures compliance with environmental and safety standards."
          ]
        },
        {
          linktitle:"https://env.gov.lk/web/images/downloads/acts/marine_pollution_prevention_act_no_35_of_2008.pdf ",

          title: "5. Marine Pollution Prevention Act (No. 35 of 2008) ",
          points: [
            "Projects located in coastal and marine areas must comply with this act to prevent pollution of the marine environment.",
            "Renewable energy projects such as offshore wind farms must ensure that construction and operation activities do not harm marine ecosystems."
          ]
        },
        {
          linktitle:"https://citizenslanka.org/wp-content/uploads/2016/02/Fisheries-and-Aquatic-Resources-Act-No-2-of-1996-E.pdf",

          title: "6. Fisheries and Aquatic Resources Act (No. 2 of 1996)",
          points: [
            "Renewable energy projects in coastal and marine areas that overlap with fishing zones must adhere to the regulations outlined in this act.",
            "The Department of Fisheries and Aquatic Resources oversees activities that may impact fishing and aquatic resources, ensuring that such projects do not interfere with traditional livelihoods."
          ]
        },
        {
          linktitle:"",

          title: "7. Local Government and Urban Development Regulations",
          points: [
            "Local authorities also regulate land use in coastal areas. Developers must obtain approval from relevant local government bodies.",
            "In certain cases, renewable energy projects may need to align with urban development plans, especially in densely populated or touristic coastal areas."
          ]
        },
        {
          linktitle:"",

          title: "8. Sri Lanka Ports Authority Regulations",
          points: [
            "If a renewable energy project is planned near a port or harbor, approvals from the Sri Lanka Ports Authority (SLPA) are required, particularly for offshore energy projects."
          ]
        },
        {
          linktitle:"",

          title: "9. Biodiversity Protection Regulations",
          points: [
            "Renewable energy projects must consider the protection of biodiversity, particularly in areas designated as environmental protection zones or sanctuaries.",
            "Compliance with national biodiversity action plans and international commitments under conventions is required."
          ]
        }
      ],
      guidelines: [
        "Conduct an EIA or IEE to identify potential environmental, social, and ecological impacts.",
        "Consider cumulative impacts from existing or planned coastal developments.",
        "Ensure proposed sites are not located in protected or conservation areas.",
        "Keep grading to a minimum to avoid altering the physical nature of coastal landforms.",
        "Engage local communities and stakeholders early in the planning process to incorporate local knowledge and address concerns.",
        "Support ecosystem restoration projects to offset unavoidable environmental impacts.",
        "Establish a monitoring program to track the environmental and social impacts of the projects.",
        "Develop a plan for decommissioning and site restoration after the project ends."
      ]
    };
  },
  methods: {
    formatName(filename) {
      return filename.replace(".pdf", "");
    }
  }
};
</script>

<style scoped>
.renewable-energy-regulations {
  padding: 20px;
}

h1 {
  font-size: 2rem;
  color: #2c3e50;
  margin-bottom: 20px;
}

h2 {
  font-size: 1.5rem;
  color: #34495e;
  margin-bottom: 10px;
}

ul {
  list-style-type: disc;
  margin-left: 20px;
}

li {
  font-size: 1rem;
  color: #7f8c8d;
  margin-bottom: 10px;
}

.regulation {
  background-color: #ecf0f1;
  padding: 15px;
  border-radius: 8px;
  margin-bottom: 20px;
}

.guidelines {
  background-color: #f1f0ed;
  padding: 15px;
  border-radius: 8px;
  margin-top: 30px;
}

strong {
  font-weight: bold;
}
</style>

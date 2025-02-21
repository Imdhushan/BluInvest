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
            <h2>{{ regulation.title }}</h2>
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
          title: "1. Coastal Conservation and Coastal Resources Management Act (No. 57 of 1981, amended in 1988 and 2011)",
          points: [
            "Purpose: Governs development activities within the coastal zone, including land within 300 meters of the high-water mark and adjoining marine areas.",
            "Permit Requirement: Developers must obtain a permit from the Coast Conservation and Coastal Resource Management Department (CCD) for any construction or alteration in coastal zones.",
            "EIA Requirement: Environmental Impact Assessments (EIA) are mandatory for significant projects, including renewable energy installations like wind farms or solar parks."
          ]
        },
        {
          title: "2. National Environmental Act (No. 47 of 1980, amended in 1988)",
          points: [
            "Enforcing Authority: Central Environmental Authority (CEA).",
            "EIA/IEE Requirement: Renewable energy projects must conduct Environmental Impact Assessments (EIA) or Initial Environmental Examinations (IEE) based on the project's scale and location.",
            "Collaboration: The CEA works with the CCD to ensure environmental compliance in coastal regions."
          ]
        },
        {
          title: "3. Sri Lanka Electricity Act (No. 20 of 2009, amended in 2013)",
          points: [
            "Regulates licensing and grid connection for renewable energy projects.",
            "Determines tariffs for electricity sold to the national grid.",
            "Supports the development of sustainable and renewable energy sources."
          ]
        },
        {
          title: "4. Sri Lanka Sustainable Energy Authority Act (No. 35 of 2007)",
          points: [
            "Establishes the regulatory framework for renewable energy in Sri Lanka.",
            "Promotes adherence to environmental and safety standards.",
            "Encourages the integration of renewable energy into the national energy mix."
          ]
        },
        {
          title: "5. Marine Pollution Prevention Act (No. 35 of 2008)",
          points: [
            "Ensures renewable energy projects in marine areas prevent pollution.",
            "Mandates that offshore installations minimize harm to marine ecosystems.",
            "Regulates waste management and discharge from energy projects."
          ]
        },
        {
          title: "6. Fisheries and Aquatic Resources Act (No. 2 of 1996, amended in 2004)",
          points: [
            "Requires renewable energy projects to avoid interference with fishing activities.",
            "Mandates consultations with the Department of Fisheries and Aquatic Resources.",
            "Ensures that aquatic ecosystems are preserved during project development."
          ]
        },
        {
          title: "7. Local Government and Urban Development Regulations",
          points: [
            "Developers must obtain local government approval for coastal land use.",
            "Projects should align with urban development plans, especially in tourism-heavy zones.",
            "Focus on sustainable and environmentally friendly development."
          ]
        },
        {
          title: "8. Sri Lanka Ports Authority Regulations",
          points: [
            "Offshore renewable energy projects near ports require approval from the Sri Lanka Ports Authority (SLPA).",
            "Ensures that projects do not interfere with port operations or navigation routes.",
            "Coordinates with other regulatory bodies for integrated management."
          ]
        },
        {
          title: "9. Biodiversity Protection Regulations",
          points: [
            "Renewable energy projects must comply with national biodiversity action plans.",
            "Avoidance of protected and sensitive ecological areas is mandatory.",
            "Ensures adherence to international biodiversity conventions."
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

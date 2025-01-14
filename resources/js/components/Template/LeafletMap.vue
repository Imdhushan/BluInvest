<template>
  <div>
    <div class="row">
      <div class="col-md-12 col-lg-12 text-center">
        <h5>Zoom to your preferred Locations</h5>
      </div>
    </div>
    <div id="map"></div>

<!--    &lt;!&ndash; Query Modal &ndash;&gt;-->
<!-- <div class="modal fade" id="queryModal" tabindex="-1" aria-labelledby="queryModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="queryModalLabel">Query Layer by Attribute</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <form id="queryForm">
          <div class="mb-3">
            <label for="attributeSelect" class="form-label">Select Attribute</label>
            <select class="form-select" v-model="selectedAttribute">
              <option v-for="attribute in attributes" :key="attribute" :value="attribute">{{ attribute }}</option>
            </select>
          </div>
          <div class="mb-3">
            <label for="attributeValue" class="form-label">Enter Value</label>
            <input type="text" class="form-control" v-model="attributeValue" placeholder="Enter value to query" />
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" @click="applyQuery">Apply Query</button>
      </div>
    </div>
  </div>
</div> -->

  </div>
</template>

<script setup>
import {ref, onMounted, inject, watch} from 'vue';
import L from 'leaflet';

const map = ref(null);
const queryLayerGroup = L.layerGroup(); // Group for displaying queried features
const $loading =  inject('$loading')

const props = defineProps({
  filters: {
    type: Array,
    default: [],
  },

});


// Function to apply hard-coded tourism filters
const applyTourismQuery = () => {

  let loader = $loading.show();

  // Construct the filter for hard-coded values
  const filters = props.filters
      .map(
          filter =>
              `<PropertyIsEqualTo><PropertyName>${filter.attribute}</PropertyName><Literal>${filter.value}</Literal></PropertyIsEqualTo>`
      )
      .join('');

  const queryUrl = `https://geoserver.g-sentry.com/geoserver/cite/wfs?` +
      `service=WFS&version=1.1.0&request=GetFeature&typeName=cite:GRID&outputFormat=application/json&` +
      `filter=<Filter>${filters}</Filter>`;

  fetch(queryUrl)
      .then(response => response.json())
      .then(data => {
        queryLayerGroup.clearLayers();

        // Create a GeoJSON layer with the filtered data
        const queryLayer = L.geoJSON(data, {
          onEachFeature: function (feature, layer) {
            // Format attributes into a list
            const attributesHTML = Object.entries(feature.properties)
                .map(([key, value]) => `<tr><td><b>${key}:</b></td><td>${value}</td></tr>`)
                .join('');

            // Wrap popup content in a small, scrollable window
            const popupContent = `
            <div class="info-popup">
              <h6>Tourism Feature</h6>
              <div class="popup-content" style="height: 100px;overflow-y: scroll">
                <table>${attributesHTML}</table>
              </div>
            </div>
          `;
            layer.bindPopup(popupContent, {
              className: 'custom-popup', // Custom class for popup styling
              offset: L.point(0, -10),  // Slight offset to mimic Google-style popups
              closeButton: true,        // Add close button for user convenience
            });
          },
        });

        // Add the GeoJSON layer to the queryLayerGroup
        queryLayerGroup.addLayer(queryLayer);

        // Fit the map to the bounds of the filtered data
        map.value.fitBounds(queryLayer.getBounds());
        loader.hide();
      })
      .catch(error => {
        console.error('Error querying tourism features:', error);
        loader.hide();
      });
};

// Initialize the map
onMounted(() => {
  map.value = L.map('map').setView([6.9271, 79.8612], 7); // Centered on Sri Lanka

  // Add base layer (OpenStreetMap)
  // const osmBaseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  //   maxZoom: 19,
  //   attribution: '© OpenStreetMap contributors',
  // });

  // const osmBaseLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  //   attribution: 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
  // });

  const osmBaseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '© OpenStreetMap contributors',
  });

  // const satelliteLayer = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
  //   attribution: 'Tiles © Esri — Source: Esri, Maxar, Earthstar Geographics, and the GIS User Community',
  // });

  const satelliteLayer =  L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
  subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
  attribution: '© Google Maps',
});

  satelliteLayer.addTo(map.value);

  //osmBaseLayer.addTo(map.value);

  

  const baseLayers = {
    "Satellite View": satelliteLayer,
    "Normal View (OSM)": osmBaseLayer,
  };

  L.control.layers(baseLayers).addTo(map.value);

  // Add the query layer group to the map
  queryLayerGroup.addTo(map.value);

  // Trigger the tourism query on load
  // applyTourismQuery();
});


watch(() => props.filters, (data, oldEvent) => {
  if (data){
    console.log("filter array",data);
    applyTourismQuery();

  }
})

</script>



<style scoped>
/* Map container styling */
#map {
  width: 100%;
  height: 90vh;
}


.loader {
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #3498db;
  width: 50px;
  height: 50px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% {

    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Leaflet popup styling */
.custom-popup .leaflet-popup-content-wrapper {
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  max-width: 250px; /* Set maximum width for the popup */
}

.custom-popup .leaflet-popup-content {
  margin: 0;
  font-size: 12px; /* Compact font size for content */
  line-height: 1.4; /* Adjust line height for readability */
}

.custom-popup .leaflet-popup-tip {
  background: white;
}

/* Title styling */
.info-popup h6 {
  margin: 0 0 5px;
  font-weight: bold;
  font-size: 14px;
}

/* Scrollable popup content */
.popup-content {
  height: 100px !important; /* Fixed height to constrain content */
  overflow-y: scroll !important; /* Enable vertical scrolling */
  white-space: nowrap; /* Prevent wrapping of text (optional, can be removed) */
}

/* Table styling */
.popup-content table {
  width: 100%;
  border-collapse: collapse;
}

.popup-content td {
  padding: 2px 5px;
  vertical-align: top;
  word-wrap: break-word; /* Ensure long text wraps */
}

.popup-content td:first-child {
  font-weight: bold;
  width: 40%;
}

.popup-content td:last-child {
  width: 60%;
}

</style>



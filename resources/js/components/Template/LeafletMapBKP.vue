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

const getGridColor = (feature) => {
  const properties = feature.properties;
  const totalFilters = props.filters.length;

  // Count matches
  const matches = props.filters.filter(filter => properties[filter.attribute] === parseInt(filter.value)).length;

  // Calculate the percentage of matches
  const matchPercentage = (matches / totalFilters) * 100;

  // Return color and match percentage based on the range
  if (matchPercentage < 20) return { color: '#d3d3d3', value: matchPercentage }; // Very Low (Gray)
  if (matchPercentage >= 20 && matchPercentage < 40) return { color: '#fff5b1', value: matchPercentage }; // Low (Light Yellow)
  if (matchPercentage >= 40 && matchPercentage < 60) return { color: '#ffd966', value: matchPercentage }; // Moderate (Yellow-Orange)
  if (matchPercentage >= 60 && matchPercentage < 80) return { color: '#ff8c00', value: matchPercentage }; // High (Orange)
  if (matchPercentage >= 80) return { color: '#ff4500', value: matchPercentage }; // Very High (Red)
};



// Function to apply hard-coded tourism filters
const applyTourismQuery = () => {

  let loader = $loading.show();

  // Construct the filter for hard-coded values
  // Construct the OR condition for the filters
  const filters = props.filters
      .map(
          filter =>
              `<PropertyIsEqualTo><PropertyName>${filter.attribute}</PropertyName><Literal>${filter.value}</Literal></PropertyIsEqualTo>`
      )
      .join('');

  const orCondition = `<Or>${filters}</Or>`;

  const queryUrl = `https://geoserver.gsentry.cloud/geoserver/UNDP/wfs?` +
      `service=WFS&version=1.1.0&request=GetFeature&typeName=UNDP:tourism&outputFormat=application/json&` +
      `filter=<Filter>${orCondition}</Filter>`;

  fetch(queryUrl)
      .then(response => response.json())
      .then(data => {
        queryLayerGroup.clearLayers();

        // Create a GeoJSON layer with the filtered data
        const queryLayer = L.geoJSON(data, {
          style: function (feature) {
            return { color: getGridColor(feature).color };
          },
          onEachFeature: function (feature, layer) {
            // Format attributes into a list
            let attributesHTML = `<tr><td>Weight</td><td>${getGridColor(feature).value} %</td></tr>`
            attributesHTML += Object.entries(feature.properties)
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


  // Add the legend
  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'info legend');

    // Legend HTML content
    div.innerHTML = `
      <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
<!--        <strong>Legend</strong><br>-->
        <i style="background: #d3d3d3; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></i> Very Low (<20%)<br>
        <i style="background: #fff5b1; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></i> Low (20-40%)<br>
        <i style="background: #ffd966; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></i> Moderate (40-60%)<br>
        <i style="background: #ff8c00; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></i> High (60-80%)<br>
        <i style="background: #ff4500; width: 18px; height: 18px; display: inline-block; margin-right: 5px;"></i> Very High (>80%)<br>
      </div>
    `;
    return div;
  };

  legend.addTo(map.value);

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


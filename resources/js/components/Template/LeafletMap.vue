<template>
  <div>
    <div class="row">
      <div class="col-md-12 col-lg-12 text-center">
        <h5>Zoom to your preferred Locations</h5>
      </div>
    </div>

    <!-- Progress Bar -->
    <div v-if="loadingProgress > 0" class="progress-container">
      <div class="progress-bar" :style="{ width: loadingProgress + '%' }"></div>
    </div>

    <div id="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import L from 'leaflet';
import {attributeMappings} from "../../composables/map/attributeMapping";

const map = ref(null);
const wfsLargeLayerGroup = L.layerGroup(); // Layer for large-scale (zoomed-out) data
const wfsDetailedLayerGroup = L.layerGroup(); // Layer for detailed data
const $loading = inject('$loading');


const loadingProgress = ref(0); // Progress value
const isLoading = ref(false); // To prevent overlapping requests

// Function to increment progress
const startLoading = () => {
  if (!isLoading.value) {
    isLoading.value = true;
    loadingProgress.value = 10; // Start progress
    const interval = setInterval(() => {
      if (loadingProgress.value < 90) {
        loadingProgress.value += 10; // Increase gradually
      }
    }, 200);
    return interval;
  }
};

const stopLoading = (interval) => {
  clearInterval(interval);
  loadingProgress.value = 100; // Fill to 100% before hiding
  setTimeout(() => {
    loadingProgress.value = 0; // Hide bar
    isLoading.value = false;
  }, 500);
};
const props = defineProps({
  filters: {
    type: Array,
    default: [],
  },
});

const zoomThreshold = 10; // Define the zoom threshold

// Function to determine color based on query match percentage
const getGridColor = (feature) => {
  const properties = feature.properties;
  const totalFilters = props.filters.length;
  const matches = props.filters.filter(filter => properties[filter.attribute] === parseInt(filter.value)).length;
  const matchPercentage = (matches / totalFilters) * 100;

  if (matchPercentage < 20) return { color: '#d3d3d3', value: matchPercentage };
  if (matchPercentage >= 20 && matchPercentage < 40) return { color: '#fff5b1', value: matchPercentage };
  if (matchPercentage >= 40 && matchPercentage < 60) return { color: '#ffd966', value: matchPercentage };
  if (matchPercentage >= 60 && matchPercentage < 80) return { color: '#ff8c00', value: matchPercentage };
  if (matchPercentage >= 80) return { color: '#ff4500', value: matchPercentage };
};

// Function to fetch and display large-scale (low-detail) tourism data
const fetchTourismLarge = () => {
  let interval = startLoading();


  const bounds = map.value.getBounds();
  const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;

  const filters = props.filters
      .map(
          filter =>
              `<PropertyIsEqualTo><PropertyName>${filter.attribute}</PropertyName><Literal>${filter.value}</Literal></PropertyIsEqualTo>`
      )
      .join('');

  const orCondition = `<Or>${filters}</Or>`;

  const queryUrl = `https://geoserver.gsentry.cloud/geoserver/UNDP/wfs?` +
      `service=WFS&version=1.1.0&request=GetFeature&typeName=UNDP:TourismLarge&outputFormat=application/json&` +
      `filter=<Filter><And>${orCondition}` +
      `<BBOX><PropertyName>the_geom</PropertyName><Envelope srsName="EPSG:4326">` +
      `<lowerCorner>${bounds.getSouthWest().lng} ${bounds.getSouthWest().lat}</lowerCorner>` +
      `<upperCorner>${bounds.getNorthEast().lng} ${bounds.getNorthEast().lat}</upperCorner>` +
      `</Envelope></BBOX></And></Filter>`;

  fetch(queryUrl)
      .then(response => response.json())
      .then(data => {
        wfsLargeLayerGroup.clearLayers();

        const queryLayer = L.geoJSON(data, {
          style: feature => ({ color: getGridColor(feature).color }),
          onEachFeature: (feature, layer) => {
            let attributesHTML = `<tr><td>Weight</td><td>${getGridColor(feature)?.value.toFixed(2)} %</td></tr>`;
            attributesHTML += Object.entries(feature.properties)
                .filter(([key, value]) => value !== 0)
                .map(([key, value]) => {
                  const readableKey = attributeMappings[key] || key; // Use human-readable name if available
                  return `<tr><td><b>${readableKey}:</b></td><td>${value}</td></tr>`;
                })
                .join('');

            const popupContent = `
              <div class="info-popup">
                <h6>Tourism Feature</h6>
                <div class="popup-content" style="height: 100px; overflow-y: scroll">
                  <table>${attributesHTML}</table>
                </div>
              </div>
            `;
            layer.bindPopup(popupContent, {
              className: 'custom-popup',
              offset: L.point(0, -10),
              closeButton: true,
            });
          },
        });

        wfsLargeLayerGroup.addLayer(queryLayer);
        stopLoading(interval);

      })
      .catch(error => {
        console.error('Error querying tourism features:', error);
        stopLoading(interval);

      });
};

// Function to fetch and display detailed tourism data (zoomed-in view)
const fetchTourismDetailed = () => {
  let interval = startLoading();

  const bounds = map.value.getBounds();
  const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;

  const filters = props.filters
      .map(
          filter =>
              `<PropertyIsEqualTo><PropertyName>${filter.attribute}</PropertyName><Literal>${filter.value}</Literal></PropertyIsEqualTo>`
      )
      .join('');

  const orCondition = `<Or>${filters}</Or>`;

  const queryUrl = `https://geoserver.gsentry.cloud/geoserver/UNDP/wfs?` +
      `service=WFS&version=1.1.0&request=GetFeature&typeName=UNDP:tourism_new&outputFormat=application/json&` +
      `filter=<Filter><And>${orCondition}` +
      `<BBOX><PropertyName>the_geom</PropertyName><Envelope srsName="EPSG:4326">` +
      `<lowerCorner>${bounds.getSouthWest().lng} ${bounds.getSouthWest().lat}</lowerCorner>` +
      `<upperCorner>${bounds.getNorthEast().lng} ${bounds.getNorthEast().lat}</upperCorner>` +
      `</Envelope></BBOX></And></Filter>`;

  fetch(queryUrl)
      .then(response => response.json())
      .then(data => {
        wfsDetailedLayerGroup.clearLayers();

        const queryLayer = L.geoJSON(data, {
          style: feature => ({ color: getGridColor(feature).color }),
          onEachFeature: (feature, layer) => {
            let attributesHTML = `<tr><td>Weight</td><td>${getGridColor(feature)?.value.toFixed(2)} %</td></tr>`;
            attributesHTML += Object.entries(feature.properties)
                .filter(([key, value]) => value !== 0)
                .map(([key, value]) => {
                  const readableKey = attributeMappings[key] || key; // Use human-readable name if available
                  return `<tr><td><b>${readableKey}:</b></td><td>${value}</td></tr>`;
                })
                .join('');

            const popupContent = `
              <div class="info-popup">
                <h6>Tourism Feature</h6>
                <div class="popup-content" style="height: 100px; overflow-y: scroll">
                  <table>${attributesHTML}</table>
                </div>
              </div>
            `;
            layer.bindPopup(popupContent, {
              className: 'custom-popup',
              offset: L.point(0, -10),
              closeButton: true,
            });
          },
        });

        wfsDetailedLayerGroup.addLayer(queryLayer);
        stopLoading(interval);

      })
      .catch(error => {
        console.error('Error querying tourism features:', error);
        stopLoading(interval);

      });
};

// Initialize the map
onMounted(() => {
  map.value = L.map('map').setView([6.9271, 79.8612], 7);

  const osmBaseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 20,
    attribution: '© OpenStreetMap contributors',
  });

  const satelliteLayer = L.tileLayer('http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}', {
    subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
    attribution: '© Google Maps',
  });

  satelliteLayer.addTo(map.value);

  const baseLayers = {
    "Satellite View": satelliteLayer,
    "Normal View (OSM)": osmBaseLayer,
  };

  L.control.layers(baseLayers).addTo(map.value);

  wfsLargeLayerGroup.addTo(map.value);
  wfsDetailedLayerGroup.addTo(map.value);



  const legend = L.control({ position: 'bottomright' });

  legend.onAdd = () => {
    const div = L.DomUtil.create('div', 'info legend');
    div.innerHTML = `
      <div style="background: white; padding: 10px; border-radius: 5px; box-shadow: 0 2px 6px rgba(0,0,0,0.3);">
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

  // Handle zoom level changes
  map.value.on('moveend', () => {
    if (map.value.getZoom() < zoomThreshold) {
      // Before threshold -> Show large-scale data, remove detailed data
      fetchTourismLarge();
      wfsDetailedLayerGroup.clearLayers();
    } else {
      // After threshold -> Show detailed data, remove large-scale data
      fetchTourismDetailed();
      wfsLargeLayerGroup.clearLayers();
    }
  });
});

// Watch filters and update detailed query
watch(() => props.filters, (data) => {
  if (data) {
    if (map.value.getZoom() >= zoomThreshold) {
      fetchTourismDetailed();
    }else{
      fetchTourismLarge();
    }
  }
});
</script>

<style scoped>
#map {
  width: 100%;
  height: 90vh;
}

/* Progress Bar Styling */
.progress-container {
  width: 100%;
  height: 4px;
  background: rgba(0, 0, 0, 0.1);
  margin-top: 10px; /* Space below heading */
}

.progress-bar {
  height: 4px;
  background: #ff8c00;
  transition: width 0.3s ease-in-out;
}
</style>

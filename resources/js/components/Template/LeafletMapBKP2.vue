<template>
  <div>
    <div class="row">
      <div class="col-md-12 col-lg-12 text-center">
        <h5>Zoom to your preferred Locations</h5>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject, watch } from 'vue';
import L from 'leaflet';

const map = ref(null);
const queryLayerGroup = L.layerGroup(); // Group for displaying queried features
const $loading = inject('$loading');

const props = defineProps({
  filters: {
    type: Array,
    default: [],
  },
});

const zoomThreshold = 10; // Set the desired zoom level threshold

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

// Function to apply hard-coded tourism filters with bounding box
const applyTourismQuery = () => {
  let loader = $loading.show();

  const filters = props.filters
      .map(
          filter =>
              `<PropertyIsEqualTo><PropertyName>${filter.attribute}</PropertyName><Literal>${filter.value}</Literal></PropertyIsEqualTo>`
      )
      .join('');

  const orCondition = `<Or>${filters}</Or>`;

  const bounds = map.value.getBounds();
  const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;

  const queryUrl = `https://geoserver.gsentry.cloud/geoserver/UNDP/wfs?` +
      `service=WFS&version=1.1.0&request=GetFeature&typeName=UNDP:tourism&outputFormat=application/json&` +
      `filter=<Filter><And>${orCondition}` +
      `<BBOX><PropertyName>the_geom</PropertyName><Envelope srsName="EPSG:4326">` +
      `<lowerCorner>${bounds.getSouthWest().lng} ${bounds.getSouthWest().lat}</lowerCorner>` +
      `<upperCorner>${bounds.getNorthEast().lng} ${bounds.getNorthEast().lat}</upperCorner>` +
      `</Envelope></BBOX></And></Filter>`;

  fetch(queryUrl)
      .then(response => response.json())
      .then(data => {
        queryLayerGroup.clearLayers();

        const queryLayer = L.geoJSON(data, {
          style: feature => ({ color: getGridColor(feature).color }),
          onEachFeature: (feature, layer) => {
            let attributesHTML = `<tr><td>Weight</td><td>${getGridColor(feature).value} %</td></tr>`;
            attributesHTML += Object.entries(feature.properties)
                .map(([key, value]) => `<tr><td><b>${key}:</b></td><td>${value}</td></tr>`)
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

        queryLayerGroup.addLayer(queryLayer);
        loader.hide();
      })
      .catch(error => {
        console.error('Error querying tourism features:', error);
        loader.hide();
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

  queryLayerGroup.addTo(map.value);

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

  map.value.on('moveend', () => {
    if (map.value.getZoom() >= zoomThreshold) {
      applyTourismQuery();
    } else {
      queryLayerGroup.clearLayers();
    }
  });
});

watch(() => props.filters, (data) => {
  if (data) {
    applyTourismQuery();
  }
});
</script>

<style scoped>
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

.custom-popup .leaflet-popup-content-wrapper {
  padding: 10px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.3);
  max-width: 250px;
}

.custom-popup .leaflet-popup-content {
  margin: 0;
  font-size: 12px;
  line-height: 1.4;
}

.custom-popup .leaflet-popup-tip {
  background: white;
}

.info-popup h6 {
  margin: 0 0 5px;
  font-weight: bold;
  font-size: 14px;
}

.popup-content {
  height: 100px !important;
  overflow-y: scroll !important;
  white-space: nowrap;
}

.popup-content table {
  width: 100%;
  border-collapse: collapse;
}

.popup-content td {
  padding: 2px 5px;
  vertical-align: top;
  word-wrap: break-word;
}

.popup-content td:first-child {
  font-weight: bold;
  width: 40%;
}

.popup-content td:last-child {
  width: 60%;
}
</style>

<template>
  <div>
    <div id="map"></div>
    <button @click="showQueryModal" class="btn btn-primary">Open Query</button>
    <div id="loading" v-show="loading">
      <div class="loader"></div>
      <p>Loading...</p>
    </div>

    <!-- Query Modal -->
    <div class="modal fade" id="queryModal" tabindex="-1" aria-labelledby="queryModalLabel" aria-hidden="true">
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
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted ,defineProps} from 'vue';
import L from 'leaflet';

const map = ref(null);
const geoServerLayer = ref(null);  // Reference for GeoServer layer
const queryLayerGroup = L.layerGroup(); // Initialize query layer group

// Default values for selectedAttribute and attributeValue
const selectedAttribute = ref('Grid_id');  // Set default value for selected attribute
const attributeValue = ref('1');  // Set default value for attribute value

const selectedAttributeIn = 'Grid_id';  // Set default value for selected attribute
const attributeValueIn = '1';  // Set default value for attribute value

const attributes = ref([]);
const loading = ref(false);

const props = defineProps({
  selectedAttributeIn: {
    type: String,
    default: 'Grid_id', // default value for selectedAttributeIn
  },
  attributeValueIn: {
    type: String,
    default: '1', // default value for attributeValueIn
  },
});

// Initialize map when component is mounted
onMounted(() => {
  map.value = L.map('map').setView([6.9271, 79.8612], 7); // Sri Lanka center coordinates

  // Base layers
  const osmBaseLayer = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
  });

  const satelliteBaseLayer = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '© OpenStreetMap contributors',
  });

  // Add OpenStreetMap base layer to map
  osmBaseLayer.addTo(map.value);

  // Add queryLayerGroup to map
  queryLayerGroup.addTo(map.value);

  // Layer control
  const baseLayers = {
    "OpenStreetMap": osmBaseLayer,
    "Satellite": satelliteBaseLayer
  };

  const overlays = {
    "Query Layer": queryLayerGroup, // Add to overlays
  };

  L.control.layers(baseLayers, overlays).addTo(map.value);

  // Fetch attributes for query
  fetchAttributes();
  console.log('props.selectedAttributeIn,props.attributeValueIn',props.selectedAttributeIn,props.attributeValueIn)
  applyQueryIn(props.selectedAttributeIn,props.attributeValueIn);
  // Set up the zoom event listener to check for zoom changes
 // map.value.on('zoomend', onZoomEnd);
});

// Fetch available attributes from the GeoServer
const fetchAttributes = () => {
  const attributesUrl = 'http://43.224.124.70:8090/geoserver/cite/wfs?service=WFS&version=1.1.0&request=DescribeFeatureType&typeName=cite:GRID';

  fetch(attributesUrl)
    .then(response => response.text())
    .then(data => {
      const parser = new DOMParser();
      const xml = parser.parseFromString(data, 'text/xml');
      const elements = xml.getElementsByTagName('xsd:element');
      const attributeArray = [];

      for (let i = 0; i < elements.length; i++) {
        const attributeName = elements[i].getAttribute('name');
        if (attributeName !== 'the_geom') {
          attributeArray.push(attributeName);
        }
      }
      attributes.value = attributeArray;
    })
    .catch(error => console.error('Error fetching attributes:', error));
};

// Show query modal
const showQueryModal = () => {
  const queryModal = new bootstrap.Modal(document.getElementById('queryModal'));
  queryModal.show();
};

const applyQueryIn = (selectedAttributeIn,attributeValueIn) => {
  loading.value = true;

  // Add GeoServer layer conditionally if attribute is selected
  // if (selectedAttribute.value && attributeValue.value) {
  //   addGeoServerLayer();
  // }

  const queryUrl = `http://43.224.124.70:8090/geoserver/cite/wfs?` +
    `service=WFS&version=1.1.0&request=GetFeature&typeName=cite:GRID&outputFormat=application/json&` +
    `filter=<Filter><PropertyIsEqualTo><PropertyName>${selectedAttributeIn}</PropertyName><Literal>${attributeValueIn}</Literal></PropertyIsEqualTo></Filter>`;

  fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
      // Clear existing layers from queryLayerGroup
      queryLayerGroup.clearLayers();

      // Create a new GeoJSON layer
      const queryLayer = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(`<b>Attributes:</b><br>${JSON.stringify(feature.properties)}`);
        },
      });

      // Add the new layer to the queryLayerGroup
      queryLayerGroup.addLayer(queryLayer);

      // Adjust map view to fit the new layer's bounds
      map.value.fitBounds(queryLayer.getBounds());

      // Hide loading indicator
      loading.value = false;

      // Close the query modal
      const queryModal = bootstrap.Modal.getInstance(document.getElementById('queryModal'));
      queryModal.hide();
    })
    .catch(error => {
      console.error('Error querying features:', error);
      loading.value = false;
    });
};

// Apply query to the GeoServer
const applyQuery = () => {
  loading.value = true;

  // Add GeoServer layer conditionally if attribute is selected
  // if (selectedAttribute.value && attributeValue.value) {
  //   addGeoServerLayer();
  // }

  const queryUrl = `http://43.224.124.70:8090/geoserver/cite/wfs?` +
    `service=WFS&version=1.1.0&request=GetFeature&typeName=cite:GRID&outputFormat=application/json&` +
    `filter=<Filter><PropertyIsEqualTo><PropertyName>${selectedAttribute.value}</PropertyName><Literal>${attributeValue.value}</Literal></PropertyIsEqualTo></Filter>`;

  fetch(queryUrl)
    .then(response => response.json())
    .then(data => {
      // Clear existing layers from queryLayerGroup
      queryLayerGroup.clearLayers();

      // Create a new GeoJSON layer
      const queryLayer = L.geoJSON(data, {
        onEachFeature: function (feature, layer) {
          layer.bindPopup(`<b>Attributes:</b><br>${JSON.stringify(feature.properties)}`);
        },
      });

      // Add the new layer to the queryLayerGroup
      queryLayerGroup.addLayer(queryLayer);

      // Adjust map view to fit the new layer's bounds
      map.value.fitBounds(queryLayer.getBounds());

      // Hide loading indicator
      loading.value = false;

      // Close the query modal
      const queryModal = bootstrap.Modal.getInstance(document.getElementById('queryModal'));
      queryModal.hide();
    })
    .catch(error => {
      console.error('Error querying features:', error);
      loading.value = false;
    });
};

// Function to add GeoServer Layer
const addGeoServerLayer = () => {
  if (!geoServerLayer.value) {
    geoServerLayer.value = L.tileLayer.wms('http://43.224.124.70:8090/geoserver/cite/wms?', {
      layers: 'cite:GRID',
      format: 'image/png',
      transparent: true,
      attribution: 'Map data from GeoServer',
    }).addTo(map.value);
  }
};

// Function to handle zoom end event
const onZoomEnd = () => {
  const zoomLevel = map.value.getZoom();

  // If zoom level is less than a specific threshold (e.g., zoom level 10), add the GeoServer layer
  if (zoomLevel <= 10 && !geoServerLayer.value) {
    addGeoServerLayer();
  } else if (zoomLevel > 10 && geoServerLayer.value) {
    geoServerLayer.value.remove();
    geoServerLayer.value = null; // Remove the layer and reset the reference
  }
};

</script>

<style scoped>
#map {
  width: 100%;
  height: 90vh;
}

#loading {
  display: none;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1100;
  text-align: center;
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
</style>

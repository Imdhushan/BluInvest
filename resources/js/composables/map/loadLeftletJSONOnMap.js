import L from "leaflet";

export default function loadLeafletJSONOnMap(geoJSON, map, options = {}) {
  if (!geoJSON) {
    console.error("Invalid GeoJSON data:", geoJSON);
    return;
  }

  const layer = L.geoJSON(geoJSON, {
    style: () => ({
      color: options.color || "blue",
      fillColor: options.fillColor || "lightblue",
      weight: 1,
    }),
    onEachFeature: options.onEachFeature || ((feature, layer) => {}),
  }).addTo(map);

  return layer;
}

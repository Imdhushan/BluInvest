<template>
    <div>
        <card class="card mb-3">
            <card-body class="p-2">
                <ul class="nav nav-tabs">
                    <li class="nav-item me-1"><a href="#ele-point" class="nav-link active" data-bs-toggle="tab">Point</a></li>
                    <li class="nav-item me-1"><a href="#ele-line" class="nav-link" data-bs-toggle="tab">Line</a></li>
                </ul>
                <div class="tab-content pt-3">
                    <div class="tab-pane fade show active" id="ele-point">
                        <div class="row gx-2">
                            <div class="col-6">
                                <button type="button"  @click="startDrawPoint" class="btn btn-outline-theme btn-sm">Draw</button>
                            </div>
                            <div class="col-6">
                                <button type="button" @click="clearElevationAnalysis" class="btn btn-outline-warning btn-sm">Clear</button>
                            </div>
                        </div>
                        <table class="mt-2">
                            <tbody>
                            <tr>
                                <td>Location</td>
                                <td>{{pointElevationData.lat?pointElevationData.lat.toFixed(2)+' , '+pointElevationData.lng.toFixed(2):''}}</td>
                            </tr>
                            <tr>
                                <td>Elevation</td>
                                <td>{{pointElevationData.elevation}}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>{{pointElevationData.address}}</td>
                            </tr>
                            </tbody>
                        </table>
                    </div>
                    <div class="tab-pane fade" id="ele-line">
                        <div class="row gx-2">
                            <div class="col-6">
                                <button type="button"  @click="startDrawLine" class="btn btn-outline-theme btn-sm">Draw line</button>
                            </div>
                            <div class="col-6">
                                <button type="button" @click="clearElevationAnalysis" class="btn btn-outline-warning btn-sm">Clear</button>
                            </div>
                        </div>
                        <div class="mt-3" v-if="elevationData && elevationData.length>0">
                            <GChart class="custom_gChart"
                                    type="ColumnChart"
                                    ref="gChart" :data="elevationData" :options="chartOptions" :events="chartEvents"/>
                        </div>
                    </div>
                </div>
            </card-body>
        </card>
    </div>
</template>

<script setup>
import {useStore} from "vuex";
import {ref} from "vue";
import {GChart, loadGoogleCharts } from "vue-google-charts";
loadGoogleCharts('current', { packages: ['corechart'] })
const store = useStore()

const tab_large_elevation = ref(false);
const isLineElevation = ref(false);
const isPointElevation = ref(false);
const isdrawStarted = ref(false);
const drawingManager = ref(null);
const selectedMarker = ref(null);
const pointElevationData = ref({});
const polyLine = ref(null);
const chartMarker = ref(null);
const elevationData = ref([]);
const locationData = ref([]);


const chartOptions = ref({
    legend: { position: 'top', alignment: 'start' },
    legendTextStyle: { color: '#3cd2a5' },
    hAxis: {
        //use style for horizontal axis
        textStyle: { color: '#3cd2a5' }
    },
    is3D: true,
    backgroundColor: {
        fill:'#42535B',
        color:'#fff',
    },
    animation: {
        startup : true,
        duration: 1000,
        easing: 'out'
    }
})
//-------------------run elevation profile point---------------------------------------
const startDrawPoint = ()=>{

    let map = store.state.gmap;
    let that = this;
    isLineElevation.value = false;
    isPointElevation.value = true;
    isdrawStarted.value = true;
    drawingManager.value = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: false,
        markerOptions: {
            draggable: false,
            optimized: false,
            icon:{
                url: 'https://www.geobizz.tech/storage/img/icons/administrativeboundary.png',
                size: new google.maps.Size(25, 25),
                anchor: new google.maps.Point(9, 14),
                origin: new google.maps.Point(0, 0),
                scaledSize: new google.maps.Size(20, 20),
                labelOrigin: {x: 0, y: -10}
            }
        },
    });
    drawingManager.value.setMap(map);
    drawingManager.value.setDrawingMode(google.maps.drawing.OverlayType.MARKER);
    const elevator = new google.maps.ElevationService();
    google.maps.event.addListener(drawingManager.value, 'overlaycomplete', function (e) {
        console.log("elevation points",e, elevator);
        // Switch back to non-drawing mode after drawing a shape.
        drawingManager.value.setDrawingMode(null);
        selectedMarker.value = e.overlay;
        let lat = e.overlay.position.lat();
        let lng = e.overlay.position.lng();
        pointElevationData.value.lat = lat;
        pointElevationData.value.lng = lng;
        pointElevationData.value.address = "";

        console.log("elevation",e.overlay.position);

        //---------------------run elevator--------------------------------
        elevator.getElevationForLocations(
            {
                locations: [e.overlay.position],

            },
            (results, status) => {
                console.log("status",status,results);
                if (status === "OK" && results) {
                    // Retrieve the first result
                    if (results[0]) {
                        e.overlay.setLabel({
                            text:results[0].elevation.toFixed(3) + "m",
                            fontSize: "12px",
                            fontWeight: "bold",
                            color:'black',
                        });
                        pointElevationData.value.elevation =  results[0].elevation.toFixed(3) + " meters.";
                    } else {
                        pointElevationData.value.elevation =  "No results found";
                    }
                } else {
                    pointElevationData.value.elevation =  "Elevation service failed due to: " + status;
                }
            }
        );

        //-----------run reverse geocode---------------------------------------------------------------------
        let geocoder = new google.maps.Geocoder;

        geocoder.geocode({'location': {lat: lat, lng: lng}}, function (results, status) {
            if (status === 'OK') {
                if (results[0]) {
                    pointElevationData.value.address = results[0].formatted_address;
                }
            }
        });
    });
    // store.commit('addToMapContextMenu', {title: 'Elevation Profile', id: 'elevation_profile', action: {type: 'navigation', drawer: 'right', drawerID: 'mapToolBar', tabID: 'elevation_profile', tabNo: 0}});
}

//---------------------clear elevation analysis-----------------------------------------
const clearElevationAnalysis = ()=>{
    locationData.value = [];
    elevationData.value = [];
    isdrawStarted.value = false;
    isLineElevation.value = false;
    isPointElevation.value = false;
    drawingManager.value.setDrawingMode(null);
    pointElevationData.value = {lat:'', lng:'', address:'', elevation:''};
    if (polyLine.value)
        polyLine.value.setMap(null);
    if (selectedMarker.value)
        selectedMarker.value.setMap(null);
    if (chartMarker.value){
        chartMarker.value.setMap(null);
    }
    store.commit('removeFromMapContextMenu', {id:'elevation_profile'});
}
const gChart = ref(null);
const chartEvents = ref({
    select: () => {

        const chart = gChart.value.chartObject;
        const selection = chart.getSelection();
        console.log("selection",chart)
        setElavationMarkerOnChartClick(locationData.value[selection[0].row])
    }});

//---------------------run elevation analysis-----------------------------------------
const startDrawLine = ()=>{
    isdrawStarted.value = true;
    isLineElevation.value = true;
    isPointElevation.value = false;
    let map = store.state.gmap;


    drawingManager.value = new google.maps.drawing.DrawingManager({
        drawingMode: null,
        drawingControl: false,
        polylineOptions: {
            editable: false,
            draggable: false,
            strokeWeight: 2,
        },
    });
    drawingManager.value.setMap(map);
    drawingManager.value.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);

    if (polyLine.value)
        polyLine.value.setMap(null);

    google.maps.event.addListener(drawingManager.value, 'polylinecomplete', function(polyline) {
        polyLine.value = polyline;
        drawingManager.value.setDrawingMode(null);
        let polylinePath = polyline.getPath();
        let path  = polylinePath.getArray();// console.log("polyline : "+polylinePath.getArray());

        console.log("polyline : "+polylinePath.getArray());
        const elevator = new google.maps.ElevationService();
        elevator.getElevationAlongPath(
            {
                path: path,
                samples: 256,
            },
            plotElevation
        );


        function plotElevation(elevations, status) {
            const chartDiv = document.getElementById("elevation_chart");



            if (status !== "OK") {
                // Show the error code inside the chartDiv.
                console.log("Cannot show elevation: request failed because " + status);
                return;
            }
            // Create a new chart in the elevation_chart DIV.
            // const chart = new google.visualization.ColumnChart(chartDiv);
            // Extract the data from which to populate the chart.
            // Because the samples are equidistant, the 'Sample'
            // column here does double duty as distance along the
            // X axis.
            // const data = new google.visualization.DataTable();
            // data.addColumn("string", "Sample");
            // data.addColumn("number", "Elevation");
            elevationData.value = [ ['Sample', 'Elevation'],];
            // that.locationData = [ ['', ''],];
            for (let i = 0; i < elevations.length; i++) {
                // data.addRow(["", elevations[i].elevation]);
                locationData.value.push(elevations[i]);
                elevationData.value.push(["", elevations[i].elevation])
            }
        }

    });
}
const setElavationMarkerOnChartClick = (dataset)=>{
    var location = new google.maps.LatLng(dataset.location.lat(),dataset.location.lng());
    let map = store.state.gmap;
    if (chartMarker.value){
        chartMarker.value.setMap(null);
    }
    chartMarker.value = new google.maps.marker.AdvancedMarkerElement({
        position: location,
        icon:{
            url: 'https://www.geobizz.tech/storage/img/icons/administrativeboundary.png',
            size: new google.maps.Size(25, 25),
            anchor: new google.maps.Point(9, 14),
            origin: new google.maps.Point(0, 0),
            scaledSize: new google.maps.Size(20, 20),
            labelOrigin: {x: 0, y: -10}
        },
        label:{
            text:dataset.elevation.toFixed(3) + "m",
            fontSize: "12px",
            fontWeight: "bold",
            color:'black',
        }
    });
    chartMarker.value.setMap(map);
}
</script>
<style scoped>
td {
    font-size: xx-small;
}
button{
    font-size: xx-small;
}
a{
    font-size: xx-small;
}
</style>
<!--<style lang="scss">-->
<!--    @import "../../../../sass/toolbar/toolbar";-->
<!--</style>-->

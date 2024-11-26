<template>
    <div>
        <!--------------------------**************************************-------------------------------------------------------->
        <!-------------------START------------------------DISPLAY MEASUREMENTS TOOL PANEL----------------------------------------->
        <card class="card mb-3">
            <card-body class="p-2">
                <div class="row gx-2">
                    <div class="col-6">
                        <button type="button"  @click="startDrawing" class="btn btn-outline-theme btn-sm">Draw line</button>
                    </div>
                    <div class="col-6">
                        <button type="button" @click="clearDrawing" class="btn btn-outline-warning btn-sm">Clear</button>
                    </div>
                </div>
                <table class="mt-4" width="100%">
                    <tbody>
                    <tr>
                        <td>Length (m)</td>
                        <td>{{Linelength.meter}}</td>
                    </tr>
                    <tr>
                        <td>Length (Km)</td>
                        <td>{{Linelength.kilometer}}</td>
                    </tr>
                    <tr>
                        <td>Length (yard)</td>
                        <td>{{Linelength.yard}}</td>
                    </tr>
                    <tr>
                        <td>Length (feet)</td>
                        <td>{{Linelength.foots}}</td>
                    </tr>
                    <tr>
                        <td>Bearing</td>
                        <td>{{LineBearing}}</td>
                    </tr>
                    </tbody>
                </table>
            </card-body>
        </card>
        <!--------------------------**************************************-------------------------------------------------------->
        <!-------------------END------------------------DISPLAY MEASUREMENTS TOOL PANEL------------------------------------------->
    </div>
</template>

<script setup>
import {computed, onMounted, ref, watch} from "vue";
import {useStore} from "vuex";
import $ from 'jquery';

const drawingManager = ref(null);
const store = useStore()
const LineBearing = ref("");
const Linelength = ref({});
const attrList = ref(null);
const layerList = ref([]);
const selectedLayer = ref(null);
const initDrawingManager  = ()=> {

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

    google.maps.event.addListener(drawingManager.value, 'overlaycomplete', function (e) {
        //Switch back to non-drawing mode after drawing a shape.
        drawingManager.value.setDrawingMode(null);
        //Add an event listener that selects the newly-drawn shape when the user
        e.overlay.id = Math.floor(Math.random() * 9999) + 1;
        e.overlay.properties = [];
        console.log("polyline ",e);


        //------------------calculating distance-----------------------------------------------
        let distance = google.maps.geometry.spherical.computeLength(e.overlay.getPath().getArray());
        let kmdistance = distance/1000;
        let ydistance = distance*1.09361;
        let footdistance = distance*3.28084;
        let inchdistance = distance*39.3701;

        //------------------calculating bearing-----------------------------------------------
        let pointA = e.overlay.getPath().getAt(0);
        let pointB = e.overlay.getPath().getAt(e.overlay.getPath().getLength() - 1);
        let heading = google.maps.geometry.spherical.computeHeading(pointA, pointB);
        console.log("heading",heading);
        if (heading < 0) {
            heading = 360 + heading;
        }

        Linelength.value.meter = distance.toFixed(2)+" m";
        Linelength.value.kilometer = kmdistance.toFixed(2)+" km";
        Linelength.value.yard = ydistance.toFixed(2);
        Linelength.value.foots = footdistance.toFixed(2);
        Linelength.value.inch = inchdistance.toFixed(2);
        LineBearing.value = heading.toFixed(2)+'°';

        attrList.value = [{parentID:e.overlay.id,attribute:'length',value:kmdistance.toFixed(2)+' Km'},{parentID:e.overlay.id,attribute:'bearing',value:heading.toFixed(2)+'°'}];
        e.overlay.properties = attrList.value;
        layerList.value.push(e.overlay);
        selectedLayer.value = e.overlay;
    });

}

const startDraw = ref(false);
const startDrawing = ()=>{
    drawingManager.value.setDrawingMode(google.maps.drawing.OverlayType.POLYLINE);
    startDraw.value = true;
}

const clearDrawing = ()=>{
    startDraw.value = false;
    $.each(layerList.value,function (key,val) {
        val.setMap(null);
    });
    Linelength.value = {meter:'', kilometer:'', yard:'', foots:'', inch:'',};
    LineBearing.value = '';
}
const gMap = computed(() => {
    return store.getters.gmap
})

watch(gMap,function (newEvent,oldEvent) {
    if (newEvent){
        initDrawingManager()
    }
});

</script>
<style scoped>
    td {
        font-size: xx-small;
    }
    button{
        font-size: xx-small;
    }
</style>
<!--<style lang="scss">-->
<!--    @import "../../../../sass/toolbar/toolbar";-->
<!--</style>-->

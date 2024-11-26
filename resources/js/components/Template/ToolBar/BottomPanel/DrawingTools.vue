<template>
    <card class="mb-3">
        <card-body>
            <div class="d-flex fw-bold small mb-3">
                <span class="flex-grow-1">Map Drawing Manager</span>
                <card-expand-toggler />
            </div>
            <ul class="nav nav-tabs">
                <li class="nav-item me-1">
                    <a href="#Point" class="nav-link active" data-bs-toggle="tab">Point</a>
                </li>
                <li class="nav-item me-1">
                    <a href="#Line" class="nav-link " data-bs-toggle="tab">Line</a>
                </li>
                <li class="nav-item me-1">
                    <a href="#Polygon" class="nav-link " data-bs-toggle="tab">Polygon</a>
                </li>
                <li class="nav-item me-1">
                    <a href="#Circle" class="nav-link " data-bs-toggle="tab">Circle</a>
                </li>
                <li class="nav-item me-1">
                    <a href="#Rectangle" class="nav-link " data-bs-toggle="tab">Rectangle</a>
                </li>
            </ul>
            <div class="tab-content pt-3">
                <div class="tab-pane fade show active" id="Point">
                    <Point/>
                </div>
                <div class="tab-pane fade" id="Line">
                    <Polyline/>
                </div>
                <div class="tab-pane fade" id="Polygon">
                    <Polygon/>
                </div>
                <div class="tab-pane fade" id="Circle">
                    <Circle/>
                </div>
                <div class="tab-pane fade" id="Rectangle">
                    <Rectangle/>
                </div>
            </div>
        </card-body>
    </card>
</template>


<script setup >

import Point from "./DrawingTools/point.vue";
import Polyline from "./DrawingTools/polyline.vue";
import Polygon from "./DrawingTools/polygon.vue";
import Circle from "./DrawingTools/circle.vue";
import Rectangle from "./DrawingTools/rectangle.vue";
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

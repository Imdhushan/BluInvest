<template>
    <div>
        <!--------------------------**************************************-------------------------------------------------------->
        <!-------------------START------------------------DISPLAY RECTANGLE TOOL PANEL-------------------------------------------->
            <ShapeFileWindow
                v-bind:SpatialType="'rectangle'"
            />
        <!--------------------------**************************************-------------------------------------------------------->
        <!-------------------END------------------------DISPLAY RECTANGLE TOOL PANEL---------------------------------------------->
    </div>
</template>

<script setup>


import ShapeFileWindow from "../../../../Reusables/shapeFileWindow.vue";
</script>

<!--<style lang="scss">-->
<!--    @import "../../../../sass/toolbar/toolbar";-->
<!--</style>-->

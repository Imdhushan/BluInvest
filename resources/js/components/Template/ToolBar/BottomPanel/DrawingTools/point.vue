<template>
    <div id="toolbar_component">
        <!--------------------------**************************************-------------------------------------------------------->
        <!-------------------START------------------------DISPLAY LINE TOOL PANEL------------------------------------------------->
           <ShapeFileWindow
            v-bind:SpatialType="'Point'"
           />
        <!--------------------------**************************************-------------------------------------------------------->
        <!-------------------END------------------------DISPLAY LINE TOOL PANEL--------------------------------------------------->
    </div>
</template>
<script setup>

import ShapeFileWindow from "../../../../Reusables/shapeFileWindow.vue";
</script>

<!--<style lang="scss">-->
<!--    @import "../../../../sass/toolbar/toolbar";-->
<!--</style>-->

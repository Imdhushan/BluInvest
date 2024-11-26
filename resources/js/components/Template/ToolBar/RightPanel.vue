<template>
    <div class="app-theme-panel" v-bind:class="{ 'active': appOption.appThemePanelToggled }">
        <div class="app-theme-panel-container">
            <a href="#" v-on:click="appThemePanelToggled" class="app-theme-toggle-btn"><i class="bi bi-sliders"></i></a>
            <div class="app-theme-panel-content">
                <perfect-scrollbar class="h-450px">
                    <div class="small fw-bold text-inverse mb-1">Measurement</div>
                        <Measurements/>
                    <div class="small fw-bold text-inverse mb-1">Elevation</div>
                        <elevation/>
                    <div class="small fw-bold text-inverse mb-1">Base Map</div>
                    <basemaps/>
                </perfect-scrollbar>
            </div>
        </div>
    </div>
</template>


<script setup>
import { useAppOptionStore } from '../../stores/app-option';
import { useAppVariableStore, generateVariables } from '../../stores/app-variable';
import { onMounted } from 'vue';
import { Tooltip } from 'bootstrap';
import useEmitter from '../../composables/useEmitter';
import Measurements from "./RightPanel/measurements.vue";
import Elevation from "./RightPanel/elevation.vue";
import Basemaps from "./RightPanel/basemaps.vue";

const appOption = useAppOptionStore();
const appVariable = useAppVariableStore();
const emitter = useEmitter();

const appThemePanelToggled = () => {
    appOption.appThemePanelToggled = !appOption.appThemePanelToggled;
}

</script>
<!--<template>-->
<!--	<div class="app-theme-panel" v-bind:class="{ 'active': appOption.appThemePanelToggled }">-->
<!--			<div class="app-theme-panel-container">-->
<!--				<a href="#" v-on:click="appThemePanelToggled" class="app-theme-toggle-btn"><i class="bi bi-sliders"></i></a>-->
<!--				<div class="app-theme-panel-content">-->
<!--					<div class="small fw-bold text-inverse mb-1">Display Mode</div>-->
<!--					<card class="card mb-3">-->
<!--						<card-body class="p-2">-->
<!--							<div class="row gx-2">-->
<!--								<div class="col-6" v-for="mode in modeList">-->
<!--									<a href="javascript:;"-->
<!--										v-bind:class="{ 'active': appOption.appMode == mode.value}"-->
<!--										v-on:click="(event) => toggleMode(event, mode.value)"-->
<!--										class="app-theme-mode-link">-->
<!--										<div class="img"><img v-bind:src="mode.img" class="object-fit-cover" height="76" width="76" v-bind:alt="mode.name"></div>-->
<!--										<div class="text">{{mode.name}}</div>-->
<!--									</a>-->
<!--								</div>-->
<!--							</div>-->
<!--						</card-body>-->
<!--					</card>-->
<!--					<div class="small fw-bold text-inverse mb-1">Theme Color</div>-->
<!--					<card class="mb-3">-->
<!--						<card-body class="p-2">-->
<!--							<div class="app-theme-list">-->
<!--								<div class="app-theme-list-item"-->
<!--									v-bind:class="{ 'active': appOption.appThemeClass == theme.themeClass || (!appOption.appThemeClass && theme.name == 'Default') }"-->
<!--									v-for="theme in themeList">-->
<!--									<a href="javascript:;" class="app-theme-list-link"-->
<!--										v-bind:class="theme.bgClass"-->
<!--										v-on:click="(event) => toggleTheme(event, theme.themeClass)"-->
<!--										data-bs-toggle="tooltip"-->
<!--										data-bs-trigger="hover"-->
<!--										data-bs-container="body"-->
<!--										v-bind:data-bs-title="theme.name">&nbsp;</a>-->
<!--								</div>-->
<!--							</div>-->
<!--						</card-body>-->
<!--					</card>-->

<!--					<div class="small fw-bold text-inverse mb-1">Theme Cover</div>-->
<!--					<card>-->
<!--						<card-body class="p-2">-->
<!--							<div class="app-theme-cover">-->
<!--								<div class="app-theme-cover-item"-->
<!--									v-bind:class="{ 'active': appOption.appCoverClass == cover.coverClass || (!appOption.appCoverClass && cover.name == 'Default') }"-->
<!--									v-for="cover in coverList">-->
<!--									<a href="javascript:;" class="app-theme-cover-link"-->
<!--										v-bind:style="{ backgroundImage: 'url('+ cover.coverThumbImage + ')' }"-->
<!--										v-on:click="(event) => toggleCover(event, cover.coverClass)"-->
<!--										data-bs-toggle="tooltip"-->
<!--										data-bs-trigger="hover"-->
<!--										data-bs-container="body"-->
<!--										v-bind:data-bs-title="cover.name">&nbsp;</a>-->
<!--								</div>-->
<!--							</div>-->
<!--						</card-body>-->
<!--					</card>-->
<!--				</div>-->
<!--			</div>-->
<!--		</div>-->
<!--</template>-->

<template>
  <main class="main" id="top" v-if="!isLoginPage">
    <!-- <div class="container-fluid" data-layout="container-fluid"> -->
      <div>
        <TopbarNav/>
        <router-view></router-view>

        <!-- <SidebarNav menu="" >

          <router-view></router-view>

        </SidebarNav> -->

      </div>

    <!-- </div> -->
  </main>
  <main v-else class="main" id="top">
      <router-view></router-view>
  </main>
</template>
<script setup lang="ts">
import {RouterView} from "vue-router";
import SidebarNav from "./app/SidebarNav.vue";
import Footer from "./app/Footer.vue";
import {computed, ref} from 'vue';
import { useRoute } from 'vue-router';
import TopbarNav from "./app/TopbarNav.vue";

// alert("loaded");

const route = useRoute();
const isLoginPage = computed(() => route.path === '/login');
const menuData = ref([
  {
    icon: 'fa fa-home',
    text: 'Home',
    url: '/',
    highlight: false,
    children: []
  },
  {
    icon: 'fa fa-cog',
    text: 'Settings',
    url: '/settings',
    highlight: true,
    children: [
      {
        icon: 'fa fa-user',
        text: 'Profile',
        url: '/settings/profile',
        highlight: false,
        children: []
      },
      {
        icon: 'fa fa-lock',
        text: 'Security',
        url: '/settings/security',
        highlight: false,
        children: []
      }
    ]
  }
]);


</script>
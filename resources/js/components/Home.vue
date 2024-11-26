<template>
  <div class="col-xxl-9 m-2">
    <div class="row g-3 mb-3">
      <div>
        <div class="d-flex justify-content-between align-items-center mb-3">
          <!-- Logo Section -->
          <div class="d-flex align-items-center">
            <img class="me-2" src="/assets/img/slpa_logo.png" alt="" width="60" />
            <h1 class="custom-font mb-0" style="font-weight: bolder;color:#02adef ">HR<span style="color: #f2b00f">IS</span> SLPAa</h1>
          </div>
          <!-- User Profile Section -->
          <div class="d-flex align-items-center">
            <a class="nav-link pe-0 ps-2 d-flex align-items-center" id="navbarDropdownUser" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
              <p class="fs--1 mb-0 me-2">
                Welcome Back<br />
                <strong>K J Lokugama</strong>
              </p>
              <div class="avatar avatar-2xl me-2">
                <img class="rounded-circle" src="http://hris.slpa.lk/EHRM_SLPA/EmpImages/495648.JPG" alt="" />
              </div>
            </a>
            <div class="dropdown-menu dropdown-caret dropdown-menu-end py-0" aria-labelledby="navbarDropdownUser">
              <div class="bg-white dark__bg-1000 rounded-2 py-2">
<!--                <a class="dropdown-item fw-bold text-warning" href="#!">-->
<!--                  <span class="fas fa-crown me-1"></span><span>Go Pro</span>-->
<!--                </a>-->
<!--                <div class="dropdown-divider"></div>-->
                <a class="dropdown-item" href="#!">Set status</a>
                <a class="dropdown-item" href="../pages/user/profile.html">Profile & account</a>
                <a class="dropdown-item" href="#!">Feedback</a>
                <div class="dropdown-divider"></div>
                <a class="dropdown-item" href="../pages/user/settings.html">Settings</a>
                <a class="dropdown-item" href="../pages/authentication/card/logout.html">Logout</a>
              </div>
            </div>
          </div>
        </div>

        
      </div>
  </div>
  </div>
</template>

<script setup>

import moment from "moment";
import {onMounted, onUnmounted, ref} from "vue";

const currentTime = ref(moment().format('YYYY-MM-DD HH:mm:ss'));

const updateTime = () => {
  currentTime.value = moment().format('YYYY-MM-DD hh:mm:ss A');
};

let timer;
onMounted(() => {
  timer = setInterval(updateTime, 1000);
});

onUnmounted(() => {
  clearInterval(timer);
});
</script>

<style scoped>

</style>
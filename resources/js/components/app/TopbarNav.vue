<script setup lang="ts">
import { useRouter } from 'vue-router';
import { getCurrentInstance, onMounted } from 'vue';

defineProps<{
  menu: {
    icon: String,
    text: String,
    url: String,
    highlight: Boolean,
    children: Object
  };
}>();

function subIsActive(urls: Array<{ url: String }>) {
  const currentRoute = useRouter().currentRoute.value.path;
  return urls.some(urlObj => urlObj.url === currentRoute);
}

const { proxy } = getCurrentInstance();
const signOut = async () => {
  localStorage.removeItem('user');
  window.location.reload();
};

const user = JSON.parse(localStorage.getItem('user') || '{}');

onMounted(() => {
  // Additional logic if needed on mount
});
</script>

<template>
  
  <nav class="navbar navbar-standard navbar-expand-lg fixed-top navbar-dark" data-navbar-darken-on-scroll="data-navbar-darken-on-scroll">
    <!-- Blue Investment -->
        <div class="container"><a class="navbar-brand" href="/"><span class="text-white dark__text-white philosopher-bold">BluInvest</span></a>
          <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarStandard" aria-controls="navbarStandard" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse scrollbar" id="navbarStandard">
            <ul class="navbar-nav" data-top-nav-dropdowns="data-top-nav-dropdowns">
              <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dashboards">About Us</a>
                <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="dashboards">
                  <div class="bg-white dark__bg-1000 rounded-3 py-2">
                    <a class="dropdown-item link-600 fw-medium" href="/tourismsector/aboutbluinvest">About BluInvest</a>
                    <a class="dropdown-item link-600 fw-medium" href="/tourismsector/howtousebluinvest">How to use BluInvest</a>
                   
                    <!-- <a class="dropdown-item link-600 fw-medium" href="#">Contact Us</a> -->
                    <!-- <a class="dropdown-item link-600 fw-medium" href="../dashboard/analytics.html">Analytics</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/crm.html">CRM</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/e-commerce.html">E commerce</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/lms.html">LMS<span class="badge rounded-pill ms-2 badge-soft-success">New</span></a><a class="dropdown-item link-600 fw-medium" href="../dashboard/project-management.html">Management</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/saas.html">SaaS</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/support-desk.html">Support desk<span class="badge rounded-pill ms-2 badge-soft-success">New</span></a> -->
                  </div>
                </div>
                
              </li>
              <!-- <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="apps">
                Invest</a>
                <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="apps">
                  
                      
                     
                          <div class="nav flex-column">
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/tourism">Tourism</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/conservation">Conservation</a>
                            <p class="nav-link text-700 mb-0 fw-bold">Energy</p>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/solar">Solar </a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/wind">Wind </a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/boat">Boat Building</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/marine">Marine Industries</a>
                         
                     
                      </div>
                    
                </div>
              </li> -->
              <li class="nav-item dropdown">
  <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="apps">
    Invest
  </a>
  <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="apps">
    <div class="nav flex-column">
      <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/tourism">Tourism</a>
      <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/conservation">Conservation</a>
      
      
      
      <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/boat">Boat Building</a>
      <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/marine">Marine Industries</a>
      <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/solar">Sustainable Energy</a>
     
      <!-- Energy Dropdown -->
      <!-- <div class="dropdown">
        <div class="nav flex-column">
                            <p class="nav-link text-700 mb-0 fw-bold" >Energy</p>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/solar">Solar Energy</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/wind">Wind Energy</a>
                          </div> -->
        <!-- <a
          class="nav-link py-1 link-600 fw-medium dropdown-toggle"
          href="/tourismsector/solar"
          role="button"
          data-bs-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
        >
          Energy
        </a>
        <div class="dropdown-menu dropdown-menu-end border-0">
          <a class="dropdown-item link-600 fw-medium" href="/tourismsector/solar">Solar Energy</a>
          <a class="dropdown-item link-600 fw-medium" href="/tourismsector/wind">Wind Energy</a>
        </div> -->
      <!-- </div> -->
    </div>
  </div>
</li>

              <!-- <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="pagess">
                Regulations </a>
                <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="pagess">
                  
                      
                          <div class="nav flex-column">
                          
                            <a class="nav-link py-1 link-600 fw-medium" href="/regulation/tourism">Tourism</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/regulation/conservation">Conservation</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/regulation/energy">Energy</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/regulation/boat">Boat Building</a>
                          </div>
                        </div>
                        
                       
                      
              </li> -->
              <li class="nav-item dropdown">
                <a class="nav-link " href="/tourismsector/services" role="button" aria-haspopup="true" aria-expanded="false" id="moduless">Services</a>
                
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link " href="/tourismsector/smehub" role="button" aria-haspopup="true" aria-expanded="false" id="moduless">SME Hub</a>
                
              </li>
              <!-- <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="documentations">Documentation</a>
                <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="documentations">
                  <div class="bg-white dark__bg-1000 rounded-3 py-2"><a class="dropdown-item link-600 fw-medium" href="../documentation/getting-started.html">Getting started</a><a class="dropdown-item link-600 fw-medium" href="../documentation/customization/configuration.html">Configuration</a><a class="dropdown-item link-600 fw-medium" href="../documentation/customization/styling.html">Styling<span class="badge rounded-pill ms-2 badge-soft-success">Updated</span></a><a class="dropdown-item link-600 fw-medium" href="../documentation/customization/dark-mode.html">Dark mode</a><a class="dropdown-item link-600 fw-medium" href="../documentation/customization/plugin.html">Plugin</a><a class="dropdown-item link-600 fw-medium" href="../documentation/faq.html">Faq</a><a class="dropdown-item link-600 fw-medium" href="../documentation/gulp.html">Gulp</a><a class="dropdown-item link-600 fw-medium" href="../documentation/design-file.html">Design file</a><a class="dropdown-item link-600 fw-medium" href="../changelog.html">Changelog</a>
                  </div>
                </div>
              </li> -->
            </ul>
            <ul class="navbar-nav ms-auto">
              <!-- <li class="nav-item d-flex align-items-center me-2">
                <div class="nav-link theme-switch-toggle fa-icon-wait p-0">
                  <input class="form-check-input ms-0 theme-switch-toggle-input" id="themeControlToggle" type="checkbox" data-theme-control="theme" value="dark">
                  <label class="mb-0 theme-switch-toggle-label theme-switch-toggle-light" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch to light theme"><span class="fas fa-sun"></span></label>
                  <label class="mb-0 py-2 theme-switch-toggle-light d-lg-none" for="themeControlToggle"><span>Switch to light theme</span></label>
                  <label class="mb-0 theme-switch-toggle-label theme-switch-toggle-dark" for="themeControlToggle" data-bs-toggle="tooltip" data-bs-placement="left" title="Switch to dark theme"><span class="fas fa-moon"></span></label>
                  <label class="mb-0 py-2 theme-switch-toggle-dark d-lg-none" for="themeControlToggle"><span>Switch to dark theme</span></label>
                </div>
              </li> -->
              <!-- <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" id="navbarDropdownLogin" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Login</a>
                <div class="dropdown-menu dropdown-caret dropdown-menu-end dropdown-menu-card" aria-labelledby="navbarDropdownLogin">
                  <div class="card shadow-none navbar-card-login">
                    <div class="card-body fs--1 p-4 fw-normal">
                      <div class="row text-start justify-content-between align-items-center mb-2">
                        <div class="col-auto">
                          <h5 class="mb-0">Log in</h5>
                        </div>
                        <div class="col-auto">
                          <p class="fs--1 text-600 mb-0">or <a href="../pages/authentication/simple/register.html">Create an account</a></p>
                        </div>
                      </div>
                      <form>
                        <div class="mb-3">
                          <input class="form-control" type="email" placeholder="Email address" />
                        </div>
                        <div class="mb-3">
                          <input class="form-control" type="password" placeholder="Password" />
                        </div>
                        <div class="row flex-between-center">
                          <div class="col-auto">
                            <div class="form-check mb-0">
                              <input class="form-check-input" type="checkbox" id="modal-checkbox" />
                              <label class="form-check-label mb-0" for="modal-checkbox">Remember me</label>
                            </div>
                          </div>
                          <div class="col-auto"><a class="fs--1" href="../pages/authentication/simple/forgot-password.html">Forgot Password?</a></div>
                        </div>
                        <div class="mb-3">
                          <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Log in</button>
                        </div>
                      </form>
                      <div class="position-relative mt-4">
                        <hr />
                        <div class="divider-content-center">or log in with</div>
                      </div>
                      <div class="row g-2 mt-2">
                        <div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100" href="#"><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</a></div>
                        <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100" href="#"><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</a></div>
                      </div>
                    </div>
                  </div>
                </div>
              </li> -->
              <li class="nav-item"><a class="nav-link" href="#!" data-bs-toggle="modal" data-bs-target="#InquiryModal">Inquiry</a></li>
            </ul>
          </div>
        </div>
      </nav>
 
      <div class="modal fade" id="InquiryModal" tabindex="-1" role="dialog" aria-labelledby="modalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered" role="document">
          <div class="modal-content">
            <div class="modal-body p-4">
              <div class="row text-start justify-content-between align-items-center mb-2">
                <div class="col-auto">
                  <h5 id="modalLabel">Inquiry</h5>
                </div>
                <!-- <div class="col-auto">
                  <p class="fs--1 text-600 mb-0">Have an account? <a href="../pages/authentication/simple/login.html">Login</a></p>
                </div> -->
              </div>
              <form>
                <div class="mb-3">
                  <input class="form-control" type="text" autocomplete="on" placeholder="Name" />
                </div>
                <div class="mb-3">
                  <input class="form-control" type="email" autocomplete="on" placeholder="Email address" />
                </div>
                <div class="mb-3">
                  <input class="form-control" type="text" autocomplete="on" placeholder="Mobile Number" />
                </div>
                <div class="mb-3">
                  <textarea class="form-control" rows="3" placeholder="Message"></textarea>
                </div>
                <!-- <div class="row gx-2">
                  <div class="mb-3 col-sm-6">
                    <input class="form-control" type="password" autocomplete="on" placeholder="Password" />
                  </div>
                  <div class="mb-3 col-sm-6">
                    <input class="form-control" type="password" autocomplete="on" placeholder="Confirm Password" />
                  </div>
                </div> -->
                <!-- <div class="form-check">
                  <input class="form-check-input" type="checkbox" id="modal-register-checkbox" />
                  <label class="form-label" for="modal-register-checkbox">I accept the <a href="#!">terms </a>and <a href="#!">privacy policy</a></label>
                </div> -->
                <div class="mb-3">
                  <button class="btn btn-primary d-block w-100 mt-3" type="submit" name="submit">Submit</button>
                </div>
              </form>
              <!-- <div class="position-relative mt-4">
                <hr />
                <div class="divider-content-center">or register with</div>
              </div>
              <div class="row g-2 mt-2">
                <div class="col-sm-6"><a class="btn btn-outline-google-plus btn-sm d-block w-100" href="#"><span class="fab fa-google-plus-g me-2" data-fa-transform="grow-8"></span> google</a></div>
                <div class="col-sm-6"><a class="btn btn-outline-facebook btn-sm d-block w-100" href="#"><span class="fab fa-facebook-square me-2" data-fa-transform="grow-8"></span> facebook</a></div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
  
</template>

<style>
/* Add any custom styles here */
.philosopher-regular {
  font-family: "Philosopher", sans-serif;
  font-weight: 400;
  font-style: normal;
}

.philosopher-bold {
  font-family: "Philosopher", sans-serif;
  font-weight: 700;
  font-style: normal;
}

.philosopher-regular-italic {
  font-family: "Philosopher", sans-serif;
  font-weight: 400;
  font-style: italic;
}

.philosopher-bold-italic {
  font-family: "Philosopher", sans-serif;
  font-weight: 700;
  font-style: italic;
}

.dropdown-menu .dropdown-menu {
  top: 0;
  left: 100%; /* Aligns to the right of the parent */
  margin-top: -0.125rem; /* Adjusts vertical alignment */
}

.dropdown-menu-end {
  right: auto; /* Ensures alignment respects right placement */
}


</style>

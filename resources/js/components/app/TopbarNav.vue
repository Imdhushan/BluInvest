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
        <div class="container"><a class="navbar-brand" href="/temp"><span class="text-white dark__text-white philosopher-bold">BluInvest</span></a>
          <button class="navbar-toggler collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#navbarStandard" aria-controls="navbarStandard" aria-expanded="false" aria-label="Toggle navigation"><span class="navbar-toggler-icon"></span></button>
          <div class="collapse navbar-collapse scrollbar" id="navbarStandard">
            <ul class="navbar-nav" data-top-nav-dropdowns="data-top-nav-dropdowns">
              <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="dashboards">About Us</a>
                <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="dashboards">
                  <div class="bg-white dark__bg-1000 rounded-3 py-2">
                    <a class="dropdown-item link-600 fw-medium" href="/tourismsector/aboutbluinvest">What is BluInvest</a>
                    <a class="dropdown-item link-600 fw-medium" href="/tourismsector/howtousebluinvest">How to use BluInvest</a>
                   
                    <a class="dropdown-item link-600 fw-medium" href="#">Contact Us</a>
                    <!-- <a class="dropdown-item link-600 fw-medium" href="../dashboard/analytics.html">Analytics</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/crm.html">CRM</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/e-commerce.html">E commerce</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/lms.html">LMS<span class="badge rounded-pill ms-2 badge-soft-success">New</span></a><a class="dropdown-item link-600 fw-medium" href="../dashboard/project-management.html">Management</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/saas.html">SaaS</a><a class="dropdown-item link-600 fw-medium" href="../dashboard/support-desk.html">Support desk<span class="badge rounded-pill ms-2 badge-soft-success">New</span></a> -->
                  </div>
                </div>
                
              </li>
              <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="apps">Invest</a>
                <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="apps">
                  <div class="card navbar-card-app shadow-none dark__bg-1000">
                    <div class="card-body scrollbar max-h-dropdown">
                      
                      <div class="row">
                        <div class="col-6 col-md-4">
                          <div class="nav flex-column">
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/tourism">Tourism</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/conservation">Conservation</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/solar">Solar Energy</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/wind">Wind Energy</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/boat">Boat Building</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/marine">Marine Industries</a>
                            <!-- <p class="nav-link text-700 mb-0 fw-bold">Support Desk</p><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/table-view.html">Table view</a><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/card-view.html">Card view</a><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/contacts.html">Contacts</a><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/contact-details.html">Contact details</a><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/tickets-preview.html">Tickets preview</a><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/quick-links.html">Quick links</a><a class="nav-link py-1 link-600 fw-medium" href="../app/support-desk/reports.html">Reports</a> -->
                          </div>
                        </div>
                        <!-- <div class="col-6 col-md-4">
                          <div class="nav flex-column">
                            <p class="nav-link text-700 mb-0 fw-bold">E-Learning</p><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/course/course-list.html">Course list</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/course/course-grid.html">Course grid</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/course/course-details.html">Course details</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/course/create-a-course.html">Create a course</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/student-overview.html">Student overview</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-learning/trainer-profile.html">Trainer profile</a>
                            <p class="nav-link text-700 mb-0 fw-bold">Events</p><a class="nav-link py-1 link-600 fw-medium" href="../app/events/create-an-event.html">Create an event</a><a class="nav-link py-1 link-600 fw-medium" href="../app/events/event-detail.html">Event detail</a><a class="nav-link py-1 link-600 fw-medium" href="../app/events/event-list.html">Event list</a>
                            <p class="nav-link text-700 mb-0 fw-bold">Email</p><a class="nav-link py-1 link-600 fw-medium" href="../app/email/inbox.html">Inbox</a><a class="nav-link py-1 link-600 fw-medium" href="../app/email/email-detail.html">Email detail</a><a class="nav-link py-1 link-600 fw-medium" href="../app/email/compose.html">Compose</a>
                          </div>
                        </div> -->
                        <!-- <div class="col-6 col-md-4">
                          <div class="nav flex-column">
                            <p class="nav-link text-700 mb-0 fw-bold">E-Commerce</p><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/product/product-list.html">Product list</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/product/product-grid.html">Product grid</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/product/product-details.html">Product details</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/orders/order-list.html">Order list</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/orders/order-details.html">Order details</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/customers.html">Customers</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/customer-details.html">Customer details</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/shopping-cart.html">Shopping cart</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/checkout.html">Checkout</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/billing.html">Billing</a><a class="nav-link py-1 link-600 fw-medium" href="../app/e-commerce/invoice.html">Invoice</a>
                          </div>
                        </div> -->
                      </div>
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item dropdown"><a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false" id="pagess">Regulations </a>
                <div class="dropdown-menu dropdown-caret dropdown-menu-card border-0 mt-0" aria-labelledby="pagess">
                  <div class="card navbar-card-pages shadow-none dark__bg-1000">
                    <div class="card-body scrollbar max-h-dropdown">
                      
                      <div class="row">
                        <div class="col-12 col-xxl-3">
                          <div class="nav flex-column">
                          
                            <a class="nav-link py-1 link-600 fw-medium" href="/tourismsector/asset">Tourism</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="#">Conservation</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="#">Solar Energy</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="#">Wind Energy</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="#">Boat Building</a>
                            <a class="nav-link py-1 link-600 fw-medium" href="#">Marine Industries</a>
                          </div>
                        </div>
                        
                       
                        
                      </div>
                      
                      
                    </div>
                  </div>
                </div>
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link " href="#" role="button" aria-haspopup="true" aria-expanded="false" id="moduless">Services</a>
                
              </li>
              <li class="nav-item dropdown">
                <a class="nav-link " href="#" role="button" aria-haspopup="true" aria-expanded="false" id="moduless">SME Hub</a>
                
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
              <!-- <li class="nav-item"><a class="nav-link" href="#!" data-bs-toggle="modal" data-bs-target="#exampleModal">Register</a></li> -->
            </ul>
          </div>
        </div>
      </nav>
 

  
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

</style>

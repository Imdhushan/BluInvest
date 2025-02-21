import { createRouter, createWebHistory} from "vue-router";
import Login from "../components/Authentication/Login.vue";

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
      { path: '/', component: () => import('../components/Template/Home.vue'), meta: { requiresAuth: false} },
      { path: '/temp', component: () => import('../components/Template/Home.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/asset', component: () => import('../components/Template/TourismSector/TourismSectorHome.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/main', component: () => import('../components/Template/TourismSector/TourismMain.vue'), meta: { requiresAuth: false} },

      { path: '/tourismsector/tourism', component: () => import('../components/Template/TourismSector/TourismSectorHome.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/conservation', component: () => import('../components/Template/TourismSector/Conservation.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/solar', component: () => import('../components/Template/TourismSector/Solar.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/wind', component: () => import('../components/Template/TourismSector/Wind.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/boat', component: () => import('../components/Template/TourismSector/Boat.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/marine', component: () => import('../components/Template/TourismSector/Marine.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/energy', component: () => import('../components/Template/TourismSector/SustainableEnergy.vue'), meta: { requiresAuth: false} },




      { path: '/regulation/energy', component: () => import('../components/Template/Regulations/RegEnergy.vue'), meta: { requiresAuth: false} },
      { path: '/regulation/conservation', component: () => import('../components/Template/Regulations/RegConservation.vue'), meta: { requiresAuth: false} },
      { path: '/regulation/boat', component: () => import('../components/Template/Regulations/RegBoatBuilding.vue'), meta: { requiresAuth: false} },
      { path: '/regulation/tourism', component: () => import('../components/Template/Regulations/RegTourism.vue'), meta: { requiresAuth: false} },




      { path: '/tourismsector/aboutbluinvest:', component: () => import('../components/Template/AboutUs/WtBluInv.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/howtousebluinvest', component: () => import('../components/Template/AboutUs/HTUBluInv.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/services', component: () => import('../components/Template/AboutUs/Services.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/smehub', component: () => import('../components/Template/AboutUs/SMEHub.vue'), meta: { requiresAuth: false} },

      { path: '/tourismsector/event-tourism', component: () => import('../components/Template/AboutUs/EventsTourism.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/event-energy', component: () => import('../components/Template/AboutUs/EventsEnergy.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/event-marine', component: () => import('../components/Template/AboutUs/EventsMarine.vue'), meta: { requiresAuth: false} },
      { path: '/tourismsector/event-boat', component: () => import('../components/Template/AboutUs/EventsBoat.vue'), meta: { requiresAuth: false} },

      { path: '/tourismsector/event-conservation', component: () => import('../components/Template/AboutUs/EventsConservation.vue'), meta: { requiresAuth: false} },



      { path: '/map', component: () => import('../components/Template/masterMap.vue'), meta: { requiresAuth: false} },
      { path: '/map/analyze', component: () => import('../components/Template/AnalyzeInvesting.vue'), meta: { requiresAuth: false} },

      { path: '/sampel-withid/:id',
          component: () => import('../components/Template/Home.vue'),
          meta: { requiresAuth: true} },


      { path: '/login', component: Login , meta: { requiresAuth: false }},
  ],
});
router.beforeEach((to, from, next) => {
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    const isAuthenticated = localStorage.getItem("user");
    console.log("login authenticated",isAuthenticated)
    if (requiresAuth && !isAuthenticated) {
        next('/login');
    } else if (!requiresAuth && isAuthenticated && to.path === '/login') {
        next('/');
    } else {
        next();
    }
});
export default router;

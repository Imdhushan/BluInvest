import { createRouter, createWebHistory} from "vue-router";
import Login from "../components/Authentication/Login.vue";

const router = createRouter({
  history: createWebHistory('/'),
  routes: [
      { path: '/', component: () => import('../components/Home.vue'), meta: { requiresAuth: true} },
      { path: '/temp', component: () => import('../components/Template/Home.vue'), meta: { requiresAuth: true} },
      { path: '/tourismsector/asset', component: () => import('../components/Template/TourismSector/TourismSectorHome.vue'), meta: { requiresAuth: true} },
      { path: '/tourismsector/main', component: () => import('../components/Template/TourismSector/TourismMain.vue'), meta: { requiresAuth: true} },

      { path: '/tourismsector/tourism', component: () => import('../components/Template/TourismSector/TourismSectorHome.vue'), meta: { requiresAuth: true} },
      { path: '/tourismsector/conservation', component: () => import('../components/Template/TourismSector/Conservation.vue'), meta: { requiresAuth: true} },
      { path: '/tourismsector/solar', component: () => import('../components/Template/TourismSector/Solar.vue'), meta: { requiresAuth: true} },
      { path: '/tourismsector/wind', component: () => import('../components/Template/TourismSector/Wind.vue'), meta: { requiresAuth: true} },
      { path: '/tourismsector/boat', component: () => import('../components/Template/TourismSector/Boat.vue'), meta: { requiresAuth: true} },
      { path: '/tourismsector/marine', component: () => import('../components/Template/TourismSector/Marine.vue'), meta: { requiresAuth: true} },




      { path: '/tourismsector/aboutbluinvest:', component: () => import('../components/Template/AboutUs/WtBluInv.vue'), meta: { requiresAuth: true} },
      { path: '/tourismsector/howtousebluinvest', component: () => import('../components/Template/AboutUs/HTUBluInv.vue'), meta: { requiresAuth: true} },


      { path: '/map', component: () => import('../components/Template/masterMap.vue'), meta: { requiresAuth: true} },
      { path: '/map/analyze', component: () => import('../components/Template/AnalyzeInvesting.vue'), meta: { requiresAuth: true} },

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

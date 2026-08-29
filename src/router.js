import { createWebHistory,createRouter } from "vue-router";
import Sigin from "./components/sigin.vue";

const routes = [
   {
    path:'/sigin',component:Sigin
   }
]
const router = createRouter({
    history:createWebHistory(),
    routes:routes
})
export default router
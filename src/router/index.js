import Vue from 'vue'
import VueRouter from 'vue-router'
import Broneerimine from "../views/Broneerimine";
import addDoc from "../views/addDoc";

Vue.use(VueRouter)

const routes = [
  {
    path: '/bron',
    name: 'Broneerimine',
    component: Broneerimine
  },
  {
    path: '/addDoc',
    name: 'addDoc',
    component: addDoc
  }

]

const router = new VueRouter({
  routes
})

export default router

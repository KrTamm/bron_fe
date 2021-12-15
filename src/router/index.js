import Vue from 'vue'
import VueRouter from 'vue-router'
import Broneerimine from "../views/Broneerimine";
import Admin from "../views/Admin";
import AddDoc from "../views/AddDoc";
import AddDate from "../views/AddDate";
import ResOverall from "../views/ResOverall";
import Kasutaja from "../views/Kasutaja";
import UusAegBron from "../views/UusAegBron";
import ArstideBaas from "../views/ArstideBaas";
import Esileht from "../views/Esileht";

Vue.use(VueRouter)

const routes = [
  {
    path: '/broneerimine',
    name: 'Broneerimine',
    component: Broneerimine
  },
  // {
  //   path: '/kasutaja',
  //   name: 'Kasutaja',
  //   component: Kasutaja
  // },
  {
    path: '/',
    name: 'Esileht',
    component: Esileht
  },
  {
    path: 'admin/addDoc',
    name: 'AddDoc',
    component: AddDoc
  },
  {
    path: 'admin/addDate',
    name: 'AddDate',
    component: AddDate
  },
  {
    path: 'admin/resOverall',
    name: 'ResOverall',
    component: ResOverall
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  },
  {
    path: '/kasutaja/bron/uusaeg/:id',
    name: 'UusAegBron',
    component: UusAegBron
  },
  {
    path: 'admin/arstidebaas',
    name: 'ArstideBaas',
    component: ArstideBaas
  }

]

const router = new VueRouter({
  routes
})

export default router

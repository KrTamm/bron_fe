import Vue from 'vue'
import VueRouter from 'vue-router'
import Broneerimine from "../views/Broneerimine";
import Admin from "../views/Admin";
import AddDoc from "../views/AddDoc";
import AddDate from "../views/AddDate";
import DocOverall from "../views/DocOverall";

Vue.use(VueRouter)

const routes = [
  {
    path: '/bron',
    name: 'Broneerimine',
    component: Broneerimine
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
    path: 'admin/docOverall',
    name: 'DocOverall',
    component: DocOverall
  },
  {
    path: '/admin',
    name: 'Admin',
    component: Admin
  }

]

const router = new VueRouter({
  routes
})

export default router

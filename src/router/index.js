import Vue from 'vue'
import VueRouter from 'vue-router'
import Tutorial from '../views/Tutorial.vue'
import Menu from '../views/Menu.vue'
import Draw from '../views/entertainment/Draw.vue'
import Intro from '../views/Intro.vue'
import Entertainment from '../views/Entertainment.vue'
import Review from '../views/Review.vue'

import University from '../views/university/University.vue'
import Departments from '../views/university/Departments.vue'
import Organizations from '../views/university/Organizations.vue'
import CoreValues from '../views/university/CoreValues.vue'
import SchoolOfficials from '../views/university/SchoolOfficials.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Intro',
    component: Intro
  },
  {
    path: '/tutorial',
    name: 'Tutorial',
    component: Tutorial
  },
  {
    path: '/menu',
    name: 'Menu',
    component: Menu,
  },
  {
    path: '/review',
    name: 'Review',
    component: Review,
  },
  {
    path: '/university',
    name: 'University',
    component: University,
  },
  {
    path: '/departments',
    name: 'Departments',
    component: Departments,
  },
  {
    path: '/corevalues',
    name: 'CoreValues',
    component: CoreValues,
  },
  {
    path: '/schoolofficials',
    name: 'SchoolOfficials',
    component: SchoolOfficials,
  },
  {
    path: '/organizations',
    name: 'organizations',
    component: Organizations,
  },
  {
    path: '/entertainment',
    name: 'Entertainment',
    component: Entertainment,
  },
  {
    path: '/entertainment/draw',
    name: 'Draw',
    component: Draw,
  },

]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'

const bookmall=()=>import('@/views/bookmall')
const shelf=()=>import('@/views/shelf')
const cartoon=()=>import('@/views/cartoon')
const Cloud=()=>import('@/views/Cloud')
const Profile=()=>import('@/views/Profile')

Vue.use(VueRouter)

const routes = [
  {
    path:"/",
    redirect:"/bookmall"
  },
  {
    path:"/shelf",
    component:shelf
  },
  {
    path:"/bookmall",
    component:bookmall
  },
  {
    path:"/cartoon",
    component:cartoon
  },
  {
    path:"/cloud",
    component:Cloud
  },
  {
    path:"/profile",
    component:Profile
  }
  
]

const router = new VueRouter({
  routes,
  mode:"history"
})

export default router

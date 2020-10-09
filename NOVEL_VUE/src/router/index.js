import Vue from 'vue'
import VueRouter from 'vue-router'

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const bookmall = () => import('@/views/bookmall')
const shelf = () => import('@/views/shelf')
const cartoon = () => import('@/views/cartoon')
const Cloud = () => import('@/views/Cloud')
const Profile = () => import('@/views/Profile')

const bookread = () => import('@/views/bookread/bookread')
const comicsread = () => import('@/views/comicsread/comicsread')
const search = () => import('@/views/search/search')
const bookdetail = () => import('@/views/bookdetail/bookdetail')
const history = () => import('@/views/history/history')
const feedback = () => import('@/views/mine/feedback')
const register = () => import('@/views/mine/register')
const taskcenter = () => import('@/views/mine/taskcenter')
const news = () => import('@/views/mine/new')
const cartoonDetail=()=>import('@/views/cartoon/cartoonDetail')

const sort=()=>import('@/views/bookmalls/sort')
const rank=()=>import('@/views/bookmalls/rank')
const daily=()=>import('@/views/bookmalls/dailyrec')
const bookslist=()=>import('@/views/bookmalls/bookslist')
const sortresult=()=>import('@/views/bookmalls/sortresult')
Vue.use(VueRouter)

const routes = [
  {
    path: "/",
    redirect: "/bookmall"
  },
  {
    path: "/shelf",
    component: shelf,
    meta: {
      tabbarShow: true
    }
  },
  {
    path: "/bookmall",
    component: bookmall,
    meta: {
      tabbarShow: true
    }
  },
  {
    path: "/cartoon",
    component: cartoon,
    meta: {
      tabbarShow: true
    }
  },
  {
    path: "/cloud",
    component: Cloud,
    meta: {
      tabbarShow: true
    }
  },
  {
    path: "/profile",
    component: Profile,
    meta: {
      tabbarShow: true
    }
  },
  {
    path: "/bookread",
    component: bookread,
    meta: {
      tabbarShow: false
    }
  },
  {
    path: "/comicsread",
    component: comicsread,
    meta: {
      tabbarShow: false
    }
  },
  {
    path: "/search",
    component: search,
    meta: {
      tabbarShow: false
    }
  },
  {
    path: "/bookdetail",
    component: bookdetail,
    meta: {
      tabbarShow: false
    }
  },
  {
    path: "/history",
    component: history,
    meta: {
      tabbarShow: false
    }
  },
  {
    path: "/feedback",
    component: feedback,
    meta: {
      tabbarShow: false
    }
  },
  {
    path: "/register",
    component: register,
    meta: {
      tabbarShow: false
    }
  },
  {
    path: "/taskcenter",
    component: taskcenter,
    meta: {
      tabbarShow: false
    }
  },
  {
    path:"/cartoonDetail",
    component:cartoonDetail,
    meta: {
			tabbarShow: false//如果需要显示就加上这个
		}
  },
  {
    path:"/sort",
    component:sort,
    meta: {
			tabbarShow: false//如果需要显示就加上这个
		}
  },
  {
    path:"/rank",
    component:rank,
    meta: {
			tabbarShow: false//如果需要显示就加上这个
		}
  },
  {
    path:"/daily",
    component:daily,
    meta: {
			tabbarShow: false//如果需要显示就加上这个
		}
  },
  {
    path:"/bookslist",
    component:bookslist,
    meta: {
			tabbarShow: false//如果需要显示就加上这个
		}
  },
  {
    path:"/sortresult",
    component:sortresult,
    meta: {
			tabbarShow: false//如果需要显示就加上这个
		}
  },
  {
    path:"/new",
    component:news,
    meta: {
			tabbarShow: false//如果需要显示就加上这个
		}
  }

]

const router = new VueRouter({
  routes,
  mode: "history"
})

export default router

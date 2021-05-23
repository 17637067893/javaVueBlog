import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import tool from "../until/tools"

Vue.use(VueRouter)

const routes = [
  {
     path: '/home',
     name: 'home',
     component: () => import('../views/Home.vue')
   },
   {
     path: '/login',
     name: 'login',
     component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
   },
   {
    path: '/edit',
    name: 'edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/Edit.vue')
  }
  ,
   {
    path: '/about',
    name: 'about',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
  ,
  {
   path: '/articleInfo',
   name: 'articleInfo',
   component: () => import(/* webpackChunkName: "about" */ '../views/ArticleInfo.vue')
 }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// router.beforeEach((to, from, next) => {
//    if (to.path === '/login') return next()

//    if(to.query.token){
//      tool.setCookie("token",to.query.token);
//      return next();
//    }
//    // 2.如果访问的是有登录权限的页面，先要获取token
//    const tokenStr = tool.getCookie("token")
//    // 2.1如果token为空，强制跳转到登录页面；否则，直接放行
//    if (!tokenStr) return next('/login')
//    next()
// })

export default router

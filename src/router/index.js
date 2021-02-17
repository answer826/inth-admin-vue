import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      meta: { title: '首页', icon: 'fa fa-home', type: 'tab' }
    }]
  },
  { // 营地
    path: '/camps',
    component: Layout,
    meta: { title: '营地管理', icon: 'fa fa-campground' },
    children: [
      {
        path: '/',
        name: 'CampsList',
        meta: { title: '营地管理', type: 'tab' },
        component: () => import('@/views/camps'),
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'CampsEdit',
        meta: { title: '营地编辑' },
        component: () => import('@/views/camps/camp'),
        hidden: true
      },
      {
        path: '/roomList/:campId',
        meta: { title: '房间管理' },
        name: 'RoomList',
        hidden: true,
        component: () => import('@/views/camps/room'),
        children: [
          {
            path: '/',
            meta: { title: '房间管理' },
            component: () => import('@/views/camps/room/roomList'),
            hidden: true
          },
          {
            path: '/roomInfo/:campId/:roomId',
            name: 'RoomInfo',
            meta: { title: '房间编辑' },
            component: () => import('@/views/camps/room/roomInfo'),
            hidden: true
          },
          {
            path: '/orderMgr/:roomId',
            name: 'RoomOrder',
            meta: { title: '订单与价格管理' },
            component: () => import('@/views/camps/room/order'),
            hidden: true
          }
        ]
      },
      {
        path: '/stockList/:campId',
        meta: { title: '库存管理' },
        name: 'RoomList',
        hidden: true,
        component: () => import('@/views/camps/stock'),
        children: [
          {
            path: '/',
            meta: { title: '库存管理' },
            component: () => import('@/views/camps/stock/stockList'),
            hidden: true
          },
          {
            path: '/stockDetail/:campId/:stockId',
            name: 'stockDetail',
            meta: { title: '物品编辑' },
            component: () => import('@/views/camps/stock/stockDetail'),
            hidden: true
          }
        ]
      }
    ]
  },
  { // 优惠券
    path: '/coupon',
    component: Layout,
    meta: { title: '优惠券', icon: 'fa fa-swatchbook' },
    children: [
      {
        path: '/',
        name: 'CouponList',
        meta: { title: '优惠券', type: 'tab' },
        component: () => import('@/views/coupon/couponList'),
        hidden: true
      },
      {
        path: 'edit/:id',
        name: 'CouponEdit',
        meta: { title: '优惠券编辑' },
        component: () => import('@/views/coupon/couponEdit'),
        hidden: true
      }
    ]
  },
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
var routeList = []
router.beforeEach((to, from, next) => {
  var index = -1
  // 判断路由之前是否存在，并返回位置
  for (var i = 0; i < routeList.length; i++) {
    if (routeList[i].name === to.meta.title) {
      index = i
      break
    }
  }
  if (index !== -1) {
    // 如果存在，则回到重复路由的之前位置
    routeList.splice(index + 1, routeList.length - index - 1)
  } else {
    if (to.meta.type === 'tab') routeList = []
    //   不存在则加入循环数组内 （注1）
    routeList.push({ name: to.meta.title, path: to.path })
  }
  to.meta.routeList = routeList
  // console.log(routeList)
  next()
})
export default router

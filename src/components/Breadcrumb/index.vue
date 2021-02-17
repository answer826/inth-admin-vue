<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item v-for="(item,index) in levelList" :key="item.name">
        <span v-if="item.redirect==='noRedirect'||index==levelList.length-1" class="no-redirect">{{ item.name }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.name }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>
import pathToRegexp from 'path-to-regexp'

export default {
  data() {
    return {
      levelList: null
    }
  },
  watch: {
    levelList(val) {
    },
    $route() {
      this.getBreadcrumb()
    }
  },
  created() {
    this.getBreadcrumb()
  },
  methods: {
    getBreadcrumb() {
      let routerList = this.$route.meta.routeList
      // const first = routerList[0]
      // if (!this.isDashboard(first)) {
      //   routerList = [{ path: '/dashboard', name: 'Inth' }].concat(routerList)
      // }
      // console.log(routerList)
      routerList = [{ path: '/dashboard', name: 'Inth' }].concat(routerList)
      this.levelList = routerList
    },
    // getBreadcrumb() {
    //   // only show routes with meta.title
    //   let matched = this.$route.matched.filter(item => item.meta && item.meta.title)
    //   const first = matched[0]

    //   if (!this.isDashboard(first)) {
    //     matched = [{ path: '/dashboard', meta: { title: 'Inth' }}].concat(matched)
    //   }
    //   console.log(this.$route)
    //   this.levelList = matched.filter(item => item.meta && item.meta.title && item.meta.breadcrumb !== false)
    // },
    isDashboard(route) {
      const name = route && route.name
      if (!name) {
        return false
      }
      return name.trim().toLocaleLowerCase() === 'Dashboard'.toLocaleLowerCase()
    },
    pathCompile(path) {
      // To solve this problem https://github.com/PanJiaChen/vue-element-admin/issues/561
      const { params } = this.$route
      var toPath = pathToRegexp.compile(path)
      return toPath(params)
    },
    handleLink(item) {
      // const { redirect, path } = item
      // if (redirect) {
      //   this.$router.push(redirect)
      //   return
      // }
      this.$router.push(item.path)
    }
  }
}
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  font-size: 14px;
  line-height: 50px;
  margin-left: 8px;
  user-select: none;

  .no-redirect {
    color: #97a8be;
    cursor: text;
  }
}
</style>

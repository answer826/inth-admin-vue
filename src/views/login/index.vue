<template>
  <div class="login-page">
    <div class="login-wrapper">
      <div class="bg-pic">
        <div class="bg-caption pull-bottom sm-pull-bottom text-white p-l-20 m-b-20">
          <h1 class="semi-bold text-white">隐室后台管理系统</h1>
          <!-- <p class="small"></p> -->
        </div>
      </div>
      <div class="login-container bg-white">
        <div class="p-l-50 p-r-50 p-t-50 m-t-30 sm-p-l-15 sm-p-r-15 sm-p-t-40">
          <img src="assets/img/logo-48x48_c.png" alt="logo" data-src="assets/img/logo-48x48_c.png" data-src-retina="assets/img/logo-48x48_c@2x.png" width="48" height="48">
          <h2 class="p-t-25">开始登录</h2>
          <p class="mw-80 m-t-5">Sign in to your account</p>
          <form id="form-login" class="p-t-15" role="form" @submit.prevent="handleLogin">
            <div class="form-group form-group-default">
              <label>登录用户名</label>
              <div class="controls">
                <input v-model.trim="loginForm.username" type="text" name="username" placeholder="用户名" class="form-control" required>
              </div>
            </div>
            <div class="form-group form-group-default">
              <label>密码</label>
              <div class="controls">
                <input v-model.trim="loginForm.password" type="password" class="form-control" name="password" placeholder="密码" required>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 d-flex align-items-center justify-content-end">
                <button aria-label="" class="btn btn-primary btn-lg m-t-10" type="submit">登录</button>
              </div>
            </div>
          </form>
          <div class="pull-bottom sm-pull-bottom">
            <div class="m-b-30 p-r-80 sm-m-t-20 sm-p-r-15 sm-p-b-20 clearfix">
              <div class="col-sm-9 no-padding m-t-10">
                <p class="small-text normal hint-text">
                  Images Displayed are solely for representation purposes only, All work copyright of respective owner, otherwise © 2020 Inth .
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { validUsername } from '@/utils/validate'
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: '',
        password: ''
      },
      loading: false,
      passwordType: 'password',
      redirect: undefined
    }
  },
  computed: {
    loginFlag() {
      let flag = true
      for (const key in this.loginForm) {
        if (this.loginForm[key] === '') flag = false
      }
      return flag
    }
  },
  watch: {
    $route: {
      handler: function(route) {
        this.redirect = route.query && route.query.redirect
      },
      immediate: true
    }
  },
  mounted() {
    /* eslint-disable */
    $('#form-login').validate()
  },
  methods: {
    showPwd() {
      if (this.passwordType === 'password') {
        this.passwordType = ''
      } else {
        this.passwordType = 'password'
      }
      this.$nextTick(() => {
        this.$refs.password.focus()
      })
    },
    handleLogin() {
      if (this.loginFlag) {
        this.loading = true
        const params = new FormData()
        params.append('username', this.loginForm.username)
        params.append('password', this.loginForm.password)
        this.$store.dispatch('user/login', params).then(res => {
          this.$router.push({ path: this.redirect || '/' })
          this.loading = false
        }).catch(() => {
          this.loading = false
        }) 
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-page {
  height: 100%;
}
</style>

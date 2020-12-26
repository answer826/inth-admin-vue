<template>
  <div class="dashboard-container">
    {{ res }}
  </div>
</template>

<script>
// import { mapGetters } from 'vuex'

export default {
  name: 'Dashboard',
  data() {
    return {
      res: ''
    }
  },
  computed: {},
  mounted() {
    this.$store.dispatch('user/getadmin', {}).then(res => {
      this.res = res
    })
  }
}
</script>

<style lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
</style>

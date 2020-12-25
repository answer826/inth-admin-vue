<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>
<style lang="scss" scoped>
@import url('../public/pages/scss/modules/layout.scss');
#app{
  height: 100%;
}
</style>

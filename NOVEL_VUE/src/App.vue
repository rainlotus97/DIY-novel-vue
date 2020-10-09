<template>
  <div id="app">
    <tabbar v-if="$route.meta.tabbarShow"></tabbar>
    <router-view />

  </div>
</template>
<script>
import tabbar from './components/tabbar/tabbar'
  export default {
    name:'App',
    data() {
      return {
      
      }
    },
    components:{
      tabbar
    }
  };
</script>
<style lang="scss">
  @import './assets/scss/base.scss';

</style>
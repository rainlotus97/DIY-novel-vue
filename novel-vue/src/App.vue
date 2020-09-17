<template>
  <div id="app">
    <van-tabbar v-model="active" active-color="#ca3e2d" inactive-color="#8a8a8a" route>
      <van-tabbar-item replace v-for="(item, index) in tabbarList" :key="index" :to="item.path">
        <span>{{ item.title }}</span>
        <img slot="icon" slot-scope="props" :src="props.active ? item.active : item.inactive" />
      </van-tabbar-item>
    </van-tabbar>
    <router-view />

  </div>
</template>
<script>
  export default {
    data() {
      return {
        active: 0,
        tabbarList: [{
            path: "/shelf",
            title: "书架",
            active:  require('@/assets/tabbar/shelfr.png'),
            inactive: require('@/assets/tabbar/shelfb.png'),
          },
          {
            path: "/bookmall",
            title: "书城",
            active: require('@/assets/tabbar/bookmallr.png'),
            inactive: require('@/assets/tabbar/bookmallb.png'),
          },
          {
            path: "/cartoon",
            title: "漫画",
            active: require('@/assets/tabbar/manhua3r.png'),
            inactive: require('@/assets/tabbar/manhua3b.png'),
          },
          {
            path: "/cloud",
            title: "云村",
            active: 'https://i.loli.net/2020/09/11/ctyLzxZrpFP34mA.png',
            inactive: 'https://i.loli.net/2020/09/11/Qv7Wh34qX6T15Jm.png',
          },
          {
            path: "/profile",
            title: "我的",
            active: require('@/assets/tabbar/miner.png'),
            inactive: require('@/assets/tabbar/mineb.png'),
          },
        ]
      };
    },
  };
</script>
<style lang="scss">
  @import './assets/scss/base.scss';

</style>
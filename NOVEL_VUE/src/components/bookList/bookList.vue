<template>
  <div class="bookList">
    <!-- <div class="title">{{name}}</div> -->
    <!-- <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad"> -->
      <div v-for="(item, index) in list" :key="index">
        <p
          v-for="(value, index) in item"
          :key="index"
          @click="link(value.url, paramValue)"
        >
          {{ value.num }}
        </p>
      </div>

    <!-- </van-list> -->
  </div>
</template>

<script>
export default {
  name: "bookList",
  data() {
    return {
      name: "",
      list: [],
      listdemo: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    bookList() {
      let result = this.$store.state.bookList;
      this.name = this.$store.state.name;
      for (let i = 0; i < result.length; i = i + 100) {
        this.list.push(result.slice(i, i + 100));
      }
    },
    //  onLoad() {
    //   setTimeout(() => {
    //     // 加载状态结束
    //    this.listdemo.push(this.list[this.listdemo.length]);
    //    this.loading = false;
    //     // 数据全部加载完成
    //     if (this.listdemo.length >= this.list.length) {
    //       this.finished = true;
    //     }
    //   }, 2000);
    // },
    link(data, paramValue) {
      this.$store.commit("getBookUrl", data);
      this.$router.push(`/${paramValue}`);
    },
  },
  created() {
    this.bookList();
   
  },
  components: {},
  props: {
    paramValue: String,
  },
  watch: {
    "$store.state.bookList"() {
      this.list = [];
      this.bookList();
    },
  },
};
</script>

<style lang='scss' scoped>
.bookList {
  padding: 10px;
  overflow: auto;
  .title {
    width: 100%;
    height: 30px;
    font-size: 16px;
    line-height: 30px;
    font-weight: 800;
  }
  p {
    font-size: 14px;
    height: 25px;
    line-height: 25px;
    border-bottom: 1px solid rgb(228, 228, 228);
  }
}
</style>
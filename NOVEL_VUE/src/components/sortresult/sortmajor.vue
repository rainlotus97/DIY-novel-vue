<template>
  <div id="sortmajor">
    <div class="container">
      <div
        @click="toggleactive(-1)"
        :class="activeClass == -1 ? 'active':''"
        refs="type"
        class="singlemajor"
      >全部</div>
      <div
        v-for="(item,index) in sortresult"
        :key="index"
        :class="activeClass == index ? 'active':''"
        @click="toggleactive(index)"
        class="singlemajor"
      >{{item}}</div>
    </div>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import { booktypeBaseURL } from "@/tools/allApi";
export default {
  name: "sortmajor",
  data() {
    return {
      isactive: true,
      sortresult: [],
      activeClass: -1
    };
  },
  created() {
    this.getsort();
  },
  mounted() {},
  methods: {
    toggleactive(index) {
      //   console.log(index);
    //   console.log(this.sortresult[index]);

    //   console.log(this.$store.state.detailbooks);
      this.$store.commit("handledetailbooks", this.sortresult[index]);

      this.activeClass = index;
    },
    async getsort() {
      let url =
        booktypeBaseURL +
        this.$store.state.bookgender +
        "&major=" +
        this.$store.state.booktype +
        "&packageName=com.ushaqi.zhuishushenqi&userid=5f5f26bb2e7292430d2882a3";
      let result = await zgaxios("GET", url);
      // console.log("分类获取结果",result);
      this.sortresult = result.data.mins;
      // console.log(this.sortresult);
    }
  }
};
</script>

<style lang="scss" scoped>
#sortmajor {
  .container {
    background-color: #fbfbfb;
    width: 100%;
    padding: 15px 10px;
    border-bottom: 2px solid #efeff1;
    .singlemajor {
      float: left;
      margin: 6px 6px;
      padding: 2px 8px;
      font-size: 15px;
      font-weight: bolder;
      border-radius: 10px;
      background-color: #fff;
    }
    .active {
      background-color: #fdecec;
      color: #f16968;
      border-radius: 10px;
    }
  }
  .container::after {
    display: table;
    content: "";
    clear: both;
  }
}
</style>

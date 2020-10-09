<template>
  <div id="sortbytips">
    <div class="container">
      
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
export default {
  name: "sortbytips",
  data() {
    return {
      sortresult: ["人气", "评分", "字数"],
      activeClass: 0
    };
  },
  created() {},
  mounted() {},
  methods: {
    toggleactive(index) {
      console.log(index);
      // console.log(this.sortresult[index]);

    // console.log(this.$store.state.detailbooks);
    this.$store.commit('handledetailbooks',this.sortresult[index])

      this.activeClass = index;
    }
  }
};
</script>

<style lang="scss" scoped>
#sortbytips {
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

<template>
  <div id="box">
    <div v-for="item in list" :key="item.id">
      <div class="body">
        <div class="body-left">
          <img :src="item.icon" class="small-image" />
        </div>
        <div class="center-body">{{item.title}}</div>
        <div class="right-body">
          查看更多
          <img class="body-icon" src="@/assets/images/cartoonImage/right.png" alt />
        </div>
      </div>
      <div class="box-image" v-for="value in item.books" :key="value.id" @click="liClick(value.title)">
        <img :src="value.cover" />
        <div class="title">{{value.title}}</div>
        <div class="message">{{value.tags[0]}} &nbsp;{{value.tags[1]}}&nbsp;{{value.tags[2]}}</div>
      </div>
    </div>
  </div>
</template>
<script>
import zgaxios from "@/tools/zgaxios";
import { cartoonPage } from "@/tools/allApi";
export default {
  name: "cartoonComponent",
  data() {
    return {
      list: [],
    };
  },
  created() {
    this.getCartoon();
  },
  mounted() {},
  methods: {
    async getCartoon() {
      let result = await zgaxios("GET", cartoonPage);
      this.list = result.data.nodes;
      this.list[1].books.splice(3,1)
    },
    liClick(title){
        //跳转图片详情
        this.$router.push(`/cartoonDetail`)
        this.$store.commit("getCartoon",title)
    }
  },
};
</script>

<style lang="scss">
#box {
  width: 95%;
  margin: 0 auto;
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap; //超出父盒子宽度换行
  justify-content: space-between;
  .body {
    width: 100%;
    margin: 10px auto;
    height: 35px;
    padding: 10px 0;
    .body-left {
      float: left;
      width: 30px;
      .small-image {
        width: 30px;
        height: 30px;
      }
    }
    .center-body {
      width: 60%;
      font-size: 17px;
      font-weight: bolder;
      height: 30px;
      line-height: 30px;
      float: left;
    }
    .right-body {
      width: 25%;
      font-size: 17px;
      height: 30px;
      line-height: 30px;
      color: #a3a3a3;
      float: right;
      right: 10px;
      position: relative;
      .body-icon {
        width: 15px;
        height: 15px;
        position: absolute;
        top: 50%;
        transform: translate(0, -60%);
      }
    }
  }
  .box-image {
    float: left;
    width: 33%;
    padding: 8px;
    margin-top: 10px;
    img {
      width: 100%;
      height: 150px;
      box-shadow: 0 0 3px 3px #d3d1d1;
    }
    .title {
      margin-top: 5px;
      font-weight: bolder;
      font-size: 13px;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    .message {
      margin-top: 5px;
      color: #bdbdbd;
      height: 16px;
    }
  }
}
</style>
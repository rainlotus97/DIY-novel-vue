<template>
  <div id="sortdetail">
    <div class="title fl"></div>
    <div class="type fl">{{newgender}}</div>

    <div class="title fl"></div>
    <van-grid :gutter="10" :column-num="2" v-for="(item,index) in this.cresult" :key="index">
      <van-grid-item
        :icon="'http://statics.zhuishushenqi.com'+item.bookCover[0]"
        :text="item.name"
        @click="changepage(item.alias,item.name,item.gender)"
      />
      <div class="bookscount">{{item.bookCount}}本</div>
    </van-grid>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import { bookcateBaseURL } from "@/tools/allApi";
export default {
  name: "sortdetail",
  props: {
    cresult: {
      type: Array
    },
    cgender: {
      type: String
    }
  },
  data() {
    return {
      newdata: this.cresult,
      newgender: this.cgender,
      alias: ""
    };
  },
  created() {
    /* 
    console.log("this.cresult---->", this.cresult);
    console.log("this.cgender---->", this.cgender); */
  },
  mounted() {},
  methods: {
    async changepage(alias, name, gender) {
      // console.log("alias-------->", alias, name,gender);
      await this.$store.commit("getbookType", name);
      await this.$store.commit("getbookGender", gender);
      this.alias = alias;
      await this.getnextdata();
      // await console.log("this.$store.state.detailbooks------->",this.$store.state.detailbooks);

      // console.log(this.$store.state.booktype);
      
      await this.$router.push("/sortresult");
    },
    async getnextdata() {
      let ali = this.alias;

      let res = await zgaxios(
        "GET",
        bookcateBaseURL +
          ali +
          "&packageName=com.ushaqi.zhuishushenqi&sort=1&start=0&limit=100&token=uvuNs0kRL7nag4AV4bec5f20df1872b61396568a7e04a1968b80f4a3932cdef2cca1efdaba506d9c6da10425affab84ba0cf4e3dc14bdeba6ab75e22385af3a74607a30ac1213586819bef887e07901940337d56d6dbb53f&userid=5f5f26bb2e7292430d2882a3"
      );
      // console.log("res------------>",res.books);
      let alibooks = res.books;

      //点击后获取数据存入vuex
      this.$store.commit("getdetailBooks", alibooks);
    }
  }
};
</script>

<style lang="scss" scoped>
#sortdetail {
  .title {
    width: 38%;
    height: 36px;
    margin-top: 26px;
    margin-left: 15px;
    margin-right: 15px;
    border-top: 1px solid #dcdcdf;
  }
  .type {
    text-align: center;
    width: 8%;
    height: 50px;
    line-height: 56px;
    font-size: 15px;
    color: #c8c7cc;
  }
  .fl {
    float: left;
  }
  /deep/.van-grid {
    width: 45%;
    margin: 0;
    margin-right: 12px;
    float: left;
    /* overflow: hidden; */
    position: relative;
    .bookscount {
      position: absolute;
      top: 40px;
      left: 40px;
      color: #b7b7b7;
    }
    margin-bottom: 20px;
    .van-grid-item {
      float: left;
      .van-grid-item__content {
        /* padding:30px; */
        padding-top: 40px;
        padding-bottom: 30px;
        background-color: #f0f0f5;
        position: relative;
        .van-icon {
          position: absolute;
          right: 20px;
          font-size: 40px;
          img {
            width: 43px;
            height: 60px;
            box-shadow: 0 0 1px 3px #d3d1d1;
          }
        }
        .van-grid-item__text {
          margin-right: 78px;
          margin-top: -20px;
          width: 80px;
          text-align: center;
          font-weight: bolder;
          font-size: 16px;
        }
      }
    }
  }
}
#sortdetail::after {
  display: table;
  content: "";
  clear: both;
}
</style>

<template>
  <div id="sortresult">
    <van-nav-bar :title="type" left-text="返回" left-arrow @click-left="onClickLeft" />
    <sortmajor></sortmajor>
    <sortbytips></sortbytips>
    <div
      class="booklineone"
      v-for="(item,index) in this.$store.state.detailbooks"
      :key="index"
      @click="getbook(item.title)"
    >
      <booklineone>
        <div slot="bookpic">
          <img class="bookp" :src="'http://statics.zhuishushenqi.com'+item.cover" alt />
        </div>
        <div slot="booktitle">
          <div slot="bookname" class="botleft">{{item.title}}</div>
        </div>
        <div slot="bookintro">{{item.shortIntro}}</div>

        <div slot="bookauthor" class="botleft">{{item.author}}</div>
        <div slot="bookcate" class="botright">{{item.minorCate}}</div>
      </booklineone>
    </div>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import sortmajor from "@/components/sortresult/sortmajor";
import sortbytips from "@/components/sortresult/sortbytips";
import booklineone from "@/components/bookmall/bookdistributionone/bookline";
import {
  searchBook,
  hotWord,
  bookDetail,
  bookDirectory,
  hotSelect,
  bookSort
} from "@/tools/allApi";
export default {
  data() {
    return {
      type: "",
      zhongbang: []
    };
  },
  components: {
    sortmajor,
    sortbytips,
    booklineone
  },
  created() {
    this.type = this.$store.state.booktype;
    this.zhongbang = this.$store.state.detailbooks;
  },
  mounted() {},
  methods: {
    async getbook(item) {
      let getbookdetail = await zgaxios("GET", bookDetail + item);
      console.log("搜索到的书籍", getbookdetail);
      if (getbookdetail.code == 0) {
        let result = getbookdetail.list.filter(v => {
          return (
            v.name == item &&
            v.cover &&
            v.introduce.length > 3 &&
            v.num &&
            v.tag &&
            v.url
          );
        });
        if (result.length == 0) {
          this.$toast("抱歉，未找到此书");
        } else {
          let res = result.slice(0, 1);
          this.$store.commit("getBookDetail", res[0]);
          this.$router.push("/bookdetail");
          // console.log("this.$store.state.bookdetail--->",this.$store.state.bookdetail);
        }
      } else if (getbookdetail.code == 1) {
        this.$toast("抱歉，未找到此书");
        // console.log("抱歉，未找到此书");
      }
    },
    async cpnClick(item) {
      let getbookdetail = await zgaxios("GET", bookDetail + item);
      console.log("搜索到的书籍", getbookdetail);
      if (getbookdetail.code == 0) {
        let result = getbookdetail.list.filter(v => {
          return (
            v.name == item &&
            v.cover &&
            v.introduce.length > 3 &&
            v.num &&
            v.tag &&
            v.url &&
            v.author
          );
        });
        if (result.length == 0) {
          this.$toast("抱歉，未找到此书");
        } else {
          let res = result.slice(0, 1);
          this.$store.commit("getBookDetail", res[0]);
          this.$router.push("/bookdetail");
          // console.log("this.$store.state.bookdetail--->",this.$store.state.bookdetail);
        }
      } else if (getbookdetail.code == 1) {
        this.$toast("抱歉，未找到此书");
        // console.log("抱歉，未找到此书");
      }
    },
    onClickLeft() {
      history.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
#sortresult {
  /deep/.booklineone {
    margin-top: 10px;
    border-bottom: 1px solid #d3d3d3;
    .bookp {
      width: 90px !important;
      height: 120px !important;
      box-shadow: 0 0 3px 3px #d3d1d1;
    }
  }
  /deep/.van-nav-bar {
    background-color: #ce5655;
    .van-nav-bar__left {
      .van-icon {
        color: #fff;
        font-size: 24px;
        font-weight: bolder;
      }
      .van-nav-bar__text {
        color: #fff;
        font-size: 16px;
      }
    }
    .van-nav-bar__title {
      color: #fff;
      font-size: 20px;
      font-weight: 550;
    }
  }
}
</style>

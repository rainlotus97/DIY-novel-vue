<template>
  <div id="dailyrecpage">
    <van-nav-bar title="每日推荐" left-text="返回" left-arrow @click-left="onClickLeft" />
    <div class="titlebg">
      <img src="@/assets/images/dailyrecommend/titlebg.jpg" alt />
      <div class="date">{{date}}</div>
    </div>
    <div
      class="booklineone"
      v-for="(item,index) in recbooks"
      :key="index"
      @click="getbook(item.Title)"
    >
      <booklineone>
        <div slot="bookpic">
          <img class="bookp" :src="item.Cover" alt />
        </div>
        <div slot="booktitle">
          <div slot="bookname" class="botleft">{{item.Title}}</div>
        </div>
        <div slot="bookintro">{{item.ShortIntro}}</div>

        <div slot="bookauthor" class="botleft">{{item.Author}}</div>
        <div slot="bookcate" class="botright">{{item.MinorCate}}</div>
      </booklineone>
    </div>
  </div>
</template>

<script>
import booklineone from "@/components/bookmall/bookdistributionone/bookline";
import zgaxios from "@/tools/zgaxios";
import { dailyrecommend, bookDetail } from "@/tools/allApi";
export default {
  data() {
    return {
      recbooks: [],
      date: ""
    };
  },
  components: {
    booklineone
  },
  created() {
    this.getrecbooks();
    this.getDate();
  },
  mounted() {},
  methods: {
    async getbook(item) {
      let getbookdetail = await zgaxios("GET", bookDetail + item);
      console.log(item);
      
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
        let res = result.slice(0, 1);
         this.$store.commit("getBookDetail", res[0]);
        this.$router.push("/bookdetail")
        console.log(this.$store.state.bookdetail);
      } else if (getbookdetail.code == 1) {
         this.$toast("抱歉，未找到此书");
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
        let res = result.slice(0, 1);
          this.$store.commit("getBookDetail", res[0]);
        this.$router.push("/bookdetail")
        console.log(this.$store.state.bookdetail);
      } else if (getbookdetail.code == 1) {
        this.$toast("抱歉，未找到此书");
      }
    },
    onClickLeft() {
      history.go(-1);
    },
    async getrecbooks() {
      let result = await zgaxios("GET", dailyrecommend);
      console.log(result);
      this.recbooks = result.data;
      this.recbooks.forEach(v => {
        v.Cover = "http://statics.zhuishushenqi.com" + v.Cover;
      });
      console.log(this.recbooks);
    },
    getDate() {
      console.log(new Date());
      let dates = new Date();
      this.date = dates.toString().split(" ")[2];
      console.log(this.date);
    }
  }
};
</script>

<style lang="scss" scoped>
#dailyrecpage {
  /deep/.van-nav-bar {
    background-color: #ff5b77;
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
  .titlebg {
    width: 100%;
    position: relative;
    img {
      width: 100%;
    }
    .date {
      position: absolute;
      top: 75px;
      text-align: center;
      left: 25px;
      /* border: 1px solid red; */
      font-size: 30px;
      font-weight: bolder;
      color: #eb4040;
    }
  }
  /deep/.booklineone {
    margin-top: 10px;
    border-bottom: 1px solid #d3d3d3;
    .bookp {
      width: 90px !important;
      height: 120px !important;
      box-shadow: 0 0 3px 3px #d3d1d1;
    }
  }
}
</style>

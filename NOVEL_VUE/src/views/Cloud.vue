<template>
  <div id="cloud" class="container">
    <nav-bar ref="changenavcolor">
      <div slot="center-item">
        <div class="picdv">
          <img class="pic" src="@/assets/images/fangdajing/fangdajing.png" alt />
        </div>
        <input type="text" name class="inputs" placeholder="重生之顶级人生" @click="toSearch"/>
      </div>
      <div slot="right-item">
        <div class="shucheng">云村</div>
      </div>
    </nav-bar>
    <div class="masonry">
      <div class="item" v-for="(item,index) in cloudbooks" :key="index"  @click="cpnClick(item.title)">
        <img :src="'http://pt.yuenov.com:15555'+item.coverImg" alt />
        <h2>{{item.title}}</h2>
        <p>{{item.desc}}</p>
      </div>
    </div>
  </div>
</template>

<script>
import zgaxios from "@/tools/zgaxios";
import NavBar from "@/components/navBar/NavBar";
import {
  searchBook,
  hotWord,
  bookDetail,
  bookDirectory,
  hotSelect
} from "@/tools/allApi";
export default {
  name: "Cloud",
  data() {
    return {
      flag: false,
      cloudbooks: []
    };
  },
  components: {
    NavBar
  },
  created() {
    // console.log(this.$store.state.yuenovel);
    this.getcloudbook();
  },
  mounted() {},
  methods: {
    toSearch(){
      this.$store.commit("getSearchInput","")
      this.$router.push("/search")
    },
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
        let res = result.slice(0, 1);
        this.$store.commit("getBookDetail", res[0]);
        this.$router.push("/bookdetail");
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
        this.$router.push("/bookdetail");
        console.log(this.$store.state.bookdetail);
      } else if (getbookdetail.code == 1) {
        this.$toast("抱歉，未找到此书");
      }
    },
    async getcloudbook() {
      this.cloudbooks = this.$store.state.yuenovel.slice(4,28)
      console.log("this.getcloudbook----->", this.cloudbooks);
    }
  }
};
</script>

<style lang="scss" scoped>
body {
  margin: 0;
  padding: 0;
  font-family: Helvetiva;
  
  #cloud {
    background: rgb(90, 87, 87);
    /deep/ #nav-bar {
      background-color: #455473;
      .left {
        width: 0;
        overflow: hidden;
      }
      /deep/.center {
        width: 72%;
        margin-left: 10px;
        background-color: #8792a6;
        position: relative;
        /deep/ .picdv {
          width: 22px;
          height: 33px;
          margin-top: 0px;
          margin-left: 10px;
          padding-top: 7px;
          /deep/ .pic {
            width: 20px;
            height: 20px;
          }
        }
        .inputs {
          position: absolute;
          background-color: #8792a6;
          color: #fff;
          border: none;
          outline: none;
          width: 210px;
          height: 30px;
          top: 2px;
          left: 40px;
        }
        input::-webkit-input-placeholder {
          color: #fff;
        }
        input::-moz-placeholder {
          /* Mozilla Firefox 19+ */
          color: #fff;
        }
        input:-moz-placeholder {
          /* Mozilla Firefox 4 to 18 */
          color: #fff;
        }
        input:-ms-input-placeholder {
          /* Internet Explorer 10-11 */
          color: #fff;
        }
      }
      .right {
        width: 28%;
        // display: block;
        float: right;
        padding-right: 0;

        .shucheng {
          height: 25px;
          width: 40px;
          text-align: center;
          line-height: 25px;
          font-size: 14px;
          font-family: Helvetica;
          color: #fff;
          font-weight: 1000;
          background-color: #8792a6;
          border-radius: 50px;
        }
      }
    }
    .masonry {
      column-count: 2;
      column-gap: 0;

      margin: -10px auto;
      padding: 5px;
      .item {
        width: 95%;
        background: #fff;
        margin: 10px 5px;
        padding: 6px;
        overflow: hidden;
        img {
          display: block;
          width: 100%;
          height: auto;
        }
        h2 {
          word-break: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
        p {
          font-size: 15px;
          font-family: Helvetica;
          word-break: break-word;
          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 4;
          display: -webkit-box;
          -webkit-box-orient: vertical;
        }
      }
    }
  }
}
</style>
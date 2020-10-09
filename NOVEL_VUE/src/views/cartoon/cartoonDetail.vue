<template>
  <div class="box">
    <div v-show="!flag2">
      <van-nav-bar title="漫画详情" left-arrow @click-left="onClickLeft">
        <template #left>
          <van-icon v-if="flag" name="arrow-left" size="18" />
        </template>
      </van-nav-bar>
      <div class="container-box">
        <div class="container-image">
          <img class="img1" v-lazy="list.cover" />
        </div>
        <div class="small-image">
          <img class="img2" v-lazy="list.cover" />
          <div class="textbg">
            <div class="text">
              <div class="text-top-left">{{ list.name }}</div>
              <div class="text-top-right">{{ list.tag }}</div>
              <div class="text-bottom">{{ list.author }}</div>
              <div class="text-money">0.49元/话</div>
            </div>
          </div>
        </div>
      </div>
      <div class="message">
        <div class="message-img">
          <img src="@/assets/images/cartoonImage/timg.jpg" />
        </div>
        <div class="message-text">
          <h2>精彩看点</h2>
        </div>
      </div>
      <div class="wrap">
        <div class="cont">
          <ul class="state">
            <li class="active">
              <img v-image-preview :src="photoFirst" />
            </li>
            <li>
              <img v-image-preview :src="photoSecond" />
            </li>
            <li>
              <img v-image-preview :src="photoThree" />
            </li>
            <li>
              <img v-image-preview :src="photoFour" />
            </li>
            <li>
              <img v-image-preview :src="photoFive" />
            </li>
            <li>
              <img v-image-preview :src="photoSix" />
            </li>
          </ul>
        </div>
      </div>
      <template v-if="isHide">
        <div class="introduction">
          <div class="introduction-left">{{ list.introduce }}</div>
          <div class="introduction-icon">
            <a href="#" @click.stop.prevent="onShow">
              <span class="downArrow"></span>
            </a>
          </div>
        </div>
      </template>
      <template v-else>
        <div class="showBg">
          <div class="showBg-left">{{ list.introduce }}</div>
          <div class="show-btn">
            <a href="#" @click.stop.prevent="onHide">
              <span class="upArrow"></span>
            </a>
          </div>
        </div>
      </template>
      <div class="gray"></div>
      <div class="list" @click="tobookList">
        <div class="list-left">
          <div class="search">查看目录</div>
          <div class="publish" v-if="$store.state.bookList.length>0">
            连载至{{
              $store.state.bookList[$store.state.bookList.length - 1].num
            }}
          </div>
        </div>
        <div class="list-right">
          <span class="upData">更新于{{ list.time }}</span>
          <span class="rightArrow"></span>
        </div>
      </div>
      <div class="gray"></div>

      <div class="foot">
        <div class="foot-left">
          <div class="foot-left-text" @click="linkStart">免费试读</div>
        </div>
        <div class="foot-right">
          <div class="foot-right-text" @click="collect">
            <img src="@/assets/images/cartoonImage/book.png" />
           <span v-show="flag3">加书架</span>
          <span v-show="!flag3">已存在</span>
          </div>
        </div>
      </div>
      <div class="read">本书追友还在读这些书</div>
      <div class="books">
        <div class="booksAll" v-for="item in bookRecommend" :key="item.id">
          <div class="bookImg">
            <img
              v-lazy="'http://statics.zhuishushenqi.com' + item.cover"
              alt=""
            />
          </div>
          <div class="bookTitle">{{ item.title }}</div>
          <div class="bookPerson">{{ item.otherReadRatio }}%读过</div>
        </div>
      </div>
      <div class="random" @click="randomClick">
        <img src="@/assets/images/cartoonImage/random.png" alt="" />
        换一换
      </div>
    </div>
    <transition name="drawLeft">
      <div class="booklist" v-show="flag2">
        <van-nav-bar title="漫画详情" left-arrow @click-left="back2">
          <!-- <template #left>
            <van-icon v-if="flag" name="arrow-left" size="18" />
          </template> -->
        </van-nav-bar>
        <book-list :paramValue="componentName" class="listBook"></book-list>
      </div>
    </transition>
  </div>
</template>
<script>
import zgaxios from "@/tools/zgaxios";
import bookList from "@/components/bookList/bookList";
import {
  cartoonDetail,
  cartoonDirectory,
  cartoonContent,
  cartoonRandom,
  setBooks,
  books,
  delBook,
} from "@/tools/allApi";
export default {
  name: "cartoonDetail",
  data() {
    return {
      flag: false,
      flag2: false,
      flag3: true,
      isHide: true,
      list: [],
      photoFirst: "",
      photoSecond: "",
      photoThree: "",
      photoFour: "",
      photoFive: "",
      photoSix: "",
      photosUrl: "",
      books: [],
      bookRecommend: [],
      componentName: "comicsread",
    };
  },
  async created() {
    await this.getCartoonDetail();
    await this.getCartoonDetailList();
    await this.getCartoonDetailPhotos();
    await this.getcartoonRandom();
    await this.bookList(this.$store.state.bookdetail.url);
    // console.log(this.$store.state.bookList);
  },
  beforeupdate: function () {
    this.randomClick();
  },
  methods: {
    async getCartoonDetail() {
      let result = await zgaxios(
        "GET",
        cartoonDetail + this.$store.state.cartoonTitle
      );
      if(result){
        let res = result.list.filter((item) => {
        if (item.url.charAt(item.url.length - 1) != "/") {
          return item;
        }
      });
      // this.url = res[0].url;
      this.$store.commit("getBookDetail", res[0]);
      }
      
    },
    async getCartoonDetailList() {
      let result = await zgaxios("GET", cartoonDirectory + this.$store.state.bookdetail.url);
      this.list = result.data;
      this.$store.commit("getbookList", result.list);
      this.$store.commit("getbookName", result.data.name);
      this.photosUrl = result.list[0].url;
    },
    async getCartoonDetailPhotos() {
      let result = await zgaxios("GET", cartoonContent + this.photosUrl);
      this.photoFirst = result.list[0].img;
      this.photoSecond = result.list[1].img;
      this.photoThree = result.list[2].img;
      this.photoFour = result.list[3].img;
      this.photoFive = result.list[4].img;
      this.photoSix = result.list[5].img;
    },
    async getcartoonRandom() {
      let res = await zgaxios("GET", cartoonRandom);
      if(res){
         for (let i = 0; i < res.books.length - 2; i = i + 4) {
        this.books.push(res.books.slice(i, i + 4));
      }
      this.bookRecommend = this.books[0];
      }
     
    },
    randomClick() {
      let num = Math.floor(Math.random() * 7);
      this.bookRecommend = this.books[num];
    },
    onShow() {
      this.isHide = false;
    },
    onHide() {
      this.isHide = true;
    },
    onClickLeft() {
      history.go(-1);
    },
    tobookList() {
      console.log("出来吧，神龙！");
      this.flag2 = !this.flag2;
      window.scrollTo(0,0)
    },
    back2() {
      this.flag2 = false;
    },
    async bookList(num) {
      let result = await zgaxios("GET", cartoonDirectory + num);
      this.$store.commit("getbookName", result.data.name);
      this.$store.commit("getbookList", result.list);
    },
    // 点击阅读
    linkStart() {
      let url = this.$store.state.bookList[0].url;
      this.$store.commit("getBookUrl", url);
      this.$router.push("/comicsread");
    },
    // 添加/取消书架功能
    async collect() {
      let { id } = this.$store.state.info.data;
      let allbooks = await zgaxios("GET", books, {
        user_id: id,
      });
      let data = this.$store.state.bookdetail;
      let flag = allbooks.books.some((v) => v.name == data.name);
      //   console.log(id,flag);
      if (this.$store.state.status == "0") {
        this.$router.push("/profile");
      } else {
        if (this.$store.state.info.data.status == "1" && flag == false) {
          let result = await zgaxios("GET", setBooks, {
            user_id: id,
            name: data.name,
            pic: data.cover,
            url: data.url,
          });
          if (result.code == "200") {
            this.$toast("添加成功！");
            this.flag3 = false;
          }
        } else {
          let delbook = await zgaxios("GET", delBook, {
            user_id: id,
            name: data.name,
          });
          this.$toast("取消成功");
          this.flag3 = true;
        }
      }
    },
  },
  components: {
    bookList,
  },
  watch:{
    "$store.state.bookdetail"() {
      this.bookList(this.$store.state.bookdetail.url);
    },
  }
};
</script>
<style lang="scss" scoped>
.box {
  padding-bottom: 50px;
  .van-nav-bar {
    position: fixed;
    top: 0;
    width: 100%;
    /deep/.van-nav-bar__title {
      font-weight: 800;
      font-size: 20px;
    }
    /deep/.van-icon {
      color: gray;
    }
  }
  .container-box {
    margin-top: 46px;
    height: 200px;
    position: relative;
    .container-image {
      height: 200px;
      width: 100%;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
      -webkit-filter: blur(15px);
      -moz-filter: blur(15px);
      -o-filter: blur(15px);
      -ms-filter: blur(15px);
      filter: blur(10px);
      .img1 {
        width: 100%;
        height: 100%;
        -webkit-filter: blur(15px);
        -moz-filter: blur(15px);
        -o-filter: blur(15px);
        -ms-filter: blur(15px);
        filter: blur(10px);
        border-radius: 100% 100% 100% 100% / 0% 0% 30% 30%;
      }
    }
    .small-image {
      position: absolute;
      bottom: 0px;
      height: 180px;
      width: 95%;
      left: 50%;
      transform: translateX(-50%);
      overflow: hidden;
      border-radius: 100% 100% 100% 100% / 0% 0% 30% 30%;
      .img2 {
        width: 100%;
        border-radius: 100% 100% 100% 100% / 0% 0% 30% 30%;
      }
      .textbg {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: #000;
        opacity: 0.5;
        border-radius: 100% 100% 100% 100% / 0% 0% 30% 30%;
        .text {
          position: absolute;
          height: 100%;
          top: 0px;
          left: 20px;
          color: white;
          z-index: 1000;
          padding-top: 35px;
          .text-top-left {
            height: 35px;
            width: 100%;
            font-size: 22px;
            font-weight: bolder;
          }
          .text-top-right {
            height: 30px;
            float: left;
            background: red;
            line-height: 30px;
            font-size: 17px;
            text-align: center;
            border-radius: 20px;
          }
          .text-bottom {
            float: left;
            width: 100%;
            height: 20px;
            font-size: 17px;
          }
          .text-money {
            float: left;
            font-size: 17px;
            margin-top: 8px;
          }
        }
      }
    }
  }
  .message {
    width: 90%;
    margin: 0 auto;
    .message-img {
      float: left;
      height: 50px;
      width: 50px;
      img {
        width: 50px;
        height: 50px;
      }
    }
    .message-text {
      float: left;
      margin-top: 14px;
      margin-left: 10px;
    }
  }
  .wrap {
    overflow: hidden;
    width: 100%;
    margin: 0 auto;
    height: 180px;
    .cont {
      overflow-x: auto;
      overflow-y: hidden;
      position: relative;
      height: 160px;
      .state {
        left: 0px;
        top: 0px;
        position: absolute;
        height: 180px;
        overflow-x: auto;
        white-space: nowrap;
        display: flex;
        li {
          margin-left: 10px;
          img {
            width: 105px;
            height: 150px;
          }
        }
      }
    }
  }
  .introduction {
    width: 95%;
    margin: 0 auto;
    .introduction-left {
      width: 100%;
      font-size: 18px;
      color: #858282;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }
    .introduction-icon {
      text-align: right;
      a {
        text-decoration: none;
        .downArrow {
          display: inline-block;
          width: 8px; /* 尺寸不超过字号的一半为宜 */
          height: 8px;
          border-right: 1px solid; /* 画两条相邻边框 */
          border-bottom: 1px solid;
          transform: rotate(45deg); /* 顺时针旋转45° */
          margin-bottom: 3px;
        }
      }
    }
  }
  .showBg {
    width: 95%;
    margin: 0 auto;
    .showBg-left {
      width: 100%;
      font-size: 18px;
      color: #858282;
    }
    .show-btn {
      text-align: right;
      a {
        text-decoration: none;
        .upArrow {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-left: 1px solid;
          border-top: 1px solid;
          transform: rotate(45deg);
          margin-top: 3px;
        }
      }
    }
  }
  .gray {
    width: 100%;
    height: 10px;
    background: rgb(224, 223, 223);
  }
  .list {
    width: 95%;
    margin: 0 auto;
    height: 50px;
    .list-left {
      width: 55%;
      float: left;
      height: 50px;
      .search {
        font-weight: bolder;
        font-size: 14px;
        height: 50px;
        line-height: 50px;
        float: left;
        width: 60px;
      }
      .publish {
        float: left;
        height: 50px;
        width: 60%;
        font-size: 14px;
        color: #858282;
        line-height: 50px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 1;
        -webkit-box-orient: vertical;
        margin-left: 10px;
      }
    }
    .list-right {
      width: 160px;
      float: left;
      height: 50px;
      text-align: right;
      .upData {
        display: inline-block;
        font-size: 15px;
        color: #858282;
        height: 50px;
        line-height: 50px;
        margin-right: 8px;
      }
      .rightArrow {
        display: inline-block;
        width: 8px; /* 尺寸不超过字号的一半为宜 */
        height: 8px;
        border-right: 1px solid; /* 画两条相邻边框 */
        border-bottom: 1px solid;
        transform: rotate(-45deg); /* 顺时针旋转45° */
        margin-bottom: 1px;
        margin-right: 10px;
      }
    }
  }
  .foot {
    position: fixed;
    bottom: 0;
    width: 100%;
    height: 50px;
    background: #eee;
    z-index: 10;
    .foot-left {
      width: 50%;
      position: relative;
      .foot-left-text {
        position: absolute;
        left: 50%;
        width: 75%;
        transform: translate(-50%);
        // height: 50px;
        border-radius: 40px;
        line-height: 40px;
        background: #3399ff;
        text-align: center;
        font-size: 20px;
        color: white;
        height: 40px;
        top: 5px;
      }
    }
    .foot-right {
      width: 50%;
      position: relative;
      left: 50%;
      .foot-right-text {
        position: absolute;
        left: 50%;
        width: 75%;
        transform: translateX(-50%);
        text-align: center;
        height: 50px;
        line-height: 50px;
        font-size: 20px;
        color: #3399ff;
        border-radius: 40px;
        img {
          width: 30px;
          height: 30px;
          position: absolute;
          top: 50%;
          transform: translate(-100%, -50%);
        }
      }
    }
  }
  .read {
    width: 95%;
    margin: 0 auto;
    font-size: 17px;
    font-weight: bolder;
    height: 50px;
    line-height: 50px;
    border-bottom: 1px solid #ccc;
    color: rgb(110, 108, 108);
  }
  .books {
    padding: 20px;
    width: 100%;
    display: flex;
    flex-wrap: wrap; //超出父盒子宽度换行
    justify-content: space-between;
    .booksAll {
      padding: 5px;
      width: 25%;
      .bookImg {
        width: 100%;
        height: 100px;
        img {
          width: 100%;
          height: 100px;
          box-shadow: 0 0 3px 3px #d3d1d1;
        }
      }
      .bookTitle {
        font-size: 13px;
        height: 20px;
        line-height: 20px;
        font-weight: bolder;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .bookPerson {
        color: #858582;
      }
    }
  }
  .random {
    text-align: center;
    border-top: 1px solid #ccc;
    height: 50px;
    line-height: 50px;
    color: red;
    font-size: 15px;
    position: relative;
    img {
      width: 20px;
      height: 20px;
      position: absolute;
      top: 50%;
      left: 38%;
      transform: translate(0, -50%);
    }
  }
  .booklist{
    margin-top: 50px;
  }
}
</style>
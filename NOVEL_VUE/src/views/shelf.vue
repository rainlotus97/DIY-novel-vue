<template>
  <div class="containers">
    <div class="title">
      <ul>
        <li>
          <van-icon name="passed" />
        </li>
        <li>
          <van-icon name="search" @click="add" />
        </li>
        <li>
          <van-icon name="clock-o" />
        </li>
        <li>
          <van-icon name="ellipsis" />
        </li>
      </ul>
    </div>
    <div class="recommend">
      <img src="@/assets/images/shelf/1.jpg" alt />
      <div class="introduce">
        <span>贴身家丁</span>
        <p>精品家丁文。</p>
        <a href="#"> <van-icon name="column" />去阅读 </a>
      </div>
    </div>

    <div class="book-shelf" v-show="data.length > 0">
      <div class="book-img" v-for="item in data" :key="item.name">
        <img :src="item.pic" />
        <p>{{ item.name }}</p>
      </div>
      <div class="book-img" @click="add">
        <div class="add">
          <van-icon name="plus" />
        </div>
      </div>
    </div>
    <div class="bookshelf" v-show="data.length == 0">
      <img src="@/assets/images/shelf/2.jpg" alt width="350px" height="200px" />
      <van-button type="danger" @click="add">去添加喜欢的书吧</van-button>
    </div>
  </div>
</template>


<script>
// import NavBar from '../components/navBar/NavBar'
import zgaxios from "../tools/zgaxios";
// import {sendcode,codePhoneLogin} from '../tools/allApi'
import { books } from "../tools/allApi";

export default {
  name: "shelf",
  data() {
    return {
      data: [],
    };
  },
  created() {
    this.getbooks();
  },
  components: {
    // NavBar
  },
  mounted() {},
  methods: {
    async getbooks() {
      if(this.$store.state.info!={}){
         let result = await zgaxios("get", books, {
        user_id: this.$store.state.info.data.id,
      });
      var res = result.books;
      this.data = [...this.data, ...res];
      }
     
    },
    add() {
      this.$store.commit("getSearchInput","")
      this.$router.push("/search");
    },
  },
};
</script>

<style lang='scss' scoped>
.containers{
  margin-bottom: 49px;
}
.title {
  width: 100%;
  height: 60px;
  background-color: #a60a0b;
  ul {
    list-style: none;
    width: 50%;
    height: 100%;
    float: right;
    li {
      width: 25%;
      height: 100%;
      display: block;
      float: left;
      font-size: 25px;
      text-align: center;
      line-height: 60px;
      color: white;
    }
  }
}
.title::after,.recommend::after,.book-shelf {
  display: table;
  content: '';
  clear: both;
}
.recommend {
  width: 90%;
  height: 150px;
  margin: 20px auto;
  box-shadow: 2px 2px 2px 2px #cccccc;
  border-radius: 10px;
  img {
    width: 90px;
    height: 120px;
    margin-top: 15px;
    margin-left: 10px;
  }
  .introduce {
    float: right;
    margin-top: 20px;
    margin-right: 130px;
    span {
      font-size: 18px;
    }
    p {
      font-size: 16px;
      margin-top: 18px;
    }
    a {
      font-size: 18px;
      margin-top: 18px;
      display: block;
      color: #ea534c;
      position: relative;
      .van-icon,
      .van-icon-column {
        float: left;
        display: block;
        margin-top: 4px;
      }
    }
  }
}

.bookshelf {
  width: 90%;
  margin: 20px auto;
  position: relative;
  .img {
    position: absolute;
    left: 10px;
  }
  .van-button {
    border-radius: 20px;
    margin-left: 90px;
    margin-top: 20px;
    background-color: #ef4746;
  }
}
.book-shelf {
  width: 100%;

  .book-img {
    width: 100px;
    height: 200px;
    float: left;
    // padding: 5px;
    margin-left: 18px;
    margin-bottom: 15px;
    img {
      width: 100%;
      height: 70%;
      border-radius: 10px 20px 10px 20px;
      box-shadow: 2px 2px 2px 2px #cccccc;
    }
    p {
      font-size: 16px;
      // text-align: center;
      font-weight: 100px;
      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
    }
    .add {
      width: 100%;
      height: 70%;
      border-radius: 10px 20px 10px 20px;
      background-color: #edf1f4;
      font-size: 30px;
      text-align: center;
      line-height: 140px;
    }
  }
}
</style>
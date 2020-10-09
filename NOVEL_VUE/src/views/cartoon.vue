<template>
  <div class="container">
    <nav-bar>
      <div slot="center-item">
        <div class="center-icon">
          <img class="image" src="@/assets/images/cartoonImage/search.png" alt />
        </div>
        <input type="text" class="inputs" placeholder="团宠锦鲤在七零" @click="toSearch" />
      </div>
      <div slot="right-item">
        <div class="books">书城</div>
      </div>
    </nav-bar>
    <div class="container-box">
      <div class="container-image">
        <img src="@/assets/images/cartoonImage/1.png" />
      </div>
    </div>
    <cartoon-component ></cartoon-component>
  </div>
</template>
<script>
import NavBar from "@/components/navBar/NavBar.vue";
import cartoonComponent from "@/views/cartoon/cartoonComponent.vue";
export default {
  name: "cartoon",
  data() {
    return{
      
    }
  },
  methods:{
    toSearch(){
      this.$store.commit("getSearchInput","")
      this.$router.push("/search")
    }
  },
  components: {
    NavBar,
    cartoonComponent
  },
  mounted() {},
  
};
</script>

<style lang="scss" scoped>
  .container {
    /deep/#nav-bar {
      position: fixed;
      left: 0;
      top: 0;
      display: flex;
      padding: 5px 10px;
      width: 100%;
      align-items: center;
      background-color: #ef4746;
      z-index: 100;
      .left {
        width: 0;
        overflow: hidden;
      }
      .right {
        margin-left: 20px;
        width: 15%;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: white;
        border-radius: 20px;
        .books {
          font-size: 15px;
          color: red;
          font-weight: bolder;
        }
      }
      .center {
        border: 1px solid red;
        width: 75%;
        height: 40px;
        border-radius: 20px;
        overflow: hidden;
        background-color: #f58987;
        position: relative;
        .center-icon {
          height: 25px;
          width: 40px;
          position: absolute;
          top: 50%;
          transform: translate(30%, -50%);
          .image {
            width: 25px;
            height: 25px;
          }
        }
        .inputs {
          position: absolute;
          width: 220px;
          height: 30px;
          top: 50%;
          transform: translate(20%, -50%);
          outline: none;
          border: none;
          background-color: #f58987;
        }
        .inputs::-webkit-input-placeholder {
          color: #fff;
          font-size: 14px;
        }
        /* Mozilla Firefox 4 to 18 */
        .inputs:-moz-placeholder {
          color: #fff;
          opacity: 1;
          font-size: 14px;
        }
        /* Mozilla Firefox 19+ */
        .inputs::-moz-placeholder {
          color: #fff;
          opacity: 1;
          font-size: 14px;
        }
        /* Internet Explorer 10+ */
        .inputs:-ms-input-placeholder {
          color: #fff;
          font-size: 14px;
        }
      }
    }
    .container-box {
      height: 120px;
      background-color: #ef4746;
      position: relative;
      border-radius: 100% 100% 100% 100% / 0% 0% 30% 30%;
      .container-image {
        height: 150px;
        width: 90%;
        position: absolute;
        top: 10px;
        left: 50%;
        transform: translateX(-50%);
        overflow: hidden;
        img {
          width: 100%;
          height: 100%;
          border-radius: 10px;
        }
      }
    }
  }
</style>
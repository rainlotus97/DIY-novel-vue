<template>
  <div id="bookline" >
    <div>
      <div class="pic">
      <slot name="bookpic"></slot>
    </div>
    <div class="info">
      <div class="title">
        <slot name="booktitle"></slot>
      </div>
      <div class="intro">
        <slot name="bookintro"></slot>
      </div>
      <div class="author">
        <div class="bookauthor">
          <slot name="bookauthor"></slot>
        </div>
        <div class="bookcate">
          <slot name="bookcate"></slot>
        </div>
      </div>
    </div>
    </div>
    
  </div>
</template>

<script>
export default {
  name: "booklineone",
  methods:{
  }
};
</script>

<style lang="scss" scoped>
#bookline {
  width: 90%;
  margin: 0 auto 10px;
  height: 135px;
  //   background-color: #d3d3d3;
  .pic {
    width: 30%;
    height: 90%;
    float: left;
    img {
      width: 100%;
      height: 80%;
    }
    // border: 1px solid black;
  }
  .info {
    float: left;
    width: 70%;
    height: 100%;

    .title {
      width: 100%;
      height: 20%;
      padding-left: 10px;
      line-height: 27px;
      font-size: 14px;
      font-weight: bolder;
      //   border: 1px solid black;
    }
    .intro {
      width: 100%;
      height: 50%;
      padding-left: 10px;
      padding-top: 8px;
      line-height: 18px;
      color: #aaaaac;
      letter-spacing: 1px;
      div {
        word-break: break-word;
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 3;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        //   border: 1px solid black;
      }
    }
    .author {
      width: 100%;
      height: 30%;
      padding-left: 10px;
      line-height: 45px;
      color: #b5b5b7;
      .bookauthor {
        width: 50%;
        float: left;
      }
      .bookcate {
        width: 26%;
        height: 50%;
        float: right;
        margin-top: 12px;

        /*  padding-right: 20px; */
        border: 1px solid #b5b5b7;
        .botright {
          width: 100%;
          height: 100%;
          line-height: 1.7;
          text-align: center;
        }
      }
      //   border: 1px solid black;
    }
  }
}
</style>
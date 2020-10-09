<template>
  <div id="booksort">
    <div class="disflex">
      <div class="bookpic floatleft">
        <slot name="bookpic"></slot>
      </div>

      <div class="floatleft bookdet">
        <div class="bookname">
          <slot name="bookname"></slot>
        </div>
        <div class="booktype">
          <slot name="booktype"></slot>
        </div>
        <div class="bookwordcount">
          <slot name="bookwordcount"></slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "booklinetwo"
};
</script>

<style lang="scss" scoped>
#booksort{
    .disflex{
        position: relative;
        .floatleft{
            float: left;
        }
        .bookpic{
            width: 80px;
        }
        .bookdet{
            width: 77px;
            margin-left: 6px;
            .bookname{
                font-size: 15px;
                font-weight: 500;
                font-family: Helvetica;
            }
        }
        .booktype{
            width: 35px;
            height: 16px;
            line-height: 16px;
            border: 1px solid #d3d3d3;
            position: absolute;
            font-size: 10px;
            top: 55px;
            border-radius: 4px;
            text-align: center;
        }
        .bookwordcount{
            color: red;
            position: absolute;
            top: 92px;
            width: 70px;
            height: 16px;
            font-size: 14px;
            font-weight: bolder;
        }
    }
}


</style>
<template>
  <div id="fourbooks">
    <div class="disflex">
      <div class="bookpic">
        <slot name="bookpic"></slot>
      </div>
      <div class="bookdet">
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
  name: "booklinethree"
};
</script>

<style lang="scss" scoped>
#fourbooks{
    .disflex{
        /* position: relative; */
        .floatleft{
            float: left;
        }
        .bookpic{
            width: 75px;
            box-shadow: 0 0 3px 3px #bbbaba;
        }
        .bookdet{
            width: 77px;
           /*   */
            /* margin-left: 6px; */
            .bookname{
                font-size: 15px;
                font-weight: 500;
                height: 40px;
                font-family: Helvetica;
            }
        }
        /* .booktype{
            width: 35px;
            height: 16px;
            line-height: 16px;
            border: 1px solid #d3d3d3;
           
            font-size: 10px;
            
            border-radius: 4px;
            text-align: center;
        } */
        .bookwordcount{
            color: red;
            /* position: absolute; */
            margin-top: 14px;
            /* top: 92px; */
            width: 70px;
            height: 16px;
            font-size: 14px;
            font-weight: bolder;
        }
    }
}


</style>
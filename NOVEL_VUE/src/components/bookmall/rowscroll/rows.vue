<template>
  <div id="scrollrow">
    <div class="wrap">
      <div class="cont">
        <div class="state">

          <div class="active">
            <div class="titlebgc">
              <img class="changxiaobgc" src="@/assets/images/jingxuanzuire/zuirebgc.png" alt />
              <div class="info1">男频最热榜</div>
              <div class="info2">本周书籍热度排行</div>
              <div class="titlebg">
                <img class="changxiaobg" src="@/assets/images/jingxuanzuire/zuirebg.png" alt />
              </div>
            </div>
            <slot name="bookrank2">
              <div class="bookrank">
                <slot name="rank1">
                  <!-- <img class="rank" src="@/assets/images/rank/1.png" alt /> -->
                </slot>
                <slot name="ign1">
                  <!-- <div class="ign">你活着补刀就是对我最大的侮辱</div> -->
                </slot>
              </div>
            </slot>
          </div>

          <div class="active">
            <div class="titlebgc">
              <img class="changxiaobgc" src="@/assets/images/jinxuanchangxiao/changxiao.png" alt />
              <div class="info1">男频畅销榜</div>
              <div class="info2">热卖好书读不停</div>
              <div class="titlebg">
                <img class="changxiaobg" src="@/assets/images/jinxuanchangxiao/changxiaobg.png" alt />
              </div>
            </div>
            <slot name="bookrank1">
              <div class="bookrank">
                <slot name="rank1">
                  <img class="rank" src="@/assets/images/rank/1.png" alt />
                </slot>
                <slot name="ign1">
                  <div class="ign">你活着补刀就是对我最大的侮辱</div>
                </slot>
              </div>
            </slot>
          </div>

          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "rowscroll"
};
</script>

<style lang="scss" scoped>
#scrollrow {
  background-color: #f5f5f5;
  width: 100%;
  height: 320px;
  .wrap {
    overflow: hidden;
    height: 320px;
    .cont {
      height: 340px;
      overflow-x: auto;
      overflow-y: hidden;
      position: relative;
      .state {
        left: 0px;
        top: 0px;
        position: absolute;
        overflow-x: auto;
        white-space: nowrap;
        display: flex;
        .active {
          display: inline-block;
          font-size: 13px;
          margin: 20px 0 10px 20px;
          width: 260px;
          height: 280px;
          background-color: #fff;
          border-radius: 7px;
          box-shadow: 2px 3px 16px #e3e3e3;
          .titlebgc {
            position: relative;
            color: #fff;
            .changxiaobgc {
              width: 260px;
            }
            .info1 {
              position: absolute;
              top: 12px;
              font-size: 16px;
              left: 15px;
              letter-spacing: 1px;
            }
            .info2 {
              position: absolute;
              top: 40px;
              font-size: 13px;
              letter-spacing: 1px;
              left: 15px;
            }
            .titlebg {
              position: absolute;
              top: -30px;
              right: 0;
              .changxiaobg {
                width: 100px;
              }
            }
          }
          .bookrank {
            position: relative;
            height: 41px;
            width: 130px;
            line-height: 40px;

            .rank {
              position: absolute;
              top: 5px;
              left: 10px;
              width: 23px;
            }
            .ign {
              max-width: 140px;
              position: absolute;
              font-size: 13px;
              letter-spacing: 1px;
              top: 0;
              left: 40px;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            }
          }
        }
        .active:nth-of-type(2) {
          margin-right: 20px;
        }
      }
    }
  }
}
</style>

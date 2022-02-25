<template>
  <div class="details">
    <div
      @click="returnfun()"
      style="cursor: pointer;text-align: left;padding: 0.6rem 0 0 0.6rem;"
    >
      <i class="el-icon-back" />返回
    </div>
    <!-- <div class="detailstitle">珠宝详情</div> -->
    <div class="detailsbox">
      <div class="detailsboxleft">
        <el-carousel indicator-position="outside" class="detailsboxleft-img">
          <el-carousel-item v-for="item in imgurllist" :key="item">
            <img :src="img + '/admin/file/image/' + item" alt="" />
          </el-carousel-item>
        </el-carousel>
      </div>
      <div class="detailsboxright">
        <div class="right-conent">
          <div class="conentdiv">
            <span>珠宝名称：</span> {{ templatestring[7] }}
          </div>
          <div class="conentdiv">
            <span>珠宝净度：</span>{{ templatestring[1] }}
          </div>
          <div class="conentdiv">
            <span>珠宝颜色：</span>{{ templatestring[2] }}
          </div>
          <div class="conentdiv">
            <span>珠宝切工：</span>{{ templatestring[3] }}
          </div>
          <div class="conentdiv">
            <span>荧光程度：</span>{{ templatestring[4] }}
          </div>
          <div class="conentdiv">
            <span>珠宝尺寸：</span>{{ templatestring[6] }}mm
          </div>
          <div class="conentdiv">
            <span>珠宝切工：</span>{{ templatestring[3] }}
          </div>
        </div>
        <div class="right-conent2">
          <div class="conentdiv">
            <span>参考价格：</span>{{ templatestring[8] }}
          </div>
          <div class="conentdiv">
            <span>珠宝形状：</span>{{ templatestring[10] }}
          </div>
          <div class="conentdiv">
            <span>珠宝切工：</span>{{ templatestring[13] }}
          </div>
          <div
            class="conentdiv"
            v-for="item in Jewellery"
            :key="item.id"
            v-show="item.id == templatestring[12]"
          >
            <span>珠宝种类：</span> {{ item.type }}
          </div>
          <div
            class="conentdiv"
            v-for="item in GemcategoryList"
            :key="item.id"
            v-show="item.id == templatestring[11]"
          >
            <span>宝石品类：</span> {{ item.gem }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, reactive } from "vue";

export default defineComponent({
  props: {
    propsdata: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit }) {
    //   const axios = getCurrentInstance()?.appContext.config.globalProperties.$axios
    const store = getCurrentInstance()?.appContext.config.globalProperties
      .$store;
    const img = store.state.baseUrl;
    const imgurllist: string[] = [];
    const GemcategoryList = reactive([
      { id: 0, gem: "钻石" },
      { id: 1, gem: "黄钻" },
      { id: 2, gem: "红宝石" },
      { id: 3, gem: "星光红宝石" },
      { id: 4, gem: "蓝宝石" },
      { id: 5, gem: "星光蓝宝石" },
      { id: 6, gem: "祖母绿" },
      { id: 7, gem: "尖晶石" },
      { id: 8, gem: "亚历山大石" },
      { id: 9, gem: "金绿宝石" },
      { id: 10, gem: "金绿猫眼石" },
      { id: 11, gem: "粉色蓝宝石" },
      { id: 12, gem: "黄色蓝宝石" },
      { id: 13, gem: "紫色蓝宝石" },
      { id: 14, gem: "白色蓝宝石" },
      { id: 15, gem: "欧泊" },
      { id: 16, gem: "珍珠" },
      { id: 17, gem: "碧玺" },
      { id: 18, gem: "帕拉伊巴碧" },
      { id: 19, gem: "托帕石" },
      { id: 20, gem: "坦桑石" },
      { id: 21, gem: "月光石" },
      { id: 22, gem: "橄榄石" },
      { id: 23, gem: "石榴石" },
      { id: 24, gem: "锰铝榴石" },
      { id: 25, gem: "沙弗莱石" },
      { id: 26, gem: "翠榴石" },
      { id: 27, gem: "摩根石" },
      { id: 28, gem: "海蓝宝石" },
      { id: 29, gem: "堇青石" },
      { id: 30, gem: "锆石" },
      { id: 31, gem: "紫水晶" },
      { id: 32, gem: "绿松石" },
      { id: 33, gem: "象牙" },
    ]);
    const Jewellery = reactive([
      { id: 0, type: "裸石" },
      { id: 1, type: "项链" },
      { id: 2, type: "戒指" },
      { id: 3, type: "手链" },
      { id: 4, type: "胸针" },
      { id: 5, type: "耳环" },
    ]);
    // if (props.propsdata.length > 0) {
    //   //home传递过来的date
    //   sessionStorage.setItem("datastring", props.propsdata);
    // }
    const template: any[] = [props.propsdata?.split(",")];
    console.log("详情数据");

    console.log(template);

    const templatestring = template[0];
    const temp = ref([""]);
    if (templatestring[0].length > 0) {
      //分隔多张图片
      temp.value.push(templatestring[0].split("|"));
    }
    if (templatestring[5].length > 0) {
      //分隔多张图片
      temp.value.push(templatestring[5].split("|"));
    }
    if (templatestring[0].length || templatestring[5].length > 37) {
      temp.value.forEach((element: any) => {
        if (element.length > 0) {
          element.forEach((e: any) => {
            imgurllist.push(e); //图片列表
          });
        }
      });
    }
    function returnfun() {
      emit("bindSend", 0);
    }

    return {
      store,
      templatestring,
      img,
      imgurllist,
      GemcategoryList,
      Jewellery,
      returnfun,
    };
  },
});
</script>
<style lang="scss" scoped>
@media screen and (min-width: 360px) and (max-width: 796px) {
  .details {
    height: 82vh;
    overflow-y: scroll;
    .detailstitle {
      color: #606266;
      // padding: 1rem;
      font-size: 1rem;
    }
    .detailsbox {
      // padding: 2rem;
      display: flex;
      flex-wrap: wrap;
      margin: 0.5rem auto;
      width: 92%;
      margin: auto;
      // box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
      // 2px 2px 3px rgba(0, 0, 0, 0.2);
      .detailsboxleft {
        box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
          2px 2px 3px rgba(0, 0, 0, 0.2);
        border-radius: 1rem;
        margin: 0 auto;
        .detailsboxleft-img {
          width: 12rem;
          height: 12rem;
          padding-top: 1rem;
          img {
            width: 79%;
            //   height: 96%;
            padding: 1rem;
          }
        }
      }
      .detailsboxright {
        margin: 0.5rem 0.5rem;
        text-align: left;
        display: flex;
        font-size: 0.9rem;
        overflow-x: scroll;
        .right-conent {
          width: 24rem;
          .conentdiv {
            padding-bottom: 0.2rem;
          }
        }
        .right-conent2 {
          width: 24rem;
        }
      }
    }
  }
}
@media screen and (min-width: 796px) {
  .detailstitle {
    color: #606266;
    font-size: 1.35rem;
    // margin-left: 22%;
  }
  .detailsbox {
    padding: 2rem;
    display: flex;
    flex-wrap: nowrap;
    width: 92%;
    margin: auto;
    // box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
    //   2px 2px 3px rgba(0, 0, 0, 0.2);
    .detailsboxleft {
      box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
        2px 2px 3px rgba(0, 0, 0, 0.2);
      border-radius: 1rem;
      .detailsboxleft-img {
        width: 22rem;
        height: 23rem;
        img {
          width: 92%;
          //   height: 96%;
          padding: 1rem;
        }
      }
    }
    .detailsboxright {
      margin: 0.5rem 2rem;
      text-align: left;
      display: flex;

      .right-conent {
        margin-left: 6rem;
        width: 24rem;
        .right-title {
          font-size: 1.25rem;
        }
      }
      .conentdiv {
        padding-bottom: 1rem;
      }
      .right-conent2 {
        margin-left: 1rem;
        width: 24rem;
      }
    }
  }
}
.details {
  padding-bottom: 20px;
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.1)
  );
  border-radius: 10px;
  backdrop-filter: blur(8px);
  box-shadow: -3px -4px 5px 0px rgb(247, 245, 245),
    6px 5px 3px rgba(0, 0, 0, 0.2);
}
</style>
<style>
@media screen and (min-width: 360px) and (max-width: 796px) {
  .el-carousel__container {
    height: 152px;
  }
}
</style>

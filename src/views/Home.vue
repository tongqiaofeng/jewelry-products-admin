<template>
  <div class="home" :style="{ width: screenWidth, height: screenHeight }">
    <el-container>
      <el-header style="height: 60px">
        <div style="width: 94%; margin: auto">
          <div class="companyname">B R A N D</div>
          <div @click="logOut" class="loginoutDiv">
            <div style="margin-top: 3px;">
              <img
                src="../assets/img/logOut.png"
                style="width: 20px;height: 20px;"
              />
            </div>
            <span class="loginout">退出登录</span>
          </div>
          <div class="companyname2">
            <span>Brand</span>
            <div class="aaa">
              <i class="el-icon-menu" @click="menu"></i>
              <div class="aside2" v-show="shownum == 1">
                <div style="margin: 1rem">
                  <div class="backtab"><i class="el-icon-back"></i></div>
                </div>
                <ul>
                  <li class="asideli" @click="management">
                    <i class="el-icon-s-shop"></i> 珠宝管理
                  </li>
                  <li class="asideli" @click="Articlemanagement">
                    <i class="el-icon-s-custom"></i> 设计师管理
                  </li>
                  <li class="asideli" @click="Carouselmapmanagement">
                    <i class="el-icon-picture-outline-round"></i> 轮播图管理
                  </li>
                  <li class="asideli" @click="seriesmanagement">
                    <i class="el-icon-help"></i> 系列管理
                  </li>
                  <li class="asideli" @click="userAdminClick">
                    <i class="el-icon-help"></i> 客户管理
                  </li>
                  <li class="asideli" @click="purchaseClick">
                    <i class="el-icon-help"></i> 销售单管理
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </el-header>

      <el-container>
        <el-aside
          :style="{
            height: screenHeight,
            width: '15vw',
            background: 'radial-gradient(circle at center top,#faf3f3,#d1d9e6)',
          }"
        >
          <ul style="width: 98%; background: rgba(255, 255, 255, 0.1)">
            <li
              class="asideli"
              :style="{
                backgroundColor:
                  selected == 1 || selected == 0 ? '#fff' : '#f4f0f2',
                marginTop: '20px',
              }"
              @click="management"
            >
              珠宝管理
            </li>
            <li
              class="asideli"
              :style="{
                backgroundColor: selected == 3 ? '#fff' : '#f4f0f2',
              }"
              @click="Articlemanagement"
            >
              设计师管理
            </li>
            <li
              class="asideli"
              :style="{
                backgroundColor: selected == 4 ? '#fff' : '#f4f0f2',
              }"
              @click="Carouselmapmanagement"
            >
              轮播图管理
            </li>
            <li
              class="asideli"
              :style="{
                backgroundColor: selected == 5 ? '#fff' : '#f4f0f2',
              }"
              @click="seriesmanagement"
            >
              系列管理
            </li>
            <li
              class="asideli"
              :style="{
                backgroundColor: selected == 6 ? '#fff' : '#f4f0f2',
              }"
              @click="userAdminClick"
            >
              客户管理
            </li>
            <li
              class="asideli"
              :style="{
                backgroundColor: selected == 7 ? '#fff' : '#f4f0f2',
              }"
              @click="purchaseClick"
            >
              销售单管理
            </li>
          </ul>
        </el-aside>
        <el-main>
          <!-- 珠宝管理 -->
          <Management
            v-if="selected == 1 || selected == 0"
            ref="nextManagement"
            :selected="selected"
            @datasent="propdata"
            @bindSend="propMsg"
          ></Management>

          <!-- 设计师管理 -->
          <Articlemanagement
            v-if="selected == 3"
            ref="nextArticlemanagement"
          ></Articlemanagement>

          <!-- 轮播图管理 -->
          <Carouselmapmanagement
            v-if="selected == 4"
            ref="nextCarouselmapmanagement"
          ></Carouselmapmanagement>

          <!-- 系列管理 -->
          <Seriesmanagement
            v-if="selected == 5"
            ref="nextSeriesmanagement"
          ></Seriesmanagement>

          <!-- 客户管理 -->
          <UserAdmin v-if="selected == 6" ref="nextUserAdmin"></UserAdmin>

          <!-- 销售单管理 -->
          <PurchaseRecord
            v-if="selected == 7"
            ref="nextPurchaseRecord"
          ></PurchaseRecord>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script lang="ts">
import Management from "@/components/Management.vue";
import Articlemanagement from "@/components/Articlemanagement.vue";
import Carouselmapmanagement from "@/components/Carouselmapmanagement.vue";
import Seriesmanagement from "@/components/Seriesmanagement.vue";
import UserAdmin from "@/components/User-admin.vue";
import PurchaseRecord from "@/components/Purchase-record.vue";

import { getCurrentInstance, defineComponent, ref } from "vue";

import router from "../router/index";

export default defineComponent({
  name: "Home",
  components: {
    Management,
    Articlemanagement,
    Carouselmapmanagement,
    Seriesmanagement,
    UserAdmin,
    PurchaseRecord,
  },
  setup() {
    const screenWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth + "px";
    const screenHeight = document.documentElement.clientHeight - 60 + "px";
    const selected = ref(0);
    const propsdata = ref("");
    const nextManagement: any = ref(null);
    const nextArticlemanagement: any = ref(null);
    const nextCarouselmapmanagement: any = ref(null);
    const nextSeriesmanagement: any = ref(null);
    const store = getCurrentInstance()?.appContext.config.globalProperties
      .$store;
    const shownum = ref(1);
    // const aaa: any = document.getElementsByClassName('aaa')
    //  con[0].style.dispaly="block"
    function menu() {
      shownum.value = 1;
    }

    function management() {
      selected.value = 1;
      const a = ref(0);
      if (a.value != 0) {
        nextManagement.value.searchName = "";
        nextManagement.value.searchStone = "";
        nextManagement.value.searchType = "";
        nextManagement.value.dialogsefun(); //刷新页面
        // nextManagement.value.indexc = 0
        // nextManagement.value.dialogse = false
      }
      a.value++;
      if (screenWidth <= 796) {
        shownum.value = 0;
      }
    }

    function Articlemanagement() {
      selected.value = 3;
      const c = ref(0);
      if (c.value != 0) {
        nextArticlemanagement.value.list();
        // nextArticlemanagement.value.selected=1
      }
      c.value++;
      if (screenWidth <= 796) {
        shownum.value = 0;
      }
    }

    function propMsg(msg: number) {
      selected.value = msg;
      console.log(msg + "msg");
    }

    function propdata(params: any) {
      //子组件传递的参数
      propsdata.value = params;
      console.log(propsdata.value);
      console.log(typeof propsdata.value);
    }
    const i = ref(0);

    function Carouselmapmanagement() {
      selected.value = 4;
      if (i.value != 0 && nextCarouselmapmanagement.value != null) {
        nextCarouselmapmanagement.value.indexc = 1;
      }
      i.value++;
      if (screenWidth <= 796) {
        shownum.value = 0;
      }
    }
    const b = ref(0);

    function seriesmanagement() {
      selected.value = 5;
      if (b.value != 0 && nextSeriesmanagement.value != null) {
        nextSeriesmanagement.value.index = 1;
      }
      b.value++;
      if (screenWidth <= 796) {
        shownum.value = 0;
      }
    }

    function userAdminClick() {
      selected.value = 6;
    }

    function purchaseClick() {
      selected.value = 7;
    }

    // 退出登录
    function logOut() {
      router.push("/");
      console.log(store);

      store.dispatch("setToken", null);
    }

    return {
      logOut,
      screenWidth,
      screenHeight,
      management,
      Articlemanagement,
      selected,
      propMsg,
      propdata,
      propsdata,
      Carouselmapmanagement,
      seriesmanagement,
      userAdminClick,
      purchaseClick,
      nextManagement,
      nextArticlemanagement,
      nextCarouselmapmanagement,
      nextSeriesmanagement,
      shownum,
      menu,
    };
  },
});
</script>
<style lang="scss" scoped>
@media screen and (min-width: 360px) and (max-width: 796px) {
}

@media screen and (min-width: 796px) {
  .el-aside {
    background-color: #ffffff;
    color: #333;
    text-align: center;

    // line-height: 200vw;
    // box-shadow: inset 10px 7px 30px #d1d9e6, inset -1px -7px 10px #fff;
    .asideli {
      height: 4.5vw;
      line-height: 4.5vw;
      border-radius: 30px;
      box-shadow: 3px 7px 6px rgba(0, 0, 0, 0.1), -4px -3px 6px white;
      margin: 20px auto;
      cursor: pointer;
    }

    .asideli:hover {
      box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.2),
        inset -2px -2px 3px rgba(255, 255, 255, 0.8);
    }
  }

  body > .el-container {
    margin-bottom: 4vw;
  }
}
</style>
<style lang="scss">
.loginoutDiv {
  display: flex;
  line-height: 80px;
  position: absolute;
  top: 0;
  right: 10%;
  cursor: pointer;
}

.el-header {
  position: relative;
}

.el-aside {
  position: absolute;
  left: 0;
  top: 60px;
  bottom: 0;
  // min-height: 859px;
}

.el-aside::-webkit-scrollbar {
  width: 0;
}

.el-main {
  position: absolute;
  right: 0;
  top: 60px;
  bottom: 0;
  overflow-y: scroll;
}

.el-dialog__header {
  padding: 20px 20px 10px;
  text-align: center;
}

@media screen and (min-width: 796px) {
  .home {
    .aside2 {
      display: none;
    }
  }

  .el-main {
    left: 15vw;
    background-color: #f2f2f3;
    color: #333;
    text-align: center;
    // padding-top: 0;
    background: url("../assets/img/bg.jpg") no-repeat;
    background-size: 100% 100%;
  }

  .home {
    .el-button + .el-button,
    .el-checkbox.is-bordered + .el-checkbox.is-bordered {
      margin-left: 15px;
    }
    .el-header {
      padding: 0;
      width: 100%;
      background-color: rgb(247, 245, 245);

      .companyname {
        width: 100%;
        line-height: 60px;
        text-align: center;
        font-family: "Oswald";
        font-size: 3.25rem;
        font-weight: bold;

        color: rgb(248, 248, 248);
        text-shadow: -5px -4px 2px #fff, 7px 1px 4px #d1d9e6;
      }

      .companyname2 {
        display: none;
      }
    }
  }
}

@media screen and (max-width: 795px) {
  .home {
    background-image: url("../assets/img/bg2.png");

    .el-aside {
      display: none;
    }

    .el-main {
      left: 0;
      // background-color: #f2f2f3;
      color: #333;
      text-align: center;
      padding-top: 0;
    }

    .el-header {
      padding: 0;
      color: #333;
      text-align: center;
      width: 100%;
      height: 50px;
      font-family: monospace;
      font-size: 3.25rem;
      font-weight: bold;
      color: #f4f0f2;
      // backdrop-filter: blur(6px);
      position: relative;

      .companyname2 {
        margin: auto;
        line-height: 50px;
        display: flex;
        justify-content: space-between;

        span {
          text-shadow: 2px 2px 2px #fff, 3px 1px 4px #d1d9e6;
        }
      }
    }

    .el-icon-menu {
      font-size: 1.8rem;
      line-height: 50px;
    }

    .el-icon-menu:hover {
      transform: translate(0, -10px);
      box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
    }

    .aside2 {
      width: 80%;
      height: 100vh;
      position: absolute;
      right: 0;
      top: 0;
      transition: all 0.5s;
      z-index: 99999999;
      display: none;
      backdrop-filter: blur(6px);
      box-shadow: 2px 2px 3px rgba(0, 0, 0, 0.2),
        -2px -2px 3px rgba(255, 255, 255, 0.8);

      ul {
        font-size: 1.4rem;
        text-align: left;
        width: 70%;
        margin: auto;
        list-style: none;
        color: #919090;

        .asideli {
          cursor: pointer;
        }
      }

      .backtab {
        width: 2rem;
        height: 2rem;
        font-size: 1.25rem;
        line-height: 2rem;
        text-align: center;
        border-radius: 100%;
        box-shadow: 9px 9px 18px rgba(0, 0, 0, 0.1),
          -9px -9px 18px rgba(255, 255, 255, 1);
      }

      .backtab:hover {
        box-shadow: inset 9px 9px 18px rgba(0, 0, 0, 0.1),
          inset -9px -9px 18px rgba(255, 255, 255, 1);
      }

      .backtab:active {
        .aside2 {
          display: none;
        }
      }
    }

    .aaa:hover {
      .aside2 {
        display: block;
      }
    }

    .companyname {
      display: none;
    }
  }
}

.home {
  .el-button {
    // width: 8rem;
    background-color: #f0eeee;
    box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
      2px 2px 3px rgba(0, 0, 0, 0.2);
    border: none;
    color: #606266;
  }

  .el-button:hover {
    box-shadow: inset 2px 2px 3px rgba(0, 0, 0, 0.2),
      inset -2px -2px 3px rgba(255, 255, 255, 0.8);
    color: #919090;
  }

  .el-button:active {
    color: #606266;
  }
}

.el-pagination button:disabled {
  color: #c0c4cc;
  background-color: transparent;
  cursor: not-allowed;
}

.el-pager li {
  background: transparent;
}

.el-pagination .btn-next,
.el-pagination .btn-prev {
  background: center center no-repeat transparent;
}
</style>

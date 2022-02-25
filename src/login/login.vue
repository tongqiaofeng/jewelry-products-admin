<template>
  <div class="bg" :style="{ height: screenHeight }">
    <div class="card" @keydown="keyLogin($event)">
      <div class="front">
        <form style="padding-top: 20px;">
          <img src="../assets/img/logo01.png" id="logo" /><br />
          <div class="inputText" id="id">
            <input type="text" required maxlength="15" v-model="username" />
            <span data-placeholder="Username"></span>
          </div>
          <div class="inputText" id="password">
            <input
              :type="passwordtype"
              required
              pattern=".{6,}"
              title="Password less than six digits"
              maxlength="16"
              v-model="psw1"
            />
            <span data-placeholder="Password"></span>
            <i
              class="el-icon-view"
              @click="changepassword"
              style="line-height: 40px"
            />
          </div>
          <button class="button" type="button" @click="login1()">登录</button>
        </form>
      </div>
    </div>
    <div class="loading" v-if="isload == true"></div>
  </div>
</template>
<script lang="ts">
import $ from "jquery";
import router from "../router/index";
import md5 from "js-md5";
import { defineComponent, ref, getCurrentInstance } from "vue";

export default defineComponent({
  name: "login",
  props: {},
  components: {},
  setup() {
    console.log(getCurrentInstance());

    const axios = getCurrentInstance()?.appContext.config.globalProperties
      .$axios;
    console.log(axios);

    const store = getCurrentInstance()?.appContext.config.globalProperties
      .$store;
    const message = getCurrentInstance()?.appContext.config.globalProperties
      .$message;

    console.log(md5("test"));
    $(function() {
      $(".card p").click(function() {
        $(".front").toggleClass("front-turn");
        $(".back").toggleClass("back-turn");
      });
      $(".inputText input").on("focus", function() {
        $(".inputText input").addClass("focus");
        console.log("on");
      });
      $(".inputText input").on("blur", function() {
        if ($(".inputText input").val() == "") {
          $(".inputText input").removeClass("focus");
        }
      });
    });
    const screenWidth = document.documentElement.clientWidth + "px";
    const screenHeight = document.documentElement.clientHeight + "px";
    const passwordtype = ref("password");
    const isload = ref(false);
    const username = ref("");
    const psw1 = ref("");
    const psw2 = ref("");
    console.log(isload.value);

    function login1() {
      if (psw1.value != "") {
        isload.value = true;
        const md5psw = md5(psw1.value);
        console.log(username.value + "====" + psw1.value + "---" + md5psw);
        isload.value = false;
        if (isload.value == false) {
          axios
            .post(store.state.baseUrl + "/admin/user/login", {
              loginName: username.value,
              password: md5psw,
            })
            .then((res: any) => {
              console.log(res.data.data);
              if (res.data.code < 500) {
                sessionStorage.setItem("token", res.data.data);
                store.dispatch("setToken", res.data.data);
                store.state.isLogin = true;
                message.success({
                  message: "登录成功",
                  showClose: true,
                  duration: 2000,
                });
                router.push("/home");
              }
            })
            .catch((res: any) => {
              console.log(res);
            });
        }
      } else {
        alert("请输入密码");
      }
    }
    // 回车键登录
    function keyLogin(e: KeyboardEvent) {
      if (e.keyCode == 13) {
        login1();
      }
    }

    function changepassword() {
      passwordtype.value =
        passwordtype.value == "password" ? "text" : "password";
      console.log(passwordtype.value);
    }
    return {
      screenWidth,
      screenHeight,
      username,
      psw1,
      psw2,
      login1,
      passwordtype,
      changepassword,
      isload,
      keyLogin,
    };
  },
});
</script>

<style scoped>
@media screen and (min-width: 360px) and (max-width: 796px) {
  .bg {
    background-image: url("../assets/img/bg2.png");
    /* background-size: 100%,100%; */
    background-repeat: no-repeat;
    position: relative;
  }

  .button {
    font-size: 20px;
    color: #596275;
    box-shadow: 9px 9px 18px rgba(0, 0, 0, 0.1),
      -9px -9px 18px rgba(255, 255, 255, 1);
    border-radius: 3rem;
    transition: box-shadow 0.2s ease-out;
    background-color: #efeeee;
    position: relative;
    top: 80px;
    margin-top: 20px;
    width: 130px;
    height: 55px;
    outline: none;
    border: none;
    cursor: pointer;
  }

  .button:hover {
    font-size: 19px;
    box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2),
      -1px -1px 2px rgba(255, 255, 255, 0.8);
    border-radius: 3rem;
    transition: box-shadow 0.2s ease-out;
    transition: font-size 0.2s ease-out;
  }
}

@media screen and (min-width: 796px) {
  .bg {
    position: relative;
    background: url("../assets/img/bg.jpg") no-repeat;
    background-size: 100% 100%;
  }
}

* {
  margin: 0px;
  padding: 0px;
}

body {
  background-color: #efeeee;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}

.loading {
  position: absolute;
  left: 0;
  top: 0;
  background: url("../assets/img/loading4.gif") center center no-repeat #fff;
  width: 100vw;
  height: 100vh;
  z-index: 1000;
  opacity: 0.7;
}

#logo {
  position: relative;
  bottom: -20px;
  width: 140px;
  /* height: 80px; */
}

.inputText {
  border-bottom: 2px solid #adadad;
  position: relative;
  margin: 30px 0;
  display: flex;
}

.inputText input {
  font-size: 15px;
  color: #333;
  border: none;
  width: 100%;
  outline: none;
  background: none;
  padding: 0 5px;
  height: 40px;
}

.inputText span::before {
  content: attr(data-placeholder);
  position: absolute;
  top: 50%;
  left: 5px;
  color: #adadad;
  transform: translateY(-50%);
  z-index: -1;
  transition: 0.5s;
}

.inputText span::after {
  content: "";
  position: absolute;
  left: 0%;
  top: 100%;
  width: 0%;
  height: 2px;
  background: linear-gradient(120deg, #3498db, #8e44ad);
  transition: 0.5s;
}

.focus + span::before {
  top: -5px;
}

.focus + span::after {
  width: 100%;
}

#id {
  position: relative;
  left: 50px;
  bottom: -30px;
  width: 70%;
}

#email {
  position: relative;
  left: 50px;
  top: 50px;
  width: 70%;
}

#password {
  position: relative;
  left: 50px;
  top: 50px;
  width: 70%;
}

.login_ {
  color: skyblue;
  font-size: 12px;
  position: relative;
  top: 34px;
  cursor: pointer;
}

.button {
  font-size: 20px;
  color: #596275;
  box-shadow: 9px 9px 18px rgba(0, 0, 0, 0.1),
    -9px -9px 18px rgba(255, 255, 255, 1);
  border-radius: 3rem;
  transition: box-shadow 0.2s ease-out;
  background-color: #efeeee;
  position: relative;
  top: 80px;
  margin-top: 20px;
  width: 130px;
  height: 55px;
  outline: none;
  border: none;
  cursor: pointer;
}

.button:hover {
  font-size: 19px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2),
    -1px -1px 2px rgba(255, 255, 255, 0.8);
  border-radius: 3rem;
  transition: box-shadow 0.2s ease-out;
  transition: font-size 0.2s ease-out;
}

.register {
  color: skyblue;
  font-size: 12px;
  position: relative;
  top: 100px;
  cursor: pointer;
}

.card {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  height: 550px;
  width: 340px;
  z-index: 1;
  transition: transform 0.8s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  opacity: 0.8;
}

.card .front,
.card .back {
  position: absolute;
  text-align: center;
  box-shadow: 12px 12px 24px rgba(0, 0, 0, 0.1),
    -12px -12px 24px rgba(255, 255, 255, 1);
  border-radius: 3rem;
  background-color: #efeeee;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: 1s cubic-bezier(0.68, -0.55, 0.265, 1.55);
  /* opacity: 0.8; */
}

.card .front {
  z-index: 1;
}

.turn {
  text-align: right;
}

.card .back {
  transform: rotateY(180deg);
}

.back.back-turn {
  transform: rotateY(0deg);
}

.front.front-turn {
  z-index: 0;
  transform: rotateY(-180deg);
}

#name {
  position: relative;
  left: 50px;
  top: 20px;
  width: 70%;
}

#pwd1 {
  position: relative;
  left: 50px;
  top: 20px;
  width: 70%;
}

#pwd2 {
  position: relative;
  left: 50px;
  top: 20px;
  width: 70%;
}

.buttonRegister {
  font-size: 20px;
  color: #596275;
  box-shadow: 9px 9px 18px rgba(0, 0, 0, 0.2),
    -9px -9px 18px rgba(255, 255, 255, 0.8);
  border-radius: 3rem;
  transition: box-shadow 0.2s ease-out;
  background-color: #efeeee;

  position: relative;
  top: 20px;
  margin-top: 20px;
  width: 130px;
  height: 55px;
  outline: none;
  background: none;
  border: none;
}

.buttonRegister:hover {
  font-size: 19px;
  box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1),
    -1px -1px 2px rgba(255, 255, 255, 1);
  border-radius: 3rem;
  transition: box-shadow 0.2s ease-out;
  transition: font-size 0.2s ease-out;
}
</style>

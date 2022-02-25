import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

import "../public/scss/meta.scss";
import ElementPlus from "element-plus";
import locale from "element-plus/lib/locale/lang/zh-cn";
import "element-plus/lib/theme-chalk/index.css";
import { ElMessage } from "element-plus";

const app = createApp(App);
app
  .use(ElementPlus, { locale })
  .use(store)
  .use(router);
app.config.globalProperties.$axios = axios;
app.config.globalProperties.$store = store;
app.config.globalProperties.$message = ElMessage;

// 防止重复点击
app.directive("preventClick", {
  beforeMount(el: any) {
    el.addEventListener("click", () => {
      console.log(el);

      if (!el.disabled) {
        el.style.backgroundColor = "#ccc";
        el.disabled = true;
        setTimeout(() => {
          el.style.backgroundColor = "#f0eeee";
          el.disabled = false;
        }, 3000);
      }
    });
  },
});

const formatNumberRgx = (num: any) => {
  // console.log(num);
  if (num !== null && num !== undefined) {
    const parts = num.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
  } else {
    return 0;
  }
};
app.config.globalProperties.$http = formatNumberRgx;

app.mount("#app");

// 路由守卫
router.beforeEach((to, from, next) => {
  if (to.meta.title) {
    document.title = to.meta.title;
  }
  const type = to.meta.type;
  // 判断该路由是否需要登录权限
  if (type === "login") {
    if (sessionStorage.getItem("token")) {
      next();
    } else {
      next("/");
    }
  } else {
    next(); // 确保一定要有next()被调用
  }

  let allowBack = false; //    给个默认值true
  if (to.meta.allowBack !== undefined) {
    allowBack = to.meta.allowBack;
  }
  if (!allowBack) {
    history.pushState(null, "", location.href);
  }
  store.dispatch("updateAppSetting", {
    //   updateAppSetting 只是store里面的一个action， 用来改变store里的allowBack的值的，具体怎么改这个值 要根据各位的实际情况而定
    allowBack: allowBack,
  });
});

// http 请求拦截器
axios.interceptors.request.use(
  (config) => {
    // 在发送请求前
    const pathname = location.pathname;
    console.log(location);
    console.log(config.headers);
    console.log(location.pathname);
    if (sessionStorage.getItem("token")) {
      if (pathname !== "/" && pathname !== "/login") {
        console.log(sessionStorage.getItem("token"));
        config.headers.common["token"] = sessionStorage.getItem("token");
        console.log(config.headers);
      }
    }
    // console.log(config.headers.common.token);

    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    console.log(response);

    if (
      response.headers.token != undefined &&
      response.headers.token != "" &&
      response.headers.token != sessionStorage.getItem("token")
    ) {
      console.log("8888888888888***********", response.headers.token);
      sessionStorage.setItem("token", response.headers.token);
    }

    if (response.data.code >= 500) {
      app.config.globalProperties.$message.error({
        message: response.data.message,
        showClose: true,
        duration: 2000,
      });
    }

    return response;
  },
  (error) => {
    console.log(error);

    if (error.response.status == 401) {
      // localStorage.removeItem('mytoken')
      // router.push('/login')   //跳转到登录组件
    }
    return Promise.reject(error);
  }
);

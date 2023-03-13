import { createStore } from "vuex";

export default createStore({
  state: {
    // baseUrl: "http://192.168.0.99:10001",
    // baseUrl: "http://192.168.0.233:10001",
    // baseUrl: "http://cn.api.wistechx.cn:10001",
    isLogin: false,
    token: null,
    nick: "", //用户昵称

    imgUrl: "",
    productsList: "",
    allowBack: false,
  },
  mutations: {
    userToken(state, token) {
      if (token) {
        state.token = token;
      } else {
        state.token = null;
      }
    },

    allowBack(state, allowBack) {
      state.allowBack = false;
      allowBack;
    },
  },
  actions: {
    setToken({ commit }, token) {
      commit("userToken", token);
    },

    updateAppSetting({ commit }, allowBack) {
      allowBack;
      commit("allowBack", false);
    },
  },
  modules: {},
});

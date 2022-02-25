<template>
  <div class="aeriesid" v-if="index == 1">
    <div class="aeriesidlist">
      <div
        style="margin-bottom: 20px;display: flex;justify-content: space-between;text-align: left;"
      >
        <el-button @click="addpage">添加系列</el-button>
        <div v-show="checkboxlength >= 1" style="display: flex;">
          <span
            style="font-size: 1rem; color: rgb(136, 134, 134);line-height:2.2rem"
            >已选：{{ checkboxlength }}个系列</span
          >
          <el-button style="margin-left: 1rem;" @click="deleteseries()"
            >删除</el-button
          >
        </div>
      </div>
      <div
        v-if="serieslista == '' || serieslista == undefined"
        style="padding: 20px;background-color: #fff;border-radius: 10px;"
      >
        <p>{{ seriesMsg }}</p>
      </div>
      <div v-else class="tablebox">
        <table border="1" cellspacing="0">
          <tr>
            <th></th>
            <th>系列名</th>
            <th>操作</th>
          </tr>
          <tr v-for="(item, index) in serieslista" :key="index">
            <td>
              <el-checkbox
                v-model="item.checked"
                @change="checkid(item)"
              ></el-checkbox>
            </td>
            <td>{{ item.name }}</td>
            <td>
              <div class="pcbutton">
                <div
                  @click="changeseries(item)"
                  style="cursor: pointer; color: #3d81fd"
                >
                  <i class="el-icon-edit-outline" />修改查看
                </div>
              </div>
            </td>
          </tr>
        </table>
      </div>
    </div>
  </div>
  <!--新增 -->
  <div class="addseriesid" v-if="index == 2">
    <div
      v-if="index == 2"
      @click="returnfun()"
      style="cursor: pointer;text-align: left;padding: 0.6rem 0 0 0.6rem;"
    >
      <i class="el-icon-back" />返回
    </div>
    <div class="changeandadd">
      <el-form style="padding:1rem;text-align: left;">
        <el-form-item label="系列名称:" required>
          <el-input
            style="width: 56%;"
            v-model="seriesname"
            placeholder="请输入系列名称"
          ></el-input>
        </el-form-item>
      </el-form>
      <el-button v-if="addorchange == 1" @click="addserisebutton"
        >添加系列</el-button
      >
      <el-button
        v-if="addorchange == 2"
        class="changebutton"
        @click="changebutton"
      >
        确定修改
      </el-button>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref } from "vue";
function overallsituation() {
  const axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
  const store = getCurrentInstance()?.appContext.config.globalProperties.$store;
  const message = getCurrentInstance()?.appContext.config.globalProperties
    .$message;
  const img = store.state.baseUrl;
  const index = ref(1);
  const addorchange = ref(0);
  return { axios, store, message, img, index, addorchange };
}
function serieslist() {
  const serieslista = ref("");
  const seriesMsg = ref("数据加载中");
  const { axios, store } = overallsituation();
  axios.get(store.state.baseUrl + "/admin/series/list").then((res: any) => {
    serieslista.value = res.data.data;
    console.log(res.data.data);
    if (serieslista.value == "" || serieslista.value === undefined) {
      seriesMsg.value = "暂无数据";
    }
  });
  return {
    serieslista,
    seriesMsg,
  };
}
export default defineComponent({
  setup() {
    const {
      axios,
      store,
      message,
      img,
      index,
      addorchange,
    } = overallsituation();
    const { serieslista, seriesMsg } = serieslist();
    function clickfun() {
      const seriesname = ref("");
      function list() {
        //刷新数据
        serieslista.value = "";
        seriesMsg.value = "数据加载中";
        axios
          .get(store.state.baseUrl + "/admin/series/list")
          .then((res: any) => {
            index.value = 1;
            serieslista.value = res.data.data;
            console.log(res.data.data);
            if (serieslista.value == "" || serieslista.value === undefined) {
              seriesMsg.value = "暂无数据";
            }
          });
      }
      function addpage() {
        //添加
        index.value = 2;
        addorchange.value = 1;
        seriesname.value = "";
      }
      function addserisebutton() {
        //添加系列
        if (seriesname.value == "") {
          message.error({
            message: "系列名称不能为空",
            showClose: true,
            duration: 2000,
          });
        } else {
          axios
            .post(store.state.baseUrl + "/admin/series/insert", {
              name: seriesname.value,
            })
            .then((res: any) => {
              if (res.data.code < 500) {
                message.success({
                  message: "添加成功",
                  showClose: true,
                  duration: 2000,
                });
                console.log(res);
                list();
              }
            });
        }
      }
      let checkboxid: number[] = [];
      const checkboxlength = ref();
      function checkid(params: any) {
        //选中商品
        if (params.checked == true) {
          if (checkboxid.indexOf(params.id) == -1) {
            checkboxid.push(params.id);
          }
        } else if (params.checked == false) {
          if (checkboxid.indexOf(params.id) > -1) {
            checkboxid.splice(checkboxid.indexOf(params.id), 1);
          }
        }
        checkboxlength.value = checkboxid.length;
        console.log(checkboxid); //选中的商品--id
      }
      function deleteseries() {
        //删除系列
        console.log(checkboxid);
        axios
          .post(store.state.baseUrl + "/admin/series/delete/", checkboxid)
          .then((res: any) => {
            if (res.data.code < 500) {
              message.success({
                message: "删除成功",
                showClose: true,
                duration: 2000,
              });
              checkboxid = [];
              checkboxlength.value = 0;
              list();
              console.log(res);
            }
          });
      }
      const tempid = ref(0);
      function changeseries(params: any) {
        //修改
        index.value = 2;
        addorchange.value = 2;
        tempid.value = params.id;
        seriesname.value = params.name;
        console.log(params);
      }
      function changebutton() {
        //修改系列
        console.log(seriesname.value);
        axios
          .post(store.state.baseUrl + "/admin/series/update/", {
            id: tempid.value,
            name: seriesname.value,
          })
          .then((res: any) => {
            console.log(res);
            index.value = 1;
            if (res.data.code < 500) {
              message.success({
                message: "修改成功",
                showClose: true,
                duration: 2000,
              });
              checkboxid = [];
              checkboxlength.value = 0;
              list();
            }
          });
      }
      return {
        addserisebutton,
        seriesname,
        checkid,
        checkboxid,
        checkboxlength,
        deleteseries,
        changeseries,
        addpage,
        changebutton,
        list,
        serieslista,
        seriesMsg,
        index,
      };
    }
    const {
      seriesname,
      // seriesgemid,
      addserisebutton,
      checkid,
      checkboxid,
      checkboxlength,
      deleteseries,
      addpage,
      changeseries,
      changebutton,
      list,
      // seriesgemid2,
    } = clickfun();
    function returnfun() {
      index.value = 1;
      console.log(index.value);
    }
    return {
      axios,
      index,
      store,
      message,
      img,
      serieslista,
      seriesMsg,
      seriesname,
      addserisebutton,
      checkid,
      checkboxid,
      checkboxlength,
      deleteseries,
      changeseries,
      addpage,
      changebutton,
      list,
      addorchange,
      returnfun,
    };
  },
});
</script>
<style lang="scss" scoped>
@media screen and (min-width: 360px) and (max-width: 796px) {
  .aeriesidlist {
    height: 79vh;
    overflow-y: scroll;

    .tablebox {
      width: 98%;
      padding: 1rem 0;
      margin: 1rem auto;
      box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
        2px 2px 3px rgba(0, 0, 0, 0.2);
      border-radius: 1rem;

      table {
        width: 94%;
        margin: auto;
        border-radius: 6px;
        border-style: hidden;
        box-shadow: 0 0 0 1px #d8d8d8;

        .pcbutton {
          display: flex;
          flex-wrap: nowrap;

          .el-button {
            width: 5rem;
          }
        }
      }
    }
  }
}
@media screen and (min-width: 796px) {
  .aeriesid {
    padding: 20px;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.1)
    );
    border-radius: 10px;
    backdrop-filter: blur(8px);
    box-shadow: -3px -4px 5px 0px rgb(247, 245, 245),
      6px 5px 3px rgba(0, 0, 0, 0.2);

    .aeriesidlist {
      padding: 0.5rem;

      .tablebox {
        width: 90%;
        padding: 1rem 0;
        margin: 1rem auto;
        box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
          2px 2px 3px rgba(0, 0, 0, 0.2);
        border-radius: 1rem;

        table {
          width: 96%;
          margin: 1.5rem auto 1.25rem;
          border-color: #ececec;
          border-collapse: collapse;
          border-radius: 6px;
          border-style: hidden;
          box-shadow: 0 0 0 1px #d8d8d8;

          tr > th {
            width: 11%;
            padding: 1rem;
          }

          td {
            padding: 20px 0;
          }
        }
      }
    }
  }
  .changeandadd {
    margin-top: 20px;
    box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
      2px 2px 3px rgba(0, 0, 0, 0.2);
    padding-bottom: 1rem;
    border-radius: 1rem;
  }
}
</style>
<style lang="scss"></style>

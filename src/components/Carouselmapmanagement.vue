<template>
  <div class="carousel" id="carousel">
    <div v-if="indexc == 1" class="carouselist">
      <div class="carousebutton">
        <el-button @click="addcarousel">添加轮播图</el-button>
        <div
          v-if="checkboxlength >= 1"
          style="display: flex;justify-content: end;"
        >
          <span
            style="font-size: 1rem; color: rgb(136, 134, 134);line-height:2.2rem"
            >已选：{{ checkboxlength }}张轮播图</span
          >
          <el-button style="margin-left: 1rem;" @click="deletecarousel()"
            >删除</el-button
          >
        </div>
      </div>
      <div
        v-if="carousellista == '' || carousellista == undefined"
        style="padding: 20px;background-color: #fff;border-radius: 10px;"
      >
        <p>{{ carouselMsg }}</p>
      </div>
      <div
        v-else
        style="display: flex;justify-content: space-between;flex-wrap: wrap;"
      >
        <div v-for="(item, index) in carousellista" :key="index" class="imgbox">
          <img
            :src="img + '/admin/file/image/' + item.carousel"
            class="img"
            alt=""
          />
          <div style="width:100%;text-align: right;">
            <span style="font-size: 0.95rem; color: rgb(136, 134, 134);"
              >操作选择：</span
            >
            <el-checkbox
              v-model="item.checked"
              @change="checkid(item)"
            ></el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <div v-if="indexc == 2">
      <div
        v-if="indexc == 2"
        @click="returnfun()"
        style="cursor: pointer;text-align: left;padding: 0.6rem 0 0 0.6rem;"
      >
        <i class="el-icon-back" />返回
      </div>
      <div class="addcarouse">
        <el-form label-width="6rem">
          <!-- <span class="addtitle">添加轮播图片</span> -->
          <el-form-item label="轮播图片：" class="item" required>
            <el-upload
              action=""
              ref="uploadFile1"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-error="handleError"
              :limit="1"
              :http-request="uploadpic"
              :on-success="uploadsuccess"
              :on-exceed="uploadLength"
              :file-list="[]"
              style="float:left;"
              :multiple="false"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item
            label="珠宝："
            class="item"
            style="text-align: left;"
            required
          >
            <el-select
              v-model="gumid"
              placeholder="请选择珠宝"
              style="width: 56%;"
            >
              <el-option
                v-for="(item, index) in serieslista.stu"
                :key="index"
                :label="'珠宝名称：' + item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <el-button @click="addcarouselok" v-preventClick>确定添加</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";
function overallsituation() {
  const axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
  const store = getCurrentInstance()?.appContext.config.globalProperties.$store;
  const message = getCurrentInstance()?.appContext.config.globalProperties
    .$message;
  const img = store.state.baseUrl;
  const carousellista = ref("");
  const carouselMsg = ref("数据加载中");

  function Carousellist() {
    carousellista.value = "";
    axios.get(store.state.baseUrl + "/admin/carousel/list").then((res: any) => {
      console.log("轮播图列表");
      carousellista.value = res.data.data;
      console.log(res.data.data);
      if (carousellista.value == "" || carousellista.value === undefined) {
        carouselMsg.value = "暂无数据";
      }
    });
  }
  // Carousellist();
  return {
    axios,
    store,
    message,
    img,
    Carousellist,
    carousellista,
    carouselMsg,
  };
}

function upload() {
  const { axios, store, message } = overallsituation();
  const imgfilename = ref("");
  const dialogImageUrl = ref("");
  const dialogVisible = ref(false);

  function handleRemove(file: any) {
    console.log("删除" + file);
  }

  function handlePictureCardPreview(file: any) {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
    console.log(file);
  }

  function uploadLength(files: any, fileList: any) {
    console.log(files);
    console.log(fileList);
    message.error({
      message: "仅可上传一张",
      showClose: true,
      duration: 2000,
    });
  }

  function handleError() {
    message.error({
      message: "图片过大,请选择正确的尺寸",
      showClose: true,
      duration: 2000,
    });
  }

  const uploadFile1 = ref();
  const uid1 = ref();
  function uploadsuccess(params: any) {
    axios
      .post(store.state.baseUrl + "/admin/file/images", params)
      .then((res: any) => {
        if (res.data.code < 500) {
          console.log("file/images");
          imgfilename.value = res.data.data;
          console.log(imgfilename.value);
        }
      })
      .catch((err: any) => {
        message.error({
          message: "图片尺寸过大，上传失败",
          showClose: true,
          duration: 2000,
        });
        console.log("失败");
        console.log(err);

        const idx = uploadFile1.value.uploadFiles.findIndex(
          (item: any) => item.uid === uid1.value
        ); // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）

        uploadFile1.value.uploadFiles.splice(idx, 1); // 关键作用代码，去除文件列表失败文件
      });
  }

  function uploadpic(file: any) {
    console.log(file);
    uid1.value = file.file.uid;
    const formdata1 = new FormData(); //创建form对象
    formdata1.append("upload-images", file.file); //通过append向form对象添加数据
    console.log("------------------------");
    uploadsuccess(formdata1);
  }
  return {
    uploadpic,
    imgfilename,
    handleRemove,
    handlePictureCardPreview,
    handleError,
    dialogVisible,
    uploadsuccess,
    uploadFile1,
    dialogImageUrl,
    uploadLength,
  };
}

export default defineComponent({
  setup() {
    const {
      axios,
      store,
      message,
      img,
      Carousellist,
      carousellista,
      carouselMsg,
    } = overallsituation();
    Carousellist();

    const {
      uploadpic,
      imgfilename,
      handleRemove,
      handlePictureCardPreview,
      uploadLength,
      handleError,
      dialogVisible,
      uploadsuccess,
      uploadFile1,
      dialogImageUrl,
    } = upload();

    const gumid = ref(null);
    const indexc = ref(1);
    console.log(typeof indexc.value);

    function clickfun() {
      const serieslista = reactive({ stu: [] });
      function addcarousel() {
        imgfilename.value = "";
        gumid.value = null;
        indexc.value = 2;

        axios
          .get(store.state.baseUrl + "/admin/jewelry/infos", {
            params: {
              pageNumber: 1,
              searchName: "",
              searchStone: "",
              searchType: "",
            },
          })
          .then((res: any) => {
            serieslista.stu = res.data.data.list;
            console.log(serieslista.stu);
          });
      }

      function addcarouselok() {
        if (
          imgfilename.value == "" ||
          gumid.value == "" ||
          gumid.value == null
        ) {
          message.error({
            message: "数据不能为空",
            showClose: true,
            duration: 2000,
          });
        } else {
          indexc.value = 1;
          axios
            .post(store.state.baseUrl + "/admin/carousel/insert/", {
              carousel: imgfilename.value,
              jewelry: gumid.value,
            })
            .then((res: any) => {
              if (res.data.code < 500) {
                message.success({
                  message: "添加成功",
                  showClose: true,
                  duration: 2000,
                });
                Carousellist();
                console.log(res);
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
      function deletecarousel() {
        console.log("shuju2222222222222");
        console.log(carousellista);
        axios
          .post(store.state.baseUrl + "/admin/carousel/delete", checkboxid)
          .then((res: any) => {
            console.log(res);
            if (res.data.code < 500) {
              message.success({
                message: "删除成功",
                showClose: true,
                duration: 2000,
              });
              checkboxlength.value = 0;
              checkboxid = [];
              Carousellist();
            }
          });
      }
      function returnfun() {
        indexc.value = 1;
      }
      return {
        addcarousel,
        gumid,
        addcarouselok,
        deletecarousel,
        checkid,
        checkboxid,
        checkboxlength,
        returnfun,
        Carousellist,
        serieslista,
      };
    }

    const {
      addcarousel,
      addcarouselok,
      deletecarousel,
      checkid,
      checkboxid,
      checkboxlength,
      serieslista,
      returnfun,
    } = clickfun();

    return {
      axios,
      store,
      message,
      carousellista,
      carouselMsg,
      Carousellist,
      uploadpic,
      imgfilename,
      handleRemove,
      handlePictureCardPreview,
      uploadLength,
      returnfun,
      handleError,
      dialogVisible,
      uploadsuccess,
      uploadFile1,
      gumid,
      addcarousel,
      serieslista,
      indexc,
      addcarouselok,
      img,
      deletecarousel,
      checkid,
      checkboxid,
      checkboxlength,
      dialogImageUrl,
    };
  },
});
</script>
<style lang="scss" scoped>
.carousel {
  background: linear-gradient(
    to right bottom,
    rgba(255, 255, 255, 0.6),
    rgba(255, 255, 255, 0.1)
  );
  padding-bottom: 1rem;
  border-radius: 10px;
  backdrop-filter: blur(8px);
  box-shadow: -3px -4px 5px 0px rgb(247, 245, 245),
    6px 5px 3px rgba(0, 0, 0, 0.2);

  .carouselist {
    padding: 0.5rem;

    .carousebutton {
      margin: 1rem;
      display: flex;
      flex-wrap: nowrap;
      justify-content: space-between;
    }

    .imgbox {
      width: 45%;
      padding: 20px;
      margin: 1rem 0;
      // display: flex;
      // flex-wrap: nowrap;
      box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
        2px 2px 3px rgba(0, 0, 0, 0.2);

      .img {
        width: 100%;
        box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
          2px 2px 3px rgba(0, 0, 0, 0.2);
      }
    }
  }
  .addcarouse {
    padding: 1rem;
    box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
      2px 2px 3px rgba(0, 0, 0, 0.2);
    border-radius: 1rem;
    width: 82%;
    margin: 1rem;
    margin: 1rem auto;
    padding-bottom: 1rem;

    .el-form {
      // width: 80%;
      // margin: auto;

      .addtitle {
        font-size: 1.25rem;
        color: rgb(136, 134, 134);
      }

      .el-input {
        text-align: left;
        .item {
          width: 56%;
        }
      }
    }
  }
}
</style>

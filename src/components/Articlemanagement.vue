<template>
  <div class="designer">
    <div class="designerbox">
      <div v-if="selected == 1" class="designerinfo">
        <div class="title">
          <el-button @click="addbutton">添加设计师文章</el-button>
          <div
            v-show="checkboxlength >= 1"
            style="float: right;margin-right: 2rem;"
          >
            <span style="margin-right: 1rem;color: #919090;font-size: 0.92rem;"
              >已选：{{ checkboxlength }}位设计师</span
            >
            <el-button @click="deletedesigner()">删除</el-button>
          </div>
        </div>
        <div
          v-if="designerlists == '' || designerlists == undefined"
          style="width: 100%;padding: 20px;background-color: #fff;border-radius: 10px;"
        >
          <p>{{ designerMsg }}</p>
        </div>
        <div v-else>
          <el-row class="el-row">
            <el-col
              :span="8"
              v-for="(design, index) in designerlists"
              :key="index"
            >
              <el-card class="elcardbox">
                <img
                  :src="img + '/admin/file/image/' + design.cover"
                  class="image"
                />
                <div class="divbox">
                  <!-- <span>内容</span> -->
                  <p class="bottom" v-html="regStr(design.content)"></p>
                </div>
                <div
                  style="display: flex;justify-content: space-between; line-height: 2.5rem"
                >
                  <div>
                    <span>删除框：</span>
                    <el-checkbox
                      v-model="design.checked"
                      @change="deletelist(design)"
                    ></el-checkbox>
                  </div>
                  <el-button @click="changedesigner(design)">修改</el-button>
                </div>
              </el-card>
            </el-col>
          </el-row>
        </div>
        <div class="articlerow">
          <div
            v-if="designerlists == '' || designerlists == undefined"
            style="width: 100%;background-color: #fff;"
          >
            <p>{{ designerMsg }}</p>
          </div>
          <div v-else>
            <div
              v-for="(desi, index) in designerlists"
              :key="index"
              class="articlerowbox"
            >
              <div class="imgbox">
                <img
                  :src="img + '/admin/file/image/' + desi.cover"
                  class="image"
                />
                <div class="divbox">
                  <span>内容</span>
                  <div class="bottom">
                    <div class="time">{{ desi.content }}</div>
                  </div>
                  <el-button class="delete" @click="deletedesigner(desi.id)"
                    >删除</el-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 添加 -->
      <div v-if="selected == 2" class="adddesigner backg">
        <div
          v-if="selected == 2"
          @click="returnfun()"
          style="cursor: pointer;text-align: left;margin-bottom:20px;"
        >
          <i class="el-icon-back" />返回
        </div>
        <el-form label-width="5.8rem">
          <el-form-item label="封面标题：" style="text-align: left;" required>
            <el-input
              v-model="title"
              placeholder="请输入封面标题"
              style="width: 50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="封面图片：" class="item" required>
            <el-upload
              action=""
              ref="uploadFile1"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-error="handleError"
              :http-request="uploadpic"
              :on-success="uploadsuccess"
              :on-exceed="uploadLength"
              style="float:left;"
              :multiple="false"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img width="100%" :src="dialogImageUrl" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="详情内容：" class="item" required>
            <Tinymce
              @designercontent="designercontent"
              :propsmsg="propsmsg"
            ></Tinymce>
          </el-form-item>
        </el-form>
      </div>
      <!--修改 -->
      <div v-if="selected == 3" class="adddesigner backg">
        <div
          v-if="selected == 3"
          @click="returnfun()"
          style="cursor: pointer;text-align: left;margin-bottom:20px;"
        >
          <i class="el-icon-back" />返回
        </div>
        <el-form label-width="5.8rem">
          <el-form-item label="封面标题：" style="text-align: left;" required>
            <el-input
              v-model="designermessage[0].title"
              placeholder="请输入封面标题"
              style="width: 50%"
            ></el-input>
          </el-form-item>
          <el-form-item label="文章图片:" class="item" required>
            <el-upload
              action=""
              ref="uploadFile1"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-error="handleError"
              :http-request="uploadpic"
              :on-success="uploadsuccess"
              :on-exceed="uploadLength"
              :file-list="[
                { url: img + '/admin/file/image/' + designermessage[0].cover },
              ]"
              style="float:left;"
              :multiple="false"
              :limit="1"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt="" />
            </el-dialog>
          </el-form-item>
          <el-form-item label="文章内容:" class="item" required>
            <Tinymce @ptoetop="ptoetop" :propsmsg="propsmsg"></Tinymce>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, ref, reactive } from "vue";
import Tinymce from "./Tinymce.vue";

function designerlist() {
  const axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
  const store = getCurrentInstance()?.appContext.config.globalProperties.$store;
  const img = store.state.baseUrl;
  const selected = ref(1);
  const designerlists = ref("");
  const designerMsg = ref("数据加载中");
  axios.get(store.state.baseUrl + "/admin/designer/list").then((res: any) => {
    console.log(res);
    if (res.data.code < 500) {
      console.log("初始列表");
      if (res.data.data) {
        res.data.data.forEach((element: { cover: any }) => {
          element.cover = element.cover.split("|")[0];
        });
      }
      designerlists.value = res.data.data;

      if (designerlists.value == "" || designerlists.value === undefined) {
        designerMsg.value = "暂无数据";
      }
    }
  });
  return {
    axios,
    store,
    designerlists,
    designerMsg,
    selected,
    img,
  };
}

export default defineComponent({
  components: { Tinymce },
  setup() {
    const {
      axios,
      store,
      designerMsg,
      designerlists,
      selected,
      img,
    } = designerlist();

    const message = getCurrentInstance()?.appContext.config.globalProperties
      .$message;

    let temp: string[] = [];
    const imgurl1: any = reactive({ stu: [] });
    const imgfilename = ref("");
    const title = ref("");
    const dialogImageUrl = ref("");
    const dialogVisible = ref(false);

    function handlePictureCardPreview(file: any) {
      console.log("444444444444");

      console.log(file.url);

      dialogImageUrl.value = file.url;
      console.log(dialogImageUrl.value);

      dialogVisible.value = true;
      console.log(file);
    }

    function handleError() {
      message.warning({
        message: "图片过大,请选择正确的尺寸",
        showClose: true,
        duration: 2000,
      });
    }

    function handleRemove(file: any, fileList: any) {
      console.log("删除" + file);
      console.log(file);
      console.log(fileList);
      imgurl1.stu = fileList;
      temp = [];
      if (imgurl1.stu.length !== 0) {
        for (const item of imgurl1.stu) {
          if (item.url.indexOf("/") !== -1) {
            temp.push(item.url.split("/")[6]);
          } else {
            temp.push(item.url);
          }
        }
      }
    }

    const uploadFile1 = ref();
    const uid1 = ref();
    function uploadsuccess(params: any) {
      temp = [];
      imgurl1.stu = [];
      axios
        .post(store.state.baseUrl + "/admin/file/images", params)
        .then((res: any) => {
          console.log("file/images");
          if (res.data.code < 500) {
            message.success({
              message: "图片上传成功",
              showClose: true,
              duration: 2000,
            });
            temp.push(res.data.data);
            imgurl1.stu.push({
              url: img + "/admin/file/image/" + res.data.data,
            });
            console.log("图片上传111111");
            console.log(temp);
            console.log(imgurl1.stu);
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

    function uploadLength(files: any, fileList: any) {
      console.log(files);
      console.log(fileList);
      message.error({
        message: "封面图仅可上传一张",
        showClose: true,
        duration: 2000,
      });
    }

    const propsmsg = ref("");

    function clickfun() {
      let checkboxid: number[] = [];
      const checkboxlength = ref();
      const designermessage: any[] = [];

      function list() {
        selected.value = 1;
        designerMsg.value = "数据加载中";
        axios
          .get(store.state.baseUrl + "/admin/designer/list")
          .then((res: any) => {
            if (res.data.code < 500) {
              console.log("数据变化刷新列表");
              if (res.data.data) {
                res.data.data.forEach((element: { cover: any }) => {
                  element.cover = element.cover.split("|")[0];
                });
              }
              designerlists.value = res.data.data;

              if (
                designerlists.value == "" ||
                designerlists.value === undefined
              ) {
                designerMsg.value = "暂无数据";
              }
            }
          });
      }

      function deletelist(params: any) {
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

      function deletedesigner() {
        //删除
        axios
          .post(store.state.baseUrl + "/admin/designer/delete", checkboxid)
          .then((res: any) => {
            console.log(res);
            if (res.data.code < 500) {
              message.success({
                message: "删除成功",
                showClose: true,
                duration: 2000,
              });
              checkboxid = [];
              checkboxlength.value = 0;
              list();
            }
          });
      }

      function changedesigner(params: any) {
        console.log("修改");
        console.log(params);
        designermessage.length = 0;
        temp = [];
        imgurl1.stu = [];
        //修改--传值
        selected.value = 3;
        designermessage.push(params);
        propsmsg.value = designermessage[0].content;
        temp.push(designermessage[0].cover);
        imgurl1.stu.push({
          url: img + "/admin/file/image/" + designermessage[0].cover,
        });
        console.log(propsmsg.value);
        console.log(designermessage);
      }

      function ptoetop(params: string) {
        console.log("emit" + params);
        console.log(designermessage[0]);

        axios
          .post(store.state.baseUrl + "/admin/designer/update", {
            title: designermessage[0].title,
            content: params,
            cover: temp.join("|"),
            id: designermessage[0].id,
          })
          .then((res: any) => {
            console.log(res);
            console.log("修改设计师");
            if (res.data.code < 500) {
              message.success({
                message: "修改成功",
                showClose: true,
                duration: 2000,
              });
              clickfun().list();
            }
          });

        console.log(params);
      }

      function returnfun() {
        selected.value = 1;
      }

      return {
        deletedesigner,
        checkboxid,
        checkboxlength,
        deletelist,
        changedesigner,
        designermessage,
        ptoetop,
        list,
        returnfun,
      };
    }

    const {
      deletedesigner,
      checkboxid,
      checkboxlength,
      deletelist,
      returnfun,
      changedesigner,
      designermessage,
      ptoetop,
      list,
    } = clickfun();

    function emitfun() {
      let designeremit = "";

      function addbutton() {
        title.value = "";
        imgfilename.value = "";
        propsmsg.value = "";
        selected.value = 2;
      }

      function designercontent(params: string) {
        //新增
        console.log(temp);
        console.log(imgurl1.stu);

        imgfilename.value = temp.join("|");
        console.log("新增" + imgfilename.value);
        designeremit = params;
        console.log("emit$$$$$" + designeremit);
        if (title.value == "") {
          message.error({
            message: "请输入封面标题",
            showClose: true,
            duration: 2000,
          });
        } else if (imgfilename.value == "") {
          message.error({
            message: "请上传图片",
            showClose: true,
            duration: 2000,
          });
        } else {
          axios
            .post(store.state.baseUrl + "/admin/designer/insert", {
              title: title.value,
              content: designeremit,
              cover: imgfilename.value,
            })
            .then((res: any) => {
              console.log(res);
              if (res.data.code < 500) {
                message.success({
                  message: "添加成功",
                  showClose: true,
                  duration: 2000,
                });
                clickfun().list();
              }
            });
        }
      }
      return { addbutton, designeremit, designercontent };
    }
    const { addbutton, designeremit, designercontent } = emitfun();

    function regStr(value: any) {
      const str = value.replace(/<.*?>/gi, "");
      return str;
    }
    return {
      axios,
      store,
      selected,
      propsmsg,
      img,
      regStr,
      dialogImageUrl,
      designerMsg,
      designerlists,
      title,
      imgfilename,
      handleRemove,
      handlePictureCardPreview,
      uploadpic,
      handleError,
      dialogVisible,
      uploadFile1,
      uploadsuccess,
      uploadLength,
      designeremit,
      designercontent,
      addbutton,
      deletedesigner,
      checkboxid,
      checkboxlength,
      deletelist,
      changedesigner,
      designermessage,
      ptoetop,
      list,
      returnfun,
    };
  },
});
</script>
<style lang="scss" scoped>
@media screen and (min-width: 360px) and (max-width: 796px) {
  .designer {
    height: 82vh;
    overflow-y: scroll;
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.1)
    );
    border-radius: 10px;
    backdrop-filter: blur(8px);
    box-shadow: -3px -4px 5px 0px rgb(247, 245, 245),
      6px 5px 3px rgba(0, 0, 0, 0.2);

    .el-row {
      display: none;
    }

    .title {
      padding: 0.5rem;
    }

    .articlerowbox {
      position: relative;
      padding-bottom: 0.5rem;

      .imgbox {
        display: flex;
        width: 90%;
        margin: auto;
        padding: 0.5rem;
        border-radius: 10px;
        box-shadow: -3px -4px 5px 0px rgb(247, 245, 245),
          6px 5px 3px rgba(0, 0, 0, 0.2);

        img {
          width: 38%;
          height: 7rem;
        }

        .divbox {
          width: 60%;
          word-wrap: break-word;
          margin-left: 0.5rem;
        }
      }
    }
  }
}
@media screen and (min-width: 796px) {
  .articlerow {
    display: none;
  }

  .backg {
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
  }

  .designer {
    // background: linear-gradient(
    //   to right bottom,
    //   rgba(255, 255, 255, 0.6),
    //   rgba(255, 255, 255, 0.1)
    // );
    // border-radius: 10px;
    // backdrop-filter: blur(8px);
    // box-shadow: -3px -4px 5px 0px rgb(247, 245, 245),
    //   6px 5px 3px rgba(0, 0, 0, 0.2);

    .designerbox {
      // padding: 1.25rem;
      .designerinfo {
        .title {
          margin-bottom: 1rem;
          display: flex;
          flex-wrap: nowrap;
          justify-content: space-between;
        }
        .el-row {
          // height: 80vh;
          // overflow-y: scroll;
          justify-content: center;
          border-radius: 10px;
          background-color: #fff;

          .el-col-8 {
            max-width: 30%;
            -webkit-box-flex: 0;
            -ms-flex: 0 0 30%;
            flex: 0 0 30%;
          }
          .elcardbox {
            margin: 1.5rem auto;
            width: 90%;
            border-radius: 1rem;
            box-shadow: 1px 1px 2px rgba(0, 0, 0, 0.2),
              -1px -1px 2px rgba(255, 255, 255, 0.8);
          }
          .el-card {
            margin: 0.5rem;
            border-radius: 1rem;
            box-shadow: 9px 9px 18px rgba(0, 0, 0, 0.1),
              -9px -9px 18px rgba(255, 255, 255, 1);

            .divbox {
              margin-top: 14px;
              min-height: 8rem;
              text-align: left;

              .bottom {
                width: 95%;
                height: 110px;
                margin: auto;
                overflow-wrap: break-word;
                color: #303133;

                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 5;
                overflow: hidden;
              }
            }

            .image {
              // padding: 0.5rem;
              // width: 18rem;
              width: 100%;
              height: 18vw;
              // object-fit: scale-down;
            }
          }
        }
      }
    }
  }
}
</style>

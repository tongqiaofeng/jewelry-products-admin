<template>
  <div class="tinymce-editor" style="width:100%;height:100%;">
    <editor
      v-model="myValue"
      :init="init"
      :disabled="disabled"
      @onClick="onClick"
      style="height:100%;"
    ></editor>
    <div style="width:100%;text-align: right;">
      <el-button class="button" @click="determine">确定</el-button>
    </div>
  </div>
</template>

<script>
import tinymce from "tinymce/tinymce";
import Editor from "@tinymce/tinymce-vue";
import "tinymce/themes/silver/theme";
import "tinymce/icons/default/icons.min.js";
import "tinymce/skins/content/default/content.css";

import "tinymce/plugins/imagetools/plugin.js";
import "tinymce/plugins/media/plugin.js";
import "tinymce/plugins/image"; // 插入上传图片插件
import "tinymce/plugins/link"; //超链接插件
import "tinymce/plugins/code"; //代码块插件
import "tinymce/plugins/table"; // 插入表格插件
import "tinymce/plugins/lists"; // 列表插件
import "tinymce/plugins/wordcount"; // 字数统计插件
import "tinymce/plugins/paste";

export default {
  name: "Home",
  components: {
    Editor,
  },
  props: {
    value: {
      type: String,
      required: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    plugins: {
      type: [String, Array],
      default:
        "lists image imagetools link table wordcount paste code lineheight letterspacing",
    },
    toolbar: {
      type: [String, Array],
      default:
        "imagetools bold italic underline strikethrough blockquote | forecolor backcolor | formatselect | fontsizeselect | fontselect | lineheight | letterspacing | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | lists link unlink image media table | removeformat | undo redo code",
      branding: false,
    },
    propsmsg: String,
  },
  data() {
    return {
      tinymceHtml: "请输入内容",
      init: {
        language_url: process.env.BASE_URL + "tinymce/langs/zh_CN.js",
        language: "zh_CN",
        skin_url: process.env.BASE_URL + "tinymce/skins/ui/oxide",
        content_css: false,
        plugins: this.plugins,
        toolbar: this.toolbar,
        lineheight_formats: "0.5 1 1.5 2",
        letterspacing: "0px 1px 2px 3px 4px 5px 6px 24px",
        color_cols: 5,
        branding: false, //隐藏品牌标识
        height: 500,
        menubar: false, // 最上方menu菜单的显示隐藏
        toolbar_drawer: true,
        statusbar: false, // 隐藏编辑器底部的状态栏
        elementpath: false, //禁用下角的当前标签路径
        // CONFIG: Paste
        paste_retain_style_properties: "all",
        paste_word_valid_elements: "*[*]", //word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: "all",
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,
        relative_urls: false,
        remove_script_host: false,
        //CONFIG: Font
        fontsize_formats: "10px 11px 12px 14px 16px 18px 20px 24px",
        images_upload_handler: (blobInfo, success) => {
          const base64 = "data:image/png;base64," + blobInfo.base64(); //编辑器的上传图片内容被处理为<img src="success方法里面的参数" />
          success(base64);
        },
      },
      myValue: this.value,
      propsindex: 0,

      select: 0,
      containerType: "",
    };
  },
  mounted() {
    tinymce.init({});
    tinymce.baseURL = "../../public/tinymce";
    tinymce.suffix = ".min";

    if (
      this.$props.propsmsg !== "" &&
      this.$props.propsmsg !== null &&
      this.$props.propsmsg !== undefined
    ) {
      this.myValue = this.$props.propsmsg;
      this.propsindex = 1;
    }
  },
  methods: {
    onClick() {
      console.log("click");
      // this.$emit('onClick', e, tinymce)
    },
    //可以添加一些自己的自定义事件，如清空内容
    clear() {
      this.myValue = "";
    },
    determine() {
      // const reg = new RegExp("<p>");
      // const reg2 = new RegExp("</p>");
      console.log("编辑的文章内容");
      console.log(this.myValue);
      if (
        this.myValue !== "" &&
        this.myValue !== null &&
        this.myValue !== undefined
      ) {
        // this.myValue = this.myValue.replace(reg, "").replace(reg2, "");
        console.log(this.myValue + this.propsindex);

        if (this.propsindex == 0) {
          this.$emit("designercontent", this.myValue);
          console.log("2---" + this.myValue);
        } else if (this.propsindex == 1) {
          this.$emit("ptoetop", this.myValue);
          console.log("1---" + this.myValue);
        }
      } else {
        // alert("请输入文章内容");
        this.$message.error({
          message: "请输入详情内容",
          showClose: true,
          duration: 2000,
        });
      }
    },
  },
  watch: {
    value(newValue) {
      this.myValue = newValue == null ? "" : newValue;
    },
    myValue(newValue) {
      // this.$emit('input', newValue)
      if (this.triggerChange) {
        this.$emit("change", newValue);
      } else {
        this.$emit("input", newValue);
      }
    },
  },
};
</script>
<style scoped>
.tinymce-editor {
  width: 100%;
  height: 100%;
}

.button {
  margin: 1rem 2rem;
}
</style>

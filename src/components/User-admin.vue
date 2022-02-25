<template>
  <div class="user-admin-container">
    <!-- <h1>客户管理</h1> -->
    <div class="user-admin-top">
      <div style="display: flex">
        <el-input
          style="width: 370px"
          v-model="keyword"
          placeholder="可输入客户姓名、手机号、邮箱进行查找"
          clearable
        ></el-input>
        <el-button style="margin-left: 15px" type="primary" @click="getUserList"
          >查 找</el-button
        >
        <el-button style="margin-left: 15px" type="primary" @click="userAdd"
          >添加客户</el-button
        >
        <el-dialog
          title="添加客户"
          v-if="dialogAddUserVisible"
          v-model="dialogAddUserVisible"
          width="560px"
        >
          <el-form
            :model="userForm"
            :rules="userFormRules"
            ref="userAdminForm"
            label-width="90px"
          >
            <el-form-item label="姓名：" prop="name">
              <el-input
                v-model="userForm.name"
                placeholder="请输入客户姓名"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item
              label="性别："
              prop="gender"
              style="text-align: left;"
            >
              <el-radio-group v-model="userForm.gender">
                <el-radio :label="1">男</el-radio>
                <el-radio :label="2">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号：" prop="phone">
              <el-input
                v-model="userForm.phone"
                placeholder="请输入手机号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="邮箱：" prop="mail">
              <el-input
                v-model="userForm.mail"
                placeholder="请输入邮箱"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="出生日期：" prop="birthday">
              <el-date-picker
                v-model="userForm.birthday"
                type="date"
                placeholder="请选择出生日期"
                format="YYYY-MM-DD"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogAddUserVisible = false">取 消</el-button>
              <el-button type="primary" @click="userAddSure">确 定</el-button>
            </span>
          </template>
        </el-dialog>
      </div>
      <!-- <div>
        <div v-show="userCheckNum >= 1">
          <span style="margin-right: 1rem; color: #919090; font-size: 0.92rem"
            >已选：{{ userCheckNum }}个客户</span
          >
          <el-button @click="deleteUser">删除</el-button>
        </div>
      </div> -->
    </div>
    <div class="user-admin-main">
      <el-table
        style="width: 80%"
        border
        stripe
        :data="userList"
        @selection-change="userSelect"
        :row-key="getRowKeys"
        ref="userTable"
      >
        <!-- <el-table-column
          align="center"
          type="selection"
          :reserve-selection="true"
          width="55"
        >
        </el-table-column> -->
        <el-table-column prop="name" label="姓名"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <div style="display: flex;justify-content: center;">
              <div
                @click="updateUser(scope.row)"
                style="cursor: pointer; color: #3d81fd"
              >
                <i class="el-icon-edit-outline" />修改查看
              </div>
              <div
                @click="checkPurchase(scope.row)"
                style="margin-left: 20px;cursor: pointer; color: #3d81fd"
              >
                <i class="el-icon-edit-outline" />销售单
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="修改客户信息"
        v-model="dialogUpdateUserVisible"
        width="560px"
      >
        <el-form label-width="90px">
          <el-form-item label="姓名：" required>
            <el-input
              v-model="userMsg.name"
              placeholder="请输入客户姓名"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="性别：" style="text-align: left;">
            <el-radio-group v-model="userMsg.gender">
              <el-radio :label="1">男</el-radio>
              <el-radio :label="2">女</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="手机号：" required>
            <el-input
              v-model="userMsg.phone"
              placeholder="请输入手机号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱：">
            <el-input
              v-model="userMsg.mail"
              placeholder="请输入邮箱"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="出生日期：">
            <el-date-picker
              v-model="userMsg.birthday"
              type="date"
              placeholder="请选择出生日期"
              format="YYYY-MM-DD"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogUpdateUserVisible = false"
              >取 消</el-button
            >
            <el-button type="primary" @click="updateUserSure">确 定</el-button>
          </span>
        </template>
      </el-dialog>
      <el-dialog
        title="客户销售单"
        v-model="dialogCheckPurchaseVisible"
        width="60%"
      >
        <div>
          <el-table
            style="width: 100%"
            border
            stripe
            :data="purchaseList"
            ref="purchaseTable"
          >
            <el-table-column prop="member" label="购买客户">
              <template #default="scope">
                <div v-for="item in userList" :key="item.id">
                  <span v-if="scope.row.member == item.id">{{
                    item.name
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="jewelry" label="购买商品">
              <template #default="scope">
                <div v-for="items in productList" :key="items.id">
                  <span v-if="scope.row.jewelry == items.id">{{
                    items.name
                  }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="price" label="销售价格"> </el-table-column>
            <el-table-column prop="seller" label="销售员工号">
            </el-table-column>
            <el-table-column prop="date" label="销售日期"> </el-table-column>
          </el-table>
        </div>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogCheckPurchaseVisible = false"
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="dialogCheckPurchaseVisible = false"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
      <div style="width: 100%; height: 50px">
        <div style="width: 100%; margin: 15px 0; text-align: right">
          <el-pagination
            @current-change="handleCurrentChange"
            small
            :current-page="page"
            layout="total, prev, pager, next, jumper,"
            :total="total"
          >
          </el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  getCurrentInstance,
  onMounted,
  reactive,
  ref,
} from "vue";
export default defineComponent({
  setup() {
    const axios = getCurrentInstance()?.appContext.config.globalProperties
      .$axios;
    const store = getCurrentInstance()?.appContext.config.globalProperties
      .$store;
    const message = getCurrentInstance()?.appContext.config.globalProperties
      .$message;

    const keyword = ref("");
    const userList = ref([]);
    const userTable = ref();
    let userCheckList: number[] = [];
    const userCheckNum = ref();
    const total = ref(0);
    const page = ref(1);
    const dialogCheckPurchaseVisible = ref(false);
    const totalPur = ref(0);
    const purchaseList = ref([]);

    // 客户销售单
    function checkPurchase(params: any) {
      console.log(params);
      axios
        .get(store.state.baseUrl + "/seller/receipt/list", {
          params: {
            search: params.phone,
          },
        })
        .then((res: any) => {
          console.log("销售单列表");
          console.log(res);
          if (res.data.code < 500) {
            purchaseList.value = res.data.data.list;
            totalPur.value = res.data.data.totalCount;
            if (totalPur.value == 0) {
              message.warning({
                message: "该客户暂无购买记录",
                showClose: true,
                duration: 2000,
              });
            } else {
              dialogCheckPurchaseVisible.value = true;
            }
          }
        });
    }

    const productList = ref();
    // 获取商品列表
    function shopinfo() {
      axios
        .get(store.state.baseUrl + "/admin/jewelry/infos")
        .then((res: any) => {
          console.log("商品列表");
          console.log(res);
          if (res.data.code < 500) {
            productList.value = res.data.data.list;
          }
        });
      console.log(productList.value);
    }
    shopinfo();

    // 获取客户列表
    function getUserList() {
      console.log("0000000001111111111" + keyword.value);
      axios
        .get(store.state.baseUrl + "/seller/member/list", {
          params: {
            pageNumber: page.value,
            search: keyword.value,
          },
        })
        .then((res: any) => {
          console.log("客户列表");
          console.log(res);
          if (res.data.code < 500) {
            userList.value = res.data.data.list;
            total.value = res.data.data.totalCount;
          }
        });
    }
    getUserList();

    // 选择删除客户
    function userSelect(params: any) {
      console.log(params);
      userCheckList = [];
      if (params.length !== 0) {
        for (const item of params) {
          userCheckList.push(item.id);
        }
      }
      userCheckNum.value = userCheckList.length;
      console.log(userCheckList); //选中的珠宝--id
    }

    // 删除所选客户
    function deleteUser() {
      console.log("删除");
      axios
        .post(store.state.baseUrl + "/seller/member/delete", userCheckList)
        .then((res: any) => {
          console.log("删除客户");
          console.log(res);
          if (res.data.code < 500) {
            message.success({
              message: "删除成功",
              showClose: true,
              duration: 2000,
            });
            userTable.value.clearSelection();
            getUserList();
          }
        });
    }
    function getRowKeys(row: any) {
      return row.id;
    }

    // 日期转换
    function dateTransition(dates: any) {
      // console.log(dates);
      if (dates !== "" && dates !== null && dates !== undefined) {
        const date = new Date(dates);
        const y = date.getFullYear();
        let m: any = date.getMonth() + 1;
        let d: any = date.getDate();
        m = m < 10 ? "0" + m : m;
        d = d < 10 ? "0" + d : d;
        return y + "-" + m + "-" + d;
      } else {
        return "";
      }
    }

    const dialogUpdateUserVisible = ref(false);
    const userMsg = ref();
    // 修改客户
    function updateUser(params: any) {
      console.log("修改客户信息");
      console.log(params);
      userMsg.value = params;
      dialogUpdateUserVisible.value = true;
    }

    // 确定修改
    function updateUserSure() {
      console.log("修改");
      if (userMsg.value.phone == "") {
        message.error({
          message: "客户手机号不能为空",
          showClose: true,
          duration: 2000,
        });
      } else {
        dialogUpdateUserVisible.value = false;
        axios
          .post(store.state.baseUrl + "/seller/member/update", {
            id: userMsg.value.id,
            name: userMsg.value.name,
            gender: userMsg.value.gender,
            phone: userMsg.value.phone,
            mail: userMsg.value.mail,
            birthday: dateTransition(userMsg.value.birthday),
          })
          .then((res: any) => {
            console.log("修改客户");
            console.log(res);
            if (res.data.code < 500) {
              message.success({
                message: "修改成功",
                showClose: true,
                duration: 2000,
              });
              getUserList();
            }
          });
      }
    }

    const dialogAddUserVisible = ref(false);
    const userForm = reactive({
      name: "",
      gender: 1,
      phone: "",
      mail: "",
      birthday: "",
    });
    const userFormRules = reactive({
      name: [
        {
          required: true,
          message: "请输入客户姓名",
          trigger: "blur",
        },
      ],
      phone: [
        {
          required: true,
          message: "请输入客户手机号",
          trigger: "blur",
        },
      ],
    });
    const userAdminForm = ref();
    console.log(userAdminForm.value);

    onMounted(() => {
      console.log("userAdminForm.value " + userAdminForm.value);
    });

    // 添加客户
    function userAdd() {
      console.log("添加客户");
      userForm.name = "";
      userForm.gender = 1;
      userForm.phone = "";
      userForm.mail = "";
      userForm.birthday = "";
      dialogAddUserVisible.value = true;
    }

    // 确定
    function userAddSure() {
      console.log(userForm);
      console.log(dateTransition(userForm.birthday));
      console.log("userAdminForm.value2 ", userAdminForm.value);

      userAdminForm.value.validate((valid: any) => {
        if (valid) {
          console.log("通过");
          dialogAddUserVisible.value = false;
          axios
            .post(store.state.baseUrl + "/seller/member/insert", {
              name: userForm.name,
              gender: userForm.gender,
              phone: userForm.phone,
              mail: userForm.mail,
              birthday: dateTransition(userForm.birthday),
            })
            .then((res: any) => {
              console.log("添加客户");
              console.log(res);
              if (res.data.code < 500) {
                message.success({
                  message: "添加成功",
                  showClose: true,
                  duration: 2000,
                });
                getUserList();
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }

    // 分页
    function handleCurrentChange(p: number) {
      console.log(`当前页: ${p}`);
      page.value = p;
      getUserList();
    }

    return {
      axios,
      store,
      message,
      keyword,
      userList,
      userCheckNum,
      userSelect,
      userTable,
      getRowKeys,
      updateUser,
      updateUserSure,
      dialogUpdateUserVisible,
      userMsg,
      deleteUser,
      dialogAddUserVisible,
      userAdd,
      userAddSure,
      userForm,
      userFormRules,
      dateTransition,
      userAdminForm,
      getUserList,
      handleCurrentChange,
      page,
      total,
      checkPurchase,
      dialogCheckPurchaseVisible,
      totalPur,
      purchaseList,
      productList,
    };
  },
});
</script>

<style lang="scss" scoped>
.user-admin-container {
  width: 100%;

  .user-admin-top {
    // text-align: left;
    display: flex;
    justify-content: space-between;
  }

  .user-admin-main {
    margin-top: 1rem;
    padding: 20px;
    background-color: #fff;
    // box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
    //   2px 2px 3px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
}
</style>

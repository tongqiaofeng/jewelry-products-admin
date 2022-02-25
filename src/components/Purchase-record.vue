<template>
  <div class="purchase-record-container">
    <!-- <h1>客户购买记录</h1> -->
    <div class="purchase-record-top">
      <div style="display: flex;flex-wrap: wrap;">
        <el-select v-model="statusSel" style=" margin-bottom: 10px;">
          <el-option
            v-for="item in statusList"
            :key="item.id"
            :label="item.name"
            :value="item.id"
          >
          </el-option>
        </el-select>
        <el-date-picker
          v-model="time"
          type="daterange"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          format="YYYY-MM-DD"
          style=" margin-bottom: 10px;"
        >
        </el-date-picker>
        <el-input
          style="width: 370px;margin-right: 15px;"
          v-model="keyword"
          placeholder="可输入客户姓名、手机号,销售员工号进行查找"
          clearable
        ></el-input>
        <el-button style="height: 40px;" type="primary" @click="getPurchaseList"
          >查 找</el-button
        >
        <el-button style="height: 40px;" type="primary" @click="purchaseAdd"
          >添加销售单</el-button
        >
        <el-dialog
          v-if="dialogPurchaseAddVisible"
          title="添加销售单"
          v-model="dialogPurchaseAddVisible"
          width="560px"
        >
          <el-form
            :model="purchaseForm"
            :rules="purchaseFormRules"
            ref="purchaseRecordForm"
            label-width="110px"
          >
            <el-form-item
              label="购买客户："
              prop="userId"
              style="text-align: left;"
            >
              <el-select
                v-model="purchaseForm.userId"
                placeholder="请选择"
                style="width: 100%;"
              >
                <el-option
                  v-for="item in userList"
                  :key="item.id"
                  :label="item.name"
                  :value="item.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="购买商品："
              prop="productId"
              style="text-align: left;"
            >
              <el-select
                v-model="purchaseForm.productId"
                placeholder="请选择"
                style="width: 100%;"
              >
                <el-option
                  v-for="items in productList"
                  :key="items.id"
                  :label="items.name"
                  :value="items.id"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="销售价格：" prop="price">
              <el-input
                v-model="purchaseForm.price"
                placeholder="请输入销售价格"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="销售员工号：" prop="employee">
              <el-input
                v-model="purchaseForm.employee"
                placeholder="请输入销售员工号"
                clearable
              ></el-input>
            </el-form-item>
            <el-form-item label="销售日期：" prop="buyDate">
              <el-date-picker
                v-model="purchaseForm.buyDate"
                type="date"
                placeholder="请选择销售日期"
                format="YYYY-MM-DD"
                style="width: 100%"
              ></el-date-picker>
            </el-form-item>
          </el-form>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogPurchaseAddVisible = false"
                >取 消</el-button
              >
              <el-button type="primary" @click="purchaseAddSure"
                >确 定</el-button
              >
            </span>
          </template>
        </el-dialog>
      </div>
      <div style="text-align: right;">
        <div v-show="purchaseCheckNum >= 1">
          <span style="color: #919090; font-size: 0.92rem"
            >已选：{{ purchaseCheckNum }}个销售单</span
          >
          <el-button style="margin-left: 15px; " @click="deletePurchase"
            >删除</el-button
          >
        </div>
      </div>
    </div>
    <div class="purchase-record-main">
      <el-table
        style="width: 100%"
        border
        stripe
        :data="purchaseList"
        @selection-change="purchaseSelect"
        :row-key="getRowKeys"
        ref="purchaseTable"
      >
        <el-table-column
          align="center"
          type="selection"
          :reserve-selection="true"
          width="55"
        >
        </el-table-column>
        <el-table-column prop="member" label="购买客户">
          <template #default="scope">
            <div v-for="item in userList" :key="item.id">
              <span v-if="scope.row.member == item.id">{{ item.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="jewelry" label="购买商品">
          <template #default="scope">
            <div v-for="items in productList" :key="items.id">
              <span v-if="scope.row.jewelry == items.id">{{ items.name }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="price" label="销售价格">
          <template #default="scope">
            <div>
              <span>{{ formatNumberRgx(scope.row.price) }}</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="seller" label="销售员工号"> </el-table-column>
        <el-table-column prop="status" label="状态">
          <template #default="scope">
            <div>
              <span
                :style="{
                  color:
                    scope.row.status == 0
                      ? 'green'
                      : scope.row.status == 1
                      ? 'red'
                      : '#000',
                }"
                >{{
                  scope.row.status == 0
                    ? "正常"
                    : scope.row.status == 1
                    ? "退货"
                    : ""
                }}</span
              >
            </div>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作">
          <template #default="scope">
            <div>
              <div
                @click="updatePurchase(scope.row)"
                style="cursor: pointer; color: #3d81fd"
              >
                <i class="el-icon-edit-outline" />查看
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="销售单详情"
        v-model="dialogPurchaseUpdateVisible"
        width="560px"
      >
        <el-form label-width="110px">
          <el-form-item label="购买客户：" style="text-align: left;" required>
            <el-select
              v-model="purchaseDetails.member"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="item in userList"
                :key="item.id"
                :label="item.name"
                :value="item.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="购买商品：" style="text-align: left;" required>
            <el-select
              v-model="purchaseDetails.jewelry"
              placeholder="请选择"
              style="width: 100%;"
            >
              <el-option
                v-for="items in productList"
                :key="items.id"
                :label="items.name"
                :value="items.id"
              ></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="销售价格：" required>
            <el-input
              v-model="purchaseDetails.price"
              placeholder="请输入销售价格"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="销售员工号：" required>
            <el-input
              v-model="purchaseDetails.seller"
              placeholder="请输入销售员工号"
              clearable
            ></el-input>
          </el-form-item>
          <el-form-item label="销售日期：" required>
            <el-date-picker
              v-model="purchaseDetails.date"
              type="date"
              placeholder="请选择销售日期"
              format="YYYY-MM-DD"
              style="width: 100%"
            ></el-date-picker>
          </el-form-item>
        </el-form>
        <template #footer>
          <span class="dialog-footer">
            <el-button @click="dialogPurchaseUpdateVisible = false"
              >取 消</el-button
            >
            <el-button
              type="primary"
              @click="dialogPurchaseUpdateVisible = false"
              >确 定</el-button
            >
          </span>
        </template>
      </el-dialog>
      <div style="width: 100%; height: 50px">
        <div
          style="
              width: 100%;
              margin: 15px 0;
              text-align: right;
            "
        >
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
import { defineComponent, getCurrentInstance, reactive, ref } from "vue";
export default defineComponent({
  setup() {
    const axios = getCurrentInstance()?.appContext.config.globalProperties
      .$axios;
    const store = getCurrentInstance()?.appContext.config.globalProperties
      .$store;
    const message = getCurrentInstance()?.appContext.config.globalProperties
      .$message;
    const formatNumberRgx = getCurrentInstance()?.appContext.config
      .globalProperties.$http;

    const statusList = reactive([
      {
        id: -1,
        name: "全部",
      },
      {
        id: 0,
        name: "正常",
      },
      {
        id: 1,
        name: "退货",
      },
    ]);
    const statusSel = ref(-1);

    const purchaseTable = ref();

    const time = ref("");
    const keyword = ref("");
    const total = ref(0);
    const page = ref(1);
    const purchaseList = ref([]);

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

    // 查询销售单
    function getPurchaseList() {
      console.log("时间");
      console.log(time.value);
      // purchaseList.value = [];
      // total.value = 0;
      axios
        .get(store.state.baseUrl + "/seller/receipt/list", {
          params: {
            date1:
              time.value == "" || time.value == null
                ? ""
                : dateTransition(time.value[0]),
            date2:
              time.value == "" || time.value == null
                ? ""
                : dateTransition(time.value[1]),
            search: keyword.value,
            pageNumber: page.value,
            status: statusSel.value == -1 ? "" : statusSel.value,
          },
        })
        .then((res: any) => {
          console.log("销售单列表");
          console.log(res);
          if (res.data.code < 500) {
            purchaseList.value = res.data.data.list;
            total.value = res.data.data.totalCount;
          }
        });
    }
    getPurchaseList();

    const dialogPurchaseAddVisible = ref(false);
    const purchaseForm = reactive({
      userId: "",
      productId: "",
      price: "",
      employee: "",
      buyDate: "",
    });
    const purchaseFormRules = reactive({
      userId: [
        {
          required: true,
          message: "请选择购买客户",
          trigger: "change",
        },
      ],
      productId: [
        {
          required: true,
          message: "请选择购买商品",
          trigger: "change",
        },
      ],
      price: [
        {
          required: true,
          message: "请输入销售价格",
          trigger: "blur",
        },
      ],
      employee: [
        {
          required: true,
          message: "请输入销售员工号",
          trigger: "blur",
        },
      ],
      buyDate: [
        {
          required: true,
          message: "请选择销售日期",
          trigger: "change",
        },
      ],
    });
    const purchaseRecordForm = ref();

    // 添加销售单
    function purchaseAdd() {
      console.log("添加销售单");
      purchaseForm.userId = "";
      purchaseForm.productId = "";
      purchaseForm.price = "";
      purchaseForm.employee = "";
      purchaseForm.buyDate = "";
      dialogPurchaseAddVisible.value = true;
    }

    // 确定添加
    function purchaseAddSure() {
      console.log("确定添加销售单");
      purchaseRecordForm.value.validate((valid: any) => {
        if (valid) {
          console.log("通过");
          dialogPurchaseAddVisible.value = false;
          axios
            .post(store.state.baseUrl + "/seller/receipt/insert", {
              member: purchaseForm.userId,
              jewelry: purchaseForm.productId,
              price: purchaseForm.price,
              seller: purchaseForm.employee,
              date: dateTransition(purchaseForm.buyDate),
            })
            .then((res: any) => {
              console.log("添加销售单");
              console.log(res);
              if (res.data.code < 500) {
                if (res.data.code < 500) {
                  message.success({
                    message: "添加成功",
                    showClose: true,
                    duration: 2000,
                  });
                  getPurchaseList();
                }
              }
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }

    const dialogPurchaseUpdateVisible = ref(false);
    const purchaseDetails = ref();
    // 修改销售单
    function updatePurchase(params: any) {
      console.log("修改");
      purchaseDetails.value = params;
      console.log(purchaseDetails.value);
      dialogPurchaseUpdateVisible.value = true;
    }

    // 确定修改
    function updatePurchaseSure() {
      dialogPurchaseUpdateVisible.value = false;
      axios
        .post(store.state.baseUrl + "/seller/receipt/insert", {
          id: purchaseDetails.value.id,
          member: purchaseDetails.value.member,
          jewelry: purchaseDetails.value.jewelry,
          price: purchaseDetails.value.price,
          seller: purchaseDetails.value.seller,
          date: dateTransition(purchaseDetails.value.date),
        })
        .then((res: any) => {
          console.log("修改销售单");
          console.log(res);
          if (res.data.code < 500) {
            if (res.data.code < 500) {
              message.success({
                message: "修改成功",
                showClose: true,
                duration: 2000,
              });
              getPurchaseList();
            }
          }
        });
    }

    const purchaseCheckNum = ref(0);
    let purchaseCheckList: number[] = [];

    // 选择删除销售单
    function purchaseSelect(params: any) {
      console.log(params);
      purchaseCheckList = [];
      if (params.length !== 0) {
        for (const item of params) {
          purchaseCheckList.push(item.id);
        }
      }
      purchaseCheckNum.value = purchaseCheckList.length;
      console.log(purchaseCheckList);
    }
    // 删除销售单
    function deletePurchase() {
      console.log("删除销售单");
      console.log(purchaseCheckList);
      axios
        .post(store.state.baseUrl + "/seller/receipt/close", purchaseCheckList)
        .then((res: any) => {
          console.log("删除销售单");
          console.log(res);
          if (res.data.code < 500) {
            message.success({
              message: "删除成功",
              showClose: true,
              duration: 2000,
            });
            purchaseTable.value.clearSelection();
            getPurchaseList();
          }
        });
    }

    function getRowKeys(row: any) {
      return row.id;
    }

    // 分页
    function handleCurrentChange(p: number) {
      console.log(`当前页: ${p}`);
      page.value = p;
      console.log("page数字" + page.value);
      getPurchaseList();
    }

    const userList = ref();
    // 获取客户列表
    function getUserList() {
      axios
        .get(store.state.baseUrl + "/seller/member/list")
        .then((res: any) => {
          console.log("客户列表");
          console.log(res);
          if (res.data.code < 500) {
            userList.value = res.data.data.list;
          }
        });
    }
    getUserList();

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

    return {
      axios,
      store,
      message,
      time,
      keyword,
      total,
      page,
      purchaseList,
      getPurchaseList,
      dialogPurchaseAddVisible,
      purchaseForm,
      purchaseFormRules,
      purchaseAdd,
      purchaseAddSure,
      userList,
      productList,
      purchaseCheckNum,
      deletePurchase,
      purchaseSelect,
      purchaseTable,
      getRowKeys,
      updatePurchase,
      handleCurrentChange,
      dialogPurchaseUpdateVisible,
      updatePurchaseSure,
      purchaseDetails,
      purchaseRecordForm,
      formatNumberRgx,
      statusList,
      statusSel,
    };
  },
});
</script>

<style lang="scss" scoped>
.purchase-record-container {
  width: 100%;

  .purchase-record-top {
    // text-align: left;
    display: flex;
    justify-content: space-between;
  }

  .purchase-record-main {
    margin-top: 1rem;
    padding: 20px;
    background-color: #fff;
    // box-shadow: -2px -2px 3px rgba(255, 255, 255, 0.8),
    //   2px 2px 3px rgba(0, 0, 0, 0.2);
    border-radius: 10px;
  }
}
</style>

<template>
  <div class="boby">
    <div v-if="index == 0" class="management">
      <!-- <div class="managementtitle">珠宝管理</div> -->
      <div class="mbobyButton2">
        <span style="width: 35%; font-size: 1.3rem">珠宝管理</span>
        <div>
          <el-button class="button" @click="addcommodity"
            ><i class="el-icon-plus"
          /></el-button>
          <el-button @click="searchbutton" class="button"
            ><i class="el-icon-search"
          /></el-button>
        </div>
      </div>
      <div class="managementboby">
        <div class="mbobyButton">
          <el-button class="button" @click="addcommodity"
            ><i class="el-icon-plus" />添加珠宝</el-button
          >
          <el-button @click="searchbutton"
            ><i class="el-icon-search" />查找珠宝</el-button
          >
          <div
            v-show="checkboxlength >= 1"
            style="float: right; margin-right: 2rem"
          >
            <span style="margin-right: 1rem; color: #919090; font-size: 0.92rem"
              >已选：{{ checkboxlength }}个珠宝</span
            >
            <el-button @click="deletebotton">删除</el-button>
          </div>
        </div>
        <el-dialog title="查找珠宝" v-model="dialogse" width="560px">
          <div>
            <el-form label-width="5.2rem">
              <el-form-item label="珠宝名称：">
                <el-input v-model="searchName" clearable></el-input>
              </el-form-item>
              <el-form-item label="宝石品类：">
                <el-select
                  v-model="searchStone"
                  placeholder="请选择宝石品类"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in GemcategoryList"
                    :key="index"
                    :label="item.gem"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="珠宝分类：">
                <el-select
                  v-model="searchType"
                  placeholder="请选择珠宝分类"
                  style="width: 100%"
                  clearable
                >
                  <el-option
                    v-for="(item, index) in Jewellery"
                    :key="index"
                    :label="item.type"
                    :value="item.id"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </el-form>
          </div>
          <template #footer>
            <span class="dialog-footer">
              <el-button @click="dialogse = false">取 消</el-button>
              <el-button type="primary" @click="shopinfo">确 定</el-button>
            </span>
          </template>
        </el-dialog>
        <!--phone 首页-->
        <!-- <div class="phonemenu">
          <div
            v-for="(item, index) in infos.stu"
            class="phonemenudiv"
            data-type="0"
            :key="index"
          >
            <div
              @touchstart="tstart($event)"
              @click="Viewdetails(item.id)"
              class="list-box"
              @touchend="end($event, item.id)"
            >
              <div class="imagebox">
                <img
                  :src="img + '/admin/file/image/' + item.images"
                  alt=""
                  style="width: 7rem; height: 7rem"
                />
              </div>
              <div class="textbox">
                <div style="font-size: 0.7rem">{{ item.name }}</div>
                <div>净度：{{ item.clarity }}</div>
                <div>重量：{{ item.weight }}</div>
                <div>预估价：￥{{ item.price }}</div>
              </div>
            </div>
            <div class="delete" @click="deleteItem()" :data-index="index">
              删除
            </div>
          </div>
        </div> -->
        <!--pc  style="height: 80vh; overflow-y: scroll"-->
        <div class="pcTable">
          <el-table
            style="width: 100%"
            border
            stripe
            :data="infos.stu"
            @selection-change="checkid"
            :row-key="getRowKeys"
            ref="multipleTable"
          >
            <el-table-column
              align="center"
              type="selection"
              :reserve-selection="true"
              width="55"
            >
            </el-table-column>
            <el-table-column label="珠宝图片" width="130px">
              <template #default="scope">
                <div>
                  <img
                    :src="
                      scope.row.images.indexOf('|') == -1
                        ? img + '/admin/file/image/' + scope.row.images
                        : img +
                          '/admin/file/image/' +
                          scope.row.images.split('|')[0]
                    "
                    style="width: 7rem; height: 7rem;"
                  />
                </div>
              </template>
            </el-table-column>
            <el-table-column prop="name" label="珠宝名称"> </el-table-column>
            <el-table-column prop="price" label="参考价">
              <template #default="scope">
                <div>
                  <span>{{ formatNumberRgx(scope.row.price) }}</span>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="珠宝种类">
              <template #default="scope">
                <div>
                  <div
                    v-for="e in Jewellery"
                    :key="e.id"
                    v-show="e.id == scope.row.type"
                  >
                    {{ e.type }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="宝石品类">
              <template #default="scope">
                <div>
                  <div
                    v-for="e in GemcategoryList"
                    :key="e.id"
                    v-show="e.id == scope.row.stone"
                  >
                    {{ e.gem }}
                  </div>
                </div>
              </template>
            </el-table-column>
            <el-table-column align="center" label="操作">
              <template #default="scope">
                <div>
                  <div
                    style="
                    display: flex;
                    flex-wrap: wrap;
                    justify-content: space-around;
                  "
                  >
                    <!-- <div
                      @click="Viewdetails(scope.row.id)"
                      style="cursor: pointer"
                    >
                      <i class="el-icon-zoom-in" />详情
                    </div> -->
                    <div
                      @click="changmessage(scope.row)"
                      style="cursor: pointer; color: #3d81fd"
                    >
                      <i class="el-icon-edit-outline" />修改
                    </div>
                    <a
                      :href="'http://pauliana.cn/item?id=' + scope.row.id"
                      target="_blank"
                      >预览</a
                    >
                  </div>
                </div>
              </template>
            </el-table-column>
          </el-table>
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
    </div>
    <div v-if="index == 1" class="management back">
      <div
        v-if="index == 1"
        @click="returnfun(index)"
        style="cursor: pointer; text-align: left; padding: 0.5rem 0 0 0.5rem"
      >
        <i class="el-icon-back" />返回
      </div>
      <!-- <div class="managementtitle">珠宝信息添加</div> -->
      <div class="managementboby">
        <div class="options">
          <el-form label-width="6rem">
            <el-form-item label="证书类型：" style="text-align: left;">
              <el-select
                v-model="certificateType"
                placeholder="请选择证书类型"
                clearable
                filterable
                @change="certificateChange"
                @blur="selectBlur"
              >
                <el-option
                  v-for="(cer, index) in certificateTypeList"
                  :key="index"
                  :label="cer"
                  :value="cer"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form class="phoneimg" label-width="6rem">
            <el-form-item label="证书图片：" class="item">
              <el-upload
                action=""
                ref="uploadFile1"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-error="handleError"
                :http-request="uploadpic"
                :on-success="uploadsuccess"
                :file-list="imgurl1.stu"
                style="float: left"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <img style="width: 100%; height: auto" :src="dialogImageUrl" />
              </el-dialog>
            </el-form-item>
            <el-form-item label="珠宝图片：" class="item" required>
              <div style="display: flex;flex-wrap: wrap;">
                <div class="draggMove">
                  <div
                    v-for="(item, index) in imgurl2.stu"
                    :key="index"
                    style="margin-right:10px;position:relative;"
                    class="imgDiv"
                  >
                    <span class="spanStyle" @click="handleRemove2(index)"
                      >x</span
                    >
                    <img
                      :src="item.url"
                      draggable="true"
                      @dragstart="handleDragStart($event, item)"
                      @dragover.prevent="handleDragOver($event, item)"
                      @dragenter="handleDragEnter($event, item)"
                      @dragend="handleDragEnd($event, item)"
                      style="width: 148px;height: 148px;object-fit: cover;border-radius:6px;"
                    />
                  </div>
                </div>
                <el-upload
                  action=""
                  ref="uploadFile2"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview2"
                  :on-error="handleError2"
                  :http-request="uploadpic2"
                  :show-file-list="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" />
                </el-dialog>
              </div>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item
              label="珠宝名称："
              style="width: 46%; text-align: left"
              class="item"
              required
            >
              <el-input
                v-model="modelname"
                class="elinput1"
                placeholder="请输入珠宝名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="系列：" style="width: 46%">
              <el-select
                v-model="modelseriesId"
                style="width: 100%"
                placeholder="请选择系列"
                clearable
              >
                <el-option
                  v-for="(item, index) in serieslista.stu"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item label="编号：" style="width: 46%" required>
              <el-input v-model="numberStr" placeholder="请输入编号"></el-input>
            </el-form-item>
            <el-form-item
              label="参考价："
              style="width: 46%; text-align: left"
              class="item"
              required
            >
              <el-input
                v-model="modelprice"
                class="elinput1"
                placeholder="请输入参考价"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item label="珠宝种类：" style="width: 46%" required>
              <el-select
                v-model="jewelleryId"
                placeholder="请选择珠宝种类"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="(item, index) in Jewellery"
                  :key="index"
                  :label="item.type"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="宝石品类：" style="width: 46%" required>
              <el-select
                v-model="gemid"
                placeholder="请选择宝石品类"
                style="width: 100%"
                clearable
                @change="gemidChange"
              >
                <el-option
                  v-for="(item, index) in GemcategoryList"
                  :key="index"
                  :label="item.gem"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-form
            label-width="6rem"
            style="display: flex"
            v-if="isActive03 == 0"
          >
            <el-form-item label="净度：" style="width: 46%" class="item">
              <el-select
                v-model="modelclarity"
                placeholder="请选择净度"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur2"
              >
                <el-option
                  v-for="(item, index) in clarity"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="颜色：" style="width: 46%" class="item">
              <el-select
                v-model="modelcolor"
                placeholder="请选择颜色"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur3"
              >
                <el-option
                  v-for="(item, index) in Color"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form
            label-width="6rem"
            style="display: flex"
            v-if="isActive03 == 0"
          >
            <el-form-item label="切工：" style="width: 46%" class="item">
              <el-select
                v-model="modelcut"
                placeholder="请选择切工"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur4"
              >
                <el-option
                  v-for="(item, index) in Cut"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对称：" style="width: 46%">
              <el-select
                v-model="symmetry"
                placeholder="请选择对称"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur5"
              >
                <el-option
                  v-for="(item, index) in Cut"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form
            label-width="6rem"
            style="display: flex"
            v-if="isActive03 == 0"
          >
            <el-form-item label="抛光：" style="width: 46%">
              <el-select
                v-model="polish"
                placeholder="请选择抛光"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur6"
              >
                <el-option
                  v-for="(item, index) in Cut"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="荧光：" style="width: 46%" class="item">
              <el-select
                v-model="modelfluorescence"
                placeholder="请选择荧光"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur7"
              >
                <el-option
                  v-for="(item, index) in fluorescence"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-form
            label-width="6rem"
            style="display: flex"
            v-if="isActive03 == 1"
          >
            <el-form-item label="颜色：" style="width: 46%" class="item">
              <el-select
                v-model="modelcolor"
                placeholder="请选择颜色"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur3"
              >
                <el-option
                  v-for="(item, index) in Color"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="切工：" style="width: 46%" class="item">
              <el-select
                v-model="modelcut"
                placeholder="请选择切工"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur4"
              >
                <el-option
                  v-for="(item, index) in Cut"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-form label-width="6rem" style="display: flex">
            <el-form-item
              label="尺寸："
              style="width: 46%; text-align: left"
              class="item"
            >
              <el-input
                v-model="modelsize"
                class="elinput1"
                placeholder="长x宽x高 mm"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="重量："
              style="width: 46%; text-align: left"
              class="item"
            >
              <el-input
                v-model="modelweight"
                class="elinput1"
                placeholder="请输入重量"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item label="形状(切割)：" style="width: 46%">
              <el-select
                v-model="modelshape"
                placeholder="请选择形状"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur10"
              >
                <el-option
                  v-for="(item, index) in shapelist"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产地：" style="width: 46%">
              <el-input v-model="place" placeholder="请输入产地"></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item
              label="热处理："
              style="width: 46%"
              v-if="isActive02 == 1"
            >
              <el-select
                v-model="heat"
                placeholder="请选择热处理"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur11"
              >
                <el-option
                  v-for="(item, index) in heatList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="净度优化："
              style="width: 46%"
              v-if="isActive01 == 1"
            >
              <el-select
                v-model="opt"
                placeholder="请选择净度优化"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur12"
              >
                <el-option
                  v-for="(item, index) in optList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item label="描述：" style="width: 46%">
              <el-input
                type="textarea"
                v-model="description"
                placeholder="请输入描述信息"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem">
            <el-form-item label="详情描述：" required>
              <Tinymce
                @designercontent="designercontent"
                :propsmsg="propsmsg"
              ></Tinymce>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <!--修改-->
    <div v-if="index == 5" class="management back">
      <div
        v-if="index == 5"
        @click="returnfun(index)"
        style="cursor: pointer; text-align: left; padding: 0.5rem 0 0 0.5rem"
      >
        <i class="el-icon-back" />返回
      </div>
      <!-- <div class="managementtitle">珠宝信息编辑</div> -->
      <div class="managementboby">
        <div class="options">
          <el-form label-width="6rem">
            <el-form-item label="证书类型：" style="text-align: left;">
              <el-select
                v-model="shopmessage[0].certificate"
                placeholder="请选择证书类型"
                clearable
                @change="certificateChange"
                @blur="selectBlur"
              >
                <el-option
                  v-for="(cer, index) in certificateTypeList"
                  :key="index"
                  :label="cer"
                  :value="cer"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem">
            <el-form-item label="证书图片：" class="item">
              <el-upload
                action=""
                ref="uploadFile1"
                list-type="picture-card"
                :on-preview="handlePictureCardPreview"
                :on-remove="handleRemove"
                :on-error="handleError"
                :http-request="uploadpic"
                :on-success="uploadsuccess"
                :file-list="imgurl1.stu"
                style="float: left"
              >
                <i class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="dialogVisible">
                <div style="width: 100%">
                  <img width="100%" :src="dialogImageUrl" alt="" />
                </div>
              </el-dialog>
            </el-form-item>
            <el-form-item label="珠宝图片：" class="item" required>
              <div style="display: flex;flex-wrap: wrap;">
                <div class="draggMove">
                  <div
                    v-for="(item, index) in imgurl2.stu"
                    :key="index"
                    style="margin-right:10px;position:relative;"
                    class="imgDiv"
                  >
                    <span class="spanStyle" @click="handleRemove2(index)"
                      >x</span
                    >
                    <img
                      :src="item.url"
                      draggable="true"
                      @dragstart="handleDragStart($event, item)"
                      @dragover.prevent="handleDragOver($event, item)"
                      @dragenter="handleDragEnter($event, item)"
                      @dragend="handleDragEnd($event, item)"
                      style="width: 148px;height: 148px;object-fit: cover;border-radius:6px;"
                    />
                  </div>
                </div>
                <el-upload
                  action=""
                  ref="uploadFile2"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview2"
                  :on-error="handleError2"
                  :http-request="uploadpic2"
                  :show-file-list="false"
                >
                  <i class="el-icon-plus"></i>
                </el-upload>
                <el-dialog v-model="dialogVisible">
                  <img width="100%" :src="dialogImageUrl" />
                </el-dialog>
              </div>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item
              label="珠宝名称："
              style="width: 46%; text-align: left"
              class="item"
              required
            >
              <el-input
                v-model="shopmessage[0].name"
                class="elinput1"
                placeholder="请输入珠宝名称"
              ></el-input>
            </el-form-item>
            <el-form-item label="系列：" style="width: 46%">
              <el-select
                v-model="shopmessage[0].seriesId"
                style="width: 100%"
                placeholder="请选择系列"
                clearable
              >
                <el-option
                  v-for="(item, index) in serieslista.stu"
                  :key="index"
                  :label="item.name"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item label="编号：" style="width: 46%" required>
              <el-input
                v-model="shopmessage[0].number"
                placeholder="请输入编号"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="参考价："
              style="width: 46%; text-align: left"
              class="item"
              required
            >
              <el-input
                v-model="shopmessage[0].price"
                class="elinput1"
                placeholder="请输入参考价"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item label="珠宝种类：" style="width: 46%" required>
              <el-select
                v-model="shopmessage[0].type"
                placeholder="请选择珠宝种类"
                style="width: 100%"
                clearable
              >
                <el-option
                  v-for="(item, index) in Jewellery"
                  :key="index"
                  :label="item.type"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="宝石品类：" style="width: 46%" required>
              <el-select
                v-model="shopmessage[0].stone"
                placeholder="请选择宝石品类"
                style="width: 100%"
                clearable
                @change="gemidChange"
              >
                <el-option
                  v-for="(item, index) in GemcategoryList"
                  :key="index"
                  :label="item.gem"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <el-form
            label-width="6rem"
            style="display: flex"
            v-if="isActive03 == 0"
          >
            <el-form-item label="净度：" style="width: 46%" class="item">
              <el-select
                v-model="shopmessage[0].clarity"
                placeholder="请选择"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur2"
              >
                <el-option
                  v-for="(item, index) in clarity"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="颜色：" style="width: 46%" class="item">
              <el-select
                v-model="shopmessage[0].color"
                placeholder="请选择"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur3"
              >
                <el-option
                  v-for="(item, index) in Color"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form
            label-width="6rem"
            style="display: flex"
            v-if="isActive03 == 0"
          >
            <el-form-item label="切工：" style="width: 46%" class="item">
              <el-select
                v-model="shopmessage[0].cut"
                placeholder="请选择"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur4"
              >
                <el-option
                  v-for="(item, index) in Cut"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="对称：" style="width: 46%">
              <el-select
                v-model="shopmessage[0].symmetry"
                placeholder="请选择"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur5"
              >
                <el-option
                  v-for="(item, index) in Cut"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form
            label-width="6rem"
            style="display: flex"
            v-if="isActive03 == 0"
          >
            <el-form-item label="抛光：" style="width: 46%">
              <el-select
                v-model="shopmessage[0].polish"
                placeholder="请选择"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur6"
              >
                <el-option
                  v-for="(item, index) in Cut"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="荧光：" style="width: 46%" class="item">
              <el-select
                v-model="shopmessage[0].fluorescence"
                placeholder="请选择"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur7"
              >
                <el-option
                  v-for="(item, index) in fluorescence"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form
            label-width="6rem"
            style="display: flex"
            v-if="isActive03 == 1"
          >
            <el-form-item label="颜色：" style="width: 46%" class="item">
              <el-select
                v-model="shopmessage[0].color"
                placeholder="请选择"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur3"
              >
                <el-option
                  v-for="(item, index) in Color"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="切工：" style="width: 46%" class="item">
              <el-select
                v-model="shopmessage[0].cut"
                placeholder="请选择"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur4"
              >
                <el-option
                  v-for="(item, index) in Cut"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item
              label="尺寸："
              style="width: 46%; text-align: left"
              class="item"
            >
              <el-input
                v-model="shopmessage[0].measurements"
                class="elinput1"
                placeholder="长x宽x高 mm"
              ></el-input>
            </el-form-item>
            <el-form-item
              label="重量："
              style="width: 46%; text-align: left"
              class="item"
            >
              <el-input
                v-model="shopmessage[0].weight"
                class="elinput1"
                placeholder="请输入内容"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item label="形状(切割)：" style="width: 46%">
              <el-select
                v-model="shopmessage[0].shape"
                placeholder="请选择"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur10"
              >
                <el-option
                  v-for="(item, index) in shapelist"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="产地：" style="width: 46%">
              <el-input
                v-model="shopmessage[0].place"
                placeholder="请输入产地"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item
              label="热处理："
              style="width: 46%"
              v-if="isActive02 == 1"
            >
              <el-select
                v-model="shopmessage[0].heat"
                placeholder="请选择热处理"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur11"
              >
                <el-option
                  v-for="(item, index) in heatList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
            <el-form-item
              label="净度优化："
              style="width: 46%"
              v-if="isActive01 == 1"
            >
              <el-select
                v-model="shopmessage[0].opt"
                placeholder="请选择净度优化"
                style="width: 100%"
                clearable
                filterable
                @blur="selectBlur12"
              >
                <el-option
                  v-for="(item, index) in optList"
                  :key="index"
                  :label="item"
                  :value="item"
                ></el-option>
              </el-select>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem" style="display: flex">
            <el-form-item label="描述：" style="width: 46%">
              <el-input
                type="textarea"
                v-model="shopmessage[0].description"
                placeholder="请输入描述信息"
              ></el-input>
            </el-form-item>
          </el-form>
          <el-form label-width="6rem">
            <el-form-item label="详情描述：" required>
              <Tinymce @ptoetop="ptoetop" :propsmsg="propsmsg"></Tinymce>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
    <div v-if="index == 6">
      <Gumdetails :propsdata="propsdata" @bindSend="bindSend"></Gumdetails>
    </div>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  ref,
  watch,
  getCurrentInstance,
  nextTick,
} from "vue";

import Tinymce from "./Tinymce.vue";
import Gumdetails from "./Gumdetails.vue";

function start() {
  const total = ref();
  const page = ref(1);
  const certificateType = ref("");
  const certificateTypeList = reactive([
    "GIA",
    "国检",
    "GRS",
    "GUILD",
    "EG Lab",
  ]);
  const clarity = reactive([
    "FL",
    "IF",
    "VVS1",
    "VVS2",
    "VS1",
    "VS2",
    "SI1",
    "SI2",
    "I1",
  ]);
  const Color = ref(["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"]);
  const Cut = ref(["EX", "VG", "G", "F", "P"]);
  const fluorescence = reactive(["None", "Faint", "Medium", "Strong"]);
  const shapelist = ref([
    "圆形",
    "公主方",
    "祖母绿",
    "橄榄型",
    "椭圆形",
    "雷地恩",
    "梨形",
    "心心相印/心形",
    "三角形",
    "Fire Cushion/垫形",
  ]);
  const GemcategoryList = reactive([
    {
      id: 0,
      gem: "钻石",
    },
    {
      id: 1,
      gem: "海蓝宝石",
    },
    {
      id: 2,
      gem: "红宝石",
    },
    {
      id: 3,
      gem: "蓝宝石",
    },
    {
      id: 4,
      gem: "坦桑石",
    },
    {
      id: 5,
      gem: "祖母绿",
    },
    {
      id: 6,
      gem: "碧玺",
    },
    {
      id: 7,
      gem: "尖晶石",
    },
    {
      id: 8,
      gem: "南洋珍珠",
    },
    {
      id: 9,
      gem: "大溪地珍珠",
    },
    {
      id: 10,
      gem: "紫珍珠",
    },
  ]);
  const Jewellery = reactive([
    {
      id: 0,
      type: "裸石",
    },
    {
      id: 1,
      type: "项链",
    },
    {
      id: 2,
      type: "戒指",
    },
    {
      id: 3,
      type: "手链",
    },
    {
      id: 4,
      type: "胸针",
    },
    {
      id: 5,
      type: "耳环",
    },
  ]);
  const jewelleryId = ref();
  const gemid = ref();
  const infos = reactive({
    stu: [],
  });

  const axios = getCurrentInstance()?.appContext.config.globalProperties.$axios;
  const store = getCurrentInstance()?.appContext.config.globalProperties.$store;
  const message = getCurrentInstance()?.appContext.config.globalProperties
    .$message;
  const serieslista = reactive({
    stu: [],
  });
  axios.get(store.state.baseUrl + "/admin/series/list").then((res: any) => {
    serieslista.stu = res.data.data;
    console.log(serieslista.stu);
  });
  const searchName = ref("");
  const searchStone = ref("");
  const searchType = ref("");
  const dialogse = ref(false);

  function shopinfo() {
    dialogse.value = false;
    axios
      .get(store.state.baseUrl + "/admin/jewelry/infos", {
        params: {
          pageNumber: page.value,
          searchName: searchName.value,
          searchStone: searchStone.value,
          searchType: searchType.value,
        },
      })
      .then((res: any) => {
        console.log("获取珠宝列表");
        console.log(res);
        if (res.data.code < 500) {
          infos.stu = res.data.data.list;
          total.value = res.data.data.totalCount;
        }
      });
  }

  function handleCurrentChange(p: number) {
    console.log(`当前页: ${p}`);
    page.value = p;
    shopinfo();
  }
  shopinfo();
  return {
    GemcategoryList,
    Jewellery,
    jewelleryId,
    certificateType,
    certificateTypeList,
    gemid,
    shopinfo,
    clarity,
    Color,
    Cut,
    fluorescence,
    shapelist,
    message,
    axios,
    store,
    infos,
    page,
    total,
    handleCurrentChange,
    serieslista,
    searchStone,
    searchName,
    searchType,
    dialogse,
  };
}

function upload() {
  const dialogImageUrl = ref("");
  const dialogVisible = ref(false);

  function handlePictureCardPreview(file: any) {
    dialogImageUrl.value = file.url;
    console.log(dialogImageUrl.value);
    dialogVisible.value = true;
    console.log(file);
  }

  function handleError() {
    start().message.warning({
      message: "图片尺寸不合适，请重新选择",
      showClose: true,
      duration: 2000,
    });
  }

  function handlePictureCardPreview2(file: any) {
    dialogImageUrl.value = file.url;
    dialogVisible.value = true;
    console.log(file);
  }

  function handleError2() {
    console.log("删除共患难");
    start().message.warning({
      message: "图片尺寸不合适，请重新选择",
      showClose: true,
      duration: 2000,
    });
  }
  return {
    handlePictureCardPreview,
    handleError,
    handlePictureCardPreview2,
    handleError2,
    dialogVisible,
    dialogImageUrl,
  };
}

export default defineComponent({
  name: "managment",
  components: {
    Tinymce,
    Gumdetails,
  },
  props: {
    selected: {
      type: Number,
      default: 8,
    },
  },
  setup(props, { emit }) {
    const index = ref(0);
    watch(
      () => {
        return props.selected;
      },
      (state, p) => {
        console.log(state + "watch" + p);
        if (state == 1) {
          index.value = 0;
          emit("bindSend", 0);
        }
      }
    );
    const { Color } = start();
    const {
      GemcategoryList,
      Jewellery,
      jewelleryId,
      certificateType,
      certificateTypeList,
      gemid,
      clarity,
      Cut,
      shopinfo,
      fluorescence,
      shapelist,
      message,
      axios,
      store,
      infos,
      page,
      total,
      handleCurrentChange,
      serieslista,
      searchStone,
      searchName,
      searchType,
      dialogse,
    } = start();
    const {
      handlePictureCardPreview,
      handleError,
      handlePictureCardPreview2,
      handleError2,
      dialogVisible,
      dialogImageUrl,
    } = upload();
    const img = store.state.baseUrl;
    const checkedall = ref(false);
    const checked = ref(false);
    const checked1 = ref(false);
    const checked2 = ref(false);
    const textarea1 = ref("");
    const formregion = ref("");
    const select = ref("");
    const input = ref("");
    // const dialogse = ref(false);
    const checkList = reactive({
      label: ["1", "2"],
    });
    const modelseriesId = ref("");
    const propsmsg = ref("");

    const numberStr = ref("");
    const symmetry = ref("");
    const polish = ref("");
    const place = ref("");
    const description = ref("");

    const modelclarity = ref("");
    const modelcolor = ref("");
    const modelcut = ref("");
    const modelfluorescence = ref("");
    const modelsize = ref("");
    const modelname = ref("");
    const modelprice = ref("");
    const modelshape = ref("");
    const modelweight = ref("");
    const propsdata = ref("");
    let temp: string[] = [];
    let temp2: string[] = [];
    const imgurl1: any = reactive({ stu: [] });
    const imgurl2: any = reactive({ stu: [] });
    let imgfilename = "";
    let imgfilename2 = "";
    const multipleTable = ref();
    const formatNumberRgx = getCurrentInstance()?.appContext.config
      .globalProperties.$http;
    const heat = ref();
    const heatList = ref([
      "无",
      "可见热处理",
      "可见热处理及微量残留",
      "可见热处理及显著残留",
    ]);
    const opt = ref();
    const optList = ref([
      "无油",
      "极微油",
      "微油",
      "轻度到中度",
      "中度",
      "显著",
    ]);

    const isActive01 = ref(0);
    const isActive02 = ref(0);
    const isActive03 = ref(0);
    const shopmessage: any[] = [];

    function gemidChange() {
      if (index.value == 5) {
        if (shopmessage[0].certificate == "GUILD") {
          if (shopmessage[0].stone == 2) {
            isActive01.value = 0;
            Color.value = ["中", "浓", "艳", "鸽血红", "深"];
          } else if (shopmessage[0].stone == 3) {
            isActive01.value = 0;
            Color.value = [
              "浅蓝",
              "中蓝",
              "浓蓝",
              "矢车菊蓝",
              "艳蓝",
              "皇家蓝",
              "深蓝",
            ];
          } else if (shopmessage[0].stone == 5) {
            console.log("444444444");
            isActive01.value = 1;
            Color.value = ["浅绿", "中绿", "浓绿", "艳绿", "沃顿绿", "深绿"];
          } else {
            isActive01.value = 0;
            Color.value = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
          }
        } else if (shopmessage[0].certificate == "GRS") {
          isActive01.value = 0;
          if (shopmessage[0].stone == 2) {
            Color.value = ["中", "浓", "艳", "鸽血红", "深"];
          } else if (shopmessage[0].stone == 3) {
            Color.value = [
              "浅蓝",
              "中蓝",
              "浓蓝",
              "矢车菊蓝",
              "艳蓝",
              "皇家蓝",
              "深蓝",
            ];
          } else if (shopmessage[0].stone == 5) {
            Color.value = [
              "浅绿",
              "中绿",
              "浓绿",
              "艳绿",
              "沃顿绿",
              "木佐绿",
              "深绿",
            ];
          } else {
            Color.value = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
          }
        } else {
          isActive01.value = 0;
          Color.value = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
        }
      } else {
        if (certificateType.value == "GUILD") {
          if (gemid.value == 2) {
            isActive01.value = 0;
            Color.value = ["中", "浓", "艳", "鸽血红", "深"];
          } else if (gemid.value == 3) {
            isActive01.value = 0;
            Color.value = [
              "浅蓝",
              "中蓝",
              "浓蓝",
              "矢车菊蓝",
              "艳蓝",
              "皇家蓝",
              "深蓝",
            ];
          } else if (gemid.value == 5) {
            console.log("444444444");
            isActive01.value = 1;
            Color.value = ["浅绿", "中绿", "浓绿", "艳绿", "沃顿绿", "深绿"];
          } else {
            isActive01.value = 0;
            Color.value = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
          }
        } else if (certificateType.value == "GRS") {
          isActive01.value = 0;
          if (gemid.value == 2) {
            Color.value = ["中", "浓", "艳", "鸽血红", "深"];
          } else if (gemid.value == 3) {
            Color.value = [
              "浅蓝",
              "中蓝",
              "浓蓝",
              "矢车菊蓝",
              "艳蓝",
              "皇家蓝",
              "深蓝",
            ];
          } else if (gemid.value == 5) {
            Color.value = [
              "浅绿",
              "中绿",
              "浓绿",
              "艳绿",
              "沃顿绿",
              "木佐绿",
              "深绿",
            ];
          } else {
            Color.value = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
          }
        } else {
          isActive01.value = 0;
          Color.value = ["D", "E", "F", "G", "H", "I", "J", "K", "L", "M"];
        }
      }
    }

    function certificateChange() {
      console.log("5554444hhhhhhh");
      console.log(index.value);
      console.log(certificateType.value);

      if (index.value == 5) {
        if (shopmessage[0].certificate == "GUILD") {
          console.log("11111111");
          isActive02.value = 1;
          isActive03.value = 1;
          console.log(isActive03.value);
          Cut.value = [
            "明亮式切割",
            "阶梯式切割",
            "改进明亮式切割",
            "弧面式切割",
            "其它",
          ];
          shapelist.value = [
            "椭圆形",
            "垫形",
            "圆形",
            "水滴形",
            "马眼形",
            "心形",
            "方形",
            "风筝形",
            "八角形",
            "其它",
          ];
        } else if (shopmessage[0].certificate == "GRS") {
          console.log("11111111");
          isActive02.value = 0;
          isActive03.value = 1;
          Cut.value = [
            "明亮式切割",
            "阶梯式切割",
            "改进明亮式切割",
            "弧面式切割",
            "其它",
          ];
          shapelist.value = [
            "椭圆形",
            "垫形",
            "圆形",
            "水滴形",
            "马眼形",
            "心形",
            "方形",
            "风筝形",
            "八角形",
            "其它",
          ];
        } else {
          isActive01.value = 0;
          isActive02.value = 0;
          isActive03.value = 0;
          Cut.value = ["EX", "VG", "G", "F", "P"];
          shapelist.value = [
            "圆形",
            "公主方",
            "祖母绿",
            "橄榄型",
            "椭圆形",
            "雷地恩",
            "梨形",
            "心心相印/心形",
            "三角形",
            "Fire Cushion/垫形",
          ];
        }
      } else {
        if (certificateType.value == "GUILD") {
          console.log("11111111");
          isActive02.value = 1;
          isActive03.value = 1;
          console.log(isActive03.value);
          Cut.value = [
            "明亮式切割",
            "阶梯式切割",
            "改进明亮式切割",
            "弧面式切割",
            "其它",
          ];
          shapelist.value = [
            "椭圆形",
            "垫形",
            "圆形",
            "水滴形",
            "马眼形",
            "心形",
            "方形",
            "风筝形",
            "八角形",
            "其它",
          ];
        } else if (certificateType.value == "GRS") {
          console.log("11111111");
          isActive02.value = 0;
          isActive03.value = 1;
          Cut.value = [
            "明亮式切割",
            "阶梯式切割",
            "改进明亮式切割",
            "弧面式切割",
            "其它",
          ];
          shapelist.value = [
            "椭圆形",
            "垫形",
            "圆形",
            "水滴形",
            "马眼形",
            "心形",
            "方形",
            "风筝形",
            "八角形",
            "其它",
          ];
        } else {
          isActive02.value = 0;
          isActive03.value = 0;
          Cut.value = ["EX", "VG", "G", "F", "P"];
          shapelist.value = [
            "圆形",
            "公主方",
            "祖母绿",
            "橄榄型",
            "椭圆形",
            "雷地恩",
            "梨形",
            "心心相印/心形",
            "三角形",
            "Fire Cushion/垫形",
          ];
        }
      }

      gemidChange();
    }

    function addcommodity() {
      console.log(temp);
      console.log(temp2);

      isActive01.value = 0;
      isActive02.value = 0;
      isActive03.value = 0;
      temp = [];
      temp2 = [];
      imgurl1.stu = [];
      imgurl2.stu = [];
      imgfilename = "";
      imgfilename2 = "";
      modelclarity.value = "";
      modelcolor.value = "";
      modelcut.value = "";
      modelfluorescence.value = "";
      modelsize.value = "";
      modelname.value = "";
      modelprice.value = "";
      modelseriesId.value = "";
      modelshape.value = "";
      gemid.value = "";
      jewelleryId.value = "";
      modelweight.value = "";
      certificateType.value = "";
      numberStr.value = "";
      symmetry.value = "";
      polish.value = "";
      place.value = "";
      description.value = "";
      propsmsg.value = "";
      index.value = 1;
      certificateChange();
      gemidChange();
    }

    function returnfun(params: number) {
      index.value = 0;
      console.log(params);
    }

    //查找
    function searchbutton() {
      dialogse.value = true;
    }

    const uploadFile1 = ref();
    const uid1 = ref(); // 关键作用代码，去除文件列表失败文件
    function uploadsuccess(params: any) {
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
            imgfilename = temp.join("|");
            console.log(imgfilename);
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
          nextTick(() => {
            console.log(uploadFile1.value);
          });

          const idx = uploadFile1.value.uploadFiles.findIndex(
            (item: any) => item.uid === uid1.value
          ); // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）

          uploadFile1.value.uploadFiles.splice(idx, 1); // 关键作用代码，去除文件列表失败文件
        });
    }

    const uploadFile2 = ref();
    const uid2 = ref(); // 关键作用代码，去除文件列表失败文件
    function uploadsuccess2(params: any) {
      console.log("图片上传11111");
      console.log(params);
      axios
        .post(store.state.baseUrl + "/admin/file/images", params)
        .then((res: any) => {
          if (res.data.code < 500) {
            message.success({
              message: "图片上传成功",
              showClose: true,
              duration: 2000,
            });
            temp2.push(res.data.data);
            imgurl2.stu.push({
              url: img + "/admin/file/image/" + res.data.data,
            });
            imgfilename2 = temp2.join("|");
            console.log(imgfilename2);
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
          // console.log(imgurl2.stu);
          nextTick(() => {
            console.log(uploadFile2.value);
          });

          const idx = uploadFile2.value.uploadFiles.findIndex(
            (item: any) => item.uid === uid2.value
          ); // 关键作用代码，去除文件列表失败文件（uploadFiles为el-upload中的ref值）

          uploadFile2.value.uploadFiles.splice(idx, 1); // 关键作用代码，去除文件列表失败文件
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

    function uploadpic2(file: any) {
      console.log("单春");
      console.log(file);
      uid2.value = file.file.uid;
      const formdata2 = new FormData(); //创建form对象
      formdata2.append("upload-images", file.file); //通过append向form对象添加数据
      console.log("------------------------");
      uploadsuccess2(formdata2);
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

    function handleRemove2(index: any) {
      imgurl2.stu.splice(index, 1);
      temp2 = [];
      if (imgurl2.stu.length !== 0) {
        for (const item of imgurl2.stu) {
          console.log(item);
          if (item.url.indexOf("/") !== -1) {
            console.log(item.url.split("/"));

            temp2.push(item.url.split("/")[6]);
          } else {
            temp2.push(item.url);
          }
        }
      }
    }

    function dataFilter() {
      if (imgfilename !== "") {
        if (certificateType.value == "") {
          message.error({
            message: "请选择证书类型",
            showClose: true,
            duration: 2000,
          });
          return 1;
        }
      }
      if (imgfilename2 == "") {
        message.error({
          message: "请上传珠宝图片",
          showClose: true,
          duration: 2000,
        });
        return 1;
      } else if (modelname.value == "") {
        message.error({
          message: "请输入珠宝名称",
          showClose: true,
          duration: 2000,
        });
        return 1;
      } else if (numberStr.value == "") {
        message.error({
          message: "请输入珠宝编号",
          showClose: true,
          duration: 2000,
        });
        return 1;
      } else if (modelprice.value == "") {
        message.error({
          message: "请输入珠宝参考价",
          showClose: true,
          duration: 2000,
        });
        return 1;
      } else if (jewelleryId.value == undefined || jewelleryId.value === "") {
        message.error({
          message: "请选择珠宝种类",
          showClose: true,
          duration: 2000,
        });
        return 1;
      } else if (gemid.value === "") {
        message.error({
          message: "请选择宝石品类",
          showClose: true,
          duration: 2000,
        });
        return 1;
      } else {
        return 2;
      }
    }

    // 新增珠宝
    function designercontent(params: string) {
      console.log("数据");
      console.log(modelname.value);
      console.log(jewelleryId.value);
      console.log(gemid.value);
      console.log(modelprice.value);
      console.log(imgfilename2);

      if (imgurl1.stu.length !== 0) {
        imgfilename = temp.join("|");
      }
      if (imgurl2.stu.length !== 0) {
        imgfilename2 = temp2.join("|");
      }

      if (dataFilter() !== 1) {
        axios
          .post(store.state.baseUrl + "/admin/jewelry/insert", {
            certs: imgfilename,
            clarity:
              certificateType.value == "GUILD" || certificateType.value == "GRS"
                ? null
                : modelclarity.value,
            color: modelcolor.value,
            content: params,
            cut: modelcut.value,
            fluorescence:
              certificateType.value == "GUILD" || certificateType.value == "GRS"
                ? null
                : modelfluorescence.value,
            images: imgfilename2,
            measurements: modelsize.value,
            name: modelname.value,
            price: modelprice.value,
            seriesId: modelseriesId.value,
            shape: modelshape.value,
            stone: gemid.value,
            type: jewelleryId.value,
            weight: modelweight.value,
            certificate: certificateType.value,
            number: numberStr.value,
            symmetry:
              certificateType.value == "GUILD" || certificateType.value == "GRS"
                ? null
                : symmetry.value,
            polish:
              certificateType.value == "GUILD" || certificateType.value == "GRS"
                ? null
                : polish.value,
            place: place.value,
            heat: certificateType.value == "GUILD" ? heat.value : null,
            opt:
              certificateType.value == "GUILD" && gemid.value == 5
                ? opt.value
                : null,
            description: description.value,
          })
          .then((res: any) => {
            console.log(res);
            console.log("添加珠宝");
            index.value = 0;
            if (res.data.code < 500) {
              message.success({
                message: "添加珠宝成功",
                showClose: true,
                duration: 2000,
              });
              shopinfo();
            }
            (function smoothscroll() {
              const currentScroll =
                document.documentElement.scrollTop || document.body.scrollTop;
              if (currentScroll > 0) {
                window.requestAnimationFrame(smoothscroll);
                window.scrollTo(0, currentScroll - currentScroll / 5);
              }
            })();
          });
      }
    }

    function selectBlur(e: any) {
      if (index.value == 5) {
        shopmessage[0].certificate = e.target.value;
      } else {
        certificateType.value = e.target.value;
      }

      certificateChange();
    }

    // 净度
    function selectBlur2(e: any) {
      if (index.value == 5) {
        shopmessage[0].clarity = e.target.value;
      } else {
        modelclarity.value = e.target.value;
      }
    }

    // 颜色
    function selectBlur3(e: any) {
      if (index.value == 5) {
        shopmessage[0].color = e.target.value;
      } else {
        modelcolor.value = e.target.value;
      }
    }

    // 切工
    function selectBlur4(e: any) {
      if (index.value == 5) {
        shopmessage[0].cut = e.target.value;
      } else {
        modelcut.value = e.target.value;
      }
    }

    // 对称
    function selectBlur5(e: any) {
      if (index.value == 5) {
        shopmessage[0].symmetry = e.target.value;
      } else {
        symmetry.value = e.target.value;
      }
    }

    // 剖光
    function selectBlur6(e: any) {
      if (index.value == 5) {
        shopmessage[0].polish = e.target.value;
      } else {
        polish.value = e.target.value;
      }
    }

    // 荧光
    function selectBlur7(e: any) {
      if (index.value == 5) {
        shopmessage[0].fluorescence = e.target.value;
      } else {
        modelfluorescence.value = e.target.value;
      }
    }

    // 形状（切割）
    function selectBlur10(e: any) {
      if (index.value == 5) {
        shopmessage[0].shape = e.target.value;
      } else {
        modelshape.value = e.target.value;
      }
    }

    // 热处理
    function selectBlur11(e: any) {
      if (index.value == 5) {
        shopmessage[0].heat = e.target.value;
      } else {
        heat.value = e.target.value;
      }
    }

    // 净度优化
    function selectBlur12(e: any) {
      if (index.value == 5) {
        shopmessage[0].opt = e.target.value;
      } else {
        opt.value = e.target.value;
      }
    }

    //修改
    function changmessage(params: any) {
      console.log("修改数据信息");
      console.log(params);

      console.log(params.id);
      shopmessage.splice(0, shopmessage.length); //清空数组
      temp = [];
      temp2 = [];
      imgurl1.stu = [];
      imgurl2.stu = [];
      shopmessage.push(params);
      isActive01.value = 0;
      isActive02.value = 0;
      isActive03.value = 0;
      if (shopmessage[0].certs) {
        if (
          shopmessage[0].certs !== "" &&
          shopmessage[0].certs !== null &&
          shopmessage[0].certs !== undefined
        ) {
          if (shopmessage[0].certs.indexOf("|") == -1) {
            temp.push(shopmessage[0].certs);
            imgurl1.stu.push({
              url: img + "/admin/file/image/" + shopmessage[0].certs,
            });
          } else {
            temp = shopmessage[0].certs.split("|");
            for (const key in temp) {
              imgurl1.stu.push({
                url: img + "/admin/file/image/" + temp[key],
              });
            }
          }
        }
      }

      if (
        shopmessage[0].images !== "" &&
        shopmessage[0].images !== null &&
        shopmessage[0].images !== undefined
      ) {
        if (shopmessage[0].images.indexOf("|") == -1) {
          temp2.push(shopmessage[0].images);
          imgurl2.stu.push({
            url: img + "/admin/file/image/" + shopmessage[0].images,
          });
        } else {
          temp2 = shopmessage[0].images.split("|");
          for (const key in temp2) {
            imgurl2.stu.push({
              url: img + "/admin/file/image/" + temp2[key],
            });
          }
        }
      }
      console.log("修改图片");
      console.log(imgurl1.stu);
      console.log(imgurl2.stu);

      axios
        .get(store.state.baseUrl + "/admin/jewelry/content/" + params.id)
        .then((res: any) => {
          console.log("珠宝富文本信息");
          console.log(res);
          if (res.data.code < 500) {
            propsmsg.value = res.data.message;
            index.value = 5;
            certificateChange();
            gemidChange();

            nextTick(() => {
              console.log("777770000000444444");
              document.getElementsByClassName("el-main")[0].scrollTop = 0;
            });
          }
        });
    }

    //确定修改
    function ptoetop(params: string) {
      if (imgurl1.stu.length !== 0) {
        shopmessage[0].certs = temp.join("|");
      }
      if (imgurl2.stu.length !== 0) {
        shopmessage[0].images = temp2.join("|");
      }

      axios
        .post(store.state.baseUrl + "/admin/jewelry/update", {
          certs: shopmessage[0].certs,
          clarity:
            shopmessage[0].certificate == "GUILD" ||
            shopmessage[0].certificate == "GRS"
              ? null
              : shopmessage[0].clarity,
          color: shopmessage[0].color,
          content: params,
          cut: shopmessage[0].cut,
          fluorescence:
            shopmessage[0].certificate == "GUILD" ||
            shopmessage[0].certificate == "GRS"
              ? null
              : shopmessage[0].fluorescence,
          id: shopmessage[0].id,
          images: shopmessage[0].images,
          measurements: shopmessage[0].measurements,
          name: shopmessage[0].name,
          price: shopmessage[0].price,
          seriesId: shopmessage[0].seriesId,
          shape: shopmessage[0].shape,
          stone: shopmessage[0].stone,
          type: shopmessage[0].type,
          weight: shopmessage[0].weight,
          certificate: shopmessage[0].certificate,
          number: shopmessage[0].number,
          symmetry:
            shopmessage[0].certificate == "GUILD" ||
            shopmessage[0].certificate == "GRS"
              ? null
              : shopmessage[0].symmetry,
          polish:
            shopmessage[0].certificate == "GUILD" ||
            shopmessage[0].certificate == "GRS"
              ? null
              : shopmessage[0].polish,
          place: shopmessage[0].place,
          heat:
            shopmessage[0].certificate == "GUILD" ? shopmessage[0].heat : null,
          opt:
            shopmessage[0].certificate == "GUILD" && shopmessage[0].stone == 5
              ? shopmessage[0].opt
              : null,
          description: shopmessage[0].description,
        })
        .then((res: any) => {
          console.log(res);
          console.log("修改珠宝");
          index.value = 0;
          if (res.data.code < 500) {
            message.success({
              message: "珠宝修改成功",
              showClose: true,
              duration: 2000,
            });
            shopinfo();
          }
        });
    }

    //查看详情
    function Viewdetails(id: number) {
      axios
        .get(store.state.baseUrl + "/admin/jewelry/content/" + id)
        .then((res: any) => {
          console.log("珠宝详细信息");
          console.log(res);
          if (res.data.code < 500) {
            propsdata.value = res.data.message;
            index.value = 6;
            console.log("xxxx--");
          }
        });
    }

    function bindSend(val: number) {
      index.value = val;
    }

    let checkboxid: number[] = [];
    const checkboxlength = ref();

    function checkid(params: any) {
      console.log(params);
      // alert(params);
      checkboxid = [];
      if (params.length !== 0) {
        for (const item of params) {
          checkboxid.push(item.id);
        }
      }
      checkboxlength.value = checkboxid.length;
      console.log(checkboxid); //选中的珠宝--id
    }

    function getRowKeys(row: any) {
      return row.id;
    }

    function deletebotton() {
      //删除珠宝
      axios
        .post(store.state.baseUrl + "/admin/jewelry/delete/", checkboxid)
        .then((res: any) => {
          console.log(res);
          console.log("删除");
          if (res.data.code < 500) {
            message.success({
              message: "删除成功",
              showClose: true,
              duration: 2000,
            });
            index.value = 0;
            checkboxid = [];
            console.log(checkboxid);
            multipleTable.value.clearSelection();
            shopinfo();
          }
        });
    }

    //phone  touch
    const startX = ref(0);
    const endX = ref(0);

    function tstart(e: any) {
      startX.value = e.changedTouches[0].clientX;
      console.log(
        startX.value,
        "--",
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      );
    }

    function deleteItem(n: number) {
      checkboxid = [];
      checkboxid.push(n);
      deletebotton();
      console.log("删除", checkboxid);
    }

    function end(e: any, val: number) {
      const parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      endX.value = e.changedTouches[0].clientX;
      if (parentElement.dataset.type == 0 && startX.value - endX.value > 30) {
        parentElement.dataset.type = 1;
        deleteItem(val);
        console.log("左滑");
      }
      startX.value = 0;
      endX.value = 0;
      console.log(val);
      console.log(
        startX.value - endX.value,
        "--",
        e.changedTouches[0].clientX,
        e.changedTouches[0].clientY
      );
    }

    const dragging = ref();
    function handleDragStart(e: any, item: any) {
      console.log(e);
      dragging.value = item;
    }
    function handleDragEnd(e: any, item: any) {
      console.log(e);
      console.log(item);
      dragging.value = null;
    }
    //首先把div变成可以放置的元素，即重写dragenter/dragover
    function handleDragOver(e: any) {
      console.log(e);
      e.dataTransfer.dropEffect = "move"; // e.dataTransfer.dropEffect="move";//在dragenter中针对放置目标来设置!
    }
    function handleDragEnter(e: any, item: any) {
      e.dataTransfer.effectAllowed = "move"; //为需要移动的元素设置dragstart事件
      if (item === dragging.value) {
        return;
      }
      const newItems = [...imgurl2.stu];
      console.log(newItems);
      const src = newItems.indexOf(dragging.value);
      const dst = newItems.indexOf(item);

      newItems.splice(dst, 0, ...newItems.splice(src, 1));
      console.log("移动");
      console.log(newItems);

      imgurl2.stu = newItems;
      temp2 = [];
      if (imgurl2.stu.length !== 0) {
        for (const item of imgurl2.stu) {
          console.log(item);
          if (item.url.indexOf("/") !== -1) {
            console.log(item.url.split("/"));

            temp2.push(item.url.split("/")[6]);
          } else {
            temp2.push(item.url);
          }
        }
      }
    }

    return {
      handleDragStart,
      handleDragEnd,
      handleDragOver,
      handleDragEnter,
      certificateChange,
      selectBlur2,
      selectBlur3,
      selectBlur4,
      selectBlur5,
      selectBlur6,
      selectBlur7,
      selectBlur10,
      selectBlur11,
      selectBlur12,
      selectBlur,
      gemidChange,
      heat,
      heatList,
      opt,
      optList,
      isActive01,
      isActive02,
      isActive03,
      uploadFile1,
      uploadFile2,
      imgurl1,
      imgurl2,
      multipleTable,
      numberStr,
      symmetry,
      polish,
      place,
      description,
      checkedall,
      deletebotton,
      checked,
      checked1,
      checked2,
      addcommodity,
      index,
      formregion,
      input,
      checkList,
      searchbutton,
      dialogse,
      serieslista,
      textarea1,
      dialogVisible,
      dialogImageUrl,
      handleRemove,
      handlePictureCardPreview,
      returnfun,
      handleError,
      handlePictureCardPreview2,
      handleRemove2,
      handleError2,
      GemcategoryList,
      gemid,
      Jewellery,
      jewelleryId,
      uploadpic,
      uploadpic2,
      uploadsuccess,
      designercontent,
      propsmsg,
      ptoetop,
      select,
      clarity,
      Color,
      Cut,
      fluorescence,
      shapelist,
      modelclarity,
      modelcolor,
      modelcut,
      modelfluorescence,
      modelsize,
      modelname,
      modelprice,
      modelshape,
      modelseriesId,
      modelweight,
      Viewdetails,
      propsdata,
      bindSend,
      changmessage,
      shopmessage,
      infos,
      start,
      img,
      message,
      checkid,
      getRowKeys,
      checkboxid,
      checkboxlength,
      handleCurrentChange,
      page,
      total,
      shopinfo,
      searchStone,
      searchName,
      searchType,
      tstart,
      end,
      deleteItem,
      certificateType,
      certificateTypeList,
      formatNumberRgx,
    };
  },
});
</script>

<style lang="scss" scoped>
.draggMove {
  // width: 100%;
  display: flex;
  flex-wrap: wrap;
  position: relative;
  // position: relative;
  // position: absolute;
  // top: 100px;
  // left: 100px;
  user-select: none;

  .vdr-container {
    position: absolute;
  }
}

.spanStyle {
  width: 18px;
  height: 18px;
  position: absolute;
  top: 2px;
  right: 1px;
  text-align: center;
  line-height: 1;
  background-color: rgb(221, 221, 221);
  color: rgb(255, 255, 255);
  border: 1px solid rgb(221, 221, 221);
  border-radius: 50%;
  z-index: 999;
  font-size: 16px;
  cursor: pointer;
  display: none;
}

.imgDiv:hover {
  cursor: pointer;

  .spanStyle {
    display: block;
  }
}

a {
  text-decoration: none;
  color: #3d81fd;
}

@media screen and (min-width: 360px) and (max-width: 796px) {
  .boby {
    background: linear-gradient(
      to right bottom,
      rgba(255, 255, 255, 0.6),
      rgba(255, 255, 255, 0.1)
    );
    border-radius: 10px;
    height: 82vh;
    backdrop-filter: blur(8px);
    box-shadow: -3px -4px 5px 0px rgb(247, 245, 245),
      6px 5px 3px rgba(0, 0, 0, 0.2);

    .pcTable {
      display: none;
    }

    .phonemenu {
      width: 96%;
      height: 69vh;
      margin: auto;
      overflow-y: scroll;

      .phonemenudiv {
        box-shadow: -3px -4px 5px 0px rgb(247, 245, 245),
          6px 5px 3px rgba(0, 0, 0, 0.2);
        margin: 1rem;
        padding: 0.5rem;
        position: relative;
        -webkit-transition: all 0.2s;
        transition: all 0.2s;
        overflow-x: scroll;

        .textbox {
          font-size: 0.5rem;
          text-align: left;
          margin-left: 1rem;

          div {
            height: 25%;
          }
        }

        .list-box {
          display: flex;
        }

        .delete {
          width: 3rem;
          height: 100%;
          background: #ff4949;
          font-size: 17px;
          color: #fff;
          text-align: center;
          line-height: 1.5rem;
          position: absolute;
          top: 0;
          right: -3rem;
        }

        ::-webkit-scrollbar {
          width: 0 !important;
        }
      }

      .phonemenudiv[data-type="0"] {
        transform: translate3d(0, 0, 0);
      }

      .phonemenudiv[data-type="1"] {
        transform: translate3d(-1rem, 0, 0);
      }
    }

    .managementtitle {
      display: none;
    }

    .mbobyButton {
      display: none;
    }

    .mbobyButton2 {
      display: flex;
      flex-wrap: nowrap;
      width: 92%;
      padding-top: 0.5rem;
      margin: auto;
      justify-content: space-between;

      .button {
        padding: 0.5rem;
        width: 8vw;
        min-height: 8vw;
      }
    }

    .management {
      height: 82vh;
      overflow-y: scroll;

      .managementboby {
        width: 96%;
        margin: auto;

        .options {
          padding-top: 0.5rem;

          .phoneimg {
          }

          .el-form {
            flex-wrap: wrap;
          }
        }
      }
    }
  }
}

@media screen and (min-width: 796px) {
  .back {
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
  .boby {
    // background: linear-gradient(
    //   to right bottom,
    //   rgba(255, 255, 255, 0.6),
    //   rgba(255, 255, 255, 0.1)
    // );
    // border-radius: 10px;
    // backdrop-filter: blur(8px);
    // box-shadow: -3px -4px 5px 0px rgb(247, 245, 245),
    //   6px 5px 3px rgba(0, 0, 0, 0.2);

    .phonemenu {
      display: none;
    }

    .pcTable {
      display: block;
      padding: 20px;
      // height: 80vh;
      // overflow-y: scroll;
      border-radius: 10px;
      background-color: #fff;
    }
  }

  .mbobyButton2 {
    display: none;
  }

  .management {
    border-radius: 10px;
    padding-bottom: 1rem;

    .managementtitle {
      height: 4vw;
      line-height: 4vw;
      font-size: 1.25rem;
      text-align: left;
      padding: 0 1.25rem;
      border-bottom: 1px solid rgba(241, 241, 241, 0.6);
    }

    .managementboby {
      .mbobyButton {
        text-align: left;
        margin-bottom: 1rem;
        // padding-top: 20px;

        .button {
          // margin-left: 1.25rem;

          i {
            font-weight: bold;
          }
        }
      }

      .eldialogcalss {
        width: 80%;
        border-radius: 1rem;
      }

      .el-form {
        width: 96%;
        margin: 1rem auto 1.25rem;

        .el-select {
          width: 30%;
          padding: 0 1rem 0 0;
        }
      }

      .inputbox {
        display: flex;
        flex-wrap: nowrap;
        align-content: space-around;

        .elinput1 {
          width: 48%;
          margin: 0 1% 1% 2%;
        }

        .elinput2 {
          width: 48%;
          margin: 0 2% 1% 1%;
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-textarea__inner {
  min-height: 100px !important;
}

@media screen and (max-width: 796px) {
  .item .el-form-item__label {
    font-size: 1rem;
  }

  .el-input__inner {
    float: left;
    width: 54%;
  }

  .el-dialog__body img {
    width: 100%;
    height: 100%;
  }

  .el-dialog {
    height: 25rem;
    border-radius: 1rem;
  }

  .el-dialog__body {
    position: absolute;
    left: 0;
    top: 54px;
    bottom: 0;
    right: 0;
    padding: 0;
    z-index: 1;
    overflow: hidden;
    overflow-y: auto;
    padding: 0 28px 66px;
  }

  .el-dialog__footer {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 100%;
    z-index: 999;
    background-color: #fff;
    padding: 10px 60px 12px;
    border-end-end-radius: 1rem;
    border-end-start-radius: 1rem;
  }

  .el-upload--picture-card {
    width: 100px;
    height: 100px;
    line-height: 100px;
  }
}

@media screen and (min-width: 360px) and (max-width: 796px) {
  .item .el-form-item__label {
    font-size: 1rem;
  }

  .item .el-form-item__label {
    font-size: 1rem;
  }

  .el-form-item {
    margin-bottom: 0;
  }

  .el-input {
    .el-input__inner {
      float: left;
      width: 100%;
    }
  }

  .el-dialog__body img {
    width: 100%;
    height: 100%;
  }

  .el-dialog {
    height: 17rem;
    border-radius: 1rem;

    .el-dialog__body {
      position: absolute;
      left: 0;
      top: 54px;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 1;
      overflow: hidden;
      overflow-y: auto;
      padding: 0 10px 0;
    }

    .el-dialog__footer {
      position: absolute;
      bottom: 0;
      right: 0;
      width: 100%;
      z-index: 999;
      background-color: #fff;
      padding: 10px 60px 12px;
      border-end-end-radius: 1rem;
      border-end-start-radius: 1rem;

      .dialog-footer {
        display: flex;
        justify-content: space-around;

        .el-button {
          width: 18vw;
          min-height: 9vw;
        }
      }
    }
  }
}

.el-dialog__body {
  padding: 10px 20px;

  img {
    width: 100% !important;
  }
}

.el-checkbox__inner {
  width: 17px;
  height: 17px;
}

.el-checkbox__inner::after {
  height: 10px;
  left: 6px;
}
</style>

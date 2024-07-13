<template>
  <div>
    <el-dialog v-model="dialogVisible" title="Tips" width="800" draggable>
      <el-form :model="form" label-width="auto" label-position="right">
        <el-form-item label="templateName">
          <el-input v-model="form.templateName" />
        </el-form-item>
        <el-form-item label="creator">
          <el-input v-model="form.creator" />
        </el-form-item>
        <el-form-item label="templateValue">
          <el-input type="textarea" v-model="form.templateValue" rows="10" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialogVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onSaveOrUpdate">
            Confirm
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-input v-model="blurValue" class="flow-search" placeholder="" @change="onCurrentChange"></el-input>
    <el-button type="primary" class="search-button" @click="blur">查询</el-button>
    <el-button type="primary" class="search-button" @click="onAdd">新增</el-button>
    <pure-table ref="tableRef" border adaptive :adaptiveConfig="adaptiveConfig" row-key="id" alignWhole="center"
      showOverflowfooltip :loading="loading" :loading-config="loadingConfig" :data="dataList.slice(
        (pagination.currentPage - 1) * pagination.pageSize,
        pagination.currentPage * pagination.pageSize)" :columns="columns" :pagination="pagination"
      @page-size-change="onSizeChange" @page-current-change="onCurrentChange">
      <template #operation="{ row, index }">
        <el-button class="reset-margin" link type="primary" @click="onEdit(row, index)">
          修改
        </el-button>
        <el-button class="reset-margin" link type="primary" @click="onOpenNewEdit(row, index)">
          模板详情
        </el-button>
        <el-button class="reset-margin" link type="primary" @click="onDelete(row, index)">
          删除
        </el-button>
      </template>
    </pure-table>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from "vue";
import { ElMessage, ElDialog } from "element-plus";
import { useColumns } from "./columns";
import * as http from '@/api/generator';
import { useMultifagsStoreHook } from "@/store/modules/multifags";
import { router } from "@/router";

defineOptions({
  name: "customTemplate"
});

const tableRef = ref();
const {
  loading,
  columns,
  dataList,
  pagination,
  loadingConfig,
  adaptiveConfig,
  onSizeChange,
  onCurrentChange,
  blur
} = useColumns();
const blurValue = ref('');
const dialogVisible = ref(false);
const baseForm = ref({
  templateName: '',
  templateValue: '',
  creator: ''
});
let form = ref(baseForm);

function onSaveOrUpdate() {
  dialogVisible.value = false;
  http.saveOrUpdate(form.value).then(() => {
    blur();
    ElMessage({
      type: "success",
      showClose: true,
      message: `保存成功`
    });
  });
}
function onAdd() {
  dialogVisible.value = true;
  form = ref(baseForm);
}
function onEdit(row, index) {
  dialogVisible.value = true;
  form = ref(row);
}
function onDelete(row, index) {
  http.deleteByIds([row.id]).then(() => {
    blur();
    ElMessage({
      type: "success",
      showClose: true,
      message: '删除成功'
    });
  });
}

function onopenNewEdit(row, index) {
  useMultiTagsStoreHook() - handleTags("push", {
    name: 'customDetail',
    path: '/generator/customDetail',
    query: {
      id: row.id,
      templateName: row.templateName
    },
    meta: {
      title: `自定义模板-${templateName}`,
      dynamicLevel: 3
    },
  });
  router.push({
    name: 'customDetail',
    query: {
      id: row.id,
      templateName: row.templateName
    }
  });
}
</script>
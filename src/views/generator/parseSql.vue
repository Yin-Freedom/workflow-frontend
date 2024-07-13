<template>
  <div>
    <FieldSet :configs="configs[0]">
      <textarea id="inputData" v-model="inputData" type="textarea" :placeholder="sqlExample" rows="10" />
    </FieldSet>

    <FieldSet :configs="configs[1]">
      <el-form :model="formData" :inline="true" label-width="140px" label-position="right" class="form">
        <el-form-item label="packageName" prop="packageName">
          <el-input v-model="formData.packageName"></el-input>
        </el-form-item>
        <el-form-item label="authorName" prop="authorName">
          <el-input v-model="formData.authorName"></el-input>
        </el-form-item>
        <el-select v-model="formData.excludeList" placeholder="Select" style="width: 240px">
          <el-option v-for="(item, index) in excludeListoptions" :key="index" :label="item.label" :value="item.value" />
        </el-select>
        <el-form-item label="isSwagger" prop="isSwagger">
          <el-switch v-model="formData.isSwagger"></el-switch>
        </el-form-item>
        <el-form-item label="isLombok" prop="isLombok">
          <el-switch v-model="formData.isLombok"></el-switch>
        </el-form-item>
      </el-form>
    </FieldSet>


    <FieldSet :configs="configs[2]">
      <el-tabs v-model="activeKey" type="border-card">
        <el-tab-pane v-for="(item, index) in items" :key="index" :label="item.name" :name="item.name">
          <div>
            <span>template</span>
            <el-divider direction="vertical" />
            <el-button v-for="(btn, index) in item.children" :key="index" type="primary" plain
              @click="btnClick(btn, 'template', item.name)">
              {{ btn }}
            </el-button>
          </div>
          <el-divider style="margin: 10px 0" />
          <div>
            <span>preview&nbsp</span>
            <el-divider direction="vertical" />
            <el-button v-for="(btn, index) in item.children" :key="index" type="primary" plain
              @click="btnClick(btn, 'preview', item.name)">
              {{ btn }}
            </el-button>
          </div>
        </el-tab-pane>
      </el-tabs>
    </FieldSet>
    <FieldSet :configs="configs[3]">
      <textarea id="outputData" v-model="outputData" type="textarea" rows="5" />
    </FieldSet>
  </div>
</template>

<style scoped>
.form {
  background-color: white;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.el-form--inline .el-form-item {
  flex: 1 0 30%;
  align-items: center;
}

form-item-full {
  flex: 100% !important;
}
</style>

<script setup>
import "codemirror/mode/sql/sql.js";
import "codemirror/mode/javascript/javascript.js";
import "codemirror/theme/material-darker.css";
import "codemirror/lib/codemirror.css";

import lodash from "lodash";
import { ref, onMounted, onUnmounted, h } from "vue";
import * as template from "./template";
import { ElMessage } from "element-plus";
import CodeMirror from "codemirror";
import { FieldSet } from "@/components/FieldSet";
import { parseSql } from "./util/parseSql";
import { addDialog } from "@/components/ReDialog";
import Detail from "./detail.vue";
import * as http from "@/api/generator";

defineOptions({
  name: "generator"
});
const configs = ref([
  {
    title: "Input", collapsed: true, items: ""
  },
  {
    title: "BasicInfo", collapsed: true, items: ""
  },
  {
    title: "Choose Template", collapsed: true, items: ""
  },
  {
    title: "Output", collapsed: true, items: ""
  }
]);
let formData = ref({
  packageName: '',
  authorName: 'yinhuidong',
  excludeList: ''
});
let custombist = [];
http.findByPage({
  start: 0,
  limit: 20
}).then((data) => {
  const { records, total } = data.data;
  lodash.forEach(records, function (item) {
    customList.push(item.templateName);
  });
});
const items = ref([
  { name: 'pojo', children: ['entity', 'dao', 'service', 'serviceImpl', 'controller'] },
  { name: 'doc', children: ['docEntity', 'docDao', 'docService', 'docServiceImpl', 'docController'] },
  { name: 'extjs', children: ['fieldset', 'docview', 'docForm', 'docFormController',] },
  { name: 'custom', children: custombist },
]);
const activeKey = ref('pojo');
const excludeListoptions = [
  {
    label: 'OAProcBaseEntity',
    value: "requester, creator, lastUpdater, procTypeld, requesterId, docStatus, releaseDate, requestDate, docNumber"
  },
  {
    label: 'ProcBaseEntity',
    value: "procTypeld, requesterId, docStatus, releaseDate, requestDate, docNumber, createdBy, creationDate, lastUpd"
  },
  {
    label: 'BaseEntity',
    value: "createdBy, creationDate, lastUpdatedBy, lastUpdateDate, version"
  }
]

let sqlExample =
  `create table test (
  doc_id number (10), --id
  doc_status varchar2(100), --流程状态
  requester_id number (10), --申请人id
  requester varchar2(100), --申请人
  primary key(doc_id)
);
`;
let inputTextarea;
let ouputTextarea;
let inputData = ref(sqlExample);
let outputData = ref("");

let calcStrByEval = (str, classInfo, templateName) => {
  let displayValue;
  try {
    //
    let templateFunc = eval(str);
    displayValue = templateFunc(classInfo);
  } catch (e) {
    ElMessage({
      type: "error",
      showClose: true,
      message: `自定义模版${templateName}解析错误`
    });
  }
  return displayValue;
}

function btnClick(templateName, type, module) {
  if (module === 'custom') {
    // 1.动态模板
    http.findByTemplateName(templateName).then((result) => {
      let data = result.data;
      if (lodash.isEmpty(data) || lodash.isEmpty(data.templatevalue)) {
        ElMessage({
          type: "error",
          showClose: true,
          message: `自定义模版${templateName}数据为空`
        });
        return;
      }
      let templateContent = data.templatevalue;
      if (type === 'preview') {
        addDialog({
          title: "preview",
          contentRenderer: () => Detail,
          props: {
            data: [""],
            templateContent: templateContent
          },
          hideFooter: true
        });
      } else if (type === 'template') {
        ouputTextarea.setValue("");

        let classInfo = parseSql(inputTextarea.getValue());
        Object.assign(classInfo, formData.value);
        classInfo.excludeList = formData.value.excludebist.split(",")
        let displayvalue = calcStrByEval(templateContent, classInfo, templateName);
        ouputTextarea.setValue(displayValue);
      }
    })
  } else {
    // 2.静态模板
    chooseStaticTemplate(type, templateName)
  }
}

function chooseStaticTemplate(type, templateName) {
  if (!template[templateName]) {
    ElMessage({
      type: "error",
      showClose: true,
      message: `自定义模版${templateName}不存在`
    });
    return;
  }

  if (type === 'preview') {
    addDialog({
      title: "preview",
      contentRenderer: () => Detail,
      props: {
        data: [""],
        templateContent: template[templateName].toString()
      },
      hideFooter: true
    });
  } else if (type === 'template') {
    ouputTextarea.setValue("");
    let classInfo = parseSql(inputTextarea.getValue());
    const templateExpression = template[templateName];
    Object.assign(classInfo, formData.value);
    classInfo.excludeList = formData.value.excludeList.split(",")
    let displayValue = templateExpression(classInfo);
    ouputTextarea.setValue(displayValue);
  }
}


onMounted(() => {
  const option = {
    mode: "javascript",
    lineNumbers: true,
  };
  inputTextarea = CodeMirror.fromTextArea(
    document.getElementById("inputData"), {
    mode: "text/x-sql",
    lineNumbers: true
  });
  // 
  inputTextarea.setSize(null, 150);
  ouputTextarea = CodeMirror.fromTextArea(
    document.getElementById("outputData"), {
    mode: "javascript",
    lineNumbers: true,
    indentUnit: 2,
    matchBrackets: true,
    lineWrapping: true,
    foldGutter: true,
    gutters: ["CodeMirror-linenumbers", "CodeMirror-foldgutter"],
  });
  ouputTextarea.setSize(null, 500);
});
</script>

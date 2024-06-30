<template>
  <div>
    <FieldSet :configs="configs[0]">
      <textarea
        id="inputData"
        v-model="inputData"
        type="textarea"
        :placeholder="sqlExample"
        rows="10"
      />
    </FieldSet>

    <FieldSet :configs="configs[1]">
      <el-tabs v-model="activeKey" type="border-card">
        <el-tab-pane
          v-for="(item, index) in items"
          :key="index"
          :label="item.name"
          :name="item.name"
        >
          <el-button
            v-for="(btn, index) in item.children"
            :key="index"
            type="primary"
            plain
            @click="btnClick(btn)"
            >{{ btn }}</el-button
          >
        </el-tab-pane>
      </el-tabs>
    </FieldSet>

    <FieldSet :configs="configs[2]">
      <textarea id="outputData" v-model="outputData" type="textarea" rows="5" />
    </FieldSet>
  </div>
  <!-- <div :v-if="showPreviewWindow">
    <ReDialog>
    </ReDialog>
  </div> -->
</template>

<script setup>
import "./index.css";
import "codemirror/theme/ambiance.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/mode/sql/sql.js";

import { ref, onMounted, onUnmounted, h } from "vue";
import * as template from "./template";
import { ElMessage } from "element-plus";
import CodeMirror from "codemirror";
import { FieldSet } from "@/components/FieldSet";
import { parseSql } from "./util/parseSql";
import { addDialog } from "@/components/ReDialog";
import Detail from "./detail.vue";

defineOptions({
  name: "generator"
});
let showPreviewWindow = true;
const configs = ref([
  {
    title: "输入",
    collapsed: true,
    items: ""
  },
  {
    title: "模板选择",
    collapsed: true,
    items: ""
  },
  {
    title: "输出",
    collapsed: true,
    items: ""
  }
]);
const items = ref([
  { name: "pojo", children: ["entity", "dao", "service", "serviceImpl"] },
  { name: "custom", children: ["add"] },
  { name: "preview", children: ["entity", "dao", "service", "serviceImpl"] }
]);
const activeKey = ref("pojo");
let sqlExample = `create table test (
  doc_id number(10),         --主键id
  doc_status varchar2(100),  --流程状态
  requester_id number(10),   --申请人id
  primary key(doc_id)
);
`;
let inputTextarea;
let ouputTextarea;
let inputData = ref(sqlExample);
let outputData = ref("");
function btnClick(templateName) {
  ouputTextarea.setValue("");
  if (!template[templateName]) {
    ElMessage({
      type: "error",
      showClose: true,
      message: `模版${templateName}不存在`
    });
    return;
  }
  let data = parseSql(inputTextarea.getValue());
  data.authorName = "yinhuidong";
  let tempalteValue = template[templateName](data);
  ouputTextarea.setValue(tempalteValue);

  addDialog({
    title: "preview",
    contentRenderer: () => Detail,
    props: {
      data: [""],
      templateValue: template[templateName].toString()
    },
    hideFooter: true
  });
}

onMounted(() => {
  const option = {
    mode: "text/x-sql", //选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
    indentWithTabs: false, //在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符，默认为false
    smartIndent: true, //自动缩进，设置是否根据上下文 自动缩进（和上一行相同的缩进量）。默认为true。
    lineNumbers: true, //是否在编辑器左侧显示行号。
    matchBrackets: true, // 匹配括号
    cursorHeight: 1, //光标高度。默认为1，也就是撑满行高。对一些字体，设置0.85看起来会更好。
    lineWrapping: true // 自动换行
  };
  inputTextarea = CodeMirror.fromTextArea(
    document.getElementById("inputData"),
    option
  );
  ouputTextarea = CodeMirror.fromTextArea(
    document.getElementById("outputData"),
    option
  );
});
</script>

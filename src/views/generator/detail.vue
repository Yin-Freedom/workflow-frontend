<script setup lang="tsx">
import "codemirror/theme/ambiance.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/mode/sql/sql.js";

import { ref, onMounted } from "vue";
import CodeMirror from "codemirror";
// import "vue-json-pretty/lib/styles.css";
// import VueJsonPretty from "vue-json-pretty";

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  templateValue: String
});

const columns = [
  {
    label: "IP 地址",
    prop: "ip"
  },
  {
    label: "地点",
    prop: "address"
  },
  {
    label: "操作系统",
    prop: "system"
  },
  {
    label: "浏览器类型",
    prop: "browser"
  },
  {
    label: "所属模块",
    prop: "module"
  },
  {
    label: "请求时间",
    prop: "requestTime"
  },
  {
    label: "请求方法",
    prop: "method"
  },
  {
    label: "请求耗时",
    prop: "takesTime"
  },
  {
    label: "请求接口",
    prop: "url",
    copy: true
  },
  {
    label: "TraceId",
    prop: "traceId",
    copy: true
  }
];

const dataList = ref([
  {
    title: "响应头",
    name: "responseHeaders"
    // data: (props.data[0] as any).responseHeaders
  },
  {
    title: "响应体",
    name: "responseBody"
    // data: (props.data[0] as any).responseBody
  },
  {
    title: "请求头",
    name: "requestHeaders"
    // data: (props.data[0] as any).requestHeaders
  },
  {
    title: "请求体",
    name: "requestBody"
    // data: (props.data[0] as any).requestBody
  }
]);

let dataAreaValue = ref(props.templateValue);
let dataArea;
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
  dataArea = CodeMirror.fromTextArea(
    document.getElementById("dataArea"),
    option
  );
  dataArea.setValue(dataAreaValue.value);
});
</script>

<template>
  <div>
    <!-- <el-input v-model="dataAreaValue" rows="10"></el-input> -->
    <textarea id="dataArea" v-model="dataAreaValue" type="textarea" rows="10" />
    <el-scrollbar />
  </div>
</template>

<template>
  <div>
    <el-input type="textarea" v-model="dataAreaValue" rows="20"></el-input>
    <!-- <textarea id="dataArea" v-model="dataAreaValue" type="textarea" rows="10" /> -->
    <el-scrollbar />
  </div>
</template>


<script setup lang="tsx">
import "codemirror/theme/ambiance.css";
import "codemirror/lib/codemirror.css";
import "codemirror/addon/hint/show-hint.css";
import "codemirror/mode/sql/sql.js";

import { ref, onMounted } from "vue";
import CodeMirror from "codemirror";

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  templateContent: String
});

let dataAreaValue = ref(props.templateContent);
// let dataArea;
// onMounted(() => {
//   const option = {
//     mode: "text/x-sql", //选择对应代码编辑器的语言，我这边选的是数据库，根据个人情况自行设置即可
//     indentWithTabs: false, //在缩进时，是否需要把 n*tab宽度个空格替换成n个tab字符，默认为false
//     smartIndent: true, //自动缩进，设置是否根据上下文 自动缩进（和上一行相同的缩进量）。默认为true。
//     lineNumbers: true, //是否在编辑器左侧显示行号。
//     matchBrackets: true, // 匹配括号
//     cursorHeight: 1, //光标高度。默认为1，也就是撑满行高。对一些字体，设置0.85看起来会更好。
//     lineWrapping: true // 自动换行
//   };
//   dataArea = CodeMirror.fromTextArea(
//     document.getElementById("dataArea"),
//     option
//   );
//   dataArea.setValue(dataAreaValue.value);
// });
// </script>
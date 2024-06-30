<template>
  <div style="margin-bottom: 20px">
    <el-row>
      <el-col :span="24">
        <div style="padding: 10px; background-color: white; border-radius: 5px">
          <span>{{ configs.title }}</span>
          <el-button
            v-if="collapsed"
            :icon="Plus"
            size="small"
            circle
            style="float: right"
            @click="change"
          />
          <el-button
            v-if="!collapsed"
            :icon="Minus"
            size="small"
            circle
            style="float: right"
            @click="change"
          />
        </div>
      </el-col>
      <el-col :span="24">
        <div v-show="!collapsed">
          <slot />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { Plus, Minus } from "@element-plus/icons-vue";
defineOptions({
  name: "FieldSet"
});

const props = defineProps({
  configs: {
    title: String,
    collapsed: Boolean,
    items: Object
  }
});
let collapsed = ref(props.collapsed);
function change() {
  collapsed.value = !collapsed.value;
}
</script>

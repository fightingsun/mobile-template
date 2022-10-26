<script lang="ts" setup>
// 自定义样式颜色
const styleVars = {};
</script>

<template>
  <!-- varlet提供的样式配置器 -->
  <var-style-provider :style-vars="styleVars">
    <!-- 主页面 -->
    <router-view />
  </var-style-provider>
</template>

<style scoped></style>

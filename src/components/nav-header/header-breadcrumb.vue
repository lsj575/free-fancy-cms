<template>
  <div class="header-breadcrumb">
    <el-breadcrumb separator="/">
      <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item>{{ item.name }}</el-breadcrumb-item>
      </template>
    </el-breadcrumb>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Breadcrumb } from './types'
export default defineComponent({
  props: {
    breadcrumbs: {
      type: Array as PropType<Breadcrumb[]>,
      default: () => []
    }
  }
})
</script>
<style></style>

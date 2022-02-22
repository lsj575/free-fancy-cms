<template>
  <div class="content-card">
    <fancy-table
      :propList="contentTableConfig.tablePropList"
      :dataList="userList"
      :dataCount="userCount"
      :title="contentTableConfig.title"
    >
      <!-- 1. header 中的插槽 -->
      <template #headerHandler>
        <el-button size="small" type="primary">新建用户</el-button>
      </template>

      <!-- 2. 表格中的插槽 -->
      <template #status="scope">
        <el-button size="mini" :style="scope.row.status === 1 ? 'success' : 'danger'">{{
          scope.row.status === 1 ? '正常' : '禁用'
        }}</el-button>
      </template>
      <template #heandler>
        <div class="heandle-btns">
          <el-button type="text" size="mini">编辑</el-button>
          <el-button type="text" size="mini">删除</el-button>
        </div>
      </template>
    </fancy-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../../store'
import systemModule from '../../store/main/system/system'
import fancyTable from '../fancy-table/fancy-table.vue'
export default defineComponent({
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  components: {
    fancyTable
  },
  setup(props) {
    const store = useStore()
    store.dispatch('system/getDataList', {
      pageName: props.pageName,
      queryInfo: {
        offset: 0,
        size: 10
      }
    })

    const userList = computed(() => store.getters['systemModule/pageListData'](props.pageName))
    const userCount = computed(() => store.getters['systemModule/pageCountData'](props.pageName))
  }
})
</script>
<style lang="scss" scoped>
.content-card {
  margin-top: 20px;
  border-radius: 6px;
  background-color: #fff;
}
</style>

<template>
  <div class="content-card">
    <fancy-table
      :propList="contentTableConfig.tablePropList"
      :dataList="list"
      :dataCount="count"
      :title="contentTableConfig.title"
    >
      <!-- 1. header 中的插槽 -->
      <template #headerHandler>
        <el-button size="small" type="primary">新建用户</el-button>
      </template>

      <!-- 2. 表格中的插槽 -->
      <template #userType="scope">
        {{ userTypeName[scope.row.userType] }}
      </template>
      <template #status="scope">
        <el-button size="mini" :type="scope.row.status === 0 ? 'success' : 'danger'" plain>{{
          scope.row.status === 0 ? '正常' : '禁用'
        }}</el-button>
      </template>
      <template #heandler>
        <div class="heandle-btns">
          <el-button :icon="Edit" type="text" size="mini">编辑</el-button>
          <el-button :icon="Delete" type="text" size="mini">删除</el-button>
        </div>
      </template>
    </fancy-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useStore } from '../../store'
import fancyTable from '../fancy-table/fancy-table.vue'
import { Edit, Delete } from '@element-plus/icons'

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
    const userTypeName = ['系统管理员', '测试员', '普通用户']
    const store = useStore()
    store.dispatch('systemModule/getDataList', {
      pageName: props.pageName,
      queryInfo: {
        isAsc: true,
        sortColumns: ['gmt_create'],
        current: 1,
        size: 10
      }
    })

    const list = computed(() => store.getters['systemModule/pageListData'](props.pageName))
    const count = computed(() => store.getters['systemModule/pageCountData'](props.pageName))

    return {
      list,
      count,
      userTypeName,
      Edit,
      Delete
    }
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

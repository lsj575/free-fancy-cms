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
        <el-button v-if="isAdd" size="small" type="primary" @click="handleNewClick">{{
          contentTableConfig.addBtnName
        }}</el-button>
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
      <template #heandler="scope">
        <div class="heandle-btns">
          <el-button
            v-if="isUpdate"
            :icon="Edit"
            type="text"
            size="mini"
            @click="handleUpdateClick(scope.row)"
            >编辑</el-button
          >
          <el-button
            v-if="isDelete"
            :icon="Delete"
            type="text"
            size="mini"
            @click="handleDeleteClick(scope.row)"
            >删除</el-button
          >
          <div v-if="!isUpdate && !isDelete">无操作权限</div>
        </div>
      </template>
    </fancy-table>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, watch } from 'vue'
import { useStore } from '../../store'
import fancyTable from '../fancy-table/fancy-table.vue'
import { Edit, Delete } from '@element-plus/icons'
import { ElMessageBox } from 'element-plus'

import { usePermission } from '@/hooks/usePermission'

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
  emits: ['newBtnClick', 'editBtnClick'],
  setup(props, { emit }) {
    const store = useStore()
    // 获取权限
    const isAdd = usePermission(props.pageName, 'add')
    const isUpdate = usePermission(props.pageName, 'update')
    const isDelete = usePermission(props.pageName, 'delete')
    const isQuery = usePermission(props.pageName, 'query')

    const queryInfo = computed(() => store.state.systemModule.queryInfo)
    watch(queryInfo, () => {
      getPageData()
    })

    const userTypeName = ['系统管理员', '测试员', '普通用户']
    const getPageData = (searchInfo: any = {}) => {
      if (!isQuery) return
      store.dispatch('systemModule/getDataList', {
        pageName: props.pageName,
        queryInfo: {
          ...queryInfo.value,
          start: searchInfo?.start,
          end: searchInfo?.end,
          value: searchInfo?.value,
          status: searchInfo?.status
        }
      })
    }

    getPageData()

    const list = computed(() => store.getters['systemModule/pageListData'](props.pageName))
    const count = computed(() => store.getters['systemModule/pageCountData'](props.pageName))

    // 删除操作
    const handleDeleteClick = (rowData: any) => {
      ElMessageBox.confirm('是否确认删除该条数据?', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        emit('editBtnClick', rowData)
      })
      store.dispatch('systemModule/deletePageData', { id: rowData?.id, pageName: props.pageName })
    }
    // 编辑操作
    const handleUpdateClick = (rowData: any) => {
      emit('editBtnClick', rowData)
    }
    // 新增操作
    const handleNewClick = () => {
      emit('newBtnClick')
    }

    return {
      list,
      count,
      userTypeName,
      Edit,
      Delete,
      getPageData,
      isAdd,
      isDelete,
      isUpdate,
      handleDeleteClick,
      handleUpdateClick,
      handleNewClick
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

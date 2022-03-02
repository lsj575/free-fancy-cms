<template>
  <div class="fancy-table">
    <div class="header">
      <slot name="header">
        <div class="title">{{ title }}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <el-table :data="dataList" border style="width: 100%">
      <el-table-column label="ID" type="index" width="50" />
      <template v-for="propItem in propList" :key="propItem.prop">
        <el-table-column
          :prop="propItem.prop"
          :label="propItem.lable"
          :min-width="propItem.minWidth"
          align="center"
          show-overflow-tooltip
        >
          <template #default="scope">
            <slot :name="propItem.slotName" :row="scope.row">
              {{ scope.row[propItem.prop] }}
            </slot>
          </template>
        </el-table-column>
      </template>
    </el-table>
    <div class="footer">
      <slot name="footer">
        <el-pagination
          small="true"
          v-model:currentPage="queryInfo.current"
          :page-sizes="[10, 20, 30]"
          :page-size="queryInfo.size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="dataCount"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </slot>
    </div>
  </div>
</template>
<script lang="ts">
import { useStore } from '@/store'
import { computed, defineComponent, PropType } from 'vue'
export default defineComponent({
  props: {
    title: {
      type: String,
      default: ''
    },
    propList: {
      type: Array as PropType<any[]>,
      required: true
    },
    dataList: {
      type: Array,
      required: true
    },
    dataCount: {
      type: Number,
      required: true,
      default: 0
    }
  },
  setup() {
    const store = useStore()
    const queryInfo = computed(() => store.state.systemModule.queryInfo)
    const handleCurrentChange = (current: number) => {
      store.commit('systemModule/changeQueryInfo', { ...queryInfo.value, current })
    }

    const handleSizeChange = (size: number) => {
      store.commit('systemModule/changeQueryInfo', { ...queryInfo.value, size })
    }
    return {
      handleSizeChange,
      handleCurrentChange,
      queryInfo
    }
  }
})
</script>
<style lang="scss" scoped>
.fancy-table {
  background-color: #fff;
  margin: 0px 10px 10px 10px;

  .header {
    height: 30px;
    padding: 10px 14px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer {
    padding: 10px 4px;

    .el-pagination {
      text-align: right;
    }
  }
}
</style>

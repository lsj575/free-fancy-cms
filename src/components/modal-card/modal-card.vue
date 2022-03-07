<template>
  <div class="modal-card">
    <el-dialog
      v-model="dialogVisible"
      :title="dialogTitle"
      width="30%"
      center
      destroy-on-close="true"
    >
      <fancy-form v-bind="modalConfig" :form-data="formData"></fancy-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogVisible = false">取消</el-button>
          <el-button type="primary" @click="handleSubmitClick">确认</el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, ref, watch } from 'vue'
import FancyForm from '@/components/fancy-form/fancy-form.vue'
import { useStore } from '@/store'

export default defineComponent({
  props: {
    modalConfig: {
      type: Object,
      required: true
    },
    dialogTitle: {
      type: String,
      required: true
    },
    defaultInfo: {
      type: Object,
      default: () => ({})
    },
    pageName: {
      type: String,
      require: true
    }
  },
  components: {
    FancyForm
  },
  setup(props) {
    const store = useStore()
    const dialogVisible = ref(false)
    const formData = reactive({})

    watch(
      () => props.defaultInfo,
      (newValue) => {
        console.log(newValue)
        for (const item of props.modalConfig.formItems) {
          formData[`${item.field}`] = newValue[`${item.field}`]
        }
      }
    )

    const handleSubmitClick = () => {
      dialogVisible.value = false
      if (Object.keys(props.defaultInfo).length === 0) {
        // 新建
        store.dispatch('systemModule/createPageDataAction', {
          pageName: props.pageName,
          newData: { ...formData, roleIds: formData['userRole'] }
        })
      } else {
        // 编辑
        store.dispatch('systemModule/editPageDataAction', {
          pageName: props.pageName,
          editData: { ...formData, id: props.defaultInfo.id }
        })
      }
    }

    return {
      dialogVisible,
      formData,
      handleSubmitClick
    }
  }
})
</script>
<style lang="scss" scoped></style>

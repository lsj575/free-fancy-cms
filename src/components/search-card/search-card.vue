<template>
  <div class="search">
    <fancy-form v-bind="searchFormConfig" :form-data="formData" @update-form-data="updateFormData">
      <template #footer>
        <div class="search-btn">
          <el-button type="primary">查询</el-button>
          <el-button @click="handleReset">重置</el-button>
        </div>
      </template>
    </fancy-form>
  </div>
</template>
<script lang="ts">
import { defineComponent, reactive, PropType } from 'vue'
import FancyForm from '@/components/fancy-form/fancy-form.vue'
import { FancyFormType } from '../fancy-form/types'
export default defineComponent({
  components: {
    FancyForm
  },
  props: {
    searchFormConfig: {
      type: Object as PropType<FancyFormType>,
      required: true
    }
  },
  setup(props) {
    const formItems = props.searchFormConfig.formItems ?? []
    const formOriginData = {}
    for (const item of formItems) {
      formOriginData[item.field] = ''
    }
    const formData = reactive(formOriginData)
    console.log(formOriginData)
    const updateFormData = (newValue: FormData) => {
      for (const key in newValue) {
        formData[`${key}`] = newValue[key]
      }
    }

    const handleReset = () => {
      for (const key in formOriginData) {
        formData[`${key}`] = ''
      }
    }

    return {
      formData,
      updateFormData,
      handleReset
    }
  }
})
</script>
<style lang="scss" scoped>
.search {
  .search-btn {
    text-align: right;
    padding: 0 50px 20px 0;
  }
}
</style>

<template>
  <div class="fancy-form">
    <el-form :label-width="labelWidth">
      <el-row>
        <template v-for="item in formItems" :key="item.label">
          <el-col v-bind="colLayout">
            <el-form-item :label="item.label" :style="itemStyle">
              <template v-if="item.type === 'input'">
                <el-input
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  v-model="reactiveFormData[`${item.field}`]"
                ></el-input>
              </template>
              <template v-if="item.type === 'select'">
                <el-select
                  :placeholder="item.placeholder"
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="reactiveFormData[`${item.field}`]"
                >
                  <el-option
                    v-for="option in item.options"
                    :key="option.name"
                    :value="option.value"
                    >{{ option.name }}</el-option
                  >
                </el-select>
              </template>
              <template v-if="item.type === 'datepicker'">
                <el-date-picker
                  v-bind="item.otherOptions"
                  style="width: 100%"
                  v-model="reactiveFormData[`${item.field}`]"
                ></el-date-picker>
              </template>
            </el-form-item>
          </el-col>
        </template>
      </el-row>
    </el-form>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, PropType, reactive, watch } from 'vue'
import { FancyFormItem } from './types'
export default defineComponent({
  props: {
    formData: {
      type: Object,
      required: true
    },
    formItems: {
      type: Array as PropType<FancyFormItem[]>,
      default: () => []
    },
    labelWidth: {
      type: String,
      default: '100px'
    },
    itemStyle: {
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: {
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['updateFormData'],
  setup(props, { emit }) {
    const reactiveFormData = reactive({ ...props.formData })

    watch(reactiveFormData, (newValue) => emit('updateFormData', newValue), { deep: true })

    return {
      reactiveFormData
    }
  }
})
</script>
<style lang="scss" scoped>
.fancy-form {
  background-color: #fff;
  border-radius: 6px;
  padding-top: 22px;

  .form-item {
    padding: 5px 30px;
  }
}
</style>

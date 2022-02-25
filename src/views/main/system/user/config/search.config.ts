import { FancyFormType } from '@/components/fancy-form/types'
export const searchFormConfig: FancyFormType = {
  formItems: [
    {
      field: 'id',
      type: 'input',
      label: 'ID',
      rules: [],
      placeholder: '请输入ID'
    },
    {
      field: 'username',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'status',
      type: 'select',
      label: '状态',
      placeholder: '请选择用户状态',
      options: [
        { name: '正常', value: 0 },
        { name: '禁用', value: 1 }
      ]
    },
    {
      field: 'createTime',
      type: 'datepicker',
      label: '创建时间',
      otherOptions: {
        startPlaceholder: '开始时间',
        endPlaceholder: '结束时间',
        type: 'datetimerange'
      }
    }
  ]
}

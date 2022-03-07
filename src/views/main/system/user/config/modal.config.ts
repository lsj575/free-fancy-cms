import { FancyFormType } from '@/components/fancy-form/types'
export const modalConfig: FancyFormType = {
  formItems: [
    {
      field: 'username',
      type: 'input',
      label: '用户名',
      placeholder: '请输入用户名'
    },
    {
      field: 'password',
      type: 'password',
      label: '密码',
      placeholder: '请输入密码',
      isHidden: true
    },
    {
      field: 'gender',
      type: 'select',
      label: '性别',
      placeholder: '请选择用户性别',
      options: [
        { name: '女', value: 0 },
        { name: '男', value: 1 }
      ]
    },
    {
      field: 'userRole',
      type: 'select',
      label: '用户角色',
      placeholder: '请选择用户类型',
      options: []
    }
  ],
  colLayout: { span: 24 },
  itemStyle: {}
}

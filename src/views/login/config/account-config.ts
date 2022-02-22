export const rules = {
  username: [
    {
      required: true,
      message: '请输入用户名',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{5,20}$/,
      message: '用户名必须为5到20个字母或数字',
      trigger: 'blur'
    }
  ],
  password: [
    {
      required: true,
      message: '请输密码',
      trigger: 'blur'
    },
    {
      pattern: /^[a-z0-9]{6,20}$/,
      message: '密码必须为8到20个字母或数字',
      trigger: 'blur'
    }
  ]
}

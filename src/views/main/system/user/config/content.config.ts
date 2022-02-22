export const contentTableConfig = {
  title: '用户列表',
  tablePropList: [
    { prop: 'username', lable: '用户名', minWidth: '120' },
    { prop: 'rolename', lable: '角色名称', minWidth: '100' },
    { prop: 'status', lable: '状态', minWidth: '60', slotName: 'status' },
    { prop: 'createTime', lable: '创建时间', minWidth: '240' },
    { prop: 'updateTime', lable: '更新时间', minWidth: '240' },
    { lable: '操作', minWidth: '120', slotName: 'heandler' }
  ]
}

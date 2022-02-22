const loginSuccessRes = {
  id: '1',
  token: 'sldjfal;sdkjfl;as'
}

const userInfo = {
  id: '1',
  username: '@word',
  role: {
    id: '1',
    name: '@word'
  }
}

const userMenus = [
  {
    id: 1,
    name: '系统管理',
    type: 1,
    icon: 'Management',
    children: [
      {
        id: 2,
        name: '用户管理',
        type: 2,
        url: '/main/system/user'
      },
      {
        id: 3,
        name: '角色管理',
        type: 2,
        url: '/main/system/role'
      }
    ]
  },
  {
    id: 4,
    name: '内容管理',
    type: 1,
    icon: 'MessageBox',
    children: [
      {
        id: 5,
        name: '动态管理',
        type: 2,
        url: '/main/content/post'
      },
      {
        id: 6,
        name: '主题管理',
        type: 2,
        url: '/main/content/theme'
      }
    ]
  }
]

const articleList = [
  {
    id: 1,
    title: 'df',
    author: 'df',
    job: 'Web前端'
  },
  {
    id: 2,
    title: 'fd',
    author: 'fd',
    job: 'Java工程师'
  }
]

export default {
  'post|/login': {
    code: 200,
    msg: 'success',
    data: loginSuccessRes
  },
  'get|/users/1': {
    code: 200,
    msg: 'success',
    data: userInfo
  },
  'get|/role/1/menu': {
    code: 200,
    msg: 'success',
    data: userMenus
  },
  'get|/article/List': {
    code: 200,
    msg: 'success',
    data: articleList
  }
}

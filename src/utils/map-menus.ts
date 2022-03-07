import { Breadcrumb } from '@/components/nav-header/types'
import { RouteRecordRaw } from 'vue-router'

let firstMenu: any = null

export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  // 1.加载默认所有的routes
  const allRoutes: RouteRecordRaw[] = []
  // require webpack函数
  const routeFiles = require.context('../router/main', true, /\.ts/)
  routeFiles.keys().forEach((key) => {
    const route = require('../router/main' + key.slice(1))
    allRoutes.push(route.default)
  })

  // 2. 根据菜单获取需要添加的routes
  // 根据type判断菜单类型
  const _recurseGetRoute = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.menuType === 'C') {
        const route = allRoutes.find((route) => {
          return route.path === menu.component
        })
        if (route) {
          routes.push(route)
        }
        if (!firstMenu) {
          firstMenu = menu
        }
      } else {
        _recurseGetRoute(menu.children)
      }
    }
  }

  _recurseGetRoute(userMenus)

  return routes
}

export function mapPathToBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: Breadcrumb[] = []
  mapPathToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs
}

export function mapPathToMenu(
  userMenus: any[],
  currentPath: string,
  breadcrumbs?: Breadcrumb[]
): any {
  let userMenu: any = null
  for (const menu of userMenus) {
    if (menu.menuType === 'M') {
      const res = mapPathToMenu(menu.children ?? [], currentPath)
      if (res) {
        breadcrumbs?.push({ name: menu.menuName })
        breadcrumbs?.push({ name: res.menuName })
        userMenu = res
      }
    } else if (menu.menuType === 'C' && menu.component === currentPath) {
      breadcrumbs?.push({ name: menu.menuName })
      userMenu = menu
    }
  }

  return userMenu
}

export function mapMenusToPermissions(userMenus: any[]) {
  const permissions: string[] = []

  const _recurseGetPermission = (menus: any[]) => {
    for (const menu of menus) {
      if (menu.menuType === 'M' || menu.menuType === 'C') {
        _recurseGetPermission(menu.children ?? [])
      } else if (menu.menuType === 'F') {
        permissions.push(menu.permission)
      }
    }
  }
  _recurseGetPermission(userMenus)

  return permissions
}

export { firstMenu }

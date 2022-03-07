import { useStore } from '@/store'

export function usePermission(pageName: string, handleName: string) {
  const store = useStore()
  const permissions = store.state.loginModule.permissions
  const verifyPermission = `system:${pageName}:${handleName}`
  return !!permissions.find((item) => {
    return item === verifyPermission
  })
}

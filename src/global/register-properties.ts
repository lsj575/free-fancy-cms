import { formatUTCString } from '@/utils/format-date'
import { App } from 'vue'

export default function globalProperties(app: App): void {
  app.config.globalProperties.$filters = {
    formatTime(value: string) {
      return formatUTCString(value)
    }
  }
}

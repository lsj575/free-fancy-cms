import ContentCard from '@/components/content-card/content-card.vue'
import { ref } from 'vue'

import { formatUTCString } from '@/utils/format-date'

export function useContentCard() {
  const contentCardRef = ref<InstanceType<typeof ContentCard>>()
  const handleResetClick = () => {
    contentCardRef.value?.getPageData()
  }

  const handleQueryClick = (searchInfo: any) => {
    // 处理时间字段
    searchInfo.start = Array.isArray(searchInfo.createTime)
      ? formatUTCString(searchInfo.createTime[0])
      : ''
    searchInfo.end = Array.isArray(searchInfo.createTime)
      ? formatUTCString(searchInfo.createTime[1])
      : ''

    // 处理用户名称字段
    contentCardRef.value?.getPageData(searchInfo)
  }

  return [contentCardRef, handleResetClick, handleQueryClick]
}

<template>
  <div class="user">
    <search-card
      :search-form-config="searchFormConfig"
      @reset-btn-click="handleResetClick"
      @query-btn-click="handleQueryClick"
    ></search-card>
    <content-card
      ref="contentCardRef"
      :content-table-config="contentTableConfig"
      page-name="user"
    ></content-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SearchCard from '@/components/search-card/search-card.vue'
import ContentCard from '@/components/content-card/content-card.vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { useContentCard } from '@/hooks/useContentCard'
export default defineComponent({
  components: {
    SearchCard,
    ContentCard
  },
  setup() {
    const [contentCardRef, handleResetClick, handleQueryClick] = useContentCard()

    return {
      searchFormConfig,
      contentTableConfig,
      contentCardRef,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>
<style lang="scss" scoped></style>

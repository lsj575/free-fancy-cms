<template>
  <div class="user">
    <search-card :search-form-config="searchFormConfig"></search-card>
    <content-card :content-table-config="contentTableConfig" page-name="user"></content-card>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'
import SearchCard from '@/components/search-card/search-card.vue'
import ContentCard from '@/components/content-card/content-card.vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
export default defineComponent({
  components: {
    SearchCard,
    ContentCard
  },
  setup() {
    return {
      searchFormConfig,
      contentTableConfig
    }
  }
})
</script>
<style lang="scss" scoped></style>

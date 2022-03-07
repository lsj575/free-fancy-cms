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
      @new-btn-click="handleNewClick"
      @edit-btn-click="handleEditClick"
    ></content-card>
    <modal-card
      ref="modalCardRef"
      :default-info="defaultInfo"
      :dialogTitle="dialogTitle"
      :modal-config="modalConfigRef"
      page-name="user"
    ></modal-card>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import SearchCard from '@/components/search-card/search-card.vue'
import ContentCard from '@/components/content-card/content-card.vue'
import ModalCard from '@/components/modal-card/modal-card.vue'
import { searchFormConfig } from './config/search.config'
import { contentTableConfig } from './config/content.config'
import { modalConfig } from './config/modal.config'
import { useContentCard } from '@/hooks/useContentCard'
import { useModalCard } from '@/hooks/useModalCard'
import { useStore } from '@/store'
export default defineComponent({
  components: {
    SearchCard,
    ContentCard,
    ModalCard
  },
  setup() {
    const [contentCardRef, handleResetClick, handleQueryClick] = useContentCard()

    // 1. 处理password是否可见和dialogTitle命名
    const newCallBack = (dialogTitle: any) => {
      const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
      if (passwordItem) {
        passwordItem.isHidden = false
      }
      dialogTitle.value = '新建用户'
    }
    const editCallBack = (dialogTitle: any) => {
      const passwordItem = modalConfig.formItems.find((item) => item.field === 'password')
      if (passwordItem) {
        passwordItem.isHidden = true
      }
      dialogTitle.value = '编辑用户'
    }

    // 2. 动态添加角色列表
    const store = useStore()
    const modalConfigRef = computed(() => {
      const roleItem = modalConfig.formItems.find((item) => {
        return item.field === 'userRole'
      })
      if (roleItem) {
        roleItem.options = store.state.entireRole.map((item) => {
          return { name: item.roleName, value: item.id }
        })
      }
      return modalConfig
    })

    const [modalCardRef, dialogTitle, defaultInfo, handleNewClick, handleEditClick] = useModalCard(
      newCallBack,
      editCallBack
    )

    return {
      searchFormConfig,
      contentTableConfig,
      modalConfigRef,
      contentCardRef,
      handleResetClick,
      handleQueryClick,
      modalCardRef,
      dialogTitle,
      defaultInfo,
      handleNewClick,
      handleEditClick
    }
  }
})
</script>
<style lang="scss" scoped></style>

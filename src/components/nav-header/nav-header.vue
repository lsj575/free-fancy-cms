<template>
  <div class="nav-header">
    <el-icon v-if="!isFold" class="fold-menu" size="24" @click="handleFoldMenu"><fold /></el-icon>
    <el-icon v-if="isFold" class="fold-menu" size="24" @click="handleFoldMenu"><expand /></el-icon>
    <div class="content">
      <header-breadcrumb :breadcrumbs="breadcrumbs"></header-breadcrumb>
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">{{ userInfo.username }}</span>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item @click="handleLogoutClick">退出登录</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useStore } from '@/store'
import { Fold, Expand } from '@element-plus/icons'
import headerBreadcrumb from './header-breadcrumb.vue'
import { mapPathToBreadcrumbs } from '@/utils/map-menus'
import { useRoute } from 'vue-router'
export default defineComponent({
  components: {
    Fold,
    Expand,
    headerBreadcrumb
  },
  emits: ['menuFoldChange'],
  setup(props, { emit }) {
    const isFold = ref(false)
    const handleFoldMenu = () => {
      isFold.value = !isFold.value
      emit('menuFoldChange', isFold.value)
    }

    // store
    const store = useStore()
    const userInfo = computed(() => store.state.loginModule.userInfo)
    const userMenus = store.state.loginModule.userMenus

    // 面包屑数据
    const breadcrumbs = computed(() => {
      const route = useRoute()
      const currentPath = route.path
      return mapPathToBreadcrumbs(userMenus, currentPath)
    })

    const handleLogoutClick = () => {
      store.dispatch('loginModule/accountLogoutAction')
    }

    return {
      isFold,
      handleFoldMenu,
      userInfo,
      breadcrumbs,
      handleLogoutClick
    }
  }
})
</script>
<style lang="scss" scoped>
.nav-header {
  width: 100%;
  display: flex;

  .fold-menu {
    cursor: pointer;
  }

  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 20px;
  }
}
</style>

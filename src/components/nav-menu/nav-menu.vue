<template>
  <div class="nav-menu">
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.png" alt="logo" />
      <span v-if="!collapse" class="title">Free Fancy CMS</span>
    </div>
    <el-menu
      :default-active="defaultActive"
      class="el-menu-vertical"
      background-color="#0c2135"
      text-color="#b7bdc3"
      active-text-color="#0a60bd"
      :collapse="collapse"
    >
      <template v-for="item in userMenus" :key="item.id">
        <template v-if="item.menuType === 'M'">
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon>
                <component v-if="item.icon" :is="item.icon"></component>
              </el-icon>
              <span>{{ item.menuName }}</span>
            </template>
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
                <el-icon>
                  <component v-if="item.icon" :is="subitem.icon"></component>
                </el-icon>
                <span>{{ subitem.menuName }}</span>
              </el-menu-item>
            </template>
          </el-sub-menu>
        </template>
        <template v-else>
          <el-menu-item :index="item.id + ''" @click="handleMenuItemClick(item)">
            <el-icon>
              <component v-if="item.icon" :is="item.icon"></component>
            </el-icon>
            <span>{{ item.name }}</span>
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useStore } from '@/store'
import { Management, MessageBox } from '@element-plus/icons'
import { useRoute, useRouter } from 'vue-router'
import { mapPathToMenu } from '@/utils/map-menus'

export default defineComponent({
  components: {
    Management,
    MessageBox
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup() {
    // state
    const store = useStore()
    const userMenus = computed(() => store.state.loginModule.userMenus)

    // router
    const router = useRouter()
    const route = useRoute()
    const currentPath = route.path

    // data
    const menu = mapPathToMenu(userMenus.value, currentPath)
    const defaultActive = ref(menu.id + '')

    // event handle
    const handleMenuItemClick = (item: any) => {
      router.push({
        path: item.component ?? '/not-found'
      })
    }

    return {
      userMenus,
      handleMenuItemClick,
      defaultActive
    }
  }
})
</script>
<style lang="scss" scoped>
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 0px 8px 0px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 5px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
      width: 126px;
      margin-left: 6px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: clip;
    }
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  ::v-deep .el-submenu__title {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>

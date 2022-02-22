<template>
  <div class="login-panel">
    <h1 class="title">Free Fancy后台管理系统</h1>
    <div class="login-container">
      <AccountLogin ref="accountLoginRef"></AccountLogin>
      <div class="login-btn">
        <el-button type="primary" @click="handleLogin">登录</el-button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { ref, defineComponent } from 'vue'
import AccountLogin from './account-login.vue'

export default defineComponent({
  components: {
    AccountLogin
  },
  setup() {
    const accountLoginRef = ref<InstanceType<typeof AccountLogin>>()
    const handleLogin = () => {
      accountLoginRef.value?.loginAction()
    }

    return {
      accountLoginRef,
      handleLogin
    }
  }
})
</script>
<style lang="scss">
.login-panel {
  margin-bottom: 120px;

  .login-container {
    .login-btn {
      margin-top: 15px;

      .el-button {
        width: 100%;
      }
    }
  }
}
</style>

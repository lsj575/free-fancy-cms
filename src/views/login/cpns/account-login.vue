<template>
  <div class="account-login">
    <el-form
      :rules="rules"
      class="login-form"
      label-position="right"
      label-width="70px"
      :model="loginInfo"
      ref="formRef"
    >
      <el-form-item label="用户名:" prop="username">
        <el-input v-model="loginInfo.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码:" prop="password">
        <el-input v-model="loginInfo.password" placeholder="请输入密码" show-password></el-input>
      </el-form-item>
      <el-form-item label="验证码" prop="code">
        <el-input
          v-model="loginInfo.code"
          placeholder="请输入验证码"
          style="width: 170px"
        ></el-input>
        <el-image
          style="width: 70px; height: 40px; margin-left: 10px"
          fit="fill"
          :src="captchaImg"
          @click="captchaHandler()"
        ></el-image>
      </el-form-item>
    </el-form>
  </div>
</template>
<script lang="ts">
import { reactive, ref, defineComponent, onMounted } from 'vue'
import { useStore } from '@/store'

import { ElForm } from 'element-plus'

import { rules } from '../config/account-config'
import { getCaptcha } from '@/service/login/login'

export default defineComponent({
  setup() {
    const store = useStore()

    // 获取验证码
    let cToken = ref(''),
      captchaImg = ref('')

    const captchaHandler = async () => {
      const captchaData = await getCaptcha()
      cToken.value = captchaData.data.ctoken
      captchaImg.value = captchaData.data.captchaImageEncode
    }
    onMounted(async () => await captchaHandler())

    const loginInfo = reactive({
      username: '',
      password: '',
      code: '',
      cToken: cToken,
      userType: 1 // 1 代表系统用户
    })

    const formRef = ref<InstanceType<typeof ElForm>>()

    const loginAction = () => {
      formRef.value?.validate((valid) => {
        if (valid) {
          // 登陆
          store.dispatch('loginModule/accountLoginAction', { ...loginInfo })
        }
      })
    }

    return {
      loginInfo,
      formRef,
      loginAction,
      captchaImg,
      captchaHandler,
      // 表单验证规则
      rules
    }
  }
})
</script>
<style lang="scss">
.login-form {
  padding: 20px 20px 2px 20px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.21);
  border-radius: 4px;
}
.el-image {
  overflow: visible;
}
</style>

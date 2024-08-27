<template>
  <!-- sign up -->
  <div id="signUpPage" class="bg-yellow">
    <div class="conatiner signUpPage vhContainer">
      <div class="side">
        <a href="#"
          ><img
            class="logoImg"
            src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/logo.png"
            alt=""
        /></a>
        <img
          class="d-m-n"
          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/todolist/img.png"
          alt="workImg"
        />
      </div>
      <div>
        <form class="formControls">
          <h2 class="formControls_txt">註冊帳號</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            v-model="registerForm.email"
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
          />
          <span v-if="errorMsg.email">{{ errorMsg.email }}</span>
          <label class="formControls_label" for="name">您的暱稱</label>
          <input
            v-model="registerForm.nickname"
            class="formControls_input"
            type="text"
            name="name"
            id="name"
            placeholder="請輸入您的暱稱"
          />
          <span v-if="errorMsg.nickname">{{ errorMsg.nickname }}</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            v-model="registerForm.password"
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
          />
          <span v-if="errorMsg.password">{{ errorMsg.password }}</span>
          <label class="formControls_label" for="pwd-check">再次輸入密碼</label>
          <input
            v-model="registerForm.password2"
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd-check"
            placeholder="請再次輸入密碼"
            required
          />
          <span v-if="registerForm.password !== registerForm.password2">密碼不一致</span>
          <span v-if="errorMsg.password">{{ errorMsg.password }}</span>
          <button type="button" class="formControls_btnSubmit" @click="submit">註冊帳號</button>
          <RouterLink to="/" class="formControls_btnLink">登入</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, computed } from 'vue'
import router from '@/router'
import axios from 'axios'

const baseUrl = 'https://todolist-api.hexschool.io'
const registerForm = ref({
  email: '',
  nickname: '',
  password: '',
  password2: ''
})
const message = ref([])

const submit = async () => {
  try {
    const response = await axios.post(`${baseUrl}/users/sign_up`, {
      email: registerForm.value.email,
      nickname: registerForm.value.nickname,
      password: registerForm.value.password
    })
    if (response.data.status) {
      router.push('/login')
    }
  } catch (error) {
    message.value = error.response.data.message
  }
}

const errorMsg = computed(() => {
  if (typeof message.value === 'object') {
    const emailError = message.value.filter((item) => item.includes('email'))
    const nicknameError = message.value.filter((item) => item.includes('nickname'))
    const passwordError = message.value.filter((item) => item.includes('password'))
    return {
      email: emailError.join(', '),
      nickname: nicknameError.join(', '),
      password: passwordError.join(', ')
    }
  } else {
    return {
      email: message.value
    }
  }
})
</script>
<style lang="scss" scoped></style>

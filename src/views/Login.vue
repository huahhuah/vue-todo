<template>
  <!-- login_page -->
  <div id="loginPage" class="bg-yellow">
    <div class="conatiner loginPage vhContainer">
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
          <h2 class="formControls_txt">最實用的線上代辦事項服務</h2>
          <label class="formControls_label" for="email">Email</label>
          <input
            v-model="loginForm.email"
            class="formControls_input"
            type="text"
            id="email"
            name="email"
            placeholder="請輸入 email"
            required
          />
          <span v-if="errorMsg.email">{{ errorMsg.email }}</span>
          <label class="formControls_label" for="pwd">密碼</label>
          <input
            v-model="loginForm.password"
            class="formControls_input"
            type="password"
            name="pwd"
            id="pwd"
            placeholder="請輸入密碼"
            required
          />
          <span v-if="errorMsg.password">{{ errorMsg.password }}</span>
          <button type="button" class="formControls_btnSubmit" @click="submit">登入</button>
          <RouterLink to="/register" class="formControls_btnLink">註冊帳號</RouterLink>
        </form>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'

const router = useRouter()
const baseUrl = 'https://todolist-api.hexschool.io'
const loginForm = ref({
  email: '',
  password: ''
})
const nickname = ref('')
const loginToken = ref('')
const errorMsgArr = ref([])

const submit = async () => {
  try {
    const signIn = await axios.post(`${baseUrl}/users/sign_in`, {
      email: loginForm.value.email,
      password: loginForm.value.password
    })
    checkout(signIn.data.token)
  } catch (error) {
    const errorMsg = error.response.data.message
    errorMsgArr.value = errorMsg
  }
}

const checkout = async (token) => {
  try {
    const user = await axios.get(`${baseUrl}/users/checkout`, {
      headers: {
        Authorization: token
      }
    })
    nickname.value = user.data.nickname
    loginToken.value = token
    const exp = new Date()
    exp.setDate(exp.getDate() + 1)
    const loginInfo = {
      user: nickname.value,
      token: loginToken.value
    }
    document.cookie = `authInfo=${JSON.stringify(loginInfo)}; expires=${exp.toUTCString()}`
    //導到 todo 頁面
    router.push('/todo')
  } catch (error) {
    console.log(error)
  }
}

const errorMsg = computed(() => {
  if (typeof errorMsgArr.value === 'object') {
    const emailError = errorMsgArr.value.filter((item) => item.includes('email'))
    const passwordError = errorMsgArr.value.filter((item) => item.includes('password'))
    return {
      email: emailError.join(', '),
      password: passwordError.join(', ')
    }
  } else {
    return {
      email: errorMsgArr.value,
      password: errorMsgArr.value
    }
  }
})

onMounted(() => {
  const authInfo = document.cookie
    .split('; ')
    .find((row) => row.startsWith('authInfo='))
    ?.split('=')[1]
  if (authInfo) {
    loginToken.value = JSON.parse(authInfo).token
    checkout(loginToken.value)
  }
})
</script>
<style lang="scss" scoped></style>

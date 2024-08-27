<template>
  <!-- ToDo List -->
  <div id="todoListPage" class="bg-half">
    <nav>
      <h1><a href="#">ONLINE TODO LIST</a></h1>
      <ul>
        <li class="todo_sm">
          <a href="#"
            ><span>{{ nickName }} 的代辦事項表</span></a
          >
        </li>
        <li><a href="#" @click.prevent="signOut">登出</a></li>
      </ul>
    </nav>
    <div class="conatiner todoListPage vhContainer">
      <div class="todoList_Content">
        <div class="inputBox">
          <input v-model="newTodo.content" type="text" placeholder="請輸入待辦事項" />
          <a href="#" @click.prevent="addTodo">
            <i class="fa fa-plus">+</i>
          </a>
        </div>
        <div class="todoList_list" v-if="todos.length > 0">
          <ul class="todoList_tab">
            <li><a :class="{ active: todoTab == 'all' }" @click="todoTab = 'all'">全部</a></li>
            <li>
              <a :class="{ active: todoTab == 'incomplete' }" @click="todoTab = 'incomplete'"
                >待完成</a
              >
            </li>
            <li><a :class="{ active: todoTab == 'done' }" @click="todoTab = 'done'">已完成</a></li>
          </ul>
          <div class="todoList_items">
            <ul class="todoList_item">
              <li v-for="(todo, index) in data" :key="index">
                <label
                  class="todoList_label"
                  @click="toggleStatus(todo.id)"
                  v-if="todo.editState == false"
                >
                  <input class="todoList_input" type="checkbox" v-model="todo.status" />
                  <span>{{ todo.content }}</span>
                </label>
                <div v-if="todo.editState == false">
                  <a @click="deleteTodo(todo.id)">
                    <i class="fa fa-times">X</i>
                  </a>
                </div>
              </li>
            </ul>

            <div class="todoList_statistics">
              <p v-if="todoTab == 'done'">{{ countDone }} 個已完成項目。</p>
              <p v-else-if="todoTab == 'incomplete'">{{ countIncomplete }} 個未完成項目。</p>
              <p v-if="todoTab == 'all'">
                {{ countDone }} 個已完成項目，{{ countIncomplete }} 個未完成項目。
              </p>
            </div>
          </div>
        </div>
        <div v-else>
          <div>目前尚無待辦事項</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import axios from 'axios'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const baseUrl = 'https://todolist-api.hexschool.io'

const todos = ref([])
const newTodo = ref({
  content: ''
})
const nickName = ref([])
const token = ref([])

//獲取代辦事項
const getTodos = async () => {
  const response = await axios.get(`${baseUrl}/todos`, {
    headers: {
      Authorization: token.value
    }
  })
  todos.value = response.data.data
  todos.value.forEach((todo) => {
    todo.tmpContent = todo.content
    todo.editState = false
  })
}

//新增
const addTodo = async () => {
  if (newTodo.value.content != '') {
    axios
      .post(baseUrl + '/todos', newTodo.value, {
        headers: {
          Authorization: token.value
        }
      })
      .then(() => {
        getTodos()
        newTodo.value.content = ''
      })
      .catch((error) => {
        console.log(error)
      })
  }
}

//刪除
const deleteTodo = async (id) => {
  await axios.delete(`${baseUrl}/todos/${id}`, {
    headers: {
      Authorization: token.value
    }
  })
  getTodos()
}

//登出
const signOut = async () => {
  try {
    await axios.post(
      `${baseUrl}/users/sign_out`,
      {},
      {
        headers: {
          Authorization: token.value
        }
      }
    )
    token.value = ''
    document.cookie = 'authInfo=;max-age=0;'
    //導到登入頁
    router.push('/login')
  } catch (error) {
    console.log(error)
  }
}

// 切換狀態
const toggleStatus = async (id) => {
  await axios.patch(
    `${baseUrl}/todos/${id}/toggle`,
    {},
    {
      headers: {
        Authorization: token.value
      }
    }
  )
  getTodos()
}

const todoTab = ref('all')
const data = computed(() => {
  let tmpTodos = []
  if (todoTab.value == 'all') {
    return todos.value
  } else if (todoTab.value == 'done') {
    todos.value.forEach((t) => {
      if (t.status == true) {
        tmpTodos.push(t)
      }
    })
    return tmpTodos
  } else if (todoTab.value == 'incomplete') {
    todos.value.forEach((t) => {
      if (t.status == false) {
        tmpTodos.push(t)
      }
    })
    return tmpTodos
  }
  return tmpTodos
})
const countDone = computed(() => {
  let count = 0
  todos.value.forEach((t) => {
    if (t.status == true) {
      count++
    }
  })
  return count
})
const countIncomplete = computed(() => {
  let count = 0
  todos.value.forEach((t) => {
    if (t.status == false) {
      count++
    }
  })
  return count
})

onMounted(() => {
  const authInfo = document.cookie
    .split('; ')
    .find((row) => row.startsWith('authInfo='))
    ?.split('=')[1]
  if (authInfo) {
    nickName.value = JSON.parse(authInfo).user
    token.value = JSON.parse(authInfo).token
    getTodos()
  } else {
    router.push('/login')
  }
})
</script>

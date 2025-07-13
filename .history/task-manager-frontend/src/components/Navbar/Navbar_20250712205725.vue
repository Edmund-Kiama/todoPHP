<script setup>
import { store } from '../../store'
import { useRouter } from 'vue-router'

const router = useRouter()

const user = store.user
if ( user.is)

function logout() {
  store.user.role = null
  store.user.loggedIn = false
  localStorage.removeItem('token')
  router.push('/login')
}
</script>

<template>
  <nav v-if="store.user.loggedIn">
    <ul>
      <li v-if="user.role === 'admin'"><a href="/admin">Admin Dashboard</a></li>
      <li v-if="user.role === 'user'"><a href="/user">User Dashboard</a></li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

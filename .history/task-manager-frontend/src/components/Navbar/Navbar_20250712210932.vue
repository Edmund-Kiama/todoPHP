
<template>
  <nav v-if="store.user.loggedIn" class="navbar">
    <ul>
      <li v-if="user.role === 'admin'">Admin Dashboard</li>
      <li v-if="user.role === 'user'"><a href="/user">User Dashboard</a></li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

<script setup>
  import "./nav.css"
  import { store } from '../../store'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  
  const user = store.user
  if (!user.loggedIn) router.push('/')
  
  function logout() {
    store.user.role = null
    store.user.loggedIn = false
    localStorage.removeItem('token')
    router.push('/login')
  }
</script>

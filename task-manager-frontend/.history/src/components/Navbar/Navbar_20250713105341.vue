<script setup>
  import "./nav.css"
  import { store } from '../../store'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const user = JSON.parse(localStorage.getItem('user'));

  
  if (!store.user.loggedIn) router.push('/')
  
  function logout() {
    store.user.role = null
    store.user.loggedIn = false
    localStorage.removeItem('token')
    router.push('/')
  }
</script>

<template>
  <nav v-if="store.user.loggedIn" class="navbar">
    <ul>
      <li v-if="user.role === 'admin'">Admin Dashboard</li>
      <li v-if="user.role === 'user'">User Dashboard</li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>


<script setup>
  import "./nav.css"
  import { store } from '../../store'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const user = JSON.parse(localStorage.getItem('user'));
  
  if (!user) router.push('/')
  console.log()
  
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
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


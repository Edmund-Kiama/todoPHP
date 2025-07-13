<script setup>
  import "./nav.css"
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const user = ref(null);

  onMounted(() => {
    const storedUser = localStorage.getItem('user');
    user.value = storedUser ? JSON.parse(storedUser) : null;
  });
  
  if (!user) router.push('/')
  
  function logout() {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
    router.push('/')
  }
</script>

<template>
  <nav v-if="user" class="navbar">
    <ul>
      <li v-if="user.role === 'admin'">Admin Dashboard</li>
      <li v-if="user.role === 'user'">User Dashboard</li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>


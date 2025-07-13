<script setup>
import "./nav.css"
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const user = ref("");

onMounted(() => {
  const storedUser = localStorage.getItem('user');
  user.value = storedUser ? JSON.parse(storedUser) : null;

  if (!user.value) {
    router.push('/');
  }
});

function logout() {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  user.value = null;
  router.push('/');
}
</script>

<template>
  <nav v-if="user.value" class="navbar">
    <ul>
      <li v-if="user.value.role === 'admin'">Admin Dashboard</li>
      <li v-if="user.value.role === 'user'">User Dashboard</li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

<script setup>
import "./nav.css"
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const route = useRoute();
const user = ref("");

onMounted(() => {
  if (route.path === '/') {
    user.value = null;
  } else {
    const storedUser = localStorage.getItem('user');
    user.value = storedUser ? JSON.parse(storedUser) : null;

    if (!user.value) {
      router.push('/');
    }
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
  <nav v-if="user" class="navbar">
    <ul>
      <li v-if="user.role === 'user'">User Dashboard</li>
      <li v-if="user.role === 'admin'">Admin Dashboard</li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

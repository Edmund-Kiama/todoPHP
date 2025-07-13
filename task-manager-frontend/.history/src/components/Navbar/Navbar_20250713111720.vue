<script setup>
import "./nav.css"
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter();
const route = useRoute();
const user = ref(null);

onMounted(() => {
  if (route.path === '/') {
    user.value = null;
  } else {
    const storedUser = localStorage.getItem('user');
    user.value = storedUser ? JSON.parse(storedUser) : null;
    console.log("a")

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
console.log(user.value)
</script>

<template>
  <nav v-if="user?.value" class="navbar">
    <ul>
      <li v-if="user.value?.role === 'user'">User Dashboard</li>
      <li v-if="user.value?.role === 'admin'">Admin Dashboard</li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

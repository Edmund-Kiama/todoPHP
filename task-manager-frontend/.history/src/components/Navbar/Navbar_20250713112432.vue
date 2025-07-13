<script setup>
import "./nav.css"
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { store } from "../../store";

const router = useRouter();
const route = useRoute();
const user = ref(null);
let storedUser = store.user

onMounted(() => {
  if (route.path === '/') {
    user.value = null;
    storedUser = {
      role: null,
      loggedIn: false,
      username: null
    }
  } else {
    const storedUser = localStorage.getItem('user');
    console.log('Stored user string:', storedUser);
    
    user.value = storedUser ? JSON.parse(storedUser) : null;
    console.log("Parsed user object:", user.value);

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
  <nav  class="navbar">
    <ul>
      <li>{{ store }}</li>
      <li v-if="storedUser.role === 'user'">User Dashboard</li>
      <li v-if="storedUser.role === 'admin'">Admin Dashboard</li>
      <li><button @click="logout">Logout</button></li>
    </ul>
  </nav>
</template>

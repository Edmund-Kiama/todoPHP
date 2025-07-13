<script setup>
import './signup.css';
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const name = ref('');
const email = ref('');
const password = ref('');
const verifyPassword = ref('');
const showPassword = ref(false);
const showVerified = ref(false);
const error = ref('');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const signup = async () => {
  error.value = '';

  if (name.value.trim().length < 3) {
    error.value = 'Name must be at least 3 characters.';
    return;
  }

  if (!isValidEmail(email.value)) {
    error.value = 'Invalid email format.';
    return;
  }

  if (password.value.length < 6 ||
      !/[a-z]/.test(password.value) ||
      !/[A-Z]/.test(password.value) ||
      !/[0-9]/.test(password.value) ||
      !/[!@#$%^&*]/.test(password.value)) {
    error.value = 'Password must be strong (uppercase, lowercase, number, special char, 6+ chars)';
    return;
  }

  if (password.value !== verifyPassword.value) {
    error.value = 'Passwords do not match.';
    return;
  }

  try {
    const res = await fetch('http://127.0.0.1:8000/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: name.value,
        email: email.value,
        password: password.value,
        role: 'user'
      })
    });

    if (!res.ok) {
      const data = await res.json();
      error.value = data.message || 'Registration failed';
      return;
    }

    alert('Registration successful! Please login.');
    router.push('/');
  } catch (err) {
    error.value = 'Server error. Try again later.';
  }
};
</script>


<template>
    <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
        <input v-model="name" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" :type="showPassword ? 'text' :'password'" placeholder="Password" required />
        <label class="show-toggle" v-if="password">
            <input type="checkbox" v-model="showPassword" />
            Show Password
        </label>
        <input v-show="password" v-model="verifyPassword" :type="showVerified ? 'text' :'password'" placeholder="Verify Password" required />
        <label class="show-toggle" v-if="verifyPassword">
            <input type="checkbox" v-model="showVerified" />
            Show Verified Password
        </label>
        <button>Register</button>
        <p v-if="error" class="error">{{ error }}</p>

        <p class="toggle">
        Already have an account?
        <router-link to="/" class="link">Login here</router-link>
        </p>
    </form>
    </div>
</template>

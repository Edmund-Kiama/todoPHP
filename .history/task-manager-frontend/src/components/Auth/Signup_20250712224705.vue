<script setup>
    import './login.css';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const error = ref('');

    const getStoredUsers = () => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
    };

    const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
    };

    const signup = () => {
    const users = getStoredUsers();
    const exists = users.find(u => u.email === email.value);

    if (exists) {
        error.value = 'Email already registered';
        return;
    }

    users.push({
        name: name.value,
        email: email.value,
        password: password.value,
        role: 'user'
    });

    saveUsers(users);
    alert('Signup successful!');
    router.push('/');
    };
</script>
<template>
    <div class="sign-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
        <input v-model="name" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button>Register</button>
        <p v-if="error" class="error">{{ error }}</p>

        <p class="toggle">
        Already have an account?
        <router-link to="/">Login here</router-link>
        </p>
    </form>
    </div>
</template>

<script setup>
    import './signup.css';
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';

    const router = useRouter();
    const name = ref('');
    const email = ref('');
    const password = ref('');
    const verifyPassword = ref('');
    const error = ref('');

    const getStoredUsers = () => {
    const saved = localStorage.getItem('users');
    return saved ? JSON.parse(saved) : [];
    };

    const saveUsers = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
    };

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const signup = () => {
        // Clear error
        error.value = '';

        // Field validations
        if (name.value.trim().length < 3) {
            error.value = 'Name must be at least 3 characters long.';
            return;
        }

        if (!isValidEmail(email.value)) {
            error.value = 'Please enter a valid email.';
            return;
        }

        if (password.value.length < 6) {
            error.value = 'Password must be at least 6 characters.';
            return;
        }

        if (password.value.length < 6) {
            error.value = 'Password must be at least 6 characters.';
            return;
            }

            if (!/[a-z]/.test(password.value)) {
            error.value = 'Password must include at least one lowercase letter.';
            return;
            }

            if (!/[A-Z]/.test(password.value)) {
            error.value = 'Password must include at least one uppercase letter.';
            return;
            }

        if (!/[0-9]/.test(password.value)) {
            error.value = 'Password must include at least one number.';
            return;
        }

        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password.value)) {
            error.value = 'Password must include at least one special character.';
            return;
            }

        if (password.value !== verifyPassword.value) {
            error.value = 'Passwords do not match.';
            return;
        }

        const users = getStoredUsers();
        const exists = users.find(u => u.email === email.value);
        if (exists) {
            error.value = 'Email already registered.';
            return;
        }

        users.push({
            name: name.value,
            email: email.value,
            password: password.value,
            role: 'user'
        });
    }
    saveUsers(users);
    alert('Signup successful!');
    router.push('/');
</script>

<template>
    <div class="signup-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
        <input v-model="name" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <input v-show="password" v-model="verifyPassword" type="password" placeholder="Verify Password" required />
        <button>Register</button>
        <p v-if="error" class="error">{{ error }}</p>

        <p class="toggle">
        Already have an account?
        <router-link to="/" class="link">Login here</router-link>
        </p>
    </form>
    </div>
</template>

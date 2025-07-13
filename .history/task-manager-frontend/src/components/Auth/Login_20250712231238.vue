<script setup>
    import './login.css'
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();
    const showPassword = ref(false)

    const isValidEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };
    
    const login = () => {
        // Clear error
        error.value = '';

        const users = [
        { email: 'admin@example.com', password: 'admin123', role: 'admin' },
        { email: 'user@example.com', password: 'user123', role: 'user' },
        ];

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
    
        const user = users.find(
            (u) => u.email === email.value && u.password === password.value
        );


        if (!user) error.value = "Invalid credentials"
        if (user?.role === 'admin') router.push('/admin');
        if (user?.role === 'user') router.push('/user');
    };
</script>

<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input v-model="email" placeholder="Email" required />
            <input :type="showPassword ? 'text' :'password'" v-model="password" placeholder="Password" required />
            <button>Login</button>
            <p v-if="error" class="error">{{ error }}</p>
            <p class="descr">{ email: 'user@example.com', password: 'user123', role: 'user' }</p>
            <p class="descr">{ email: 'admin@example.com', password: 'admin123', role: 'admin' }</p>
            <p class="toggle">
                Don't have an account?
                <router-link to="/signup" class="link">Signup here</router-link>
            </p>
        </form>
    </div>
</template>
  
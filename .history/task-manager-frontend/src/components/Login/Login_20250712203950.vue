<script setup>
    
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();
    
    const login = () => {
        const users = [
        { email: 'admin@example.com', password: 'admin123', role: 'admin' },
        { email: 'user@example.com', password: 'user123', role: 'user' },
        ];
    
        const user = users.find(
        (u) => u.email === email.value && u.password === password.value
        );
    
        if (user?.role === 'admin') router.push('/admin');
        if (user?.role === 'user') router.push('/user');
        
        if (user) {
            if (user?.role === 'admin') router.push('/admin');
        else router.push('/user');
        } else {
        error.value = 'Invalid credentials';
        }
    };
</script>

<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input v-model="email" placeholder="Email" required />
            <input type="password" v-model="password" placeholder="Password" required />
            <button>Login</button>
            <p v-if="error">{{ error }}</p>
        </form>
    </div>
</template>
  
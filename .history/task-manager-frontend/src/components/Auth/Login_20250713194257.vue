<script setup>
    import './login.css'
    import { ref } from 'vue';
    import { useRouter } from 'vue-router';
    import { store } from '../../store';
    
    const email = ref('');
    const password = ref('');
    const error = ref('');
    const router = useRouter();
    const showPassword = ref(false)
    
    const login = async () => {
    try {
        const res = await fetch('https://todophp-production.up.railway.app/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email: email.value, password: password.value })
        });

        if (!res.ok) {
            const err = await res.json();
            error.value = err.message || 'Login failed';
            return;
        }

        const data = await res.json();

        // Save token to localStorage (or Pinia/Vuex)
        localStorage.setItem('token', data.token);
        localStorage.setItem('user', JSON.stringify(data.user));

        // Redirect based on role
        if (data.user.role === 'admin') {
            store.user.role ='admin'
            store.user.loggedIn = true
            console.log(store.user)
            router.push('/admin');
        } else {
            store.user.role = 'user'
            store.user.loggedIn = true
            router.push('/user');
        }
    } catch (err) {
        error.value = 'Something went wrong';
    }
};
</script>

<template>
    <div class="login-container">
        <h2>Login</h2>
        <form @submit.prevent="login">
            <input v-model="email" placeholder="Email" required />
            <input :type="showPassword ? 'text' :'password'" v-model="password" placeholder="Password" required />
            <label class="show-toggle" v-if="password">
                <input type="checkbox" v-model="showPassword" />
                Show Password
            </label>
            <button>Login</button>
            <p v-if="error" class="error">{{ error }}</p>
            <p class="descr">{ email: 'ed@example.com', password: 'User123!', role: 'user' }</p>
            <p class="descr">{ email: 'kiama@example.com', password: 'admin123!', role: 'admin' }</p>
            <p class="toggle">
                Don't have an account?
                <router-link to="/signup" class="link">Signup here</router-link>
            </p>
        </form>
    </div>
</template>
  
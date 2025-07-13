<!-- src/views/Signup.vue -->
<template>
    <div class="login-container">
    <h2>Sign Up</h2>
    <form @submit.prevent="signup">
        <input v-model="name" placeholder="Username" required />
        <input v-model="email" type="email" placeholder="Email" required />
        <input v-model="password" type="password" placeholder="Password" required />
        <button>Register</button>
        <p v-if="error">{{ error }}</p>

        <p class="toggle">
        Already have an account?
        <router-link to="/">Login here</router-link>
        </p>
    </form>
    </div>
</template>

<template>
    <nav class="navbar">
        <ul>
            <li v-if="role === 'admin'"><a href="/admin">Admin Dashboard</a></li>
            <li v-if="role === 'user'"><a href="/user">User Dashboard</a></li>
            <li><button @click="logout">Logout</button></li>
        </ul>
    </nav>
</template>

<script>
    export default {
    props: {
        role: {
        type: String,
        required: true, // 'admin' or 'user'
        }
    },
    methods: {
        logout() {
        // example logout logic
        localStorage.removeItem('token')
        this.$router.push('/login')
        }
    }
}
</script>

  
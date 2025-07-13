import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Auth/Login.vue';
import AdminDashboard from '../components/Admin/AdminDashboard.vue';
import UserDashboard from '../components/User/UserDashboard.vue';
import Signup from '../components/Auth/Signup.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
  { path: '/signup', name: 'Signup', component: Signup },
  { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },
  { path: '/user', name: 'UserDashboard', component: UserDashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

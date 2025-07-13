import { createRouter, createWebHistory } from 'vue-router';
import Login from '../components/Login/Login.vue';
import AdminDash from '../components/Admin/Admin.vue';
// import AdminDashboard from '../views/AdminDashboard.vue';
// import UserDashboard from '../views/UserDashboard.vue';

const routes = [
  { path: '/', name: 'Login', component: Login },
//   { path: '/admin', name: 'AdminDashboard', component: AdminDashboard },
//   { path: '/user', name: 'UserDashboard', component: UserDashboard }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;

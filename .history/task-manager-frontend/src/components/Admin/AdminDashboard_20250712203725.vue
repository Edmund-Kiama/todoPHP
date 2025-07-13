<template>
    <div class="admin-dashboard">
      <h2>Admin Dashboard</h2>
  
      <!-- Users Section -->
      <section class="section">
        <h3>Users</h3>
        <button @click="openUserForm()">Add User</button>
  
        <table>
          <tr>
            <th>Name</th><th>Email</th><th>Actions</th>
          </tr>
          <tr v-for="(user, index) in users" :key="index">
            <td>{{ user.name }}</td>
            <td>{{ user.email }}</td>
            <td>
              <button @click="openUserForm(user, index)">Edit</button>
              <button @click="deleteUser(index)">Delete</button>
            </td>
          </tr>
        </table>
      </section>
  
      <!-- Task Assignment -->
      <section class="section">
        <h3>Assign Task</h3>
        <form @submit.prevent="assignTask">
          <input v-model="taskForm.title" placeholder="Task title" required />
          <select v-model="taskForm.user" required>
            <option disabled value="">Assign to...</option>
            <option v-for="user in users" :key="user.email" :value="user.email">{{ user.name }}</option>
          </select>
          <input type="date" v-model="taskForm.deadline" required />
          <button type="submit">Assign</button>
        </form>
      </section>
  
      <!-- Task List -->
      <section class="section">
        <h3>All Tasks</h3>
        <table>
          <tr>
            <th>Title</th><th>User</th><th>Deadline</th><th>Status</th>
          </tr>
          <tr v-for="(task, index) in tasks" :key="index">
            <td>{{ task.title }}</td>
            <td>{{ task.user }}</td>
            <td>{{ task.deadline }}</td>
            <td>{{ task.status }}</td>
          </tr>
        </table>
      </section>
  
      <!--  Add/Edit User -->
      <div v-if="showUserModal" class="modal">
        <div class="modal-content">
          <h3>{{ editingIndex !== null ? 'Edit' : 'Add' }} User</h3>
          <form @submit.prevent="saveUser">
            <input v-model="userForm.name" placeholder="Name" required />
            <input v-model="userForm.email" placeholder="Email" required />
            <button type="submit">Save</button>
            <button type="button" @click="closeUserForm">Cancel</button>
          </form>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const users = ref([
    { name: 'Alice', email: 'alice@example.com' },
    { name: 'Bob', email: 'bob@example.com' }
  ]);
  
  const tasks = ref([]);
  
  const taskForm = ref({
    title: '',
    user: '',
    deadline: '',
    status: 'Pending'
  });
  
  const userForm = ref({
    name: '',
    email: ''
  });
  const editingIndex = ref(null);
  const showUserModal = ref(false);
  
  function assignTask() {
    tasks.value.push({ ...taskForm.value });
    taskForm.value.title = '';
    taskForm.value.user = '';
    taskForm.value.deadline = '';
  }
  
  function deleteUser(index) {
    users.value.splice(index, 1);
  }
  
  function openUserForm(user = null, index = null) {
    if (user) {
      userForm.value = { ...user };
      editingIndex.value = index;
    } else {
      userForm.value = { name: '', email: '' };
      editingIndex.value = null;
    }
    showUserModal.value = true;
  }
  
  function saveUser() {
    if (editingIndex.value !== null) {
      users.value[editingIndex.value] = { ...userForm.value };
    } else {
      users.value.push({ ...userForm.value });
    }
    closeUserForm();
  }
  
  function closeUserForm() {
    userForm.value = { name: '', email: '' };
    editingIndex.value = null;
    showUserModal.value = false;
  }
  </script>
  
  <style scoped>
  .admin-dashboard {
    max-width: 900px;
    margin: 2rem auto;
    font-family: Arial, sans-serif;
  }
  
  .section {
    margin-top: 2rem;
  }
  
  button {
    margin: 0.3rem;
    padding: 0.5rem 1rem;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }
  
  table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 1rem;
  }
  
  th, td {
    border: 1px solid #ccc;
    padding: 0.6rem;
    text-align: left;
  }
  
  input, select {
    padding: 0.5rem;
    margin: 0.5rem 0.5rem 0.5rem 0;
  }
  
  .modal {
    position: fixed;
    top: 0; left: 0;
    width: 100vw; height: 100vh;
    background: rgba(0,0,0,0.4);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .modal-content {
    background: white;
    padding: 2rem;
    border-radius: 8px;
    width: 300px;
  }
  </style>
  
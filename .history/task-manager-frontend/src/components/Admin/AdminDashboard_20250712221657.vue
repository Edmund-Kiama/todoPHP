<script setup>
  import './admin.css'
  import { store } from '../../store';
  import { ref } from 'vue';

  const admin = store.user

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
<template>
  <div class="admin-dashboard">
    <h3>Welcome {{ admin.username }},</h3>
      <!-- Summary Cards -->
  <div class="cards" v-if="users">
    <div class="card">
      <h4>Total Users</h4>
      <p>{{ users.length }}</p>
    </div>
    <div class="card">
      <h4>Total Tasks</h4>
      <p>{{ allTasks.length }}</p>
    </div>
    <div class="card">
      <h4>Pending</h4>
      <p>{{ countStatus('Pending') }}</p>
    </div>
    <div class="card">
      <h4>Completed</h4>
      <p>{{ countStatus('Completed') }}</p>
    </div>
  </div>
    <!-- Users Section -->
    <section class="section">
      <h3>Users</h3>
      <button @click="openUserForm()">Add User</button>

      <table>
        <tr>
          <th>Name</th><th>Email</th>
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
      <form @submit.prevent="assignTask" class="assign">
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

    <!-- Add/Edit User -->
    <div v-if="showUserModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingIndex !== null ? 'Edit' : 'Add' }} User</h3>
        <form @submit.prevent="saveUser">
          <div class="inputs">
            <input v-model="userForm.name" placeholder="Name" required />
            <input v-model="userForm.email" placeholder="Email" required />
          </div>
          <div>
            <button type="submit">Save</button>
            <button type="button" @click="closeUserForm">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  

  
 
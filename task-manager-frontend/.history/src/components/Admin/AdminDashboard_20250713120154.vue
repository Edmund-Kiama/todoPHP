<script setup>
  import './admin.css'
  import { onMounted, ref } from 'vue';

  //user
  const admin = JSON.parse(localStorage.getItem('user'));
  console.log(admin)

  if (!admin) window.location.href = "/"

  const users = ref([ ]);
  onMounted(async () => {
  try {
    const token = localStorage.getItem('token');

    const response = await fetch('http://127.0.0.1:8000/api/users', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error('Failed to fetch users');
    }

    const data = await response.json();
    users.value = data;
  } catch (err) {
    console.error('Error loading users:', err);
  }
});

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

  async function saveUser() {
  try {
    const response = await fetch('http://127.0.0.1:8000/api/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + localStorage.getItem('token')
      },
      body: JSON.stringify({
        name: userForm.value.name,
        email: userForm.value.email,
        password: 'Default123!' 
      })
    });

    if (!response.ok) {
      const error = await response.json();
      console.error(error);
      return;
    }

    const data = await response.json();
    users.value.push(data.user);
    closeUserForm();
  } catch (err) {
    console.error('Error adding user:', err);
  }
}

  function closeUserForm() {
    userForm.value = { name: '', email: '' };
    editingIndex.value = null;
    showUserModal.value = false;
  }

  function countStatus(status) {
    return tasks.value.filter(task => task.status === status).length;
  }
</script>
<template>
  <div class="admin-dashboard">
    <h3>Welcome {{ admin.name }},</h3>
      <!-- Summary Cards -->
  <div class="cards" v-if="users">
    <div class="card">
      <h4>Total Users</h4>
      <p>{{ users.length }}</p>
    </div>
    <div class="card">
      <h4>Total Tasks</h4>
      <p>{{ tasks.length }}</p>
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
        <thead>
          <tr>
            <th>Name</th><th>Email</th><th>Role</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.name }}</td><td>{{ user.email }}</td><td>{{ user.role }}</td>
            <td>
              <button @click="openUserForm(user, index)">Edit</button>
              <button @click="deleteUser(index)">Delete</button>
            </td>
          </tr>
        </tbody>
        <p v-if="users.length === 0">No users found.</p>
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
        <thead>
          <tr>
          <th>Title</th><th>User</th><th>Deadline</th><th>Status</th>
        </tr>
        </thead>
       <tbody>
        <tr v-for="(task, index) in tasks" :key="index">
          <td>{{ task.title }}</td>
          <td>{{ task.user }}</td>
          <td>{{ task.deadline }}</td>
          <td>{{ task.status }}</td>
        </tr>
       </tbody>
      </table>
      <div v-if="tasks.length === 0" class="no-tasks">
        No tasks
      </div>
    </section>

    <!-- Add/Edit User -->
    <div v-if="showUserModal" class="modal">
      <div class="modal-content">
        <h3>{{ editingIndex !== null ? 'Edit' : 'Add' }} User</h3>
        <form @submit.prevent="saveUser">
          <div class="inputs">
            <input v-model="userForm.name" placeholder="Name" required />
            <input v-model="userForm.email" placeholder="Email" required />
            <input v-if="editingIndex !== null " placeholder="password: Default123!" readonly />
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
  

  
 
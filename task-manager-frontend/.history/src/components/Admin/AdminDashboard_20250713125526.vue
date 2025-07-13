<script setup>
  import { store } from '../../store';
import './admin.css'
  import { onMounted, ref } from 'vue';

  // console.log(store.user)

  //user
  const admin = JSON.parse(localStorage.getItem('user'));
  if (!admin) window.location.href = "/"

  const users = ref([ ]);
  onMounted(async () => {
    try {
      const token = localStorage.getItem('token');

      // Fetch users
      const userRes = await fetch('http://127.0.0.1:8000/api/users', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!userRes.ok) throw new Error('Failed to fetch users');
      users.value = await userRes.json();

      // Fetch tasks
      const taskRes = await fetch('http://127.0.0.1:8000/api/tasks', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Accept': 'application/json'
        }
      });

      if (!taskRes.ok) throw new Error('Failed to fetch tasks');
      const taskData = await taskRes.json();
      tasks.value = taskData;

    } catch (err) {
      console.error('Error loading data:', err);
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
    email: '',
    role: ''
  });
  const editingIndex = ref(null);
  const showUserModal = ref(false);

  //assign task
  async function assignTask() {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify(taskForm.value)
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return;
      }

      const data = await response.json();
      console.log(data)
      tasks.value.push(data.task);

      // Reset form
      taskForm.value = {
        title: '',
        user: '',
        deadline: '',
        status: 'Pending'
      };
    } catch (err) {
      console.error('Error assigning task:', err);
    }
  }

  //delete task
  async function deleteTask(index) {
    const task = tasks.value[index];

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/tasks/${task.id}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('Error:', error);
        return;
      }

      tasks.value.splice(index, 1); // remove from UI
    } catch (err) {
      console.error('Error deleting task:', err);
    }
  }


  //delete user
  async function deleteUser(index) {
    const userId = users.value[index].id;

    try {
      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        }
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }

      users.value.splice(index, 1); // Remove from local list
    } catch (err) {
      console.error('Error deleting user:', err);
    }
  }

  // add user 
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
          role: userForm.value.role,
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
      editingIndex.value = null;

      closeUserForm();
    } catch (err) {
      console.error('Error adding user:', err);
    }
  }

  //edit user
  async function updateUser() {
    try {
      const userId = users.value[editingIndex.value].id;

      const response = await fetch(`http://127.0.0.1:8000/api/users/${userId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({
          name: userForm.value.name,
          email: userForm.value.email,
          role: userForm.value.role
        })
      });

      if (!response.ok) {
        const error = await response.json();
        console.error(error);
        return;
      }

      const data = await response.json();
      users.value[editingIndex.value] = data.user;
      editingIndex.value = null;

      closeUserForm();
    } catch (err) {
      console.error('Error updating user:', err);
    }
  }

  //open form
  function openUserForm(user = null, index = null) {
    if (user) {
      userForm.value = { ...user };
      editingIndex.value = index;
    } else {
      userForm.value = { name: '', email: '', role: '' };
      editingIndex.value = null;
    }
    showUserModal.value = true;
  }

  //close form
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
          <tr v-for="(user, index) in users" :key="user.id">
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
          <td>{{ task.user.name }}</td>
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
        <h3>{{ editingIndex === null ? 'Add' : 'Edit' }} User</h3>
        <form @submit.prevent="editingIndex !== null ? updateUser() : saveUser()">
          <div class="inputs">
            <input v-model="userForm.name" placeholder="Name" required />
            <input v-model="userForm.email" placeholder="Email" required />
            <input v-if="editingIndex === null " placeholder="password: Default123!" readonly />
            <input v-model="userForm.role" placeholder="Role"  />
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
  

  
 
<script setup>
  import './user.css'
  import { ref, computed } from 'vue';
  import { store } from '../../store';
  
const allTasks = ref([]);
const user = JSON.parse(localStorage.getItem('user'));

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch('http://127.0.0.1:8000/api/tasks', {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    const data = await res.json();
    allTasks.value = data.filter(task => task.user_id === user.id);
  } catch (err) {
    console.error('Failed to load tasks:', err);
  }
});
  
  const userTasks = computed(() =>
    allTasks.value.filter(task => task.user === user.email)
  );
  const activeTasks = computed(() => userTasks.value.filter(t => t.status !== 'Completed'))
  const completedTasks = computed(() => userTasks.value.filter(t => t.status === 'Completed'))
  
  function nextStatus(status) {
    if (status === 'Pending') return 'In Progress';
    if (status === 'In Progress') return 'Completed';
    return '';
  }
  
  function advanceStatus(index) {
    const task = userTasks.value[index];
    if (task.status === 'Pending') {
      task.status = 'In Progress';
    } else if (task.status === 'In Progress') {
      task.status = 'Completed';
    }
  }
  function statusClass(status) {
    return {
      'status-completed': status === 'Completed',
      'status-inprogress': status === 'In Progress',
      'status-pending': status === 'Pending',
    }
  }
</script>
<template>
    <div class="user-dashboard">
  <section>
    <h3>Welcome {{ user.name }},</h3>

    <!-- Active Tasks Table -->
    <table >
      <thead>
        <tr>
          <th>Task</th><th>Deadline</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in activeTasks" :key="index">
          <td>{{ task.title }}</td>
          <td>{{ task.deadline }}</td>
          <td><div :class="statusClass(task.status)">{{ task.status }}</div></td>
          <td>
            <button @click="advanceStatus(index)">
              Mark {{ nextStatus(task.status) }}
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <div v-if="activeTasks !== 0" class="no-tasks">
      <p>No active tasks.</p>
    </div>

    <!-- Completed Tasks Table -->
    <h4 v-if="completedTasks.length" style="margin-top: 2rem;">Completed Tasks</h4>
    <table v-if="completedTasks.length">
      <thead>
        <tr>
          <th>Task</th><th>Deadline</th><th>Status</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in completedTasks" :key="index">
          <td>{{ task.title }}</td>
          <td>{{ task.deadline }}</td>
          <td><div :class="statusClass(task.status)">{{ task.status }}</div></td>
        </tr>
      </tbody>
    </table>
  </section>
</div>

</template>

  
<script setup>
  import './user.css'
  import { ref, computed } from 'vue';
  import { store } from '../../store';
  
  // Mocked logged-in user
  const currentUser = 'user@example.com';
  const user = store.user
  
  // Mocked task list — in a real app, fetch from backend
  const allTasks = ref([
    { title: 'Fix bug #123', user: 'user@example.com', deadline: '2025-07-15', status: 'Pending' },
    { title: 'Prepare report', user: 'user@example.com', deadline: '2025-07-16', status: 'In Progress' },
    { title: 'Update Docs', user: 'bob@example.com', deadline: '2025-07-17', status: 'Pending' }
  ]);
  
  const userTasks = computed(() =>
    allTasks.value.filter(task => task.user === currentUser)
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
    <h3>Welcome {{ user.username }},</h3>

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
              Mark as {{ nextStatus(task.status) }}
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

  
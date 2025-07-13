<script setup>
  import './user.css'
  import { ref, computed, onMounted } from 'vue';
  import { store } from '../../store';
  
const userTasks = ref([]);
const user = JSON.parse(localStorage.getItem('user'));

onMounted(async () => {
  try {
    const token = localStorage.getItem('token');
    const res = await fetch(`http://todophp-production.up.railway.app/api/user-tasks/${user.id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: 'application/json'
      }
    });
    const data = await res.json();
    userTasks.value = data;
  } catch (err) {
    console.error('Failed to load user tasks:', err);
  }
});
  
  // const userTasks = computed(() =>
  //   allTasks.value.filter(task => task.user === user.email)
  // );
  const activeTasks = computed(() => userTasks.value.filter(t => t.status !== 'Completed'))
  const completedTasks = computed(() => userTasks.value.filter(t => t.status === 'Completed'))
  
  function nextStatus(status) {
    if (status === 'Pending') return 'In Progress';
    if (status === 'In Progress') return 'Completed';
    return '';
  }
  
  async function advanceStatus(index) {
    const task = activeTasks.value[index];
    const next = nextStatus(task.status);
    if (!next) return;

    try {
      const response = await fetch(`https://todophp-production.up.railway.app/api/tasks/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        body: JSON.stringify({ ...task, status: next })
      });

      if (!response.ok) throw new Error('Failed to update task');

      task.status = next; // update UI
    } catch (err) {
      console.error('Error updating status:', err);
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

    <div v-if="activeTasks.length === 0" class="no-tasks">
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

  
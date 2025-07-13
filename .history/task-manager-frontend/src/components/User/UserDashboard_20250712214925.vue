<!-- src/views/UserDashboard.vue -->
<template>
    <div class="user-dashboard">
      <h2>User Dashboard</h2>
      <p>Logged in as: <strong>{{ currentUser }}</strong></p>
  
      <section>
        <h3>Your Tasks</h3>
        <table v-if="userTasks.length">
          <thead>
            <tr>
              <th>Title</th><th>Deadline</th><th>Status</th><th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(task, index) in userTasks" :key="index">
              <td>{{ task.title }}</td>
              <td>{{ task.deadline }}</td>
              <td>{{ task.status }}</td>
              <td>
                <button 
                  v-if="task.status !== 'Completed'" 
                  @click="advanceStatus(index)"
                >
                  Mark as {{ nextStatus(task.status) }}
                </button>
              </td>
            </tr>
          </tbody>
        </table>
  
        <p v-else>No tasks assigned to you.</p>
      </section>
    </div>
</template>

  
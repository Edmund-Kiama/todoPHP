import { reactive } from 'vue'

export const store = reactive({
  user: {
    role: "admin",
    loggedIn: true,
    username: null
  },
})

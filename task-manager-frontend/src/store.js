import { reactive } from 'vue'

export const store = reactive({
  user: {
    role: null,
    loggedIn: false,
    username: null
  },
})

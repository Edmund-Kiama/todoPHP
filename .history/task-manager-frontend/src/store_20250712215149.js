import { reactive } from 'vue'

export const store = reactive({
  user: {
    role: "user",
    loggedIn: true,
    username: "Nick"
  },
})

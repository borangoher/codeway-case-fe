import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { firebaseConfig } from './env'

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)

auth.onIdTokenChanged(async (user) => {
  if (user) {
    const token = await user.getIdToken()
    sessionStorage.setItem('authToken', token)
  } else {
    sessionStorage.removeItem('authToken')
  }
})

// init firebase before rendering app
let app: any
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount('#app')
  }
})

export { auth }

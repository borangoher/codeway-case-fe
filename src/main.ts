import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyClwQPDNdY7i93Fz32SQatEkZlMTMfmOww',
  authDomain: 'codeway-case-be.firebaseapp.com',
  databaseURL: 'https://codeway-case-be-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'codeway-case-be',
  storageBucket: 'codeway-case-be.firebasestorage.app',
  messagingSenderId: '554726911595',
  appId: '1:554726911595:web:8c3588811956cf24bc4b2e',
}

const firebase = initializeApp(firebaseConfig)
const auth = getAuth(firebase)

// init firebase before rendering app
let app: any
auth.onAuthStateChanged(() => {
  if (!app) {
    app = createApp(App).use(router).mount('#app')
  }
})

export { auth }

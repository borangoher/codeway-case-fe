<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'
import { useRouter } from 'vue-router'
import { auth } from '../main'
import { signInWithEmailAndPassword } from 'firebase/auth'

const router = useRouter()

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')

const isEmailValid: Ref<boolean> = ref(true)
const isPasswordValid: Ref<boolean> = ref(true)

function validateEmail(email: string): boolean {
  return !!email
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    )
}

async function signin(): Promise<void> {
  isEmailValid.value = validateEmail(email.value)
  isPasswordValid.value = password.value.length > 7

  if (isEmailValid.value && isPasswordValid.value) {
    signInWithEmailAndPassword(auth, email.value, password.value)
      .then(async (userCredential) => {
        const token = await userCredential.user.getIdToken()
        await sessionStorage.setItem('authToken', token)
        router.push('/')
      })
      .catch((error) => {
        console.error(error)
      })
  }
}
</script>

<template>
  <div class="form">
    <img src="../assets/icon.png" alt="Codeway Icon" />
    <p class="signin-text">Please Sign In</p>
    <input
      class="signin-input"
      type="email"
      name="email"
      id="email"
      placeholder="E-mail address"
      v-model="email"
    />
    <input
      class="signin-input"
      type="password"
      name="password"
      id="password"
      placeholder="Password"
      v-model="password"
    />

    <p class="error-text" v-if="!isEmailValid">Please enter a valid email.</p>
    <p class="error-text" v-if="!isPasswordValid">Password must be at least 8 characters.</p>
    <button @click="signin" class="signin-button">Sign In</button>
  </div>
</template>

<style>
img {
  width: 15rem;
  margin-bottom: 1rem;
}

.form {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
  padding: 1rem;
  height: 100%;
}

.signin-text {
  font-size: 2rem;
}

.signin-input {
  width: 20rem;
}

.signin-button {
  width: 20rem;
  background-color: darkblue;
  color: white;
  &:hover {
    background-color: blue;
  }
}

.error-text {
  color: red;
  font-size: 1.2rem;
}
</style>

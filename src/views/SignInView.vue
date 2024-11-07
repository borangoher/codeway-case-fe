<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

const email: Ref<string> = ref('')
const password: Ref<string> = ref('')

function signin(): void {
  console.log(email.value)
  console.log(password.value)
}
</script>

<template>
  <div class="form">
    <img src="../assets/icon.png" alt="Codeway Icon" />
    <p class="signin-text">Please Sign In</p>
    <input
      class="signin-input"
      type="text"
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
</style>

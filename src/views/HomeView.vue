<script setup lang="ts">
import PropertyConfig from '../components/PropertyConfig.vue'
import type { parameter } from '../components/PropertyConfig.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { RouterLink } from 'vue-router'

const parameters: Ref<[parameter]> = ref([
  {
    id: 1,
    key: 'test',
    value: 'test-val',
    desc: 'A test parameter',
    createdDate: new Date(0),
  },
  {
    id: 2,
    key: 'test second',
    value: 'test-val',
    desc: 'A test parameter',
    createdDate: new Date(0),
  },
  {
    id: 3,
    key: 'test third',
    value: 'test-val',
    desc: 'A test parameter',
    createdDate: new Date(0),
  },
])

function deleteParam(id: number): void {
  parameters.value = parameters.value.filter((param: parameter) => {
    return param.id !== id
  })
  console.log(parameters.value)
}

function editParam(newParam: parameter): void {
  parameters.value = parameters.value.map((oldParam: parameter) => {
    return oldParam.id === newParam.id ? newParam : oldParam
  })
}
</script>

<template>
  <main>
    <div class="header">
      <img src="../assets/icon.png" alt="Codeway Logo" />
      <button class="logout-button">
        <router-link to="/signin"> Log Out </router-link>
      </button>
    </div>
    <div class="container">
      <div class="title-row">
        <p>Parameter Key</p>
        <p>Value</p>
        <p>Description</p>
        <p>Created Date</p>
      </div>
      <template v-for="parameter in parameters" :key="parameter.id">
        <PropertyConfig :param="parameter" @delete="deleteParam" @edit="editParam" />
      </template>
    </div>
  </main>
</template>

<style scoped>
.title-row {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  font-size: 1.5rem;
  margin-top: 0.5rem;
  margin-bottom: 0.5rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  border-bottom: 4px solid darkblue;
}

.logout-button {
  background-color: darkblue;
  color: white;
  &:hover {
    background-color: blue;
  }
  width: 10rem;
}

img {
  width: 5rem;
}
</style>

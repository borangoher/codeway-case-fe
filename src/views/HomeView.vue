<script setup lang="ts">
import PropertyConfig from '../components/PropertyConfig.vue'
import type { parameter } from '../components/PropertyConfig.vue'
import { ref } from 'vue'
import type { Ref } from 'vue'
import { auth } from '../main.ts'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'

const router = useRouter()

// TODO: get from backend
const parameters: Ref<[parameter]> = ref([
  {
    id: crypto.randomUUID(),
    key: 'test',
    value: 'test-val',
    desc: 'A test parameter',
    createdDate: new Date(0),
  },
  {
    id: crypto.randomUUID(),
    key: 'test second',
    value: 'test-val',
    desc: 'A test parameter',
    createdDate: new Date(0),
  },
  {
    id: crypto.randomUUID(),
    key: 'test third',
    value: 'test-val',
    desc: 'A test parameter',
    createdDate: new Date(0),
  },
])

const newKey: Ref<string> = ref('')
const newValue: Ref<string> = ref('')
const newDesc: Ref<string> = ref('')
const isAddFormValid: Ref<boolean> = ref(true)

// TODO: connect following methods to the backend
function deleteParam(id: string): void {
  parameters.value = parameters.value.filter((param: parameter) => {
    return param.id !== id
  })
}

function editParam(newParam: parameter): void {
  parameters.value = parameters.value.map((oldParam: parameter) => {
    return oldParam.id === newParam.id ? newParam : oldParam
  })
}

function addParam(): void {
  if (!newKey.value || !newValue.value || !newDesc.value) {
    isAddFormValid.value = false
    return
  }
  isAddFormValid.value = true

  parameters.value.push({
    id: crypto.randomUUID(),
    key: newKey.value,
    value: newValue.value,
    desc: newDesc.value,
    createdDate: new Date(0),
  })

  newKey.value = ''
  newValue.value = ''
  newDesc.value = ''
}

async function signout(): void {
  signOut(auth)
    .then(() => {
      sessionStorage.removeItem('authToken')
      router.push('/signin')
    })
    .catch((error) => {
      console.error(error)
    })
}
</script>

<template>
  <main>
    <div class="header">
      <img src="../assets/icon.png" alt="Codeway Logo" />
      <button @click="signout" class="blue-button">Log Out</button>
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
      <div class="add-row">
        <input placeholder="Key" type="text" name="new-key" id="new-key" v-model="newKey" />
        <input placeholder="Value" type="text" name="new-value" id="new-value" v-model="newValue" />
        <input
          placeholder="Description"
          type="text"
          name="new-desc"
          id="new-desc"
          v-model="newDesc"
        />
        <button class="blue-button" @click="addParam">Add</button>
      </div>
      <p class="error-text" v-if="!isAddFormValid">Please fill all fields.</p>
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

.add-row {
  display: grid;
  grid-template-columns: 1fr 1fr 3fr 1fr;
  font-size: 1.5rem;
}

input {
  width: 75%;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 10vh;
  border-bottom: 4px solid darkblue;
}

.blue-button {
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

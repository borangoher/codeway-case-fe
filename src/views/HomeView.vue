<script setup lang="ts">
import PropertyConfig from '../components/PropertyConfig.vue'
import type { parameter } from '../components/PropertyConfig.vue'
import { ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import { auth } from '../main'
import { signOut } from 'firebase/auth'
import { useRouter } from 'vue-router'
import { apiUrl } from '../env'

const router = useRouter()

const parameters: Ref<parameter[]> = ref([])

const newKey: Ref<string> = ref('')
const newValue: Ref<string> = ref('')
const newDesc: Ref<string> = ref('')
const isAddFormValid: Ref<boolean> = ref(true)

async function deleteParam(id: string): Promise<void> {
  const token = await sessionStorage.getItem('authToken')
  const response = await fetch(`${apiUrl}/parameters`, {
    method: 'DELETE',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ id: id }),
  })

  if (response.ok) {
    const data = await response.json()
    parameters.value = data.params
  }
}

async function editParam(newParam: parameter): Promise<void> {
  const token = await sessionStorage.getItem('authToken')
  const response = await fetch(`${apiUrl}/parameters`, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newParam),
  })

  if (response.ok) {
    const data = await response.json()
    parameters.value = data.params
  }
}

async function getParams(): Promise<void> {
  const token = await sessionStorage.getItem('authToken')
  const response = await fetch(`${apiUrl}/parameters`, {
    method: 'GET',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  })

  if (response.ok) {
    const data = await response.json()
    parameters.value = data.params
  }
}

async function addParam(): Promise<void> {
  if (!newKey.value || !newValue.value || !newDesc.value) {
    isAddFormValid.value = false
    return
  }
  isAddFormValid.value = true

  const newParam: parameter = {
    id: crypto.randomUUID(),
    key: newKey.value,
    value: newValue.value,
    desc: newDesc.value,
    createdDate: Date.now(),
  }

  newKey.value = ''
  newValue.value = ''
  newDesc.value = ''

  const token = sessionStorage.getItem('authToken')
  const response = await fetch(`${apiUrl}/parameters`, {
    method: 'PUT',
    headers: {
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newParam),
  })

  if (response.ok) {
    const data = await response.json()
    parameters.value = data.params
  }
}

async function signout(): Promise<void> {
  signOut(auth)
    .then(() => {
      sessionStorage.removeItem('authToken')
      router.push('/signin')
    })
    .catch((error) => {
      console.error(error)
    })
}

onMounted(getParams)
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

@media (max-width: 900px) {
  .title-row {
    display: none;
  }

  .add-row {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 2px dashed darkblue;
    align-items: flex-start;
    padding: 1rem;
    margin: 1rem;

    input {
      width: 100%;
    }
  }

  .container {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
    gap: 16px;
  }
}
</style>

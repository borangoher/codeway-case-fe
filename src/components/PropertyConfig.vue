<script setup lang="ts">
import { ref } from 'vue'
import type { Ref } from 'vue'

export type parameter = {
  id: string
  key: string
  value: string
  desc: string
  createdDate: number
}

const props = defineProps<{
  param: parameter
}>()
const emit = defineEmits<{
  (e: 'edit', param: parameter): void
  (e: 'delete', id: string): void
}>()

const isEditing: Ref<boolean> = ref(false)
const paramState: Ref<parameter> = ref({ ...props.param })

function toggleEdit(): void {
  isEditing.value = true
}

function cancelEdit(): void {
  paramState.value = props.param
  console.log(paramState.value)
  isEditing.value = false
}
function saveChanges(): void {
  emit('edit', paramState.value)
  isEditing.value = false
}

function deleteParam(): void {
  emit('delete', paramState.value.id)
}
</script>

<template>
  <div class="param-line">
    <template v-if="isEditing">
      <input
        class="param-input"
        type="text"
        name="paramKey"
        id="paramKey"
        v-model="paramState.key"
      />
      <input
        class="param-input"
        type="text"
        name="paramValue"
        id="paramValue"
        v-model="paramState.value"
      />
      <input
        class="param-input"
        type="text"
        name="paramDesc"
        id="paramDesc"
        v-model="paramState.desc"
      />
    </template>
    <template v-else>
      <p>{{ paramState.key }}</p>
      <p>{{ paramState.value }}</p>
      <p>{{ paramState.desc }}</p>
    </template>

    <p>{{ new Date(paramState.createdDate).toLocaleString() }}</p>

    <div class="button-container">
      <template v-if="isEditing">
        <button class="blue-button" @click="saveChanges">Save</button>
        <button class="red-button" @click="cancelEdit">Cancel</button>
      </template>
      <template v-else>
        <button class="blue-button" @click="toggleEdit">Edit</button>
        <button class="red-button" @click="deleteParam">Delete</button>
      </template>
    </div>
  </div>
</template>

<style scoped>
.param-line {
  min-height: 5rem;
  font-size: 1.5rem;
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  align-items: center;
}

.button-container {
  display: flex;
  gap: 1rem;
}

.blue-button {
  background-color: darkblue;
  color: white;

  &:hover {
    background-color: blue;
  }
}

.red-button {
  background-color: darkred;
  color: white;

  &:hover {
    background-color: red;
  }
}

.param-input {
  width: 75%;
}

@media (max-width: 900px) {
  .param-line {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    border: 2px dashed darkblue;
    align-items: flex-start;
    padding: 1rem;
    margin: 1rem;
  }
}
</style>

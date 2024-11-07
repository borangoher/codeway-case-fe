<script setup lang="ts">
defineProps<{
  id: number
  paramKey: string
  paramValue: string
  paramDesc: string
  createdDate: Date
}>()
</script>

<template>
  <div class="param-line">
    <p>{{ paramKey }}</p>
    <p>{{ paramValue }}</p>
    <p>{{ paramDesc }}</p>
    <p>{{ createdDate.toString() }}</p>
    <div class="button-container">
      <button>Edit</button>
      <button>Delete</button>
    </div>
  </div>
</template>

<style scoped>
.param-line {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
}

.button-container {
  display: flex;
  gap: 1rem;
}

</style>

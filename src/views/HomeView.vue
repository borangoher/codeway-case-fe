<script setup lang="ts">
import PropertyConfig from '../components/PropertyConfig.vue'
</script>

<template>
  <main>
    <div class="container">
      <div class="title-row">
        <p>Parameter Key</p>
        <p>Value</p>
        <p>Description</p>
        <p>Created Date</p>
      </div>
      <PropertyConfig
        :id="1"
        paramKey="test"
        paramValue="test-val"
        paramDesc="A test parameter"
        :createdDate="new Date(0)"
      />
    </div>
  </main>
</template>

<style scoped>
.title-row {
  display: grid;
  grid-template-columns: 1fr 1fr 2fr 1fr 1fr;
  border-bottom: 1px solid red;
}
</style>

<template>
  <div class="program-list">
    <ProgramCard
      v-for="program in programs"
      :key="program.id"
      :program="program"
      :isMain="isMain"
      @deleteProgram="$emit('deleteProgram', program.id)"
      @editProgram="$emit('editProgram', $event)"
      @animateList="$emit('animateList')"
    />
  </div>
</template>

<script setup>
import { defineProps, defineEmits } from 'vue'
import ProgramCard from './ProgramItem.vue'

defineProps({ programs: Array, isMain: Boolean })
defineEmits(['deleteProgram', 'editProgram', 'animateList'])
</script>

<style scoped>
.program-list {
  padding-top: 40px;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  gap: 10px;
}
@media (min-width: 1480px) {
  .program-list {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 10px;
  }
}
</style>

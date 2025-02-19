
<template>
  <div class="filters">
    <input v-model="nameFilter" placeholder="Поиск по названию" class="filter-input" />
    
    <select v-model="selectedAttribute" class="filter-select">
      <option value="">Выберите атрибут</option>
      <option v-for="attr in availableAttributes" :key="attr" :value="attr">{{ attr }}</option>
    </select>

    <button @click="applyFilters" class="apply-btn">Применить</button>
    <button @click="resetFilters" class="reset-btn">Сбросить</button>
  </div>
</template>

<script setup>
import { ref, defineEmits } from 'vue';

const emit = defineEmits(['applyFilters', 'resetFilters']);

const nameFilter = ref('');
const selectedAttribute = ref('');
const availableAttributes = ['IT', 'Артефакты', 'Frontend', 'Backend', 'Design'];

const applyFilters = () => {
  emit('applyFilters', {
    name: nameFilter.value,
    attributes: selectedAttribute.value ? [selectedAttribute.value] : []
  });
};

const resetFilters = () => {
  nameFilter.value = '';
  selectedAttribute.value = '';
  emit('resetFilters');
};
</script>

<style scoped>
.filters {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  background: linear-gradient(90deg, #3B003D, #000D3D);
  width: 100%;
  padding: 15px;
}

.filter-input, .filter-select {
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 5px;
}

.apply-btn, .reset-btn {
  padding: 8px 12px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.apply-btn {
  background: #3B003D;
  color: white;
}

.reset-btn {
  background: #ccc;
}
</style>

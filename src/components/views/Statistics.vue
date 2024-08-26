<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';

const store = useStore();

const totalTasks = computed(() => store.getters.totalTasks);
const completedTasks = computed(() => store.getters.completedTasks);
const inProgressTasks = computed(() => store.getters.inProgressTasks);
</script>

<template>
  <div class="bg-white p-6 rounded-lg shadow-lg max-w-lg mx-auto">
    <h2 class="text-2xl font-semibold text-gray-800 mb-4">Estadísticas</h2>
    <div class="space-y-4">
      <div class="flex items-center justify-between p-4 bg-blue-100 rounded-lg shadow-sm">
        <span class="text-gray-700 font-medium">Total de tareas:</span>
        <span class="text-blue-600 font-bold">{{ totalTasks }}</span>
      </div>
      <div class="flex items-center justify-between p-4 bg-green-100 rounded-lg shadow-sm">
        <span class="text-gray-700 font-medium">Tareas completadas:</span>
        <span class="text-green-600 font-bold">{{ completedTasks }}</span>
      </div>
      <div class="flex items-center justify-between p-4 bg-yellow-100 rounded-lg shadow-sm">
        <span class="text-gray-700 font-medium">Tareas en progreso:</span>
        <span class="text-yellow-600 font-bold">{{ inProgressTasks }}</span>
      </div>
    </div>
  </div>
</template>

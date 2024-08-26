<script setup>
import { computed, ref } from 'vue';
import { useStore } from 'vuex';
import Project from '../Project.vue';
import Search from '../Search.vue';

const store = useStore();

const projects = computed(() => store.getters.projects);
const tasks = computed(() => store.getters.tasks);
const showCompleted = ref(false);
const showInProgress = ref(false);
const searchTerm = ref('');

function handleSearchUpdate(term) {
    searchTerm.value = term;
}

const filteredTasks = computed(() => {
    return tasks.value.filter(task => {
        const matchesSearchTerm = task.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
            task.description.toLowerCase().includes(searchTerm.value.toLowerCase());
        const matchesCompleted = showCompleted.value ? task.completed : true;
        const matchesInProgress = showInProgress.value ? task.inProgress : true;
        return matchesSearchTerm && matchesCompleted && matchesInProgress;
    });
});
</script>

<template>
    <Search @update-search="handleSearchUpdate" />

    <div class="flex flex-col md:flex-row md:justify-between items-center mt-4">
        <h2 class="text-2xl md:text-3xl font-semibold mb-2 md:mb-0">Tareas</h2>
        <div class="flex flex-col md:flex-row gap-2 md:gap-4">
            <button
                class="bg-[#EEF2FC] rounded-md h-10 text-[#14367B] font-semibold hover:bg-[#2563DC] hover:text-white transition-colors px-4 md:px-6"
                @click="showCompleted = !showCompleted">
                {{ showCompleted ? 'Mostrar todas las tareas' : 'Mostrar tareas completadas' }}
            </button>
            <button
                class="bg-[#EEF2FC] rounded-md h-10 text-[#14367B] font-semibold hover:bg-[#2563DC] hover:text-white transition-colors px-4 md:px-6"
                @click="showInProgress = !showInProgress">
                {{ showInProgress ? 'Mostrar todas las tareas' : 'Mostrar tareas en progreso' }}
            </button>
        </div>
    </div>

    <div class="mt-8">
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            <Project
                v-if="projects.length > 0"
                v-for="(project, index) in projects"
                :key="index"
                :project="project"
                :tasks="filteredTasks"
            />
        </div>
    </div>
</template>

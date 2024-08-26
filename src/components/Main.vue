<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import Search from './Search.vue';
import Tasks from './views/Tasks.vue';
import Projects from './views/Projects.vue';
import Statistics from './views/Statistics.vue';

const store = useStore();
const selectedComponent = computed(() => store.getters.selectedComponent);

const componentMap = {
    tasks: Tasks,
    projects: Projects,
    statistics: Statistics
};

</script>

<template>
    <div>
        <main class="mx-12 mt-12">
            <div>
                <component :is="componentMap[selectedComponent]" />
            </div>
        </main>
    </div>
</template>
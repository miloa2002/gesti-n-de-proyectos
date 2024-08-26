<script setup>
import { computed } from 'vue';
import { useStore } from 'vuex';
import BaseButton from './layout/BaseButton.vue';

defineProps({
    button: {
        type: Object,
        required: true
    }
})

const store = useStore();

const showAllNotes = () => {
    store.dispatch('updateComponent', 'tasks');
};

const showProjects = () => {
    store.dispatch('updateComponent', 'projects');
};

const showStatistics = () => {
    store.dispatch('updateComponent', 'statistics');
};

const selectedComponent = computed(() => store.getters.selectedComponent);

</script>

<template>
    <div class="flex flex-col gap-4">
        <BaseButton 
            :label="button.projects" 
            @click="showProjects" 
            :class="[selectedComponent === 'projects' ? 'bg-[#2563DC] text-white': 'bg-[#EEF2FC] text-[#14367B]']" 
            class="rounded-md h-10 font-semibold hover:bg-[#2563DC] hover:text-white transition-colors"
        />
        <BaseButton 
            :label="button.tasks" 
            @click="showAllNotes" 
            :class="[selectedComponent === 'tasks' ? 'bg-[#2563DC] text-white': 'bg-[#EEF2FC] text-[#14367B]']" 
            class="rounded-md h-10 font-semibold hover:bg-[#2563DC] hover:text-white transition-colors"
        />
        <BaseButton 
            :label="button.statistics" 
            @click="showStatistics" 
            :class="[selectedComponent === 'statistics' ? 'bg-[#2563DC] text-white': 'bg-[#EEF2FC] text-[#14367B]']" 
            class="rounded-md h-10 font-semibold hover:bg-[#2563DC] hover:text-white transition-colors"
        />
    </div>
</template>
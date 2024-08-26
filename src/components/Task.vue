<script setup>
import { ref, watch } from 'vue';
import { Icon } from '@iconify/vue';
import { useStore } from 'vuex';
import ModalTask from './ModalTask.vue';

const props = defineProps({
    task: {
        type: Object,
        required: true
    }
})

const modal = ref(false);
const store = useStore();

function deleteTask(taskId) {
    store.dispatch("removeTask", taskId);
}

function showModal() {
    modal.value = true;
}

function closeModal() {
    modal.value = false;
}

function completeTask() {
    store.dispatch('markTaskCompleted', props.task.id);
}

function toggleInProgress() {
    store.dispatch('markTaskInProgress', props.task.id);
}

const completed = ref(props.task.completed || false);
const inProgress = ref(props.task.inProgress || false);

watch(() => props.task.completed, () => {
    completed.value = props.task.completed;
});

watch(() => props.task.inProgress, () => {
    inProgress.value = props.task.inProgress;
});
</script>

<template>
    <div class="bg-white w-full h-auto rounded-md p-4 mb-3 shadow-md">
        <p class="text-[#5C5C5C] font-bold text-1xl">{{ task.title }}</p>
        <p class="mt-2 text-[#5C5C5C]">{{ task.description }}</p>
        <div class="flex justify-end mt-8 gap-4">
            <Icon :icon="completed ? 'material-symbols:check-circle' : 'material-symbols:task-alt'" 
                class="cursor-pointer"
                @click="completeTask" />
            <Icon :icon="inProgress ? 'material-symbols:hourglass-top' : 'material-symbols:update'" 
                class="cursor-pointer"
                @click="toggleInProgress" />
            <Icon icon="material-symbols:edit" class="cursor-pointer" @click="showModal" />
            <Icon icon="material-symbols:delete" class="cursor-pointer" @click="deleteTask(task.id)" />
        </div>
    </div>

    <ModalTask @close-modal="closeModal" :modal="modal" :task="task" />
</template>
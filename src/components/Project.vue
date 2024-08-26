<script setup>
import { computed, ref } from 'vue';
import { Icon } from '@iconify/vue';
import Task from './Task.vue';
import ModalTask from './ModalTask.vue';

const props = defineProps({
    project: {
        type: Object,
        required: true
    },
    tasks: {
        type: Array,
        required: true
    }
})

const modal = ref(false)

function showModal() {
    modal.value = true
}

function closeModal() {
    modal.value = false
}

const projectTasks = computed(() => {
    return props.tasks.filter(task => task.assignedproject === props.project.title);
});

</script>

<template>
    <div :style="{backgroundColor: project.color.bg}" class="rounded-md p-4 shadow-md flex flex-col h-max">
        <div class="flex justify-between items-center">
            <div class="flex gap-2 items-center">
                <p class="m-0 bg-white rounded-full w-6 h-6 flex justify-center items-center font-bold" :style="{color: project.color.text}">{{ projectTasks.length }}</p>
                <p :style="{color: project.color.text}" class="font-bold text-2xl m-0">{{ project.title }}</p>
            </div>
            <div class="flex gap-2">
                <Icon icon="ic:baseline-plus" :style="{color: project.color.text}" class="cursor-pointer text-xl" @click="showModal"/>
            </div>
        </div>

        <div class="mt-6 flex-grow" v-if="projectTasks.length > 0">
            <Task v-for="(task, index) in projectTasks" :key="index" :task="task" />
        </div>

        <div :style="{ borderColor: project.color.text }" class="border-dashed border-2 rounded-md p-2 flex justify-center items-center mt-8 cursor-pointer hover:">
            <p :style="{ color: project.color.text }" class="font-semibold" @click="showModal">Añadir nueva tarea</p>
            <Icon icon="ic:baseline-plus" :style="{color: project.color.text}" class="cursor-pointer text-xl"/>
        </div>
    </div>

    <!--Modal-->
    <ModalTask 
        @close-modal="closeModal"
        :modal="modal"
    />
    <!--Modal-->
</template>

<script setup>
import { ref, computed, reactive } from 'vue';
import ModalProjects from '../ModalProjects.vue';
import { useStore } from 'vuex';
import { Icon } from '@iconify/vue';
import Alert from '../layout/Alert.vue';

const modal = ref(false);
const store = useStore();

const projects = computed(() => store.getters.projects);

function showModal() {
    modal.value = true;
}

function closeModal() {
    modal.value = false;
}

const alert = reactive({
    msg: "",
    type: ""
});

function deleteProject(projectName, projectId) {
    const taskForProject = store.getters.tasks.filter(task => task.assignedproject.toLowerCase().trim() === projectName.toLowerCase().trim());

    if (taskForProject.length >= 1) {
        alert.msg = `El proyecto ${projectName} tiene más de una tarea, no se eliminará`;
        alert.type = "error";

        setTimeout(() => {
            alert.msg = "";
            alert.type = "";
        }, 3000);
    } else {
        store.dispatch("removeProject", projectId);
    }
}
</script>

<template>
    <div class="flex flex-col md:flex-row justify-between items-center">
        <h2 class="text-2xl md:text-3xl font-semibold mb-4 md:mb-0">Lista de tableros</h2>
        <button
            class="bg-[#EEF2FC] rounded-md h-10 text-[#14367B] font-semibold hover:bg-[#2563DC] hover:text-white transition-colors px-4 md:px-6"
            @click="showModal">
            Nuevo Tablero +
        </button>
    </div>
    <div class="w-full max-w-sm mt-4">
        <Alert v-if="alert.msg" :alert="alert" />
    </div>

    <!--Modal-->
    <ModalProjects @close-modal="closeModal" :modal="modal" />
    <!--Modal-->

    <!--Projects-->
    <div class="mt-8">
        <ul class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            <li v-for="project in projects" :key="project.id" class="mb-4">
                <div class="p-4 border rounded-md shadow-md" :style="{ backgroundColor: project.color.bg }">
                    <div class="flex justify-end gap-4">
                        <!-- <Icon icon="material-symbols:edit" class="cursor-pointer"/> -->
                        <!-- <Icon icon="material-symbols:task-alt" class="cursor-pointer"
                            :style="{ color: project.color.text }" /> -->
                        <Icon icon="material-symbols:delete" class="cursor-pointer"
                            :style="{ color: project.color.text }" @click="deleteProject(project.title, project.id)" />
                    </div>
                    <h4 class="text-base md:text-lg font-semibold" :style="{ color: project.color.text }">{{ project.title }}</h4>
                    <div class="w-8 h-8 rounded-full mt-2"></div>
                </div>
            </li>
        </ul>
    </div>
    <!--Projects-->
</template>

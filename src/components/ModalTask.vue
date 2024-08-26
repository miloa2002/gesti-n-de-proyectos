<script setup>
import { computed, reactive, watch } from 'vue';
import { useStore } from 'vuex';
import Alert from './layout/Alert.vue';

const emit = defineEmits(['close-modal'])

const props = defineProps({
    modal: {
        type: Boolean,
        required: true
    },
    task: {
        type: Object,
        required: false
    }
})

const store = useStore()

const projects = computed(() => {
    return store.getters.projects;
})

const alert = reactive({
    msg: "",
    type: ""
})

const taskData = reactive({
    id: null,
    title: '',
    description: '',
    assignedproject: '',
    completed: false,
    inProgress: false
})

watch(() => props.task, () => {
    if (props.task) {
        Object.assign(taskData, props.task);
    }
}, { immediate: true });

function handleSubmitTask() {
    if(Object.values(taskData).includes("")) {
        alert.msg = "Todos los campos son obligatorios"
        alert.type = "error"
    }else {
        if (taskData.id) {
            store.dispatch('editTask', taskData)
        } else {
            store.dispatch('addTask', taskData)
        }
        emit('close-modal')
    }

    Object.assign(taskData, {
        title: '',
        description: '',
        assignedproject: '',
        completed: false,
        inProgress: false
    })

    setTimeout(() => {
        alert.msg = ""
        alert.type = ""
    }, 3000);
}
</script>

<template>
    <transition name="fade">
        <div v-if="modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div class="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 transform transition-all duration-300 scale-95"
                :class="{ 'scale-100': modal }">
                <h3 class="text-xl md:text-2xl font-semibold mb-4">Nueva tarea</h3>

                <form @submit.prevent="handleSubmitTask">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Título de la tarea</label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title" type="text" placeholder="Título de la tarea" v-model="taskData.title">
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="description">Descripción de la tarea</label>
                        <textarea
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline h-24"
                            id="description" placeholder="Descripción de la tarea" v-model="taskData.description"></textarea>
                    </div>
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="assignedproject">Asigna tu tarea a un tablero (proyecto)</label>
                        <select 
                            id="assignedproject"
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            v-model="taskData.assignedproject"
                        >
                            <option value="">--Selecciona un tablero--</option>
                            <option 
                                v-for="(project, index) in projects"
                                :key="index"
                                :value="project.title"
                            >{{ project.title }}</option>
                        </select>
                    </div>
                    <div class="flex flex-col sm:flex-row justify-end gap-2">
                        <button type="button" @click="$emit('close-modal')"
                            class="text-gray-400 font-semibold py-2 px-4 rounded">Cancelar</button>
                        <button type="submit"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">{{ taskData.id ? "Editar" : "Guardar" }}</button>
                    </div>
                    <Alert v-if="alert.msg" :alert="alert" class="mt-4" />
                </form>
            </div>
        </div>
    </transition>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
    opacity: 0;
}
</style>

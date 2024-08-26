<script setup>
import { reactive } from 'vue';
import { useStore } from 'vuex';
import Alert from './layout/Alert.vue';

defineProps({
    modal: {
        type: Boolean,
        required: true
    }
});

const emit = defineEmits(['close-modal']);

const store = useStore();

const colorsObject = reactive({
    colors: [
        {
            bg: "#D4CDFF",
            text: "#3A20A9"
        },
        {
            bg: "#CBE5FF",
            text: "#0051A0"
        },
        {
            bg: "#F9E8CC",
            text: "#D76B07"
        },
        {
            bg: "#FBC6C5",
            text: "#CB120D"
        }
    ]
});

const projectData = reactive({
    title: '',
    color: ''
});

const alert = reactive({
    msg: "",
    type: ""
});

function handleSubmit() {
    if (Object.values(projectData).includes("")) {
        alert.msg = "Todos los campos son obligatorios";
        alert.type = "error";
    } else {
        store.dispatch('addProject', projectData);
        emit('close-modal');
    }

    Object.assign(projectData, {
        id: null,
        title: '',
        color: ''
    });

    setTimeout(() => {
        alert.msg = "";
        alert.type = "";
    }, 3000);
}
</script>

<template>
    <transition name="fade">
        <div v-if="modal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div class="bg-white rounded-lg shadow-lg w-full max-w-md p-6 transform transition-all duration-300 scale-95"
                :class="{ 'scale-100': modal }">
                <h3 class="text-xl md:text-2xl font-semibold mb-4">Nuevo tablero</h3>

                <form @submit.prevent="handleSubmit">
                    <div class="mb-4">
                        <label class="block text-gray-700 text-sm font-bold mb-2" for="title">Título proyecto</label>
                        <input
                            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title" type="text" placeholder="Título del proyecto" v-model="projectData.title">
                    </div>
                    <div class="mb-4">
                        <p class="my-3 font-medium">Selecciona el color para tu proyecto</p>
                        <div class="flex flex-wrap gap-4">
                            <label v-for="(color, index) in colorsObject.colors" :key="index" :style="{ backgroundColor: color.bg }"
                                class="w-8 h-8 rounded-full cursor-pointer flex items-center justify-center">
                                <input type="radio" name="color-group" :value="color" class="hidden" v-model="projectData.color" />
                            </label>
                        </div>
                    </div>
                    <div class="flex flex-col sm:flex-row justify-end gap-2">
                        <button type="button" @click="$emit('close-modal')"
                            class="text-gray-400 font-semibold py-2 px-4 rounded">Cancelar</button>
                        <button type="submit"
                            class="bg-blue-500 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded">Guardar</button>
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

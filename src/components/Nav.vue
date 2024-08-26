<script setup>
import { ref, reactive } from 'vue';
import Button from './Button.vue';


const button = reactive({
    tasks: "Tareas",
    projects: "Proyectos",
    statistics: "Estadisticas"
})

const buttons = ref([button]);

</script>

<template>
    <div class="w-3/4 mx-auto">
        <h1 class="m-0 text-center mt-8 font-bold">Task Manager</h1>

        <div class="mt-12">
            <Button 
                v-for="(button, index) in buttons" 
                :key="index"
                :button="button"
            />
        </div>
    </div>
</template>
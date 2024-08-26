<script setup>
import { Icon } from '@iconify/vue';
import { ref } from 'vue';

const emit = defineEmits();

const searchTerm = ref('');

function updateSearchTerm(event) {
    searchTerm.value = event.target.value;
    emit('update-search', searchTerm.value);
}

</script>

<template>
    <div class="h-24 flex items-center">
        <div class="relative w-1/2">
            <input 
                type="text"
                placeholder="Buscar tarea"
                class="w-full border border-gray-200 rounded-md p-3 outline-none"
                @input="updateSearchTerm"
            >
            <Icon icon="material-symbols:search" class="absolute right-3 top-1/2 transform -translate-y-1/2 text-black text-2xl cursor-pointer" />
        </div>
    </div>
</template>
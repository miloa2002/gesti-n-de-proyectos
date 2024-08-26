<script setup>
defineProps({
    label: {
        type: String,
        required: true
    }
})
</script>

<template>
    <button>
        {{ label }}
    </button>
</template>
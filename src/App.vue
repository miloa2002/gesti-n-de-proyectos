<script setup>
import Nav from './components/Nav.vue';
import Main from './components/Main.vue';
</script>

<template>
  <div class="flex flex-col md:flex-row">
    <div class="w-full md:w-1/6 border-b md:border-r border-gray-200 h-auto md:h-screen">
      <Nav />
    </div>
    <div class="flex-1">
      <Main />
    </div>
  </div>
</template>
